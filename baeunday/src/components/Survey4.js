import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import '../css/Survey4.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot4 from '../assets/images/foot4.png';

const Survey4 = () => {
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
    updateSurveyData(4, e.target.value);
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
      
      <img src={foot4} alt="foot4" className="foot4" />
      <div className="survey1-container">
        <div className="survey1-title">
          나는 왜<br />이 주제에 대해 열정을 느끼나요?
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 내 손으로 만든 음식이 사람을 웃게 하잖아."
          value={surveyData.question4}
          onChange={handleInputChange}
        />
      </div>

      {/* ▼ 버튼 영역: 이전 + 다음 버튼 나란히 배치 */}
      <div className="survey-footer">
        <button className="survey-prev-button" onClick={() => navigate('/survey3')}>
          이전
        </button>
        <button className="survey-next-button2" onClick={() => navigate('/survey5')}>
          다음
        </button>
      </div>
    </>
  );
};

export default Survey4;
