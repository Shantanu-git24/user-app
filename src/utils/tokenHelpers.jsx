import { jwtDecode} from 'jwt-decode';  // You will need to install jwt-decode if not already installed

// Helper function to extract user ID from JWT token
export const extractUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);  // Decode the token using jwt-decode library
    return decoded.id;  // Assuming the token has a user ID stored in the `id` field
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;  // Return null if the token is invalid or cannot be decoded
  }
};




