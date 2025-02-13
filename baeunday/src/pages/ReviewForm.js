import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/ReviewForm.css';
import starFilled from '../assets/images/reviewstar.svg';
import starEmpty from '../assets/images/reviewstar_empty.svg';
import backIcon from '../assets/images/Vector.svg';

const ReviewHeader = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="review-form-header">
            <img 
                src={backIcon} 
                alt="back" 
                className="review-form-back-button" 
                onClick={handleBack}
                style={{ cursor: 'pointer' }}
            />
            <h1 className="review-form-header-title">후기 작성</h1>
        </div>
    );
}

const ReviewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lecture } = location.state || {}; // 전달받은 강의 정보
    
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert('별점을 선택해주세요.');
            return;
        }

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            };

            const requestBody = {
                field: reviewText,
                star: rating,
                createdDate: new Date().toISOString()
            };

            // 요청 정보 로깅
            console.log('📝 후기 작성 요청:');
            console.log('URL:', `https://mannajang.store/api/review/${lecture.postId}`);
            console.log('Config:', config);
            console.log('Request Body:', requestBody);

            const response = await axios.post(
                `https://mannajang.store/api/review/${lecture.postId}`,
                requestBody,
                config
            );

            // 응답 정보 로깅
            console.log('✅ 후기 작성 성공:', response.data);

            if (response.status === 200) {
                alert('후기가 등록되었습니다.');
                navigate('/applied');
            }
        } catch (error) {
            // 에러 정보 상세 로깅
            console.error('❌ 후기 등록 실패:', error);
            console.error('에러 응답:', error.response?.data);
            console.error('에러 상태:', error.response?.status);
            alert('후기 등록에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <ReviewHeader />
            <div className="review-form-container">
                <h2 className="review-form-question">강의는 어땠나요?</h2>
                <p className="review-form-subtext">{lecture?.title || '강의'}</p>
                <div className="review-form-stars">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <img
                            key={index}
                            src={index <= rating ? starFilled : starEmpty}
                            alt={index <= rating ? 'Filled Star' : 'Empty Star'}
                            onClick={() => handleRating(index)}
                            className="review-star"
                        />
                    ))}
                </div>
                <div className="review-form-input-container">
                    <span className="review-main-text">후기 남기기</span>
                    <span className="review-optional-text">(필수)</span>
                </div>
                <input 
                    type="text" 
                    className="review-form-input" 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="강의에 대한 후기를 작성해주세요"
                />
                <div className="review-form-button-container">
                    <button 
                        className="review-form-button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '등록 중...' : '작성 완료'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;
