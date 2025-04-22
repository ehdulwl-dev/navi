
import axios from 'axios';
import { supabase } from '@/integrations/supabase/client';

export interface ResumeData {
  id?: string;  // Added id as an optional property
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

// Mock data storage - initialize with proper type
let mockResumes: ResumeData[] = [];

export const getResumes = async (): Promise<ResumeData[]> => {
  try {
    // Try to get data from Supabase first
    const { data, error } = await supabase
      .from('TB_CV_USER')
      .select('*');
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      // Transform Supabase data to match ResumeData interface
      return data.map(user => ({
        id: user.id.toString(),
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        birthYear: user.birthdate ? new Date(user.birthdate).getFullYear().toString() : '',
        birthMonth: user.birthdate ? (new Date(user.birthdate).getMonth() + 1).toString() : '',
        birthDay: user.birthdate ? new Date(user.birthdate).getDate().toString() : '',
        address: user.address || '',
        highestEducation: 'high_school', // Default value
        experiences: [],
        certificates: [],
        computerSkills: {
          documentCreation: false,
          spreadsheet: false,
          presentation: false,
          accounting: false,
          other: ''
        }
      }));
    }
    
    // If no data in Supabase or if we want to use mock data as fallback
    return mockResumes;
  } catch (error) {
    console.log('Using mock data for resumes:', error);
    // Return mock data if the API is not available
    return mockResumes;
  }
};

export const createResume = async (data: ResumeData): Promise<ResumeData> => {
  try {
    // Try to save to Supabase first
    const { data: newResume, error } = await supabase
      .from('TB_CV_USER')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthdate: `${data.birthYear}-${data.birthMonth}-${data.birthDay}`,
        address: data.address
      })
      .select()
      .single();
      
    if (error) throw error;
    
    if (newResume) {
      // Create a complete ResumeData object from the saved data
      const savedResume: ResumeData = {
        id: newResume.id.toString(),
        name: newResume.name || data.name,
        email: newResume.email || data.email,
        phone: newResume.phone || data.phone,
        birthYear: data.birthYear,
        birthMonth: data.birthMonth,
        birthDay: data.birthDay,
        address: newResume.address || data.address,
        highestEducation: data.highestEducation,
        university: data.university,
        universityMajor: data.universityMajor,
        universityGradYear: data.universityGradYear,
        college: data.college,
        collegeMajor: data.collegeMajor,
        collegeGradYear: data.collegeGradYear,
        highSchool: data.highSchool,
        highSchoolGradYear: data.highSchoolGradYear,
        experiences: data.experiences,
        certificates: data.certificates,
        computerSkills: data.computerSkills
      };
      return savedResume;
    }
    
    throw new Error('Failed to create resume in Supabase');
  } catch (error) {
    console.log('Using mock storage for resume creation:', error);
    // Create a mock ID
    const mockId = Date.now().toString();
    const newResume = { ...data, id: mockId };
    
    // Add to mock storage
    mockResumes.push(newResume);
    
    // Return the created resume with ID
    return newResume;
  }
};

export const updateResume = async (id: string, data: ResumeData): Promise<ResumeData> => {
  try {
    // Try to update in Supabase first
    const { data: updatedResume, error } = await supabase
      .from('TB_CV_USER')
      .update({
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthdate: `${data.birthYear}-${data.birthMonth}-${data.birthDay}`,
        address: data.address
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    if (updatedResume) {
      // Create a complete ResumeData object from the updated data
      const savedResume: ResumeData = {
        id: updatedResume.id.toString(),
        name: updatedResume.name || data.name,
        email: updatedResume.email || data.email,
        phone: updatedResume.phone || data.phone,
        birthYear: data.birthYear,
        birthMonth: data.birthMonth,
        birthDay: data.birthDay,
        address: updatedResume.address || data.address,
        highestEducation: data.highestEducation,
        university: data.university,
        universityMajor: data.universityMajor,
        universityGradYear: data.universityGradYear,
        college: data.college,
        collegeMajor: data.collegeMajor,
        collegeGradYear: data.collegeGradYear,
        highSchool: data.highSchool,
        highSchoolGradYear: data.highSchoolGradYear,
        experiences: data.experiences,
        certificates: data.certificates,
        computerSkills: data.computerSkills
      };
      return savedResume;
    }
    
    throw new Error('Failed to update resume in Supabase');
  } catch (error) {
    console.log('Using mock storage for resume update:', error);
    // Update in mock storage
    mockResumes = mockResumes.map(resume => 
      resume.id === id ? { ...data, id } : resume
    );
    
    // Return the updated resume
    return { ...data, id };
  }
};

export const deleteResume = async (id: string): Promise<void> => {
  try {
    // Try to delete from Supabase first
    const { error } = await supabase
      .from('TB_CV_USER')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.log('Using mock storage for resume deletion:', error);
    // Delete from mock storage
    mockResumes = mockResumes.filter(resume => resume.id !== id);
  }
};
