
import axios from 'axios';

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  address: string;
  highestEducation: string;
  university?: string;
  universityMajor?: string;
  universityGradYear?: string;
  college?: string;
  collegeMajor?: string;
  collegeGradYear?: string;
  highSchool?: string;
  highSchoolGradYear?: string;
  experiences: Array<{
    companyName: string;
    jobTitle: string;
    customJobTitle?: string;
    contractType: string;
    startYear: string;
    startMonth: string;
    endYear: string;
    endMonth: string;
    responsibilities: string;
  }>;
  certificates: Array<{
    name: string;
    grade: string;
    organization: string;
    issueDate: string;
  }>;
  computerSkills: {
    documentCreation: boolean;
    spreadsheet: boolean;
    presentation: boolean;
    accounting: boolean;
    other: string;
  };
}

const API = 'http://localhost:3001/api/resumes';

export const getResumes = () => 
    axios.get(API).then(res => res.data);

export const createResume = (data: ResumeData) => 
    axios.post(API, data).then(res => res.data);

export const updateResume = (id: string, data: ResumeData) => 
    axios.put(`${API}/${id}`, data).then(res => res.data);

export const deleteResume = (id: string) => 
    axios.delete(`${API}/${id}`);
