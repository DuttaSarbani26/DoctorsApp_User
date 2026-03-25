import AxiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export const ResetLinkFunction = async ({ email }: { email: string }) => {
  const response = await AxiosInstance.post(
    endPoints.auth.resetLink,
    { email }
  );

  return response.data;
};