import React, { useState } from "react";
import { Container, Card, Form, Button, ListGroup, Badge, Navbar, FormControl } from "react-bootstrap";
import todoApi from "../api/TodoApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/UserApi";
import { useAuth } from "../contexts/authContext";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const { setIsSignedIn } = useAuth();
    const [newTodo, setNewTodo] = useState({ title: "", category: "" });
    const [searchData, setSearchData] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchTodos();
    }, [])

    console.log(todos)

  // Todo 조회
    const fetchTodos = async () => {
        try {
        const res = await todoApi.getTodo();
        setTodos(res.data)
        } catch (error) {
        console.error("Todo 조회 Error" + error);
        }
    }

    // Todo 생성 (추가)
    const addTodo = async (e) => {
        e.preventDefault();
        if (newTodo.title.trim() === "" || newTodo.category.trim() === "") return;
        try {
            const res = await todoApi.createTodo(newTodo);
            setTodos((prev) => [...prev, res.data]);
            setNewTodo({title: "", category: ""});
            console.log(todos)  
        } catch (error) {
            console.error("Todo 생성 Error " + error);
        }
    };

  // Todo 삭제
    const deleteTodo = async (id) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Todo 삭제 Error" + error);
        }
    };

  // Todo 완료
    const completeTodo = async (id) => {
        try {
            await todoApi.updateCompleteTodo(id);
            setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo));
        } catch (error) {
            console.error("Todo 완료 상태 변경 Error" + error);
        }
    };

    // 수정 플래그
    const startEditing = (todo) => {
        setEditingTodo(todo);
    };

    // Todo 수정
    const updateTodo = async () => {
        if (editingTodo) {
            try {
                const res = await todoApi.updateTodo(editingTodo.id, editingTodo);
                setTodos((prev) => prev.map((todo) => todo.id === editingTodo.id ? res.data: todo));
                setEditingTodo(null);
            } catch (error) {
                console.error("Todo 수정 Error" + error);
            }
        }
    };

    // 로그아웃
    const handleLogout = async () => {
        try {
            const res = await userApi.signOut();
            console.log(res);
            if (res.status === 200) {
                alert("로그아웃.");
                setIsSignedIn(false)
                navigate("/");
            }
        } catch (error) {
            console.error("로그아웃 실패" + error)
        }
    }

    // Todo 검색
    const handleSearch = async (query) => {
        setSearchData(query)
        console.log(searchData);
        if (searchData.trim() === "") {
          fetchTodos() 
        } else {
          try {
            const response = await todoApi.searchTodos(query)
            setTodos(response.data)
          } catch (error) {
            console.error("Todo 검색 Error", error)
          }
        }
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
          <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
              <Navbar.Brand>Todo App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Form className="d-flex me-2">
                  <FormControl
                    type="search"
                    placeholder="검색"
                    className="me-2"
                    aria-label="Search"
                    value={searchData}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Form>
                <Button variant="outline-primary" onClick={handleLogout}>
                  로그아웃
                </Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "calc(100vh - 76px)" }}
          >
            <Card
              style={{
                width: "800px",
                minHeight: "1000px",
                borderRadius: "15px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body className="d-flex flex-column align-items-center">
                <h2 className="text-center mb-5" style={{ fontSize: "48px", fontWeight: "bold", color: "#333" }}>
                  Todo 리스트
                </h2>
    
                <Form onSubmit={addTodo} className="w-100 mb-4" style={{ maxWidth: "600px" }}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="새로운 Todo 입력"
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                      style={{
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "12px",
                        border: "1.5px solid #e1e1e1",
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Select
                      value={newTodo.category}
                      onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
                      style={{
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "12px",
                        border: "1.5px solid #e1e1e1",
                      }}
                    >
                      <option value="">카테고리 선택</option>
                      <option value="PERSONAL">PERSONAL</option>
                      <option value="WORK">WORK</option>
                      <option value="HEALTH">HEALTH</option>
                      <option value="SHOPPING">SHOPPING</option>
                      <option value="ETC">ETC</option>
                    </Form.Select>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: "#3182f6",
                      borderColor: "#3182f6",
                      borderRadius: "12px",
                      padding: "20px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    추가하기
                  </Button>
                </Form>
    
                <ListGroup
                  className="w-100"
                  style={{ maxWidth: "600px", maxHeight: "500px", overflowY: "auto", width: "100%" }}
                >
                  {todos.map((todo) => (
                    <ListGroup.Item
                      key={todo.id}
                      className="mb-3"
                      style={{
                        borderRadius: "12px",
                        border: "1.5px solid #e1e1e1",
                        padding: "20px",
                      }}
                    >
                      {editingTodo && editingTodo.id === todo.id ? (
                        <>
                          <Form.Control
                            type="text"
                            value={editingTodo.title}
                            onChange={(e) =>
                              setEditingTodo({
                                ...editingTodo,
                                title: e.target.value,
                              })
                            }
                            className="mb-2"
                            style={{
                              padding: "15px",
                              fontSize: "18px",
                              borderRadius: "8px",
                            }}
                          />
                          <Form.Select
                          value={editingTodo.category}
                          onChange={(e) => setEditingTodo({ ...editingTodo, category: e.target.value })}
                          style={{
                            padding: "20px",
                            marginBottom: "10px",
                            fontSize: "18px",
                            borderRadius: "12px",
                            border: "1.5px solid #e1e1e1",
                          }}
                          >
                          <option value="">카테고리 선택</option>
                          <option value="PERSONAL">PERSONAL</option>
                          <option value="WORK">WORK</option>
                          <option value="HEALTH">HEALTH</option>
                          <option value="SHOPPING">SHOPPING</option>
                          <option value="ETC">ETC</option>
                          </Form.Select>
                          <Button onClick={updateTodo} variant="primary" className="me-2">
                            저장
                          </Button>
                          <Button onClick={() => setEditingTodo(null)} variant="secondary">
                            취소
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge bg="secondary" pill>
                            {todo.createdAt}
                          </Badge>
                          <div
                            className={`mb-2 ${todo.completed ? "text-decoration-line-through" : ""}`}
                            style={{ fontSize: "18px" }}
                          >
                            {todo.title}
                          </div>
                          <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
                            카테고리: {todo.category}
                          </div>
                          <Button
                            onClick={() => completeTodo(todo.id)}
                            variant={todo.completed ? "outline-primary" : "primary"}
                            className="me-2"
                          >
                            {todo.completed ? "완료 취소" : "완료"}
                          </Button>
                          <Button onClick={() => startEditing(todo)} variant="secondary" className="me-2">
                            수정
                          </Button>
                          <Button onClick={() => deleteTodo(todo.id)} variant="danger">
                            삭제
                          </Button>
                        </>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
        </div>
       );
}