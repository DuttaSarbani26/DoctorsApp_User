declare module "leaflet" {
  export type LatLngExpression = [number, number];
  export type PointExpression = [number, number];

  export interface IconOptions {
    iconUrl?: string;
    iconRetinaUrl?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    tooltipAnchor?: [number, number];
    shadowUrl?: string;
    shadowSize?: [number, number];
    shadowAnchor?: [number, number];
  }

  export class Icon {
    constructor(options?: IconOptions);
  }

  export function icon(options: IconOptions): Icon;

  export class LatLng {
    constructor(lat: number, lng: number);
  }

  export type MapOptions = any;
  export type LayerOptions = any;

  export class Map {}
  export class Marker {}

  const Leaflet: {
    Icon: typeof Icon;
    icon: typeof icon;
    LatLng: typeof LatLng;
  };

  export default Leaflet;
}

declare module "react-leaflet" {
  import type { ComponentType, CSSProperties, PropsWithChildren } from "react";
  import type { Icon, LatLngExpression } from "leaflet";

  export interface MapContainerProps {
    center: LatLngExpression;
    zoom: number;
    style?: CSSProperties;
    [key: string]: any;
  }

  export interface TileLayerProps {
    url: string;
    [key: string]: any;
  }

  export interface MarkerProps {
    position: LatLngExpression;
    icon?: Icon;
    [key: string]: any;
  }

  export const MapContainer: ComponentType<MapContainerProps>;
  export const TileLayer: ComponentType<TileLayerProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const Popup: ComponentType<PropsWithChildren<any>>;
  export function useMap(): any;
}
