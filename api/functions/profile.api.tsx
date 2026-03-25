

import { AxiosInstance } from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export async function getProfile() {
  const res = await AxiosInstance.get(endPoints.user.profile);
  return res.data;
}

export default getProfile;