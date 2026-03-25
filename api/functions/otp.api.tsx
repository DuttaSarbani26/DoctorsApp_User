import { MutationFunction } from "@tanstack/react-query"
import AxiosInstance from "../axios/axios"
import { endPoints } from "../endPoints/endPoints"
import { VerifyOtpPayload, VerifyOtpResponse } from "../../typScript/interface/auth.interface"

export const VerifyOtpFunction: MutationFunction<VerifyOtpResponse, VerifyOtpPayload> = async (payload: VerifyOtpPayload) => {
    const res = await AxiosInstance.post<VerifyOtpResponse>(endPoints.auth.verifyOtp, payload)
    return res.data;

}  