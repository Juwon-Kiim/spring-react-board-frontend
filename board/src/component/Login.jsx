import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginCheck, setLoginCheck] = useState(false);

    const navigate = useNavigate();
    
    const handleLogin = async (event) => {
        event.preventDefault();
        await new Promise((r) => setTimeout(r, 1000));

        const response = await fetch(
            "http://localhost:8080/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const result = await response;
        console.log(result.headers['Authorization']);

        if (response.status === 200) {
            setLoginCheck(false);
            sessionStorage.setItem("access-token", result.headers.get("Authorization"));
            console.log("로그인 성공");
            navigate("/");
        } else {
            setLoginCheck(true);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <laben htmlFor="email">이메일</laben>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <laben htmlFor="password">비밀번호</laben>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {loginCheck && (
                    <label style={{color: "red"}}>이메일 혹은 비밀번호가 틀렸습니다.</label>
                )}
                <button onClick={handleLogin}>로그인</button>

                <p className="signup-link">
                    아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;