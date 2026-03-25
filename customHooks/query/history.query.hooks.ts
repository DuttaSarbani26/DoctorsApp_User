"use client";

import { useQuery } from "@tanstack/react-query";
import getHistory from "@/api/functions/patientHistory.api";


export function useUserHistory(doctorId?: string) {
	return useQuery({
		queryKey: ["user", "history", doctorId || "all"],
		queryFn: async () => {
			// Get userId from localStorage
			let userId: string | undefined;
			if (typeof window !== "undefined") {
				const userData = localStorage.getItem("user");
				if (userData) {
					try {
						const user = JSON.parse(userData);
						userId = user?.id || user?._id;
					} catch (e) {
						console.error("Failed to parse user data");
					}
				}
			}

			const res = await getHistory({ userId, doctorId });
			return res;
		},
	});
}

export default useUserHistory;