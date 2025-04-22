import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EducationFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handlePrevious,
  handleNext,
}) => {
  const [hasCollegeInfo, setHasCollegeInfo] = useState(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

  useEffect(() => {
    if (formData.highestEducation === "전문대학") {
      setHasCollegeInfo(true);
    } else if (
      formData.highestEducation === "대학교" ||
      formData.highestEducation === "대학원"
    ) {
      setHasCollegeInfo(false); // 기본값은 없음
    }
  }, [formData.highestEducation]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="highestEducation"
              className="block text-sm font-bold text-black"
            >
              최종 학력
            </Label>
            <Select
              name="highestEducation"
              value={formData.highestEducation}
              onValueChange={(value) =>
                handleSelectChange("highestEducation", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="최종 학력을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="해당없음">해당없음</SelectItem>
                <SelectItem value="고등학교">고등학교</SelectItem>
                <SelectItem value="전문대학">전문대학</SelectItem>
                <SelectItem value="대학교">대학교</SelectItem>
                <SelectItem value="대학원">대학원</SelectItem>
                <SelectItem value="검정고시">검정고시</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.highestEducation !== "해당없음" && (
            <div className="border-t pt-4">
              <h3 className="block text-sm font-bold text-black">
                고등학교 정보
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highSchool">고등학교명</Label>
                  <Input
                    id="highSchool"
                    name="highSchool"
                    placeholder="고등학교명"
                    value={formData.highSchool}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highSchoolMajor">전공계열</Label>
                  <Input
                    id="highSchoolMajor"
                    name="highSchoolMajor"
                    placeholder="전공계열"
                    value={formData.highSchoolMajor}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highSchoolGradYear">졸업년도</Label>
                  <Input
                    id="highSchoolGradYear"
                    name="highSchoolGradYear"
                    placeholder="졸업년도"
                    value={formData.highSchoolGradYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {(formData.highestEducation === "전문대학" ||
            formData.highestEducation === "대학교" ||
            formData.highestEducation === "대학원") && (
            <div className="border-t pt-4">
              <h3 className="block text-sm font-bold text-black mb-2">
                전문대학교 정보
              </h3>
              {formData.highestEducation !== "전문대학" && (
                <div className="mb-4">
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    전문대학 학력 정보가 있나요?
                  </Label>
                  <Select
                    value={hasCollegeInfo ? "yes" : "no"}
                    onValueChange={(value) =>
                      setHasCollegeInfo(value === "yes")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">있음</SelectItem>
                      <SelectItem value="no">해당 없음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {hasCollegeInfo && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">전문대학명</Label>
                    <Input
                      id="college"
                      name="college"
                      placeholder="전문대학명"
                      value={formData.college}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collegeMajor">전공</Label>
                    <Input
                      id="collegeMajor"
                      name="collegeMajor"
                      placeholder="전공"
                      value={formData.collegeMajor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collegeAdmYear">입학년도</Label>
                    <Select
                      value={formData.collegeAdmYear}
                      onValueChange={(value) => handleSelectChange("collegeAdmYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="입학년도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}년
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collegeGradYear">졸업년도</Label>
                    <Select
                      value={formData.collegeGradYear}
                      onValueChange={(value) => handleSelectChange("collegeGradYear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="졸업년도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}년
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          {(formData.highestEducation === "대학교" ||
            formData.highestEducation === "대학원") && (
            <div className="border-t pt-4">
              <h3 className="block text-sm font-bold text-black">
                대학교 정보
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">대학교명</Label>
                  <Input
                    id="university"
                    name="university"
                    placeholder="대학교명"
                    value={formData.university}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universityMajor">전공</Label>
                  <Input
                    id="universityMajor"
                    name="universityMajor"
                    placeholder="전공"
                    value={formData.universityMajor}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universityAdmYear">입학년도</Label>
                  <Select
                    value={formData.universityAdmYear}
                    onValueChange={(value) => handleSelectChange("universityAdmYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="입학년도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universityGradYear">졸업년도</Label>
                  <Select
                    value={formData.universityGradYear}
                    onValueChange={(value) => handleSelectChange("universityGradYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="졸업년도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {formData.highestEducation === "대학원" && (
            <div className="border-t pt-4">
              <h3 className="block text-sm font-bold text-black">
                대학원 정보
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gradSchool">대학원명</Label>
                  <Input
                    id="gradSchool"
                    name="gradSchool"
                    placeholder="대학원명"
                    value={formData.gradSchool}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradSchoolMajor">전공</Label>
                  <Input
                    id="gradSchoolMajor"
                    name="gradSchoolMajor"
                    placeholder="전공"
                    value={formData.gradSchoolMajor}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradSchoolAdmYear">입학년도</Label>
                  <Select
                    value={formData.gradSchoolAdmYear}
                    onValueChange={(value) => handleSelectChange("gradSchoolAdmYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="입학년도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradSchoolGradYear">졸업년도</Label>
                  <Select
                    value={formData.gradSchoolGradYear}
                    onValueChange={(value) => handleSelectChange("gradSchoolGradYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="졸업년도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between space-x-4 mt-6">
            <Button onClick={handlePrevious} variant="outline">
              이전
            </Button>
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              다음
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
