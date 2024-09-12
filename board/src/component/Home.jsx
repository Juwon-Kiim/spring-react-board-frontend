import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            메인 페이지입니다.
            <br />
            <Link to="/login">로그인</Link>
            <br />
            <Link to="/signup">회원가입</Link>
        </div>
    )
}

export default Home;