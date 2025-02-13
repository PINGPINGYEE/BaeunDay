import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import '../css/Survey3.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot3 from '../assets/images/foot3.png';

const Survey3 = () => {
  const navigate = useNavigate();
  const { surveyData, updateSurveyData } = useSurvey();
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

  const handleInputChange = (e) => {
    updateSurveyData(3, e.target.value);
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
      
      <img src={foot3} alt="foot3" className="foot3" />

      <div className="survey1-container">
        <div className="survey1-title">
          이걸 몰라서<br />과거의 내가 고생했던 순간이 있나요?
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 소금은 많이 넣으면 못 먹어. 김치는 기다림이 반이야."
          value={surveyData.question3}
          onChange={handleInputChange}
        />
      </div>

      {/* ▼ 버튼 영역: 이전 + 다음 버튼 나란히 배치 */}
      <div className="survey-footer">
        <button className="survey-prev-button" onClick={() => navigate('/survey2')}>
          이전
        </button>
        <button className="survey-next-button2" onClick={() => navigate('/survey4')}>
          다음
        </button>
      </div>
    </>
  );
};

export default Survey3;
