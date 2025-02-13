import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import '../css/Survey1.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot1 from '../assets/images/foot1.png';

const Survey1 = () => {
  const navigate = useNavigate();
  const { surveyData, updateSurveyData } = useSurvey();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);

  // ✅ 뒤로가기 버튼 클릭 시 Survey.js로 이동
  const handleBack = () => {
    navigate('/survey'); // Survey 페이지로 이동
  };

  const handleQuestionClick = () => {
    setShowSurveyQuestion(true);
  };

  const closeSurveyQuestion = () => {
    setShowSurveyQuestion(false);
  };

  // ✅ "다음" 버튼 클릭 시 Survey2로 이동
  const handleNext = () => {
    navigate('/survey2'); // survey2 페이지로 이동
  };

  const handleInputChange = (e) => {
    updateSurveyData(1, e.target.value);
  };

  return (
    <>
      {/* 헤더 */}
      <div className="survey-header">
        <img 
          src={vectorIcon} 
          alt="뒤로가기" 
          className="survey-back"
          onClick={handleBack} // ✅ 클릭 시 /survey로 이동
        />
        <h1 className="survey-title">강의 기획서 생성하기</h1>
        <img 
          src={questionIcon} 
          alt="도움말" 
          className="survey-help"
          onClick={handleQuestionClick} 
        />
      </div>
      
      <img src={foot1} alt="foot1" className="foot1" />

      <div className="survey1-container">
        <div className="survey1-title">
          지금의 나를 만든<br />가장 의미 있는 순간은 무엇인가요?
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 첫 김치 담갔을 때지. 내 손으로, 내 식구 먹을 거 만든 기분"
          value={surveyData.question1}
          onChange={handleInputChange}
        />
      </div>

      <div className="survey1-button-container">
        <button className="survey1-button" onClick={handleNext}>
          다음
        </button>
      </div>
    </>
  );
};

export default Survey1;
