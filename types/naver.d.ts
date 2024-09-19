declare namespace naver {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Map {
      constructor(mapDiv: string | HTMLElement, mapOptions?: MapOptions);
      setCenter(latlng: LatLng): void;
      setZoom(level: number, animate?: boolean): void;
    }
    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
    }
    class OverlayView {
      setMap(map: Map | null): void;
      getPanes(): Panes;
      getProjection(): MapSystemProjection;
    }
    interface MapOptions {
      center: LatLng;
      zoom?: number;
      mapTypeId?: string;
    }
    interface MarkerOptions {
      position: LatLng;
      map?: Map;
    }
    interface Panes {
      overlayLayer: HTMLElement;
    }
    interface MapSystemProjection {
      fromCoordToOffset(coord: LatLng): Point;
    }
    interface Point {
      x: number;
      y: number;
    }
  }
}
