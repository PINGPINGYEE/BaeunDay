import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey8.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from './survey_question';
import foot8 from '../assets/images/foot8.png';
import downIcon from '../assets/images/down-arrow.svg';

const Survey8_2 = () => {
  const navigate = useNavigate();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);

  // 날짜 선택 상태
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  // 각 드롭다운 열림/닫힘 상태
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  // 모집 시간 입력 상태 추가
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

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
    navigate('/survey8');
  };

  const handleNext = () => {
    // 모집 마감일을 ISO 8601 형식으로 변환
    const deadline = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${endTime}:00.000Z`;
    
    sessionStorage.setItem('lecture_deadline', deadline);
    navigate('/survey8_3');
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
          2. 수강생 모집 기간을 알려주세요.
        </div>

        {/* 시간 선택 영역 */}
        <div className="lecture-plan-container">
          <div 
            className="lecture-date-wrapper"
            style={{ display: 'block' }}  // <-- 라벨 위, 선택박스 아래로
          >
          </div>
          {/* 시간 입력 영역 */}
          <div className="lecture-time-wrapper">
              <div className="time-inputs">
                <input 
                  type="text" 
                  placeholder="모집 시작 시간 (예: 09:00)" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <span className="time-separator">~</span>
                <input 
                  type="text" 
                  placeholder="모집 마감 시간 (예: 18:00)" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
          </div>
        </div>

        {/* ▼ 버튼 영역: 이전 + 다음 버튼 */}
        <div className="survey-footer">
          <button className="survey-prev-button" onClick={handlePrev}>
            이전
          </button>
          <button className="survey-next-button2" onClick={handleNext}>
            다음
          </button>
        </div>
      </div>
      {showSurveyQuestion && <SurveyQuestion onClose={closeSurveyQuestion} />}
    </>
  );
};

export default Survey8_2;
