import axiosInstance from "./axios";

const userApi = {
  // 로그인 API
  signIn: (userInfo) => axiosInstance.post('/auth/signin', userInfo),
  // 회원가입 API
  signUp: (userInfo) => axiosInstance.post('/auth/signup', userInfo),

  signOut: () => axiosInstance.post("/auth/signout"),
};

export default userApi;