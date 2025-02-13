import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey8.css';
import vectorIcon from '../assets/images/Vector.svg';
import foot8 from '../assets/images/foot8.png';
import locationIcon from '../assets/images/location.svg';

const Survey8_4 = () => {
  const navigate = useNavigate();

  // 지역 선택 상태
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const regionData = {
      서울: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
      경기: ['고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '여주시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
      인천: ['계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '중구'],
      강원: ['강릉시', '동해시', '삼척시', '속초시', '원주시', '춘천시'],
      충남: ['계룡시', '공주시', '논산시', '당진시', '보령시', '서산시', '아산시', '천안시'],
      대전: ['대덕구', '동구', '서구', '유성구', '중구'],
      충북: ['제천시', '청주시', '충주시'],
      세종: ['세종시'],
      부산: ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
      울산: ['남구', '동구', '북구', '중구', '울주군'],
      대구: ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구'],
      경북: ['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시'],
      경남: ['거제시', '김해시', '밀양시', '사천시', '양산시', '진주시', '창원시', '통영시'],
      전남: ['광양시', '나주시', '목포시', '순천시', '여수시'],
      광주: ['광산구', '남구', '동구', '북구', '서구'],
      전북: ['군산시', '김제시', '남원시', '익산시', '전주시', '정읍시'],
      제주: ['서귀포시', '제주시'],
      전국: ['전체']
    };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSelectedSubRegion(''); // 상위 지역 변경 시 하위 지역 초기화
  };

  // 장소 선택 상태
  const [location, setLocation] = useState('');
  const [isLocationUndecided, setIsLocationUndecided] = useState(false);

  const handleLocationUndecidedChange = () => {
    setIsLocationUndecided(!isLocationUndecided);
    if (!isLocationUndecided) {
      setLocation('');
    }
  };

  // 오류 상태
  const [errors, setErrors] = useState({ location: false });

  const ErrorMessage = () => <div className="error-message">장소를 입력해 주세요.</div>;

  // 뒤로가기, 이전, 다음 버튼 핸들러
  const handleBack = () => {
    navigate(-1);
  };

  const handlePrev = () => {
    navigate('/survey8_3');
  };

  const handleNext = () => {
    sessionStorage.setItem('lecture_province', selectedRegion);
    sessionStorage.setItem('lecture_city', selectedSubRegion);
    sessionStorage.setItem('lecture_address', location);
    navigate('/survey8_5');
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
      </div>
      
      <img src={foot8} alt="foot8" className="foot8" />
      <div className="survey1-container">
        <div className="survey1-title">
          마지막으로 구체적인 강의 계획을<br />작성할 시간이에요.
        </div>
        <div className="survey1-title2">
          4. 강의 장소는 어디인가요?
        </div>

        <div className="lecture-register-location">
          <div className="lecture-register-location-selects">
            <div className="location-select-wrapper">
              <div className="select-with-icon">
                <img src={locationIcon} alt="" className="location-icon" />
              </div>
              <select 
                className="lecture-register-select location-select"
                value={selectedRegion}
                onChange={handleRegionChange}
              >
                <option value="" disabled>전국</option>
                {Object.keys(regionData).map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div className="location-select-wrapper">
              <select 
                className="lecture-register-select"
                value={selectedSubRegion}
                onChange={(e) => setSelectedSubRegion(e.target.value)}
                disabled={!selectedRegion || selectedRegion === '전국'}
              >
                <option value="" disabled>전체</option>
                {selectedRegion && regionData[selectedRegion]?.map(subRegion => (
                  <option key={subRegion} value={subRegion}>
                    {subRegion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="text"
            className={`lecture-register-input ${errors.location && !isLocationUndecided ? 'error' : ''}`}
            placeholder="상세 주소 입력 (예: 강남구 테헤란로 123)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isLocationUndecided}
          />
          <label className="lecture-register-checkbox">
            <input 
              type="checkbox"
              checked={isLocationUndecided}
              onChange={handleLocationUndecidedChange}
            />
            <span>장소 미정</span>
          </label>
        </div>
        {errors.location && <ErrorMessage />}
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
    </>
  );
};

export default Survey8_4;
