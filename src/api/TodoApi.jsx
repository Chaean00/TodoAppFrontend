import axiosInstance from "./axios";

const todoApi = {
    // Todo 조회 API
    getTodo: () => axiosInstance.get("/todo/"),
    // Todo 생성 API
    createTodo: (todoInfo) => axiosInstance.post("/todo/", todoInfo),
    // Todo 수정 API
    updateTodo: (id, todoInfo) => axiosInstance.put(`/todo/${id}`, todoInfo),
    // Todo 상태 수정 API(완료 여부) 
    updateCompleteTodo: (id) => axiosInstance.patch(`/todo/${id}`),
    // Todo 삭제 API
    deleteTodo: (id) => axiosInstance.delete(`/todo/${id}`)
};

export default todoApi;