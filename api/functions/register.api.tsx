import { MutationFunction } from "@tanstack/react-query";
import { endPoints } from "../endPoints/endPoints";
import AxiosInstance from "../axios/axios";
import { RegisterResponse, RegistrePayload } from "../../typScript/interface/auth.interface";

export const RegistrationFunction: MutationFunction<RegisterResponse, RegistrePayload> = async (payload: RegistrePayload) => {
    const res = await AxiosInstance.post<RegisterResponse>(endPoints.auth.signUp, payload)
    return res.data

}  