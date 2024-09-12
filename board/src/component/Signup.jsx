import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const payload = {
            email: email,
            password: password,
            username: username,
        };

        try {
            const response = await fetch(
                "http://localhost:8080/api/user/join",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.status === 201) {
                console.log("성공!");
                navigate("/login");
            } else if (response.status === 400) {
                alert("회원가입 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <h1>Sign Up</h1>

                <label htmlFor="email">이메일</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='username'>사용자명</label>
                <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button id="signup-button" onClick={handleSignup}>회원가입</button>

                <p className="login-link">
                    이미 회원이신가요? <Link to="/login">로그인</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup;