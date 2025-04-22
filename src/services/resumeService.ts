
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

// Mock API for development purposes
// In production, you would use a real API endpoint
// const API = 'http://localhost:3001/api/resumes';
const API = '/api/resumes'; // This will be mocked

// Mock data storage
let mockResumes: ResumeData[] = [];

export const getResumes = async () => {
  try {
    // Try the real API first
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.log('Using mock data for resumes');
    // Return mock data if the API is not available
    return mockResumes;
  }
};

export const createResume = async (data: ResumeData) => {
  try {
    // Try the real API first
    const response = await axios.post(API, data);
    return response.data;
  } catch (error) {
    console.log('Using mock storage for resume creation');
    // Create a mock ID
    const mockId = Date.now().toString();
    const newResume = { ...data, id: mockId };
    
    // Add to mock storage
    mockResumes.push(newResume);
    
    // Return the created resume with ID
    return newResume;
  }
};

export const updateResume = async (id: string, data: ResumeData) => {
  try {
    // Try the real API first
    const response = await axios.put(`${API}/${id}`, data);
    return response.data;
  } catch (error) {
    console.log('Using mock storage for resume update');
    // Update in mock storage
    mockResumes = mockResumes.map(resume => 
      resume.id === id ? { ...data, id } : resume
    );
    
    // Return the updated resume
    return { ...data, id };
  }
};

export const deleteResume = async (id: string) => {
  try {
    // Try the real API first
    await axios.delete(`${API}/${id}`);
  } catch (error) {
    console.log('Using mock storage for resume deletion');
    // Delete from mock storage
    mockResumes = mockResumes.filter(resume => resume.id !== id);
  }
};
