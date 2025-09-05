import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload, Button, message, Image, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosInstance from '@/config/axios';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AntdUpload = ({
  onUploadSuccess,
  label = 'Upload File',
  fileType = 'picture',
  buttonStyle = {},
  preview = false,
  onRemove,
  uploadButton,
  maxCount,
  fileList,
  accept = '.png,.jpg,.jpeg',
  aspectRatio = 16 / 9,
  disabled,
  onCustomProgress,
  url,
  isImage = true,
  setUploadingLoader = () => {},
  cropShape,
  size = 1,
  uid
}) => {
  const [internalFileList, setInternalFileList] = React.useState(fileList || []);
  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  React.useEffect(() => {
    setInternalFileList(fileList || []);
  }, [url]);
  const makeCircularJPEG = async (imageBlob) => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      const url = URL.createObjectURL(imageBlob);
      img.src = url;
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Fill white background (since JPG has no transparency)
        ctx.fillStyle = '#ffffff'; // or any background color
        ctx.fillRect(0, 0, size, size);

        // Draw circular clipping mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Draw the image in the circular area
        ctx.drawImage(img, 0, 0, size, size);
        ctx.restore();

        // Convert to JPEG blob
        canvas.toBlob(
          (blob) => {
            resolve(blob); // JPEG with circular appearance
            URL.revokeObjectURL(url);
          },
          'image/jpeg',
          0.95
        );
      };
    });
  };

  const makeImageCircular = async (imageBlob) => {

    return new Promise((resolve, reject) => {
      try {
        const img = document.createElement('img');


        img.crossOrigin = 'anonymous';

        const url = URL.createObjectURL(imageBlob);

        img.onload = () => {
          const size = Math.min(img.width, img.height);
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');

          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(img, 0, 0, size, size);

          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            if (blob) resolve(blob);
            else reject(new Error('Failed to convert canvas to blob'));
          }, 'image/png');
        };

        img.onerror = (err) => {
          URL.revokeObjectURL(url);
          reject(new Error('Image failed to load: ' + err.message));
        };

        img.src = url;
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleCustomUpload = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      const formData = new FormData();
      const actualFile = file;

      let processedFile = actualFile;

      if (cropShape === 'round') {
        const circularBlob =
          file.type === 'image/jpeg'
            ? await makeCircularJPEG(actualFile)
            : await makeImageCircular(actualFile);
        processedFile = new File([circularBlob], file.name, { type: 'image/png' });
      }

      formData.append('media', processedFile);

      setUploadingLoader(true);

      const response = await axiosInstance.post(
        `media-upload/upload/`, // ✅ adjust endpoint if needed
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded / event.total) * 100);
            onProgress({ percent });

            if (onCustomProgress) {
              onCustomProgress(percent);
            }

            if (maxCount === 1) {
              setInternalFileList([{ ...file, uid, percent, status: 'uploading' }]);
            }
          },
        }
      );

      const data = response.data?.data;

      setUploadingLoader(false);
      if (data?.url) {
        onUploadSuccess(data.url, data.thumbnail_url);

        const updatedFile = {
          uid: String(Date.now()),
          status: 'done',
          url: (data.thumbnail_url || data.url) + `?t=${Date.now()}`,
          thumbnail_url: data.thumbnail_url,
          name: Date.now(),
        };

        // setInternalFileList([updatedFile]);

        messageApi.open({
          type: 'success',
          content: 'File uploaded successfully!',
        });

        onSuccess(data, file);
      } else {
        throw new Error('URL not found in response');
      }
    } catch (err) {
      setUploadingLoader(false);

      if (maxCount === 1) {
        setInternalFileList([]);
      }

      const errMsg = err?.response?.data?.errors || err.message || 'File upload failed';

      if (typeof errMsg === 'object') {
        const fields = Object.entries(errMsg)
          .map(([key]) => key.replace(/_/g, ' '))
          .join(', ');
        messageApi.error(`Errors in: ${fields}`);
      } else {
        messageApi.error(errMsg);
      }

      if (onCustomProgress) {
        onCustomProgress(0);
      }

      onError(new Error(typeof errMsg === 'string' ? errMsg : 'Upload failed'));
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <AntdUploadWrapper>
      {contextHolder}
      {isImage ? (
        <ImgCrop
          rotate
          modalClassName="image-cropper"
          aspect={aspectRatio}
          cropShape={cropShape} // or use cropShape="round" for avatars
        >
          <Upload
            disabled={disabled}
            customRequest={handleCustomUpload}
            showUploadList={preview}
            listType={fileType}
            onRemove={onRemove}
            maxCount={maxCount}
            onPreview={handlePreview}
            fileList={internalFileList}
            accept={accept}
            beforeUpload={(file) => {
              file.uid = uid || file.uid; // ✅ force your custom uid
              const maxSizeInBytes = size * 1024 * 1024;
              const isLt2M = file.size < maxSizeInBytes;
              const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
              if (!allowedTypes.includes(file.type)) {
                message.error(`${file.name} is not a valid image file.`);
                messageApi.open({
                  type: 'error',
                  content: `${file.name} is not a valid image file.`,
                });
                return Upload.LIST_IGNORE;
              }
              if (!isLt2M) {
                messageApi.open({
                  type: 'error',
                  content: `File size must be less than ${size}MB`,
                });
                return Upload.LIST_IGNORE; // prevent file from being added if too big
              }
              return true;
            }}
          >
            {uploadButton ? (
              uploadButton
            ) : (
              <Button icon={<UploadOutlined />} style={buttonStyle}>
                {label}
              </Button>
            )}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          disabled={disabled}
          customRequest={handleCustomUpload}
          showUploadList={preview}
          listType={fileType}
          onRemove={onRemove}
          maxCount={maxCount}
          onPreview={handlePreview}
          fileList={internalFileList}
          accept={accept}
          beforeUpload={(file) => {
            file.uid = uid || file.uid; // ✅ force your custom uid
            const isVideo = file.type.startsWith('video/');
            const maxSizeInBytes = size * 1024 * 1024;
            const isLt20MB = file.size < maxSizeInBytes;
            const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isVideo) {
            //   if (!isLt2M) {
            //     messageApi.open({
            //       type: 'error',
            //       content: `File size must be less than ${size}MB`,
            //     });
            //     return Upload.LIST_IGNORE; // prevent file from being added if too big
            //   }
            // }
            if (!isVideo) {
              messageApi.open({
                type: 'error',
                content: 'You can only upload video files!',
              });
              return Upload.LIST_IGNORE;
            }
            if (isVideo && !isLt20MB) {
              messageApi.open({
                type: 'error',
                content: `Video must be smaller than ${size}MB!`,
              });
              return Upload.LIST_IGNORE; // prevent file from being added if too big
            }

            return true;
          }}
        >
          {uploadButton ? (
            uploadButton
          ) : (
            <Button icon={<UploadOutlined />} style={buttonStyle}>
              {label}
            </Button>
          )}
        </Upload>
      )}
      {isImage && previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      {!isImage && previewImage && (
        <Modal
          open={previewOpen}
          footer={null}
          onCancel={() => {
            setPreviewOpen(false);
            setPreviewImage(''); // 🔥 this removes video src to stop playback
          }}
          destroyOnClose // 🔥 ensures the modal content (video element) is destroyed on close
          width={800}
        >
          <video src={previewImage} controls autoPlay style={{ width: '100%', borderRadius: 8 }} />
        </Modal>
      )}
    </AntdUploadWrapper>
  );
};

export default AntdUpload;

const AntdUploadWrapper = styled.div`
// .ant-upload-select {
//     border:  1px dashed #ccc;
//     border-radius: 10px;
//     width: 100px;
//     height: 100px;
//     display: flex !important;
//     align-items: center;
//     justify-content: center;
//     background-color: rgba(0,0,0,0.02);
// }
.ant-upload.ant-upload-select {
  height: 5rem !important;
  width: 5rem !important;
}

.ant-upload-wrapper.ant-upload-picture-card-wrapper
  .ant-upload-list.ant-upload-list-picture-card
  .ant-upload-list-item-container {
  height: 5rem !important;
  width: 5rem !important;
}

.ant-upload-wrapper.ant-upload-picture-card-wrapper
  .ant-upload-list.ant-upload-list-picture-card
  .ant-upload-list-item-progress {
  bottom: 20px !important;
}

`