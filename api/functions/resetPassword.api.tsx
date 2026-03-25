import AxiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export const ResetPasswordFunction = async ({
  id,
  token,
  password,
  confirm_password,
}: {
  id: string;
  token: string;
  password: string;
  confirm_password: string;
}) => {
  const response = await AxiosInstance.post(
    `${endPoints.auth.resetPassword}/${id}/${token}`,
    {
      password,
      confirm_password, 
    }
  );

  return response.data;
};