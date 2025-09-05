/** @format */

// app/signup/page.jsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@/utils/UserContext";
import { useSignupForm } from "@/hooks/useSignupForm";
import { useOtpTimer } from "@/hooks/useOtpTimer";
import AuthForm from "@/components/auth/AuthForm";
import OtpForm from "@/components/auth/OtpForm";
import { signup, cancelSignupRequest } from "@/config/slices/authSlice";
import styled from "styled-components";

export default function Page() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect_url"); // get intended path
  const isOtp = searchParams.get("isOtp"); // get intended path
  const selectedMode = searchParams.get("mode"); // get intended path
  const { user, setUser } = useUser();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const [mode, setMode] = useState(selectedMode || "signup");
  const [step, setStep] = useState(isOtp ? "otp" : "form");
  const [isResendClicked, setIsResendClicked] = useState(false);
  const {
    formData,
    setFormData,
    otp,
    setOtp,
    errors,
    handleChange,
    handleSubmit,
    handleVerifyOtp,
    setErrors,
    applyFilter,
  } = useSignupForm({ mode, setStep, setUser, redirectPath });

  useEffect(() => {
    if (isOtp && window?.sessionStorage?.getItem("reap_mobile_number")) {
      setStep("otp");
      setFormData((prev) => ({
        ...prev,
        mobile_number: window?.sessionStorage?.getItem("reap_mobile_number"),
      }));
    } else {
      setStep("form");
      if(!window?.sessionStorage?.getItem("reap_mobile_number")) {
        setFormData((prev) =>
          selectedMode === "signin"
            ? { mobile_number: prev?.mobile_number || "" }
            : {
                first_name: prev?.first_name || "",
                last_name: prev?.last_name || "",
                mobile_number: prev?.first_name ? prev?.mobile_number || "" : "",
              }
        );
      }
    }
  }, [isOtp, selectedMode]);
  useEffect(() => {
    if (selectedMode && !isOtp) {
      setMode(selectedMode);
      cancelSignupRequest();
      setFormData((prev) =>
        selectedMode === "signin"
          ? { mobile_number: prev?.mobile_number || "" }
          : {
              first_name: prev?.first_name || "",
              last_name: prev?.last_name || "",
              mobile_number: prev?.first_name ? prev?.mobile_number || "" : "",
            }
      );
      setOtp("");
      setErrors({});
      setStep("form");
    }
  }, [selectedMode, isOtp]);
  const { timer, canResend, resetTimer, setCanResend } = useOtpTimer(
    step === "otp"
  );

  useEffect(() => {
    if (user?.user_id) {
      window?.sessionStorage.removeItem("reap_mobile_number");
      router.push("/");
    }
  }, []);
  const decodedPath = decodeURIComponent(redirectPath || "/");

  useEffect(() => {
    router.prefetch(decodedPath);
  }, [decodedPath]);

  const switchMode = () => {
    cancelSignupRequest();
    setFormData(
      mode === "signup"
        ? { mobile_number: "" }
        : { first_name: "", last_name: "", mobile_number: "" }
    );
    setMode(mode === "signup" ? "signin" : "signup");
    applyFilter("mode", mode === "signup" ? "signin" : "signup");
    setOtp("");
    setErrors({});
    setStep("form");
  };

  return (
    <PageWrapper>
      <FlexCenter>
        {step === "form" ? (
          <AuthForm
            mode={mode}
            formData={formData}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            onSwitchMode={switchMode}
          />
        ) : (
          <OtpForm
            otp={otp}
            onChange={setOtp}
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOtp().then((success) => {
                if (success) {
                  const decodedPath = decodeURIComponent(redirectPath || "/");
                  window?.sessionStorage.removeItem("reap_mobile_number");
                  window.location.href = decodedPath;
                }
              });
            }}
            errors={errors}
            timer={timer}
            canResend={canResend}
            isResendClicked={isResendClicked}
            loading={loading}
            onResend={async () => {
              if (!loading) {
                setIsResendClicked(true);
                await dispatch(signup({ data: formData, mode }));
                resetTimer();
                setIsResendClicked(false);
                setCanResend(false);
              }
            }}
            mobile={formData.mobile_number}
            onEdit={() => {
              cancelSignupRequest();
              setStep("form");
              setOtp("");
              setErrors({});
              applyFilter("isOtp", "");
              window?.sessionStorage.removeItem("reap_mobile_number");
            }}
          />
        )}
      </FlexCenter>
    </PageWrapper>
  );
}
// Styling
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 88px);
  @media screen and (max-width: 550px) {
    height: calc(92vh - 88px);
  }
`;
