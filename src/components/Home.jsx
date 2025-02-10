import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default function Home() {
    return (
        <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
        >
            <Card
            style={{ width: "800px", height: "1000px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <div className="text-center" style={{ width: "100%", maxWidth: "600px" }}>
                        <Card.Title className="mb-5" style={{ fontSize: "48px", fontWeight: "bold", color: "#333" }}>
                        Clush Todo App
                        </Card.Title>
                        <div className="mb-5">
                            <Link to="/signIn">
                                <Button
                                variant="primary"
                                className="w-100"
                                style={{
                                backgroundColor: "#3182f6",
                                borderColor: "#3182f6",
                                borderRadius: "12px",
                                fontWeight: "bold",
                                padding: "20px 0",
                                fontSize: "24px",
                                transition: "all 0.3s ease",
                                }}
                                >
                                    로그인
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/signUp">
                                <Button
                                variant="outline-primary"
                                className="w-100"
                                style={{
                                borderColor: "#3182f6",
                                color: "#3182f6",
                                borderRadius: "12px",
                                fontWeight: "bold",
                                padding: "20px 0",
                                fontSize: "24px",
                                transition: "all 0.3s ease",
                                }}
                                >
                                회원가입
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
    </Container>
    )
}