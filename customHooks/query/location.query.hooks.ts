import { AreaMapResponse, getNearbyDiagnostics } from "@/api/functions/areaMap.api";
import { useQuery } from "@tanstack/react-query";


export type AreaMapRequest = {
  lat: number;
  lng: number;
  distance?: number;
};

export const useNearbyDiagnosticsQuery = ({
  lat,
  lng,
  distance = 5000,
}: AreaMapRequest) => {
  return useQuery<AreaMapResponse>({
    queryKey: ["NEARBY_DIAGNOSTICS", lat, lng, distance],
    queryFn: () => getNearbyDiagnostics({ lat, lng, distance }),
    enabled: !!lat && !!lng,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};