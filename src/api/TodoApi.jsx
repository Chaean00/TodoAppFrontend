import axiosInstance from "./axios";

const todoApi = {
    // Todo 조회 API
    getTodo: () => axiosInstance.get("/todos"),
    // Todo 생성 API
    createTodo: (todoInfo) => axiosInstance.post("/todos", todoInfo),
    // Todo 수정 API
    updateTodo: (id, todoInfo) => axiosInstance.put(`/todos/${id}`, todoInfo),
    // Todo 상태 수정 API(완료 여부) 
    updateCompleteTodo: (id) => axiosInstance.patch(`/todos/${id}`),
    // Todo 삭제 API
    deleteTodo: (id) => axiosInstance.delete(`/todos/${id}`),
    // Todo 검색
    searchTodos: (keyword) => axiosInstance.get(`/todos/search`, {
        params: {keyword}
    })
};

export default todoApi;