import { MutationFunction } from "@tanstack/react-query"
import AxiosInstance from "../axios/axios"
import { endPoints } from "../endPoints/endPoints"
import { LoginResponse, LoginPayload } from "../../typScript/interface/auth.interface"


export const LoginFunction: MutationFunction<LoginResponse, LoginPayload> = async (payload: LoginPayload) => {
    const res = await AxiosInstance.post<LoginResponse>(endPoints.auth.signIn, payload)
    return res.data;

}  