import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Country, State, City } from "country-state-city";
import { BATCHES, INDUSTRIES, INVESTMENT_STAGE } from "@/utils/constants";
import axiosInstance from "@/config/axios";

export const useAddStartUpHook = ({ successCallback, id, detail, industries = [] } = {}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [logoUrl, setLogoUrl] = useState("");
  const [logoUrlErr, setLogoUrlErr] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [videoUrlErr, setvideoUrlErr] = useState("");
  const [reapCompany, setReapCompany] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates = State.getStatesOfCountry(selectedCountry.isoCode);
      setStates(fetchedStates);
      setCities([]);
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedState) {
      const fetchedCities = City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode
      );
      setCities(fetchedCities);
    }
  }, [selectedState]);

  const inputs = [
    {
      title: "Company Details",
      inputs: [
        {
          name: "company_name",
          label: "Company Name *",
          rules: [
            { required: true, message: "Please enter company name" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty
                if (value.trim() === "") {
                  return Promise.reject(
                    new Error("Company Name cannot be only spaces")
                  );
                }
                return Promise.resolve();
              },
            },
          ],
        },
        {
          name: "email",
          label: "Email *",
          rules: [
            { required: true, message: "Email Id is required" },
            { type: "email", message: "Please enter a valid email address" },
            // {
            //   validator: (_, value) => {
            //     if (!value) return Promise.resolve(); // skip if empty, handled by 'required'
            //     const domain = value.split('@')[1];
            //     if (!domain) return Promise.reject('Invalid email format');
            //     if (freeDomains.includes(domain.toLowerCase())) {
            //       return Promise.reject('Please use your company/professional email');
            //     }
            //     return Promise.resolve();
            //   },
            // },
          ],
        },
        {
          name: "industry_id",
          rules: [{ required: true, message: "Focus Area is required" }],
          label: "Focus Area *",
          type: "select",
          mapData: industries?.map((item) => ({
            id: item.id,
            label: item?.industry_name,
          })),
        },
        {
          label: "Upload Logo *",
          name: "company_logo",
          rules: [{ required: true, message: "Logo is required" }],
          onUploadSuccess: (url) => {
            setLogoUrl(url);
            setLogoUrlErr("");
            form.setFieldsValue({ company_logo: url });
            form.validateFields(["company_logo"]); // manually trigger validation
          },
          size: 2,
          error: logoUrlErr,
          url: logoUrl,
          aspectRatio: 1,
          maxCount: 1,
          uid: "company_logo",
          onRemove: () => {
            setLogoUrl("");
            setLogoUrlErr("Logo is required");
            form.setFieldsValue({ company_logo: "" });
            form.validateFields(["company_logo"]); // manually trigger validation
          },
          fileType: "picture-card",
          fileList: logoUrl
            ? [
                {
                  uid: "company_logo",
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
        },
        {
          name: "description",
          label: "Overview *",
          rules: [
            { required: true, message: "Overview is required" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty
                if (value.trim() === "") {
                  return Promise.reject(
                    new Error("Overview cannot be only spaces")
                  );
                }
                return Promise.resolve();
              },
            },
            {
              validator: (_, value) => {
                if (!value || value.length >= 200) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Minimum 200 characters required")
                );
              },
            },
          ],
          isTextArea: true,
        },
        {
          name: "introduction_video",
          label: "Company Overview Video",
          rules: [
            // { required: true, message: "Video Link is required" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty - this is handled by 'required' above
                const trimmed = value.trim();

                if (trimmed === "") {
                  return Promise.reject(
                    new Error("Link cannot be only spaces")
                  );
                }

                // Basic URL pattern
                const urlPattern =
                  /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[\w./?%&=-]*)?$/i;

                if (!urlPattern.test(trimmed)) {
                  return Promise.reject(new Error("Please enter a valid URL"));
                }

                return Promise.resolve();
              },
            },
          ],
          // onUploadSuccess: (url) => {
          //   setvideoUrl(url);
          //   setvideoUrlErr('');
          //   form.setFieldsValue({ introduction_video: url });
          //   form.validateFields(['introduction_video']); // manually trigger validation
          // },
          // size: 100,
          // error: videoUrlErr,
          // aspectRatio: 1,
          // maxCount: 1,
          // uid: 'introduction_video',
          // onRemove: () => {
          //   setvideoUrl('');
          //   setvideoUrlErr('Video is required');
          //   form.setFieldsValue({ introduction_video: '' });
          //   form.validateFields(['introduction_video']); // manually trigger validation
          // },
          // fileType: 'picture-card',
          // fileList: videoUrl
          //   ? [
          //       {
          //         uid: 'introduction_video',
          //         name: videoUrl?.split('.')?.[videoUrl?.split('.').length - 1],
          //         status: 'done',
          //         url: videoUrl,
          //       },
          //     ]
          //   : [],
          // preview: true,
          // uploadButton: (
          //   <button style={{ border: 0, background: 'none', outline: 'none' }} type="button">
          //     <PlusOutlined />
          //     <div style={{ marginTop: 8 }}>Upload</div>
          //   </button>
          // ),
          // type: 'upload',
          // accept: '.mp4,.mov,.avi,.mkv,.webm,.flv,.wmv',
          // buttonStyle: { padding: 30 },
          // isImage: false,
        },
        {
          name: "investment_stage",
          label: "Investment Stage *",
          rules: [{ required: true, message: "Investment Stage is required" }],
          type: "select",
          mapData: INVESTMENT_STAGE,
          allowClear: true,
        },
        {
          name: "founded_year",
          rules: [{ required: true, message: "Year is required" }],
          label: "Established Year *",
          type: "date",
          picker: "year",
          disabledDate: (current) => {
            // Disable dates after today
            return current && current > dayjs().endOf("day");
          },
        },
        {
          name: "website_url",
          label: "Website Link *",
          rules: [
            { required: true, message: "Website Link is required" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty - this is handled by 'required' above
                const trimmed = value.trim();

                if (trimmed === "") {
                  return Promise.reject(
                    new Error("Link cannot be only spaces")
                  );
                }

                // Basic URL pattern
                const urlPattern =
                  /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/[\w./?%&=-]*)?$/i;

                if (!urlPattern.test(trimmed)) {
                  return Promise.reject(new Error("Please enter a valid URL"));
                }

                return Promise.resolve();
              },
            },
          ],
        },
        {
          name: "company_size",
          label: "Company Size *",
          rules: [{ required: true, message: "Company Size is required" }],
          type: "select",
          mapData: [
            { name: "0 - 10", id: "0-10" },
            { name: "10 - 20", id: "10-20" },
            { name: "20 - 50", id: "20-50" },
            { name: "50 - 100", id: "50-100" },
            { name: "> 100", id: ">100" },
          ],
          isSize: true,
          allowClear: true,
        },
        {
          name: "country",
          label: "Country",
          type: "select",
          mapData: countries?.map((item) => ({
            id: item.name,
            label: item?.name,
          })),
          showSearch: true,
          onChange: (code) => {
            const country = countries.find((c) => c.name === code);
            setSelectedCountry(code ? country : "");
            setSelectedState(null);

            form.setFieldsValue({
              state: "",
              city: "",
            });
          },
          allowClear: true,
        },
        {
          name: "state",
          label: "State",
          type: "select",
          mapData: states?.map((item) => ({
            id: item.name,
            label: item?.name,
          })),
          showSearch: true,
          onChange: (code) => {
            const state = states.find((c) => c.name === code);
            setSelectedState(code ? state : "");
            form.setFieldsValue({
              city: "",
            });
          },
          disabled: !selectedCountry,
          allowClear: true,
        },
        {
          name: "city",
          label: "City",
          type: "select",
          mapData: cities?.map((item) => ({
            id: item.name,
            label: item?.name,
          })),
          showSearch: true,
          disabled: !selectedState,
          allowClear: true,
        },

        // {
        //   name: 'region_id',
        //   label: 'Region',
        //   type: 'select',
        //   mapData: REGIONS?.map((item) => ({
        //     id: item.id,
        //     label: `${item?.region_name} - ${item.region_code}`,
        //   })),
        //   allowClear: true
        // },
        {
          name: 'funding_info',
          label: 'Funding Details',
          rules: [
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty
                if (value.trim() === '') {
                  return Promise.reject(new Error('Funding Details cannot be only spaces'));
                }
                return Promise.resolve();
              },
            },
          ],
        },
        {
          name: "is_reap_company",
          label: "Reap Company",
          type: "checkbox",
          valuePropName: "checked",
          onChange: (val) => {
            setReapCompany(val);
            form.setFieldsValue({
              batch_id: null,
            });
          },
        },
        {
          name: 'batch_id',
          rules: [!reapCompany ? {} :{ required: true, message: 'Cohort is required' }],
          label: 'Cohort *',
          type: 'select',
          mapData: BATCHES?.map((item) => ({
            id: item.id,
            label: `${item?.batch_name}`,
          })),
          allowClear: true,
          style: { display: !reapCompany ? 'none' : 'block' },
        },

        // {
        //   name: 'age',
        //   label: 'age',
        //   rules: [
        //     { required: true, message: 'Please enter your Age' },
        //     {
        //       pattern: /^[0-9]{2}$/,
        //       message: 'Age must be 10 digits',
        //     },
        //   ],
        // },
        // {
        //   name: 'city',
        //   label: 'City',
        //   rules: [
        //     { required: true, message: 'Please enter City' },
        //     {
        //       validator: (_, value) => {
        //         if (!value) return Promise.resolve(); // allow empty
        //         if (value.trim() === '') {
        //           return Promise.reject(new Error('City cannot be only spaces'));
        //         }
        //         return Promise.resolve();
        //       },
        //     },
        //   ],
        // },
        // {
        //   name: 'state',
        //   label: 'State',
        //   rules: [
        //     { required: true, message: 'Please enter State' },
        //     {
        //       validator: (_, value) => {
        //         if (!value) return Promise.resolve(); // allow empty
        //         if (value.trim() === '') {
        //           return Promise.reject(new Error('State cannot be only spaces'));
        //         }
        //         return Promise.resolve();
        //       },
        //     },
        //   ],
        // },
        // {
        //   name: 'country',
        //   label: 'Country',
        //   rules: [
        //     { required: true, message: 'Please enter Country' },
        //     {
        //       validator: (_, value) => {
        //         if (!value) return Promise.resolve(); // allow empty
        //         if (value.trim() === '') {
        //           return Promise.reject(new Error('Country cannot be only spaces'));
        //         }
        //         return Promise.resolve();
        //       },
        //     },
        //   ],
        // },
        // {
        //   name: 'designation',
        //   label: 'designation',
        //   rules: [
        //     { required: true, message: 'Please enter designation' },
        //     {
        //       validator: (_, value) => {
        //         if (!value) return Promise.resolve(); // allow empty
        //         if (value.trim() === '') {
        //           return Promise.reject(new Error('designation cannot be only spaces'));
        //         }
        //         return Promise.resolve();
        //       },
        //     },
        //   ],
        // },
        // {
        //   name: 'years_of_experience',
        //   label: 'Experience',
        //   rules: [
        //     { required: true, message: 'Please enter Experience' },
        //     {
        //       pattern: /^[0-9]{2}$/,
        //       message: 'Experience must be 10 digits',
        //     },
        //   ],
        // },
        // {
        //   name: 'about',
        //   label: 'about',
        //   rules: [
        //     { required: true, message: 'Please enter about' },
        //     {
        //       pattern: /^[0-9]{2}$/,
        //       message: 'about must be 10 digits',
        //     },
        //   ],
        // },
      ],
    },
    {
      title: 'Tags',
      inputs: [
        {
          name: 'startup_tags',
          label: 'Search Tags',
          type: 'select',
          rules: [
            {
              validator: (_, value) => {
            
                const hasOnlyWhitespace = value.some(
                  (tag) => typeof tag === 'string' && tag.trim() === ''
                );
                if (hasOnlyWhitespace) {
                  return Promise.reject(
                    new Error('Tags cannot be empty or just spaces')
                  );
                }
        
                return Promise.resolve();
              },
            },
        
          ],
          mapData: [], // Tags are entered manually
          selectMode: 'tags', // You'll handle this in your CustomSelect
        }
      ],
    },
    {
      title: "",
      inputs: [
        {
          name: "founders_data",
          type: "list",
          label: "Founders",
        },
      ],
    },
    {
      title: "",
      inputs: [
        {
          name: "social_media_links",
          type: "list", // custom type to identify Form.List
          rules: [],
        },
      ],
    },
  ];

  useEffect(() => {
    if (detail?.id) {
      form.setFieldsValue({
        industry_id: detail.industry_id?.[0] || null,
        batch_id: !detail.is_reap_company ? null : detail.batch_id?.[0] || null,
        company_name: detail.company_name,
        company_logo: detail.company_logo,

        email: detail.email,
        description: detail.description,
        funding_info: detail.funding_info,
        website_url: detail.website_url,
        founded_year: detail.founded_year?.toString(),

        city: detail.city,
        state: detail.state,
        country: detail.country,
        investment_stage: detail.investment_stage,
        introduction_video: detail.introduction_video,
        is_reap_company: detail.is_reap_company,
        social_media_links: detail.social_media_links,
        founders_data: detail.founders_data,
        company_size: detail.company_size,
        startup_tags: detail.startup_tags,

      });
      setReapCompany(detail.is_reap_company);
      setLogoUrl(detail.company_logo);
      // setvideoUrl(detail.introduction_video);
      const country = countries.find((c) => c.name === detail.country);
      setSelectedCountry(detail.country ? country : "");
      const fetchedStates = country
        ? State.getStatesOfCountry(country.isoCode)
        : null;
      setStates(fetchedStates);
      const state = fetchedStates
        ? fetchedStates.find((c) => c.name === detail.state)
        : null;
      setSelectedState(detail.state ? state : "");
    }
  }, [detail?.id, id]);

  const handleSubmit = (values) => {
    setLoading(true);
    let payload = { ...values };
    payload.founded_year = Number(payload.founded_year);
    if (!payload.is_reap_company) {
      payload.is_reap_company = false;
      delete payload.batch_id
    }
    if (payload.founders_data?.length)
      payload.founders_data = (payload.founders_data || []).map((item) => {
        let _item = item;
        _item.years_of_experience = Number(_item.years_of_experience);
        if(!_item.email) {
          delete _item.email;
        }
        return _item;
      });
    if (id)
      axiosInstance
        .put(`start-up/update/${id}/`, payload)
        .then((res) => res.data.data)
        .then((payload) => {
          setLoading(false);
          successCallback();
        })
        .catch((err) => {
          const error = err.response;
          setLoading(false);
          if (
            Object.keys(error?.data?.errors).length &&
            typeof error?.data?.errors !== "string"
          ) {
            const fieldsWithErrors = Object.entries(error?.data?.errors).map(
              ([field, message]) => ({
                name: field,
                errors: [message],
              })
            );
            form.setFields(fieldsWithErrors);
          }
        });
    else
      axiosInstance
        .post("start-up/create/", payload)
        .then((res) => res.data.data)
        .then((payload) => {
          setLoading(false);
          successCallback();
        })
        .catch((err) => {
          const error = err.response;
          setLoading(false);
          if (
            Object.keys(error?.data?.errors).length &&
            typeof error?.data?.errors !== "string"
          ) {
            const fieldsWithErrors = Object.entries(error?.data?.errors).map(
              ([field, message]) => ({
                name: field,
                errors: [message],
              })
            );
            form.setFields(fieldsWithErrors);
          }
        });
  };

  const handleFailed = () => {
    if (!form.getFieldValue("company_logo")) {
      setLogoUrlErr("Logo is required");
    }
    // if (!form.getFieldValue("introduction_video")) {
    //   setvideoUrlErr("Video is required");
    // }
  };

  return {
    loading,
    inputs,
    handleSubmit,
    contextHolder,
    form,
    detailLoader: false,
    handleFailed,
  };
};
