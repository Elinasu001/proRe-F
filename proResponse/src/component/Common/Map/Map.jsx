import { useEffect, useState } from "react";
import maker from "../../../assets/images/common/maker.png";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  // 1. 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });



        setLoading(false);
      },
      () => {
        setError("위치 정보를 가져올 수 없습니다.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  }, []);

  // 2. 지도 + 내 위치 마커
  useEffect(() => {
    if (!location || !window.kakao) return;

    const container = document.getElementById("map");

    console.log(location.latitude);
    console.log(location.longitude);

    const center = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    );

    const map = new window.kakao.maps.Map(container, {
      center,
      level: 3,
    });

    const imageSize = new window.kakao.maps.Size(40, 40); // 이미지 크기
    const imageOption = {
      offset: new window.kakao.maps.Point(20, 40), // 마커 기준점
    };

    const markerImage = new window.kakao.maps.MarkerImage(
      maker,
      imageSize,
      imageOption,
    );

    // 내 위치 마커
    const marker = new window.kakao.maps.Marker({
      position: center,
      image: markerImage,
      map,
    });

  }, [location]);

  if (loading) return <h3> 위치 정보 불러오는 중...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }} />
      <div></div>
    </>
  );
};

export default Map;
