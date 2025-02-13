import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from './survey_question';

const Survey = () => {
  const navigate = useNavigate();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuestionClick = () => {
    setShowSurveyQuestion(true);
  };

  const closeSurveyQuestion = () => {
    setShowSurveyQuestion(false);
  };

  // ✅ "다음" 버튼 클릭 시 Survey1 페이지로 이동
  const handleNext = () => {
    navigate('/survey1'); // Survey1 페이지로 이동
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

      {/* 안내 문구 */}
      <p className="survey-intro">
        안녕하세요, <span className="highlighted-name">컴공사이에피어난전쟁통</span>님.<br/>
        이제부터 맞춤 강의 기획서 작성에 필요한<br/>
        설문을 진행하려고 합니다.<br/>
        준비되셨다면 '다음' 버튼을 눌러주세요~ 😊
      </p>

      <div className="survey-container">
        {showSurveyQuestion && (
          <SurveyQuestion onClose={closeSurveyQuestion} />
        )}
      </div>

      {/* ▼ 하단 버튼 영역 */}
      <div className="survey-footer">
        <button className="survey-direct-button">직접 작성</button>
        <button className="survey-next-button1" onClick={handleNext}>
          다음
        </button>
      </div>
    </>
  );
};

export default Survey;
