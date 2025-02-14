import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/loading.css"; // CSS 파일 불러오기
import logo from "../assets/images/logo.svg"; // ✅ SVG 로고 이미지 불러오기

const Loading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Loading component mounted'); // 디버깅용 로그
        const timer = setTimeout(() => {
            console.log('Timer finished, navigating...'); // 디버깅용 로그
            navigate('/not-login');
        }, 2000);

        // cleanup 함수
        return () => {
            clearTimeout(timer);
        };
    }, []); // navigate를 의존성 배열에서 제거

    return (
        <div className="loading-container">
            <img src={logo} alt="만나장 로고" className="loading-logo" />
            <p className="loading-text">만나장</p>
        </div>
    );
};

export default Loading;
