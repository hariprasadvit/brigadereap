/** @format */

"use client";
import { useUser } from "@/utils/UserContext";
import CustomButton from "../CustomButton";
import Button from "../Button";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Card, Flex, Form, Space, Spin } from "antd";
import { useAddStartUpHook } from "@/hooks/useAddStartupHook";
import AntdInput from "./AntdInput";
import AntdDatepicker from "./AntdDatePicker";
import AntdCheckbox from "./AntdCheckbox";
import AntdSelect from "./AntdSelect";
import AntdUpload from "./AntdUpload";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useWatch } from "antd/es/form/Form";
import loader from "../../../public/gif/loader.gif";
import Image from "next/image";

export default function AddStartup({
  startupId,
  detail,
  industries,
  loggeduser,
}) {
  const { user, setUser } = useUser();
  const router = useRouter();
  const {
    user_id = null,
    first_name = "",
    last_name = "",
    approved_startup_count,
    pending_startup_count,
    claimed_approved_count,
    claimed_pending_count,
    update_pending_count,
    update_approved_count,
  } = user || {};
  const showCreateProfile = startupId
    ? true
    : user_id
    ? !approved_startup_count &&
      !pending_startup_count &&
      !claimed_approved_count &&
      !claimed_pending_count &&
      !update_pending_count &&
      !update_approved_count
    : true;

  const isAlreadyAvailable =
    approved_startup_count ||
    pending_startup_count ||
    claimed_approved_count ||
    claimed_pending_count ||
    update_pending_count ||
    update_approved_count;
  const [showStartup, setShowStartup] = useState(false);
  const goToLogin = () => {
    const currentUrl = window.location.pathname + window.location.search;
    router.push(
      `/login?mode=signin&redirect_url=${encodeURIComponent(currentUrl)}`
    );
  };

  useEffect(() => {
    if (loggeduser?.user_id) {
      setUser(loggeduser);
    } else {
      setUser(loggeduser || {})
    }
  }, [loggeduser?.user_id]);

  useEffect(() => {
    setShowStartup(true);
    window?.scrollTo(0, 0);
  }, []);
  const {
    handleSubmit,
    handleFailed,
    loading,
    inputs,
    contextHolder,
    form,
    detailLoader,
  } = useAddStartUpHook({
    successCallback: () => {
      router.push("/profile");
    },
    id: startupId,
    detail,
    industries,
  });

  const loggedUserName = user_id
    ? `${first_name || ""} ${last_name || ""}`
    : "";

  const isMyCompany = startupId
    ? detail?.created_by_type === "user" && detail?.created_by === user_id
      ? detail?.status === "rejected"
        ? isAlreadyAvailable
          ? false
          : true
        : true
      : detail?.created_by_type !== "user" &&
        detail?.is_claimed &&
        detail?.owned_by === user_id
      ? true
      : false
    : true;

  return (
    <AntdWrapper>
      {!showStartup ? (
        <LoaderContainer>
          <Image src={loader} alt="loader" />
        </LoaderContainer>
      ) : user_id &&
        showStartup &&
        showCreateProfile &&
        (startupId ? user_id && isMyCompany : true) ? (
        <RelativeContainer>
          {/* {detailLoader ? <CustomLoader /> : null} */}
          <Card
            style={{ background: "transparent", height: "auto", padding: 0 }}
            title={
              <Flex align="center" gap={"1rem"}>
                <div className="back-btn-wrap">
                  <div
                    className="back-btn"
                    onClick={() => window.history.back()} // or use a custom handler
                    style={{ background: "white", color: "black" }}
                  >
                    <ArrowLeftOutlined />
                  </div>
                </div>

                <div className="main-heading">
                  {startupId ? "Edit Startup Profile" : "Add Startup Profile"}
                </div>
              </Flex>
            }
          >
            <SubContainer>
              <Form
                form={form}
                name="user_form"
                layout="vertical"
                onFinish={handleSubmit}
                onFinishFailed={handleFailed}
                initialValues={{
                  founders_data: [
                    {
                      founder_name: "",
                      designation: "",
                      years_of_experience: null,
                      profile_picture: "",
                      email: "",
                      // founded: [""],
                      created_by_founder: false,
                    },
                  ],
                  social_media_links: [
                    {
                      platform: "",
                      url: "",
                    },
                  ],
                  startup_tags: []
                }}
              >
                {inputs.map((data, inputIndex) => (
                  <div className="input-main-wrap" key={inputIndex}>
                    {data.title && (
                      <div level={4} className="heading">
                        <div className="verticalLine" />
                        <div className="heading_title">{data.title}</div>
                      </div>
                    )}
                    <Flex
                      wrap
                      justify="space-between"
                      style={{
                        marginTop: 10,
                        borderBottomWidth: 2,
                        borderColor: "yellow",
                      }}
                    >
                      {data.inputs.map(
                        ({
                          name,
                          rules,
                          label,
                          type,
                          isPassword,
                          mapData,
                          disabled,
                          error,
                          picker,
                          disabledDate,
                          isTextArea,
                          ...props
                        }) => (
                          <Form.Item
                            className="form-item"
                            label=""
                            name={name}
                            rules={rules}
                            key={name}
                            valuePropName={props.valuePropName}
                            style={{
                              width:
                                (type === "list" ||
                                  props.selectMode === "tags") &&
                                "100%",
                              ...props.style,
                            }}
                          >
                            {type === "list" ? (
                              name === "social_media_links" ? (
                                <Form.List name={name}>
                                  {(fields, { add, remove }) => (
                                    <>
                                      <FlexBetween>
                                        <div className="heading">
                                          <div className="verticalLine" />
                                          <div className="heading_title">
                                            {"Social Media Links"}
                                          </div>
                                        </div>
                                        {/* <Title level={4}>{'Social Media Links'}</Title> */}
                                        <Form.Item style={{ margin: 0 }}>
                                          {fields?.length < 5 ? (
                                            <CustomButton
                                              btnText="Add Link"
                                              onClick={() => add()}
                                              type="primary"
                                              htmlType={"button"}
                                            />
                                          ) : null}
                                        </Form.Item>
                                      </FlexBetween>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 20,
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {fields.map((field, index) => (
                                          <SocialMediaComponent
                                            field={field}
                                            index={index}
                                            remove={remove}
                                            form={form}
                                            key={index}
                                          />
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </Form.List>
                              ) : (
                                <Form.List name={name}>
                                  {(fields, { add, remove }) => (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 20,
                                        }}
                                      >
                                        <div className="heading">
                                          <div className="verticalLine" />
                                          <div className="heading_title">
                                            {"Founders"}
                                          </div>
                                        </div>
                                        {/* <Title level={4}>{'Founders'}</Title> */}
                                        <Form.Item style={{ margin: 0 }}>
                                          <CustomButton
                                            type="primary"
                                            btnText="Add Founder"
                                            onClick={() => add()}
                                            htmlType={"button"}
                                          />
                                        </Form.Item>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 20,
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {fields.map((field, index) => (
                                          <FounderComponent
                                            field={field}
                                            index={index}
                                            remove={remove}
                                            form={form}
                                            key={index}
                                            totalFields={fields?.length}
                                            loggedUserName={loggedUserName}
                                          />
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </Form.List>
                              )
                            ) : type === "upload" ? (
                              <div className="custom-input-container upload-input">
                                <label className="custom-label">{label}</label>
                                <div
                                  className="custom-input"
                                  style={{
                                    padding: "20px 20px 15px",
                                    border: error ? "1px solid red" : "",
                                  }}
                                >
                                  <AntdUpload
                                    label={label}
                                    disabled={disabled}
                                    {...props}
                                  />
                                </div>
                                <span className="info-text">
                                  ( Max file size: {props.size}
                                  MB | Size: 120px × 120px )
                                </span>
                              </div>
                            ) : type === "select" ? (
                              <AntdSelect
                                label={label}
                                type={type}
                                placeholder={
                                  props.selectMode === "tags"
                                    ? "Add relevant keywords to help users find your company (press Enter after each)"
                                    : `Select ${label}`
                                }
                                mapData={mapData || []}
                                onChange={props.onChange}
                                disabled={disabled}
                                allowClear={props.allowClear}
                                showSearch={props.showSearch}
                                mode={props.selectMode}
                                // popupRender={props.popupRender}
                              />
                            ) : type === "checkbox" ? (
                              <AntdCheckbox
                                label={label}
                                onChange={props.onChange}
                                name={name}
                              />
                            ) : type === "date" ? (
                              <AntdDatepicker
                                label={label}
                                type={type}
                                disabledDate={disabledDate}
                                placeholder={`Select ${label?.replaceAll(
                                  "*",
                                  ""
                                )}`}
                                picker={picker}
                              />
                            ) : (
                              <AntdInput
                                label={label}
                                type={type}
                                placeholder={`Enter ${label}`}
                                isPassword={isPassword}
                                disabled={disabled}
                                isTextArea={isTextArea}
                              />
                            )}
                          </Form.Item>
                        )
                      )}
                    </Flex>
                  </div>
                ))}
                <SubmitWrap>
                  <CustomButton
                    type="primary"
                    btnText={
                      loading ? (
                        <Spin color="#000" />
                      ) : startupId ? (
                        "Update"
                      ) : (
                        "Submit"
                      )
                    }
                    height="42px"
                    width="100%"
                    fontSize="0.875rem"
                    borderRadius="2px"
                    responsiveWidth={"200px"}
                    disabled={loading}
                    htmlType="submit"
                  />
                </SubmitWrap>
              </Form>
            </SubContainer>
          </Card>
        </RelativeContainer>
      ) : !isMyCompany && startupId && user_id ? (
        <SessionExpired>
          <p>
            {detail?.status === "rejected"
              ? " You already have a pending or approved profile. Updating rejected profile is not allowed."
              : "You dont have access to this profile"}
          </p>
        </SessionExpired>
      ) : showStartup && showCreateProfile ? (
        <SessionExpired>
          <h2>⚠️ {user?.error ? `${user?.error}.` : ``} Please login to continue.</h2>
          <p>
            {/* Your session has timed out due to inactivity. */}
            {/* <br /> */}
            {/* Please login to continue. */}
          </p>
          <Button
            buttonText="Login"
            height="37px"
            width="40%"
            onClick={goToLogin}
          />
        </SessionExpired>
      ) : (
        !showCreateProfile && (
          <SessionExpired>
            {/* <h2>⚠️ Session Expired</h2> */}
            <p style={{ marginBottom: "0" }}>
              {/* Your session has timed out due to inactivity. */}
              {/* <br /> */}
              You already have a pending or approved profile. Creating or
              claiming another profile is not allowed.
            </p>
          </SessionExpired>
        )
      )}
    </AntdWrapper>
  );
}

const FounderComponent = ({
  field,
  index,
  remove,
  form,
  totalFields,
  loggedUserName,
}) => {
  const [logoUrl, setLogoUrl] = useState(
    form.getFieldValue(["founders_data", index, "profile_picture"]) || ""
  );
  const [logoUrlErr, setLogoUrlErr] = useState("");
  const uploadProps = {
    label: "Profile Picture",
    name: "profile_picture",
    rules: [{ required: true, message: "Profile Picture is required" }],
    onUploadSuccess: (url) => {
      setLogoUrl(url);
      setLogoUrlErr("");
      form.setFieldsValue({
        founders_data: {
          [index]: {
            profile_picture: url,
          },
        },
      });

      form.validateFields([["founders_data", index, "profile_picture"]]); // manually trigger validation
    },
    size: 2,
    error: logoUrlErr,
    aspectRatio: 1,
    maxCount: 1,
    uid: `profile_picture_${index}`,
    onRemove: () => {
      setLogoUrl("");
      setLogoUrlErr("Logo is required");
      form.setFieldsValue({
        founders_data: {
          [index]: {
            profile_picture: "",
          },
        },
      });

      form.validateFields([["founders_data", index, "profile_picture"]]); // manually trigger validation
    },
    fileType: "picture-card",
    url: logoUrl,
    fileList: logoUrl
      ? [
          {
            uid: `profile_picture_${index}`,
            name: logoUrl?.split(".")?.[logoUrl?.split(".").length - 1],
            status: "done",
            url: logoUrl,
          },
        ]
      : [],
    preview: true,
    uploadButton: (
      <button
        style={{ border: 0, background: "none", outline: "none", color: "#000" }}
        type="button"
      >
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    ),
    type: "upload",
    buttonStyle: { padding: 30 },
  };

  useEffect(() => {
    if (
      !form
        .getFieldValue(["founders_data", index, "profile_picture"])
        ?.includes("fakepath")
    )
      setLogoUrl(
        form.getFieldValue(["founders_data", index, "profile_picture"]) || ""
      );
  }, [form.getFieldValue(["founders_data", index, "profile_picture"])]);

  return (
    <FounderWrap>
      <Card
        className="founder-card-wrap"
        key={field.key}
        title={`Founder ${index + 1}`}
        extra={
          <>
            {index === 0 ? (
              <Form.Item
                {...field}
                key={`created_by_founder${index + 1}`}
                label=""
                name={[field.name, "created_by_founder"]}
                valuePropName="checked"
              >
                <AntdCheckbox
                  marginTop={0}
                  label={"I am the founder who created this profile"}
                  name="created_by_founder"
                  onChange={(e) => {
                    if (
                      e &&
                      !form.getFieldValue([
                        "founders_data",
                        index,
                        "founder_name",
                      ])
                    ) {
                      form.setFieldsValue({
                        founders_data: {
                          [index]: {
                            founder_name: loggedUserName,
                          },
                        },
                      });
                    }
                  }}
                />
              </Form.Item>
            ) : (
              <div></div>
            )}
            {totalFields === 1 && index === 0 ? (
              <> </>
            ) : (
              <a
                onClick={() => {
                  remove(field.name);
                  setLogoUrl("");
                }}
              >
                Remove
              </a>
            )}
          </>
        }
        style={{ marginBottom: 24 }}
      >
        <Flex
          wrap
          justify="flex-start"
          style={{
            marginTop: 10,
            gap: 20,
            borderBottomWidth: 2,
            borderColor: "yellow",
          }}
        >
          <Form.Item
            {...field}
            key={`founder_name${index + 1}`}
            label=""
            name={[field.name, "founder_name"]}
            rules={[{ required: true, message: "Please enter founder name" }]}
          >
            <AntdInput placeholder="Founder Name" label="Name" />
          </Form.Item>
          <Form.Item
            {...field}
            key={`email${index + 1}`}
            label=""
            name={[field.name, "email"]}
            rules={[
              // { required: true, message: "Email Id is required" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <AntdInput placeholder="Email" label="Email" />
          </Form.Item>
          <Form.Item
            {...field}
            key={`designation${index + 1}`}
            label=""
            name={[field.name, "designation"]}
            rules={[{ required: true, message: "Please enter designation" }]}
          >
            <AntdInput placeholder="Designation" label="Designation" />
          </Form.Item>
          <Form.Item
            {...field}
            key={`profile_picture${index + 1}`}
            label=""
            name={[field.name, "profile_picture"]}
            rules={[
              {
                required: true,
                message: "Please upload profile picture",
              },
              // {
              //   type: 'url',
              //   message: 'Please enter a valid URL',
              // },
            ]}
          >
            <div className="custom-input-container upload-input">
              <label className="custom-label">{"Profile Picture URL"}</label>
              <div
                className="custom-input"
                style={{
                  padding: "20px 20px 15px",
                  border: uploadProps.error ? "1px solid red" : "",
                }}
              >
                <AntdUpload label={"Profile Picture URL"} {...uploadProps} />
              </div>
              <span className="info-text">
                ( Upload Size must be less than {uploadProps.size}MB )
              </span>
            </div>
          </Form.Item>
          <Form.Item
            {...field}
            key={`years_of_experience${index + 1}`}
            label=""
            name={[field.name, "years_of_experience"]}
            rules={[
              {
                required: true,
                message: "Please enter years of experience",
              },
            ]}
          >
            <AntdInput
              placeholder="Years of Experience"
              style={{ width: "100%" }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              label="Years of Experience"
            />
          </Form.Item>

          <Form.List name={[field.name, "founded"]}>
            {(subFields, { add: addStartup, remove: removeStartup }) => (
              <div className="startup-wrap">
                <Card
                  title={`Startups`}
                  extra={
                    <Form.Item
                      style={{ margin: 0 }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter startup name",
                        },
                      ]}
                    >
                      <CustomButton
                        btnText="Add Startup"
                        onClick={() => addStartup()}
                        type="primary"
                        htmlType={"button"}
                      />
                    </Form.Item>
                  }
                >
                  {" "}
                  <Flex
                    wrap
                    style={{
                      marginTop: 10,
                      borderBottomWidth: 2,
                      borderColor: "yellow",
                      gap: "0.875rem",
                    }}
                  >
                    {subFields?.length ? subFields.map((sf, sfIndex) => (
                      <Space
                        key={sfIndex}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...sf}
                          name={sf.name}
                          rules={[
                            {
                              required: true,
                              message: "Please enter a startup name",
                            },
                          ]}
                          key={sfIndex}
                        >
                          <AntdInput
                            placeholder={"Startup name" + ` ${sfIndex + 1}`}
                          />
                        </Form.Item>

                        <a onClick={() => removeStartup(sf.name)}>
                          <DeleteOutlined
                            style={{ fontSize: 24, color: "black" }}
                          />
                        </a>
                      </Space>
                    )) : null}
                  </Flex>
                </Card>
              </div>
            )}
          </Form.List>
        </Flex>
      </Card>
    </FounderWrap>
  );
};

const SocialMediaComponent = ({ field, index, remove, form }) => {
  const allValues = useWatch("social_media_links", form) || [];

  // Get selected platforms from other fields
  const selectedPlatforms = allValues
    .map((item, idx) => idx !== field.name && item?.platform)
    .filter(Boolean);

  // Define all platform options
  const platformOptions = [
    { label: "Facebook", id: "facebook" },
    { label: "Twitter", id: "twitter" },
    { label: "LinkedIn", id: "linkedin" },
    { label: "Instagram", id: "instagram" },
    { label: "Youtube", id: "youtube" },
  ];

  // Disable already selected options except for the current one
  const filteredOptions = platformOptions.map((opt) => ({
    ...opt,
    disabled: selectedPlatforms.includes(opt.id),
  }));

  return (
    <MediaWrap>
      <Card
        key={field.key}
        title={`Platform ${index + 1}`}
        extra={<a onClick={() => remove(field.name)}>Remove</a>}
      >
        <Flex
          wrap
          style={{ marginTop: 10, borderBottomWidth: 2, borderColor: "yellow" }}
          gap={"1.5rem"}
        >
          <Form.Item
            {...field}
            key={`platform${index + 1}`}
            label=""
            name={[field.name, "platform"]}
            rules={[{ required: true, message: "Please enter Platform" }]}
          >
            <AntdSelect label="Platform" mapData={filteredOptions} />
          </Form.Item>

          <Form.Item
            {...field}
            key={`url${index + 1}`}
            label=""
            name={[field.name, "url"]}
            rules={[
              { required: true, message: "Please enter url" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const trimmed = value.trim();
                  if (trimmed === "") {
                    return Promise.reject(
                      new Error("Link cannot be only spaces")
                    );
                  }
                  const urlPattern =
                    /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[\w./?%&=-]*)?$/i;
                  if (!urlPattern.test(trimmed)) {
                    return Promise.reject(
                      new Error("Please enter a valid URL")
                    );
                  }
                  return Promise.resolve();
                },
              },
              {
                validator: (_, value) => {
                  const platform = form.getFieldValue([
                    "social_media_links",
                    field.name,
                    "platform",
                  ]);
                  if (!value || !platform) return Promise.resolve();

                  const domainMatch = {
                    facebook: /facebook\.com/i,
                    twitter: /x\.com/i,
                    linkedin: /linkedin\.com/i,
                    instagram: /instagram\.com/i,
                    youtube: /youtube\.com/i,
                  };

                  if (!domainMatch[platform]?.test(value)) {
                    return Promise.reject(
                      `URL must match the selected platform`
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <AntdInput placeholder="url" label="Url" />
          </Form.Item>
        </Flex>
      </Card>
    </MediaWrap>
  );
};

const RelativeContainer = styled.div`
  position: relative;
  .ant-card-body {
    padding: 0px 24px 24px 24px;
    @media screen and (max-width: 550px) {
      padding: 0px 16px 20px 20px;
    }
  }
  .main-heading {
    font-size: 24px;
    color: #000;
    font-weight: 700;
  }
  .back-btn-wrap {
    padding: 10px 24px;
    cursor: pointer;
  }
  .back-btn {
    padding: 6px 10px;
    border-radius: 4px;
    box-shadow: 0px 2px 10px rgba(46, 91, 255, 0.1019607843);
  }
`;

const SubContainer = styled.div`
  // padding: 0px 2rem;
  .ant-card-body {
    padding: 24px 24px 24px 24px;
  }
  .heading {
    display: flex;
    gap: 16px;
    &_title {
      color: #000;
      font-weight: 600;
      font-size: 21px;
    }

    *,
    :after,
    :before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .verticalLine {
      width: 6px;
      height: 29px;
      background: ${({ theme }) => theme.colors.primaryYellow};
    }
  }
  .input-main-wrap {
    background-color: #fff;
    margin-top: 24px;
    padding: 24px;
    border-radius: 2px;
    box-shadow: 20px 20px 50px rgba(46, 91, 255, 0.1019607843);
    @media screen and (max-width: 550px) {
      padding: 16px;
      margin-top: 20px;
    }
    .form-item {
      width: 32%;
      @media screen and (max-width: 800px) {
        width: 48%;
      }
      @media screen and (max-width: 550px) {
        width: 100%;
      }
    }
  }
  .custom-input-container {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: 26px;
    &.upload-input {
      // display: flex;
      // align-items: center;
      gap: 1rem;
      .info-text {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .custom-label {
    position: absolute;
    top: -10px;
    left: 20px;
    background: #fff;
    padding: 0 15px;
    font-size: 16px;
    color: #000;
    z-index: 10;
    .madantory {
      color: red;
    }
  }

  .custom-file-upload-label {
    background: #fff;
    padding: 0 15px;
    font-size: 16px;
    color: #ccc;
    z-index: 10;
    .madantory {
      color: red;
    }
  }

  .custom-input {
    border: 1px solid #ccc;
    border-radius: 0px;
    padding: 14px 36px 10px 36px;
    width: 100%;
    outline: none !important;
    box-shadow: none !important;
    z-index: 9;
    font-size: 16px;
    color: #000;
    &:hover {
      border: 1px solid #000000 !important;
      border-color: #000000 !important;
    }
    &:focus {
      border: 1px solid #000000 !important;
      border-color: #000000 !important;
      &:hover {
        border: 1px solid #000000 !important;
        border-color: #000000 !important;
      }
    }
    .anticon {
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const FounderWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  .ant-card,
  .startup-wrap,
  .founder-card-wrap {
    width: 100%;
    .ant-card-head-wrapper {
      gap: 20px;
    }
    .ant-card-extra {
      margin-inline-start: unset;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ant-form-item {
        margin: 0px;
      }
    }
    .ant-card-head-title {
      flex: none;
    }
  }
  .ant-form-item {
    width: 32%;
    @media screen and (max-width: 800px) {
      width: 48%;
    }
    @media screen and (max-width: 550px) {
      width: 100%;
    }
  }
  .ant-card-body {
    padding: 0px 24px 24px 24px;
    @media screen and (max-width: 800px) {
      padding: 0px 16px 20px 16px;
    }
  }
  .startup-wrap {
    .ant-form-item {
      width: 100%;
    }
  }
`;
const MediaWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  .ant-card,
  .startup-wrap,
  .founder-card-wrap {
    width: 100%;
    .ant-card-head-wrapper {
      gap: 20px;
    }
  }
  .ant-form-item {
    width: 32%;
    @media screen and (max-width: 800px) {
      width: 48%;
    }

    @media screen and (max-width: 550px) {
      width: 100%;
    }
  }
  .ant-card-body {
    padding: 0px 24px 24px 24px;
    @media screen and (max-width: 550px) {
      padding: 0px 16px 20px 20px;
    }
  }
  .startup-wrap {
    .ant-form-item {
      width: 100%;
    }
  }
`;

const FlexBetween = styled.div`
  display: flex;
  // justify-content: space-between;
  gap: 20px;
`;

const AntdWrapper = styled.div`
  /* stylelint-disable */
  html,
  body {
    width: 100%;
    height: 100%;
  }
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  @-ms-viewport {
    width: device-width;
  }
  body {
    margin: 0;
    font-family: Montserrat;
  }
  [tabindex="-1"]:focus {
    outline: none;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 500;
  }
  p {
    margin-top: 0;
    margin-bottom: 1em;
  }
  abbr[title],
  abbr[data-original-title] {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline;
    text-decoration: underline dotted;
    border-bottom: 0;
    cursor: help;
  }

  input[type="text"],
  input[type="password"],
  input[type="number"],
  textarea {
    -webkit-appearance: none;
  }
  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1em;
  }
  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }
  dt {
    font-weight: 500;
  }
  dd {
    margin-bottom: 0.5em;
    margin-left: 0;
  }
  blockquote {
    margin: 0 0 1em;
  }
  dfn {
    font-style: italic;
  }
  b,
  strong {
    font-weight: bolder;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }
  a,
  area,
  button,
  [role="button"],
  input:not([type="range"]),
  label,
  select,
  summary,
  textarea {
    touch-action: manipulation;
  }
  table {
    border-collapse: collapse;
  }
  caption {
    padding-top: 0.75em;
    padding-bottom: 0.3em;
    text-align: left;
    caption-side: bottom;
  }
  input,
  select,
  optgroup,
  textarea {
    margin: 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  legend {
    display: block;
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5em;
    padding: 0;
    color: inherit;
    font-size: 1.5em;
    line-height: inherit;
    white-space: normal;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }
  input[type="radio"],
  input[type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
  }
  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    -webkit-appearance: listbox;
  }
  textarea {
    overflow: auto;
    resize: vertical;
  }
  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  progress {
    vertical-align: baseline;
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    outline-offset: -2px;
    -webkit-appearance: none;
  }
  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }
  output {
    display: inline-block;
  }
  summary {
    display: list-item;
  }
  template {
    display: none;
  }
  [hidden] {
    display: none !important;
  }
  mark {
    padding: 0.2em;
    background-color: #feffe6;
  }
`;

const SubmitWrap = styled.div`
  padding-top: 2rem;
  width: 24%;
  margin-left: auto;
`;

const SessionExpired = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: fit-content;

  h2 {
    font-size: 24px;
    color: #e74c3c;
    margin-bottom: 20px;
    font-family: Montserrat;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #333;
    margin-bottom: 1.875rem;
    line-height: 1.5;
    font-weight: 500;
    @media screen and (max-width: 550px) {
      font-size: 0.875rem;
      margin-bottom: 1.25rem;
    }
  }
  @media screen and (max-width: 550px) {
    max-width: 90%;
    padding: 20px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55vh;
  img {
    height: 80px;
    width: 80px;
  }
  @media screen and (max-width: 1100px) {
    height: 42vh;
    img {
      height: 50px;
      width: 50px;
    }
  }
`;
