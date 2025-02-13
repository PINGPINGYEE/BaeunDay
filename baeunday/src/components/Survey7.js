import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import axios from 'axios';
import '../css/Survey7.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot7 from '../assets/images/foot7.png';

const Survey7 = () => {
  const navigate = useNavigate();
  const { surveyData, updateSurveyData } = useSurvey();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuestionClick = () => {
    setShowSurveyQuestion(true);
  };

  const closeSurveyQuestion = () => {
    setShowSurveyQuestion(false);
  };

  const handleInputChange = (e) => {
    updateSurveyData(7, e.target.value);
  };

  const handleNext = async () => {
    const token = localStorage.getItem('token');
    
    console.log('Token:', token);

    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 먼저 다음 페이지로 이동
    navigate('/survey8');

    // API 호출을 백그라운드에서 비동기로 실행
    try {
      const response = await axios.post('http://43.202.15.40/api/gpt', surveyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('API 호출 성공:', response.data);
      // GPT 응답을 localStorage에 저장
      const gptContent = response.data.data.body.content;
      localStorage.setItem('gptContent', gptContent);
    } catch (error) {
      console.log('API 호출 실패:', error);
    }
  };

  return (
    <>
      {/* 헤더 */}
      <div className="survey-header">
        <img 
          src={vectorIcon} 
          alt="뒤로가기" 
          className="survey-back"
          onClick={handleBack}
        />
        <h1 className="survey-title">강의 기획서 생성하기</h1>
        <img 
          src={questionIcon} 
          alt="도움말" 
          className="survey-help"
          onClick={handleQuestionClick} 
        />
      </div>
      
      <img src={foot7} alt="foot7" className="foot7" />
      <div className="survey1-container">
        <div className="survey1-title">
          내 이야기를 들은 사람들이<br />'와, 이거다!'라고 느끼게 하고 싶은 부분은?
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 다 어렵지 않더라. 천천히, 정성껏 하면돼."
          value={surveyData.question7}
          onChange={handleInputChange}
        />
      </div>

      {/* ▼ 버튼 영역: 이전 + 다음 버튼 나란히 배치 */}
      <div className="survey-footer">
        <button className="survey-prev-button" onClick={() => navigate('/survey6')}>
          이전
        </button>
        <button 
          className="survey-next-button2" 
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? '제출 중...' : '다음'}
        </button>
      </div>
    </>
  );
};

export default Survey7;
