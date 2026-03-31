import { MutationFunction } from "@tanstack/react-query";
import { endPoints } from "../endPoints/endPoints";
import AxiosInstance from "../axios/axios";
import { RegisterPayload, RegisterResponse} from "../../typScript/interface/auth.interface";

export const RegistrationFunction: MutationFunction<RegisterResponse, RegisterPayload> = async (payload: RegisterPayload) => {
    const res = await AxiosInstance.post<RegisterResponse>(endPoints.auth.signUp, payload)
    return res.data

}  