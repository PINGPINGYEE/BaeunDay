import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey8.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from './survey_question';
import foot8 from '../assets/images/foot8.png';
import downIcon from '../assets/images/down-arrow.svg';

const Survey8_5 = () => {
  const navigate = useNavigate();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);

  // 날짜 선택 상태 (추후 필요시 사용)
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  // 각 드롭다운 열림/닫힘 상태 (추후 필요시 사용)
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  // 수강생 최소 인원과 최대 인원 상태
  const [minCapacity, setMinCapacity] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuestionClick = () => {
    setShowSurveyQuestion(true);
  };

  const closeSurveyQuestion = () => {
    setShowSurveyQuestion(false);
  };

  const handlePrev = () => {
    navigate('/survey8_4');
  };

  const handleNext = () => {
    sessionStorage.setItem('lecture_minP', minCapacity);
    sessionStorage.setItem('lecture_maxP', maxCapacity);
    navigate('/lecturepreview');
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
      
      <img src={foot8} alt="foot8" className="foot8" />
      <div className="survey1-container">
        <div className="survey1-title">
          마지막으로 구체적인 강의 계획을<br />작성할 시간이에요.
        </div>
        <div className="survey1-title2">
          5. 수강생 최소 인원과 최대 인원은 몇 명인가요?
        </div>

        {/* 수강생 인원 입력 영역 */}
        <div className="lecture-plan-container">
          <div 
            className="lecture-date-wrapper"
            style={{ display: 'block' }}  // 라벨 위, 선택박스 아래로
          >
            {/* (필요시 추가 입력 요소 작성) */}
          </div>
          <div className="lecture-time-wrapper">
              <div className="time-inputs">
                <input 
                  type="text" 
                  placeholder="최소 인원 (예: 5)" 
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
                />
                <span className="time-separator">~</span>
                <input 
                  type="text" 
                  placeholder="최대 인원 (예: 30)" 
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                />
              </div>
          </div>
        </div>

        {/* 이전, 다음 버튼 영역 */}
        <div className="survey-footer">
          <button className="survey-prev-button" onClick={handlePrev}>
            이전
          </button>
          <button className="survey-next-button2" onClick={handleNext}>
            다음
          </button>
        </div>
      </div>

      {/* SurveyQuestion 모달 */}
      {showSurveyQuestion && <SurveyQuestion onClose={closeSurveyQuestion} />}
    </>
  );
};

export default Survey8_5;
