import React, { useState } from "react";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import todoApi from "../api/TodoApi";
import { useEffect } from "react";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: "", category: "" });
    const [editingTodo, setEditingTodo] = useState(null);
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
            const res = await todoApi.deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Todo 삭제 Error" + error);
        }
    };

  // Todo 완료
    const completeTodo = async (id) => {
        try {
            const res = await todoApi.updateCompleteTodo(id);
            setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo));
        } catch (error) {
            console.error("Todo 완료 상태 변경 Error" + error);
        }
    };

    const startEditing = (todo) => {
        setEditingTodo(todo);
    };

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

    return (
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
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
            <h2
                className="text-center mb-5"
                style={{ fontSize: "48px", fontWeight: "bold", color: "#333" }}
            >
                Todo 리스트
            </h2>

            <Form
                onSubmit={addTodo}
                className="w-100 mb-4"
                style={{ maxWidth: "600px" }}
            >
                <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="새로운 Todo 입력"
                    value={newTodo.title}
                    onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })}
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
                        <option value="PERSONAL">개인</option>
                        <option value="WORK">업무</option>
                        <option value="HEALTH">운동</option>
                        <option value="SHOPPING">쇼핑</option>
                        <option value="ETC">기타</option>
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

            <ListGroup className="w-100" 
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
                        <Form.Control
                        type="text"
                        value={editingTodo.category}
                        onChange={(e) =>
                            setEditingTodo({
                                ...editingTodo,
                                category: e.target.value,
                            })
                        }
                        className="mb-2"
                        style={{
                            padding: "15px",
                            fontSize: "18px",
                            borderRadius: "8px",
                        }}
                        />
                        <Button onClick={updateTodo} variant="success" className="me-2">
                        저장
                        </Button>
                        <Button
                        onClick={() => setEditingTodo(null)}
                        variant="secondary"
                        >
                        취소
                        </Button>
                    </>
                    ) : (
                    <>
                        <div
                        className={`mb-2 ${
                            todo.completed ? "text-decoration-line-through" : ""
                        }`}
                        style={{ fontSize: "18px" }}
                        >
                        {todo.title}
                        </div>
                        <div
                        className="mb-2"
                        style={{ fontSize: "14px", color: "#666" }}
                        >
                        카테고리: {todo.category}
                        </div>
                        <Button
                        onClick={() => completeTodo(todo.id)}
                        variant={todo.completed ? "outline-success" : "success"}
                        className="me-2"
                        >
                        {todo.completed ? "완료 취소" : "완료"}
                        </Button>
                        <Button
                        onClick={() => startEditing(todo)}
                        variant="warning"
                        className="me-2"
                        >
                        수정
                        </Button>
                        <Button
                        onClick={() => deleteTodo(todo.id)}
                        variant="danger"
                        >
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
    );
}