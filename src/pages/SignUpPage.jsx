import { useState } from "react"
import { Button, Form, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import userApi from '../api/UserApi'


export default function SignUpPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        uid: '',
        password: '',
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await userApi.signUp(userInfo);
            if(res.status === 200) {
                alert("회원가입 성공")
                console.log("회원가입 성공");
                setUserInfo({});
                navigate('/');
            }
        } catch (error) {
            if (error.status === 403) {
                alert("이미 존재하는 ID입니다.");
            } else {
                alert("회원가입에 오류가 발생했습니다.")
            }
            console.log(error);
        }
    }  
    return (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
        >
          <Card
            style={{ width: "800px", height: "1000px", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-5" style={{ fontSize: "48px", fontWeight: "bold", color: "#333" }}>
                  회원가입
                </h2>

                <Form.Group className="mb-4">
                  <Form.Label
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    이름
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    required
                    style={{
                      padding: "20px",
                      fontSize: "18px",
                      borderRadius: "12px",
                      border: "1.5px solid #e1e1e1",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Form.Group>
    
                <Form.Group className="mb-4">
                  <Form.Label
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    아이디
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={userInfo.uid}
                    onChange={(e) => setUserInfo({ ...userInfo, uid: e.target.value })}
                    required
                    style={{
                      padding: "20px",
                      fontSize: "18px",
                      borderRadius: "12px",
                      border: "1.5px solid #e1e1e1",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Form.Group>
    
                <Form.Group className="mb-5">
                  <Form.Label
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    비밀번호
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={userInfo.password}
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    required
                    style={{
                      padding: "20px",
                      fontSize: "18px",
                      borderRadius: "12px",
                      border: "1.5px solid #e1e1e1",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Form.Group>
    
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#3182f6",
                    borderColor: "#3182f6",
                    borderRadius: "12px",
                    padding: "25px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    marginTop: "20px",
                  }}
                >
                  회원가입
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
    )
}