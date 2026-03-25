import { useMutation } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { RegistrationFunction } from "@/api/functions/register.api";
import { toast } from "sonner";
import { VerifyOtpFunction } from "@/api/functions/otp.api";
import { LoginFunction } from "@/api/functions/login.api";
import useUserStore from "@/zusStand/store";
import { ResetLinkFunction } from "@/api/functions/resetLink.api";
import { ResetPasswordFunction } from "@/api/functions/resetPassword.api";



//custom quary

export const useSignUpMutation = () => {
    const cookies = new Cookies()
    const { queryClient } = useGlobalHooks()
    return useMutation({
        mutationFn: RegistrationFunction,
        onSuccess: (response) => {
            const { token, status, message } = response || {}
            if (status === true) {
                toast.success(message)
            }
            else {
                toast.error(message)
            }
            queryClient.invalidateQueries({ queryKey: ["REGISTER"] })
        },
        onError: (error) => {
            console.log("error")
        }
    })
}


export const useVerifyOtpMutation = () => {
  const { queryClient } = useGlobalHooks();

  return useMutation({
    mutationFn: VerifyOtpFunction,

    onSuccess: (response) => {
      const { status, message } = response || {};

      if (status === true) {
        toast.success(message);
      } else {
        toast.error(message);
      }

      queryClient.invalidateQueries({ queryKey: ["VERIFY_OTP"] });
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });
};


export const useLoginMutation = () => {
  const { queryClient } = useGlobalHooks();
  const { setTokenAndUser } = useUserStore();

  return useMutation({
    mutationFn: LoginFunction,

    onSuccess: (response) => {
      const { status, message, token, refreshToken, data } = response || {};

      if (status) {
        toast.success(message);

        // ✅ store tokens using Zustand (handles cookies)
        setTokenAndUser(token, refreshToken);

        // ✅ store user data in localStorage
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("isLoggedIn", "true");
        }

      } else {
        toast.error(message);
      }

      queryClient.invalidateQueries({ queryKey: ["LOGIN"] });
    },

    onError: () => {
      toast.error("Login failed");
    },
  });
};







export const useResetLinkMutation = () => {
  return useMutation({
    mutationFn: ResetLinkFunction,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Reset link sent to your email"
      );
    },

    onError: (error: any) => {
      console.log("Reset link error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to send reset link"
      );
    },
  });
};




export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ResetPasswordFunction,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Password reset successful "
      );
    },

    onError: (error: any) => {
      console.log("Reset password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password"
      );
    },
  });
};



