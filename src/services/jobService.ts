import axios from 'axios';
import { Job } from '@/types/job';
import { EducationProgram } from '@/types/job';
import { fetchJobsFromDB } from './supabaseClient';

// Add the missing constant
const EDUCATION_API = 'https://api.example.com/educations'; // Placeholder URL

// Convert DB job entry to our Job format
const convertDBJobToJobFormat = (dbJob: any): Job => {
const locationMatch = dbJob.work_location?.match(/서울특별시\s*([^\s]+구)/);
const location = locationMatch ? locationMatch[0] : (dbJob.company_address || '서울');
const deadline = !dbJob.closing_date ? '상시채용' : dbJob.closing_date;
let highlight = '';
if (deadline !== '상시채용') {
  try {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLeft <= 3 && daysLeft > 0) {
  highlight = `D-${daysLeft}`;
  }
  } catch (e) { }
}
return {
  id: dbJob.id || dbJob.regist_no || dbJob.JO_REGIST_NO || '', // Add fallback for Seoul API
  title: dbJob.job_title || dbJob.JO_SJ || '',
  company: dbJob.company_name || dbJob.CMPNY_NM || '',
  location: location,
  deadline: deadline,
  employmentType: dbJob.employment_type_name || dbJob.EMPLYM_STLE || '정규직',
  category: dbJob.job_type_name || dbJob.EMPLYM_STLE || '일반',
  isFavorite: false,
  description: dbJob.job_description || '',
  highlight: highlight,
  };
};

// Supabase 우선 전체 구직 공고 불러오기 (fetchJobs)
export const fetchJobs = async (): Promise<Job[]> => {
try {

  const dbJobs = await fetchJobsFromDB();
    
    // Add sample visiting nurse job posting
    const sampleJob: Job = {
      id: 'VN001',
      title: '방문간호사 모집 (파트타임)',
      company: '주식회사 웰케어스테이션',
      location: '서울 강남구',
      category: '파트타임',
      employmentType: '시간제',
      deadline: '2025-05-22',
      description: `[주요업무]
- 재가환자 방문간호 서비스 제공
- 환자 건강상태 체크 및 기록
- 투약 관리 및 처치

[자격요건]
- 간호사 면허 소지자 (필수)
- 방문간호 경력 1년 이상
- 운전 가능자 우대

[근무조건]
- 근무시간: 주 3일 (월,수,금) / 9:00-15:00
- 급여: 시급 25,000원
- 교통비 별도 지급
- 4대보험 가입`,
      isFavorite: false,
      highlight: 'D-30'
    };

    if (!dbJobs) return [sampleJob];
    return [sampleJob, ...dbJobs];
    
  // const res = await axios.get<Job[]>(JOB_API);
  // return res.data.map(job => ({
  //   ...job,
  //   category: job.employment_type || '기타',
  //   location: job.location || job.work_address || '서울',
  //   deadline: job.receipt_close || '상시채용',
  //   employmentType: job.employment_type || '정규직',
  //   isFavorite: false,
  //   description: job.description || '',
  //   company: job.company || '',
  //   title: job.title || '',
  //   id: job.id || 0,
  // }));
} catch (error) {
  console.error('Supabase/백엔드 구직 공고 로드 실패:', error);
  return [];
}
};

// Get jobs by type (part-time, nearby, etc.)
export const getJobsByType = async (type: string): Promise<Job[]> => {
const allJobs = await fetchJobs();

switch (type) {
case 'part-time':
      return allJobs.filter(job => job.employmentType?.includes('시간제'));
case 'nearby':
return allJobs.filter(job => job.location?.includes('서울'));
default:
return allJobs;
}
};

// Get education data from backend API
export const getEducationData = async (): Promise<EducationProgram[]> => {
  try {
    const res = await axios.get<EducationProgram[]>(EDUCATION_API);
    return res.data;
  } catch (error) {
    console.error('Error fetching education data:', error);
    return [];
  }
};

// Get recommendations for a user
export const getRecommendedJobs = async (userId: number): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  return allJobs.slice(0, 3);
};

// Get a job by ID
export const getJobById = async (id: string | number): Promise<Job | null> => {
  const allJobs = await fetchJobs();
  const job = allJobs.find(job => job.id.toString() === id.toString());
  return job || null;
};

// Toggle favorite status for a job (client-side only for now)
export const toggleFavoriteJob = async (jobId: string | number): Promise<boolean> => {
  const jobIdStr = jobId.toString();
  const current = getFavoriteJobIds();
  let newFavoriteJobs: string[];
  
  if (current.includes(jobIdStr)) {
    newFavoriteJobs = current.filter(id => id !== jobIdStr);
  } else {
    newFavoriteJobs = [jobIdStr, ...current];
  }
  
  setFavoriteJobIds(newFavoriteJobs);
  return !current.includes(jobIdStr);
};

// Get favorite job IDs from localStorage
export const getFavoriteJobIds = (): string[] => {
  const stored = localStorage.getItem('favoriteJobIds');
  return stored ? JSON.parse(stored) : [];
};

// Check if a job is favorite
export const isJobFavorite = (jobId: string | number): boolean => {
  const favoriteJobs = getFavoriteJobIds();
  return favoriteJobs.includes(jobId.toString());
};

// Get only favorite jobs (client-side filtering)
export const getFavoriteJobs = async (): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  const favIds = getFavoriteJobIds();
  return allJobs.filter(job => favIds.includes(job.id.toString()));
};

// Fetch jobs by category
export const fetchJobsByCategory = async (category: string): Promise<Job[]> => {
  try {
    const allJobs = await fetchJobs();
    if (category === 'all') {
     return allJobs;
    }
    return allJobs.filter(job => job.category === category || job.employmentType === category);
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
  return [];
}
};

const setFavoriteJobIds = (ids: string[]) => {
  localStorage.setItem('favoriteJobIds', JSON.stringify(ids));
};
