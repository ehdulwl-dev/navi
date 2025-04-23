
import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { isJobFavorite } from '@/services/jobService';

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location?: string;
  deadline?: string;
  category?: string;
  description?: string;
  employmentType?: string;
  isFavorite?: boolean;
  highlight?: string; // Highlight property
  detailUrl?: string; // Added detailUrl property for Seoul API
  companyLogo?: string; // Added companyLogo property
}

interface JobListProps {
  jobs: Job[];
  onToggleFavorite: (jobId: string | number) => void;
  fromFavorites?: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, onToggleFavorite, fromFavorites = false }) => {
  // 내부적으로 관심 공고 상태 추적
  const [favoriteState, setFavoriteState] = useState<Record<string | number, boolean>>({});

  React.useEffect(() => {
    // 초기 관심 공고 상태 설정
    const initialState: Record<string | number, boolean> = {};
    jobs.forEach(job => {
      initialState[job.id] = isJobFavorite(job.id);
    });
    setFavoriteState(initialState);
  }, [jobs]);

  const handleFavoriteToggle = (jobId: string | number) => {
    onToggleFavorite(jobId);
    
    // 관심 공고 상태를 토글하고 UI 업데이트
    const newIsFavorite = !favoriteState[jobId];
    setFavoriteState(prev => ({
      ...prev,
      [jobId]: newIsFavorite
    }));
    
    toast(newIsFavorite ? '관심 공고에 추가되었습니다' : '관심 공고에서 제거되었습니다');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>구직 공고 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">관심</TableHead>
                <TableHead>공고명</TableHead>
                <TableHead>기관명</TableHead>
                <TableHead>지역</TableHead>
                <TableHead>마감일</TableHead>
                {fromFavorites && <TableHead>매칭</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                // 현재 상태에서 관심 여부 확인 (UI 반응성 향상)
                const isFav = favoriteState[job.id] !== undefined ? 
                  favoriteState[job.id] : 
                  isJobFavorite(job.id);
                  
                return (
                  <TableRow key={job.id}>
                    <TableCell>
                      <button 
                        onClick={() => handleFavoriteToggle(job.id)}
                        className="hover:text-yellow-500 focus:outline-none"
                      >
                        {isFav ? (
                          <Star className="text-yellow-500" size={20} />
                        ) : (
                          <StarOff size={20} />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link 
                        to={`/job/${job.id}`} 
                        state={{ fromFavorites: fromFavorites }}
                        className="hover:text-app-blue hover:underline"
                      >
                        {job.title}
                      </Link>
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location || '-'}</TableCell>
                    <TableCell>{job.deadline || '상시채용'}</TableCell>
                    {fromFavorites && (
                      <TableCell>
                        {job.highlight && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            {job.highlight}
                          </span>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobList;
