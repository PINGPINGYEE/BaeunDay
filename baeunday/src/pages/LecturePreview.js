import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/LecturePreview.css';
import backIcon from '../assets/images/Vector.svg';
import lectureIcon from '../assets/images/lecture.svg';
import warningIcon from '../assets/images/느낌표.svg';
import axios from 'axios';

const LecturePreview = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 강의정보 입력 상태
  const [formData, setFormData] = useState({
    title: '',
    startDateTime: '',
    endDateTime: '',
    deadline: '',
    fee: '',
    province: '',
    city: '',
    address: '',
    minP: '',
    maxP: '',
  });

  // 상세내용을 위한 별도의 상태
  const [detailContent, setDetailContent] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Survey8_5에서 전달받은 인원값 (location.state 사용)
  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        minP: location.state.minCapacity || '',
        maxP: location.state.maxCapacity || '',
      }));
    }
  }, [location.state]);

  // sessionStorage에 저장된 나머지 값들 (Survey8, Survey8_2, Survey8_3, Survey8_4) 불러오기
  useEffect(() => {
    // API 형식에 맞게 데이터 구성
    setFormData(prev => ({
      ...prev,
      startDateTime: sessionStorage.getItem('lecture_startDateTime'),
      endDateTime: sessionStorage.getItem('lecture_endDateTime'),
      deadline: sessionStorage.getItem('lecture_deadline'),
      fee: parseInt(sessionStorage.getItem('lecture_fee') || '0'),
      province: sessionStorage.getItem('lecture_province'),
      city: sessionStorage.getItem('lecture_city'),
      address: sessionStorage.getItem('lecture_address'),
      minP: parseInt(sessionStorage.getItem('lecture_minP') || '0'),
      maxP: parseInt(sessionStorage.getItem('lecture_maxP') || '0'),
    }));
  }, []);

  // GPT 응답을 주기적으로 확인
  useEffect(() => {
    let checkCount = 0;
    const maxChecks = 10;
    const checkGPTContent = setInterval(() => {
      const savedContent = localStorage.getItem('gptContent');
      if (savedContent) {
        setDetailContent(savedContent);
        
        // 강의 제목 추출 및 설정
        const titleMatch = savedContent.match(/\*\*강의 제목:\*\*\s*"([^"]+)"/);
        if (titleMatch && titleMatch[1]) {
          setFormData(prev => ({
            ...prev,
            title: titleMatch[1]
          }));
        } else {
          // 제목이 없으면 페이지 새로고침
          window.location.reload();
        }
        
        clearInterval(checkGPTContent);
      } else {
        checkCount++;
        if (checkCount >= maxChecks) {
          clearInterval(checkGPTContent);
          // 최대 시도 횟수 초과시에도 제목이 없으면 새로고침
          if (!formData.title) {
            window.location.reload();
          }
        }
      }
    }, 1000);
    return () => clearInterval(checkGPTContent);
  }, [formData.title]); // title 의존성 추가

  // 입력 필드가 비어있는지 확인하는 함수
  const isFieldEmpty = (value) => {
    return !value || value.trim() === '';
  };

  // 강의정보의 필수 필드만 체크
  const hasEmptyInfoFields = () => {
    return Object.values(formData).some(value => isFieldEmpty(value));
  };

  // 날짜와 시간을 표시 형식으로 변환하는 함수
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
      return timeStr ? `${formattedDate} ${timeStr}` : formattedDate;
    } catch (error) {
      console.error('날짜 변환 오류:', error);
      return '';
    }
  };

  // 신청하기 버튼 클릭 핸들러
  const handleSubmit = async () => {
    if (hasEmptyInfoFields() || !imageSelected || !detailContent) {
      setShowErrors(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      // FormData 생성
      const formData = new FormData();

      // 이미지 파일 추가
      if (selectedImage) {
        const imageFile = await fetch(selectedImage).then(r => r.blob());
        formData.append('image', imageFile);
      }

      // 강의 정보 객체 생성
      const lectureInfo = {
        title: formData.title,
        startDateTime: sessionStorage.getItem('lecture_startDateTime'),
        endDateTime: sessionStorage.getItem('lecture_endDateTime'),
        deadline: sessionStorage.getItem('lecture_deadline'),
        fee: parseInt(sessionStorage.getItem('lecture_fee') || '0'),
        province: sessionStorage.getItem('lecture_province'),
        city: sessionStorage.getItem('lecture_city'),
        address: sessionStorage.getItem('lecture_address'),
        minP: parseInt(sessionStorage.getItem('lecture_minP') || '0'),
        maxP: parseInt(sessionStorage.getItem('lecture_maxP') || '0'),
        content: detailContent,
        status: "ING",
        createdDate: new Date().toISOString()
      };

      console.log('전송할 데이터:', lectureInfo); // 데이터 확인용 로그

      // info JSON을 FormData에 추가
      formData.append('info', new Blob([JSON.stringify(lectureInfo)], { type: 'application/json' }));

      const response = await axios.post('https://mannajang.store/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('API 응답:', response); // 응답 확인용 로그

      if (response.status === 200) {
        alert('강의가 성공적으로 등록되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('강의 등록 실패:', error);
      alert('강의 등록에 실패했습니다.');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setImageSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="back-button" onClick={onClose}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1>강의 기획서 등록하기</h1>
      </div>

      <div className="preview-content">
        {/* 프로필 섹션 */}
        <div className="profile-section">
          <div 
            className={`thumbnail-box ${showErrors && !imageSelected ? 'error' : ''}`}
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="강의 포스터" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <>
                <img src={lectureIcon} alt="강의 포스터 등록" />
                <span>강의 포스터 등록</span>
              </>
            )}
          </div>
          {showErrors && !imageSelected && (
            <div className="error-message">
              <img src={warningIcon} alt="경고" />
              필수 입력 항목입니다.
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2>
            <span className="blue-text">컴공사이에피어난전쟁통</span>
            <span>님</span>
          </h2>
          <p>강의 기획서를 작성해 주세요</p>
        </div>

        {/* 강의 정보 섹션 */}
        <div className="section">
          <h3>강의정보<span className="required">*</span></h3>
          <div className="input-group">
            <label>제목</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={showErrors && isFieldEmpty(formData.title) ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>일시</label>
            <input 
              type="text" 
              value={formatDateTime(formData.startDateTime, sessionStorage.getItem('lecture_time'))}
              readOnly
              className={showErrors && !formData.startDateTime ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>기한</label>
            <input 
              type="text" 
              value={formatDateTime(formData.deadline)}
              readOnly
              className={showErrors && !formData.deadline ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>비용</label>
            <input 
              type="text" 
              value={formData.fee === 0 ? '무료' : `${formData.fee.toLocaleString()}원`}
              readOnly
              className={showErrors && formData.fee === undefined ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>장소</label>
            <input 
              type="text" 
              value={`${formData.province} ${formData.city} ${formData.address}`.trim()}
              readOnly
              className={showErrors && !formData.province ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>인원</label>
            <div className="people-inputs">
              <input 
                type="text" 
                value={formData.minP}
                onChange={(e) => setFormData({...formData, minP: e.target.value})}
                placeholder="최소 5명"
                className={showErrors && isFieldEmpty(formData.minP) ? 'error' : ''}
              />
              <input 
                type="text" 
                value={formData.maxP}
                onChange={(e) => setFormData({...formData, maxP: e.target.value})}
                placeholder="최대 30명"
                className={showErrors && isFieldEmpty(formData.maxP) ? 'error' : ''}
              />
            </div>
          </div>
        </div>

        {/* 상세 내용 섹션 */}
        <div className="section">
          <h3>상세내용<span className="required">*</span></h3>
          <div className="input-group">
            <textarea 
              value={detailContent}
              onChange={(e) => setDetailContent(e.target.value)}
              className={`details-textarea ${showErrors && isFieldEmpty(detailContent) ? 'error' : ''}`}
              placeholder="강의 상세 내용을 입력해주세요"
            />
          </div>
          {showErrors && isFieldEmpty(detailContent) && (
            <div className="info-error-message">
              <img src={warningIcon} alt="경고" />
              필수 입력 항목입니다.
            </div>
          )}
        </div>

        {/* 버튼 컨테이너 */}
        <div className="preview-button-container">
          <button 
            className="preview-button" 
            onClick={handleSubmit}
            disabled={hasEmptyInfoFields() || isFieldEmpty(detailContent)}
          >
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LecturePreview;
