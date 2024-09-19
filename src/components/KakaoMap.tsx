import React, { useEffect, useRef, useState } from "react";

const KakaoMap: React.FC = () => {
  const { kakao } = window as any;

  // const mapRef = useRef<HTMLDivElement>(null);
  // const [map, setMap] = useState<any>(null);
  // const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const newLocation = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         setLocation(newLocation);
  //         if (map) {
  //           const { kakao } = window as any;
  //           const moveLatLon = new kakao.maps.LatLng(newLocation.lat, newLocation.lng);
  //           map.setCenter(moveLatLon);

  //           // 기존 마커 제거
  //           map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

  //           // 새 마커 생성 및 표시
  //           const marker = new kakao.maps.Marker({
  //             position: moveLatLon,
  //             draggable: true,
  //           });
  //           marker.setMap(map);
  //         }
  //       },
  //       (error) => {
  //         console.error("위치 정보를 가져오는데 실패했습니다:", error);
  //       }
  //     );
  //   } else {
  //     console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
  //   }
  // };

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.5418383405057, 127.07066390961), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      };

    new kakao.maps.Map(mapContainer, mapOption);
  }, []);

  // useEffect(() => {
  //   if (mapRef.current && window.kakao?.maps && location) {
  //     const { kakao } = window as any;
  //     const options = {
  //       center: new kakao.maps.LatLng(location.lat, location.lng),
  //       level: 3,
  //       draggable: true,
  //     };

  //     const newMap = new kakao.maps.Map(mapRef.current, options);
  //     setMap(newMap);

  //     const marker = new kakao.maps.Marker({
  //       position: new kakao.maps.LatLng(location.lat, location.lng),
  //     });
  //     marker.setMap(newMap);
  //   }
  // }, [location]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
