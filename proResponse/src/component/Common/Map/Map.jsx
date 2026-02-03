import { useEffect, useState } from "react";
import maker from "../../../assets/images/common/maker.png";
import { axiosPublic } from "../../../api/reqApi.js";

const Map = ({ onExpertClick }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [experts, setExperts] = useState([]);
  const [radius, setRadius] = useState(3);
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);

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

  // 2. 주변 전문가 조회
  useEffect(() => {
    if (!location) return;

    const fetchExperts = async () => {
      try {
        const url = `/api/experts/map?latitude=${location.latitude}&longitude=${location.longitude}&radius=${radius}`;
        // console.log("API 호출:", url);
        const response = await axiosPublic.getList(url);
        // console.log("주변 전문가:", response.data);
        setExperts(response.data || []);
      } catch (error) {
        console.error("전문가 조회 실패:", error);
        setExperts([]);
      }
    };

    fetchExperts();
  }, [location, radius]);

  // 3. 지도 초기화 + 내 위치 마커
  useEffect(() => {
    if (!location || !window.kakao) return;

    const container = document.getElementById("map");

    // console.log(location.latitude);
    // console.log(location.longitude);

    const center = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    );

    const map = new window.kakao.maps.Map(container, {
      center,
      level: 5, // 반경에 맞게 조금 더 넓게 보이도록
    });

    setMapInstance(map);

    const imageSize = new window.kakao.maps.Size(40, 40);
    const imageOption = {
      offset: new window.kakao.maps.Point(20, 40),
    };

    const markerImage = new window.kakao.maps.MarkerImage(
      maker,
      imageSize,
      imageOption,
    );

    // 내 위치 마커 (커스텀 이미지)
    new window.kakao.maps.Marker({
      position: center,
      image: markerImage,
      map,
    });

  }, [location]);

  // 4. 전문가 마커 표시
  useEffect(() => {
    if (!mapInstance || !experts.length) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = [];

    experts.forEach((expert) => {
      if (!expert.latitude || !expert.longitude) return;

      const position = new window.kakao.maps.LatLng(
        expert.latitude,
        expert.longitude
      );

      const marker = new window.kakao.maps.Marker({
        position,
        map: mapInstance,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (onExpertClick) {
          onExpertClick(expert);
        }
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [mapInstance, experts, onExpertClick]);

  // 반경 변경 핸들러
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (mapInstance) {
      // 반경에 따른 줌 레벨 조정
      const zoomLevel = newRadius <= 1 ? 4 : newRadius <= 3 ? 5 : newRadius <= 5 ? 6 : 7;
      mapInstance.setLevel(zoomLevel);
    }
  };

  if (loading) return <h3>위치 정보 불러오는 중...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div>
      {/* 반경 선택 UI */}
      <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 'bold' }}>검색 반경:</span>
        {[1, 3, 5, 10].map((r) => (
          <button
            key={r}
            onClick={() => handleRadiusChange(r)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              border: radius === r ? '2px solid #0066ff' : '1px solid #ddd',
              background: radius === r ? '#0066ff' : '#fff',
              color: radius === r ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {r}km
          </button>
        ))}
      </div>

      {/* 지도 */}
      <div id="map" style={{ width: "100%", height: "calc(100vh - 280px)", minHeight: "500px", borderRadius: 12 }} />

      {/* 전문가 수 표시 */}
      <div style={{ marginTop: 12, fontSize: 14, color: '#666' }}>
        주변 {radius}km 내 <strong style={{ color: '#0066ff' }}>{experts.length}</strong>명의 전문가가 있습니다.
      </div>
    </div>
  );
};

export default Map;
