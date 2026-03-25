"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { getQueryClient } from "./get-query-client"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
            </LocalizationProvider>
            <Toaster />
        </QueryClientProvider>
    )
}