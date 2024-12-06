// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// export const getInitiatives = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/initiatives`)
//     if (!response.ok) throw new Error('Failed to fetch initiatives')
//     return await response.json()
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }


// Import your static data
import { initiatives } from '../data/initiatives';

// Simulate API fetching using static data
export const getInitiatives = async () => {
  try {
    // Simulate a delay to mimic a real API call (optional)
    await new Promise((resolve) => setTimeout(resolve, 500)); 
    
    return initiatives; // Return the static data
  } catch (error) {
    throw new Error('Failed to fetch initiatives');
  }
};
