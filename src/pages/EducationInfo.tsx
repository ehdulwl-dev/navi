import React from "react";
import { ArrowLeft, School } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEducationData } from "../services/jobService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import BottomNavigation from "../components/BottomNavigation";
import { EducationProgram } from "@/types/job";

const EducationInfo = () => {
  const { data: educationPrograms, isLoading } = useQuery<EducationProgram[]>({
    queryKey: ["education"],
    queryFn: () => getEducationData(),
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">취업 준비 교육 정보</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {isLoading ? (
          <p className="text-center py-4">로딩 중...</p>
        ) : educationPrograms && educationPrograms.length > 0 ? (
          <div className="space-y-4">
            {educationPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start mb-2">
                    <School className="text-app-blue mr-2 mt-1" size={20} />
                    <div>
                      <CardTitle className="text-lg font-bold leading-snug mb-1">
                        {program.edc_nm}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 leading-relaxed">
                        {program.provider}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm leading-relaxed">
                    <div className="mb-1">
                      <p className="font-medium text-bold text-gray-700">
                        상태
                      </p>
                      <p>{program.sttus_nm}</p>
                    </div>
                    <div className="mb-1">
                      <p className="font-medium text-bold text-gray-700">
                        시작일
                      </p>
                      <p>{program.edc_begin_de_dt}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium text-bold text-gray-700">
                        종료일
                      </p>
                      <p>{program.edc_end_de_dt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">교육 정보가 없습니다.</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default EducationInfo;
