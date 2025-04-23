import React, { useEffect, useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobsByType } from "../services/jobService";
import JobCard from "../components/JobCard";
import BottomNavigation from "../components/BottomNavigation";
import { Job } from "../components/JobList";

const NearbyJobs = () => {
  const [locationText, setLocationText] =
    useState("위치 정보를 불러오는 중...");
  const [district, setDistrict] = useState(""); // 구 이름 저장용

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["jobs", "nearby"],
    queryFn: () => getJobsByType("nearby"),
  });

  useEffect(() => {
    const fetchAddress = async (lat: number, lng: number) => {
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
          {
            headers: {
              Authorization: `KakaoAK ${
                import.meta.env.VITE_KAKAO_REST_API_KEY
              }`,
            },
          }
        );
        const data = await res.json();

        if (data.documents && data.documents.length > 0) {
          const region = data.documents[0];
          const fullAddress = `${region.region_1depth_name} ${region.region_2depth_name}`;
          const districtName = region.region_2depth_name;
          setLocationText(fullAddress);
          setDistrict(districtName); // 예: "서초구"
        } else {
          console.warn("주소를 찾을 수 없습니다.", data);
          setLocationText("주소를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("주소 변환 실패:", err);
        setLocationText("주소 변환 실패");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error(error);
          setLocationText("위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      setLocationText("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
    }
  }, []);

  // 필터링된 공고
  const filteredJobs = jobs?.filter((job) =>
    district ? job.location.includes(district) : true
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">집에서 가까운 모집 공고</h1>
        </div>
      </header>

      {/* Location Section */}
      <div className="bg-white p-4 mb-4 flex items-center">
        <MapPin className="text-app-blue mr-2" size={20} />
        <span>현재 위치: {locationText}</span>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6">
        {isLoading ? (
          <p className="text-center py-4">로딩 중...</p>
        ) : filteredJobs && filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                category={job.category}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-4">해당 조건의 구직 공고가 없습니다.</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default NearbyJobs;
