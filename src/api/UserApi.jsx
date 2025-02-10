import axiosInstance from "./axios";

const userApi = {
  // 로그인 API
  signIn: (userInfo) => axiosInstance.post('/auth/signIn', userInfo),
  // 회원가입 API
  signUp: (userInfo) => axiosInstance.post('/auth/signUp', userInfo),
};

export default userApi;