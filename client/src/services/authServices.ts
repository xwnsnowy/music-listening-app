import axiosConfig from './axiosConfig';

interface UserExistData {
  email: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
  dob: {
    day: string;
    month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    year: string;
  };
  gender: "male" | "female" | "non-binary" | "something-else" | "prefer-not-to-say";
}

interface LoginData {
  email: string;
  password: string;
}

// Check User Exist when sign up
export function userExist(data: UserExistData) {
  console.log("Data in userExist:", data);

  return axiosConfig.post(`/auth/user-exist`, data)
    .then(response => {
      console.log("Response from server:", response.data);
      return response.data;
    })
}

// Signup
export function signup(data: SignUpData) {
  return axiosConfig.post(`/auth/signup`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// Login
export function login(data: LoginData) {
  return axiosConfig.post(`/auth/login`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// Logout
export function logout() {
  return axiosConfig.get(`/auth/logout`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

//Renew token using refreshToken (cookie)
//Have to use fetch for this api -> axios not support in nextjs middleware
// export async function renewToken(refreshToken) {
//   const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
//   return await fetch(`${base_url}/auth/renew_token`, {
//     method: "POST",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ refreshToken: refreshToken })
//   });
// }