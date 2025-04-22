
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const ResumeTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const templates = [
    {
      id: 'template1',
      name: '기본 템플릿',
      description: '깔끔하고 전문적인 디자인',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e'
    },
    {
      id: 'template2',
      name: '현대적 템플릿',
      description: '모던하고 세련된 디자인',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e'
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    // Here you would typically save the template selection
    // For now, just navigate back to the resume list
    navigate('/resume');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="템플릿 선택" />
      <div className="max-w-[800px] mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">이력서 템플릿을 선택해주세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  선택하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
