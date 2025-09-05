// hooks/useSignupForm.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup, cancelSignupRequest } from "@/config/slices/authSlice";
import { useRouter } from "next/navigation";

export const useSignupForm = ({ mode, setStep, setUser, redirectPath }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
  });
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "mobile_number" || name === "otp"
        ? value.replace(/[^\d]/g, "")
        : value;

    if (name === "otp") setOtp(newValue);
    else setFormData((prev) => ({ ...prev, [name]: newValue }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Enter valid 10-digit number";
    }
    if (mode === "signup") {
      if (!formData.first_name.trim())
        newErrors.first_name = "First name is required";
      if (!formData.last_name.trim())
        newErrors.last_name = "Last name is required";
    }
    return newErrors;
  };

  const validateOtp = () => {
    const newErrors = {};
    if (!otp.trim()) newErrors.otp = "OTP is required";
    else if (otp.length !== 6) newErrors.otp = "OTP must be a 6-digit number";
    return newErrors;
  };
  const applyFilter = (key, value) => {
    const currentParams = new URLSearchParams(window.location.search);
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    const newQuery = currentParams.toString();
    router.push(`?${newQuery}`);
  };
  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return false;
    }

    const res = await dispatch(signup({ data: formData, mode }));
    if (res.payload?.code === 900) {
      setOtp("");
      setErrors({});
      setStep("otp");
      applyFilter('isOtp', true)
      sessionStorage.setItem("reap_mobile_number", formData?.mobile_number)
    } else if (res.payload?.code === 911) {
      setErrors({ mobile_number: res.payload.errors });
    }
    return true;
  };

  const handleVerifyOtp = async () => {
    const otpErrors = validateOtp();
    if (Object.keys(otpErrors).length) {
      setErrors(otpErrors);
      return false;
    }

    const res = await dispatch(
      signup({
        data: {
          mobile_number: formData.mobile_number,
          otp,
        },
        mode: "otp",
      })
    );
    if (res.payload?.data?.access_token) {
      setUser(res.payload?.data?.user);
      return true;
    } else {
      setErrors({ otp: "Invalid OTP" });
      return false;
    }
  };

  return {
    formData,
    setFormData,
    otp,
    setOtp,
    errors,
    handleChange,
    handleSubmit,
    handleVerifyOtp,
    setErrors,
    applyFilter
  };
};
