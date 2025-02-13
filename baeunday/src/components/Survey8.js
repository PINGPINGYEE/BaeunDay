import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey8.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot8 from '../assets/images/foot8.png';
import downIcon from '../assets/images/down-arrow.svg';

const Survey8 = () => {
  const navigate = useNavigate();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);

  // 날짜 선택 상태
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  // 강의 시간 입력 상태 추가
  const [lectureStartTime, setLectureStartTime] = useState('');
  const [lectureEndTime, setLectureEndTime] = useState('');

  // 각 드롭다운 열림/닫힘 상태
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

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
    navigate('/survey7');
  };

  const handleNext = () => {
    // ISO 8601 형식으로 날짜와 시간 조합
    const startDateTime = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${lectureStartTime}:00.000Z`;
    const endDateTime = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${lectureEndTime}:00.000Z`;

    // API 형식으로 저장
    sessionStorage.setItem('lecture_startDateTime', startDateTime);
    sessionStorage.setItem('lecture_endDateTime', endDateTime);
    
    navigate('/survey8_2');
  };

  // 연도 목록: 2025년부터 2100년까지
  const years = Array.from({ length: 76 }, (_, i) => 2025 + i);
  // 월 목록 (1~12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  // 일 목록 (1~31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
          1. 강의할 날짜와 시간을 알려주세요.
        </div>

        {/* 날짜/시간 선택 영역 */}
        <div className="lecture-plan-container">
          <div 
            className="lecture-date-wrapper"
            style={{ display: 'block' }}  // <-- 라벨 위, 선택박스 아래로
          >
            <label className="lecture-date-label">강의 날짜</label>
            <div className="date-selectors-inline">
              {/* 연도 선택 */}
              <div 
                className="date-selector" 
                onClick={() => {
                  setShowYearDropdown(!showYearDropdown);
                  setShowMonthDropdown(false);
                  setShowDayDropdown(false);
                }}
              >
                <span>{selectedYear ? `${selectedYear}년` : '연도 선택'}</span>
                <img src={downIcon} alt="down-arrow" />
                {showYearDropdown && (
                  <ul className="dropdown-menu">
                    {years.map((year) => (
                      <li
                        key={year}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedYear(year);
                          setShowYearDropdown(false);
                        }}
                      >
                        {year}년
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 월 선택 */}
              <div 
                className="date-selector" 
                onClick={() => {
                  setShowMonthDropdown(!showMonthDropdown);
                  setShowYearDropdown(false);
                  setShowDayDropdown(false);
                }}
              >
                <span>{selectedMonth ? `${selectedMonth}월` : '월 선택'}</span>
                <img src={downIcon} alt="down-arrow" />
                {showMonthDropdown && (
                  <ul className="dropdown-menu">
                    {months.map((month) => (
                      <li
                        key={month}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMonth(month);
                          setShowMonthDropdown(false);
                        }}
                      >
                        {month}월
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 일 선택 */}
              <div 
                className="date-selector" 
                onClick={() => {
                  setShowDayDropdown(!showDayDropdown);
                  setShowYearDropdown(false);
                  setShowMonthDropdown(false);
                }}
              >
                <span>{selectedDay ? `${selectedDay}일` : '일 선택'}</span>
                <img src={downIcon} alt="down-arrow" />
                {showDayDropdown && (
                  <ul className="dropdown-menu">
                    {days.map((day) => (
                      <li
                        key={day}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDay(day);
                          setShowDayDropdown(false);
                        }}
                      >
                        {day}일
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* 시간 입력 영역 */}
          <div className="lecture-time-wrapper">
            <label className="lecture-time-label">강의 시간</label>
              <div className="time-inputs">
                <input 
                  type="text" 
                  placeholder="시작 시간 (예: 14:00)" 
                  value={lectureStartTime}
                  onChange={(e) => setLectureStartTime(e.target.value)}
                />
                <span className="time-separator">~</span>
                <input 
                  type="text" 
                  placeholder="종료 시간 (예: 16:00)" 
                  value={lectureEndTime}
                  onChange={(e) => setLectureEndTime(e.target.value)}
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
    </>
  );
};

export default Survey8;
