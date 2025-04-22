
import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, CheckSquare, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import BottomNavigation from "../components/BottomNavigation";

interface CoverLetterSection {
  question: string;
  answer: string;
}

interface CoverLetter {
  company: string;
  position: string;
  sections: CoverLetterSection[];
  keywords: string[];
  date: string;
}

const CoverLetterPreview = () => {
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = useState<CoverLetter | null>(null);
  const [copied, setCopied] = useState<boolean[]>([]);

  useEffect(() => {
    // Get the generated cover letter from localStorage
    const storedCoverLetter = localStorage.getItem("generatedCoverLetter");
    
    if (!storedCoverLetter) {
      toast.error("생성된 자기소개서가 없습니다.");
      navigate("/cover-letter");
      return;
    }

    try {
      const parsedCoverLetter = JSON.parse(storedCoverLetter);
      setCoverLetter(parsedCoverLetter);
      setCopied(new Array(parsedCoverLetter.sections.length).fill(false));
    } catch (error) {
      console.error("Error parsing cover letter data:", error);
      toast.error("자기소개서 데이터를 불러오는데 실패했습니다.");
      navigate("/cover-letter");
    }
  }, [navigate]);

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        const newCopied = [...copied];
        newCopied[index] = true;
        setCopied(newCopied);
        
        toast.success("클립보드에 복사되었습니다!");
        
        // Reset the copied status after 3 seconds
        setTimeout(() => {
          setCopied((prev) => {
            const newCopied = [...prev];
            newCopied[index] = false;
            return newCopied;
          });
        }, 3000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("복사에 실패했습니다.");
      }
    );
  };

  const handleSaveCoverLetter = () => {
    if (!coverLetter) return;
    
    // Save the cover letter to the database or service
    // For now, just simulate saving
    toast.success("자기소개서가 저장되었습니다!");
    navigate("/cover-letter");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  if (!coverLetter) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-none w-[412px] h-[917px] flex flex-col bg-white mx-auto">
      <header className="w-full bg-white px-4 pt-4">
        <Link to="/cover-letter/ai-create" className="mb-4 block">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex flex-col items-start max-w-[351px] mx-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e?placeholderIfAbsent=true"
            alt="NAVI logo"
            className="w-[61px] h-[50px]"
          />
          <div className="text-2xl font-normal mt-[53px] mb-6">
            <div>생성된 자기소개서</div>
            <div className="text-sm text-gray-500 mt-2">
              {coverLetter.company} - {coverLetter.position}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {formatDate(coverLetter.date)} 생성
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="mb-4">
          <div className="text-sm font-semibold mb-2">강조된 키워드:</div>
          <div className="flex flex-wrap gap-2">
            {coverLetter.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            {coverLetter.sections.map((_, idx) => (
              <TabsTrigger key={idx} value={idx.toString()}>
                질문 {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {coverLetter.sections.map((section, idx) => (
            <TabsContent key={idx} value={idx.toString()}>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{section.question}</h3>
                  <div className="bg-gray-50 p-3 rounded-md text-sm mt-2 whitespace-pre-line">
                    {section.answer}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleCopyToClipboard(section.answer, idx)}
                    >
                      {copied[idx] ? (
                        <>
                          <CheckSquare size={16} className="mr-1 text-green-500" />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-1" />
                          복사하기
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 flex">
          <Button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handleSaveCoverLetter}
          >
            자기소개서 저장하기
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CoverLetterPreview;
