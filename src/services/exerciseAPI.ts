import axios from 'axios';
import { message } from 'antd';
import { ExerciseData } from '../components/ExerciseForm';

const API_BASE_URL = 'http://localhost:8080';

// Local storage key
const EXERCISE_STORAGE_KEY = 'exercise_records';

// Mock API response format
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Save exercise record
export const saveExerciseData = async (data: ExerciseData): Promise<ApiResponse<any>> => {
  try {
    // Validate required fields
    if (!data.exerciseType || !data.date || !data.duration || !data.steps || !data.calories || !data.height || !data.weight) {
      return {
        code: 400,
        message: 'Missing required exercise data',
        data: null
      };
    }

    // Convert any string numbers to actual numbers (defensive programming)
    const cleanData = {
      ...data,
      duration: Number(data.duration),
      steps: Number(data.steps),
      calories: Number(data.calories),
      height: Number(data.height),
      weight: Number(data.weight),
      maxHeartRate: data.maxHeartRate ? Number(data.maxHeartRate) : undefined,
      minHeartRate: data.minHeartRate ? Number(data.minHeartRate) : undefined
    };

    // Try to call actual API
    // const response = await axios.post(`${API_BASE_URL}/api/exercise/record`, cleanData);
    // return response.data;

    // Use local storage instead
    const existingRecords = JSON.parse(localStorage.getItem(EXERCISE_STORAGE_KEY) || '[]');
    const newRecord = {
      ...cleanData,
      id: Date.now().toString(),
      userId: '1', // Mock user ID
      createdAt: new Date().toISOString()
    };
    
    existingRecords.push(newRecord);
    localStorage.setItem(EXERCISE_STORAGE_KEY, JSON.stringify(existingRecords));
    
    return {
      code: 200,
      message: 'Exercise record saved successfully',
      data: newRecord
    };
  } catch (error) {
    console.error('Failed to save exercise record:', error);
    return {
      code: 500,
      message: 'Failed to save exercise record',
      data: null
    };
  }
};

// Get weekly exercise summary
export const getWeeklySummary = async (): Promise<ApiResponse<any>> => {
  try {
    // Try to call actual API
    // const response = await axios.get(`${API_BASE_URL}/api/exercise/weekly-summary`);
    // return response.data;

    // Get data from local storage and calculate summary
    const records = JSON.parse(localStorage.getItem(EXERCISE_STORAGE_KEY) || '[]');
    
    // Get dates for the past 7 days
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });
    
    // Filter records for the past 7 days
    const recentRecords = records.filter((record: any) => 
      last7Days.includes(record.date)
    );
    
    // Group records by day
    const recordsByDay: { [key: string]: any[] } = {};
    recentRecords.forEach((record: any) => {
      const day = record.date;
      if (!recordsByDay[day]) {
        recordsByDay[day] = [];
      }
      recordsByDay[day].push(record);
    });
    
    // Calculate total metrics
    let totalDuration = 0;
    let totalSteps = 0;
    let totalCalories = 0;
    
    recentRecords.forEach((record: any) => {
      totalDuration += Number(record.duration) || 0;
      totalSteps += Number(record.steps) || 0;
      totalCalories += Number(record.calories) || 0;
    });
    
    return {
      code: 200,
      message: 'Weekly summary retrieved successfully',
      data: {
        totalDuration,
        totalSteps,
        totalCalories,
        recordCount: recentRecords.length,
        recordsByDay,
        weeklyRecords: recentRecords
      }
    };
  } catch (error) {
    console.error('Failed to retrieve weekly summary:', error);
    message.error('Failed to retrieve weekly exercise data');
    throw error;
  }
};

// Get all exercise records
export const getAllExerciseRecords = async (): Promise<ApiResponse<any[]>> => {
  try {
    // Try to call actual API
    // const response = await axios.get(`${API_BASE_URL}/api/exercise/records`);
    // return response.data;

    // Use local storage instead
    const records = JSON.parse(localStorage.getItem(EXERCISE_STORAGE_KEY) || '[]');
    
    return {
      code: 200,
      message: 'Exercise records retrieved successfully',
      data: records
    };
  } catch (error) {
    console.error('Failed to retrieve exercise records:', error);
    message.error('Failed to retrieve exercise records');
    throw error;
  }
}; 