import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/applied.css';
import AppliedHeader from '../components/AppliedHeader';
import dropdownIcon from '../assets/images/dropdown.svg';
import questionIcon from '../assets/images/question.svg';
import ActionSheet from '../components/ActionSheet';
import mainEx1 from '../assets/examples/mainEx1.png';
import AppliedModal from '../components/AppliedModal';
import CancelConfirmModal from '../components/CancelConfirmModal';
import BottomNavigation from '../components/BottomNavigation';

const AppliedPage = () => {
  const navigate = useNavigate();
  const [activeAppliedFilter, setActiveAppliedFilter] = useState('전체');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  
  const [appliedLectures, setAppliedLectures] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastLectureElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchAppliedLectures();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchAppliedLectures = async (filter = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*'
        }
      };

      let url = 'https://mannajang.store/api/reserve';
      const params = new URLSearchParams();
      
      if (filter === '참가확정') {
        params.append('filter', 'CONFIRMED');
      } else if (filter === '결제예정') {
        params.append('filter', 'PAYMENT');
      }
      
      if (nextCursor) {
        params.append('cursorId', nextCursor);
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await axios.get(url, config);
      console.log('신청 강의 응답:', response.data);

      const newLectures = response.data.body || [];
      setAppliedLectures(prev => 
        nextCursor ? [...prev, ...newLectures] : newLectures
      );
      
      if (response.data.cursor) {
        setHasMore(response.data.cursor.hasNext);
        setNextCursor(response.data.cursor.nextCursor);
      } else {
        setHasMore(false);
        setNextCursor(null);
      }

    } catch (error) {
      console.error('신청 강의 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAppliedLectures([]);
    setNextCursor(null);
    setHasMore(true);
    fetchAppliedLectures(activeAppliedFilter);
  }, [activeAppliedFilter]);

  const handleAppliedFilterClick = () => {
    setSheetOpen(true);
  };

  const handleSelect = (value) => {
    setActiveAppliedFilter(value);
    setSheetOpen(false);
  };

  const sheetOptions = [
    { label: '전체', value: '전체', selected: activeAppliedFilter === '전체' },
    { label: '참가확정', value: '참가확정', selected: activeAppliedFilter === '참가확정' },
    { label: '결제예정', value: '결제예정', selected: activeAppliedFilter === '결제예정' }
  ];

  const handleLectureClick = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  const handleReviewClick = (lecture) => {
    navigate('/review', {
      state: { lecture }  // 강의 정보 전체를 전달
    });
  };

  const handleCancelClick = (lectureId) => {
    setSelectedLectureId(lectureId);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      const requestBody = {
        postId: selectedLectureId,
        reservationDate: new Date().toISOString()
      };
      
      // 신청 취소 요청
      const response = await axios.post(
        'https://mannajang.store/api/reserve',
        requestBody,
        config
      );

      if (response.status === 200) {
        console.log('✅ 강의 신청 취소 성공:', response.data);
        alert('신청이 취소되었습니다.');
        
        // 페이지 새로고침
        window.location.reload();
      }
    } catch (error) {
      console.error('❌ 신청 취소 실패:', error);
      alert('신청 취소에 실패했습니다.');
    } finally {
      setShowCancelModal(false);
    }
  };

  // D-day 계산 함수 추가
  const calculateDday = (startDate) => {
    const today = new Date();
    const lectureDate = new Date(startDate);
    const diffTime = lectureDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 음수일 경우 D+로 표시
    return diffDays < 0 ? `D+${Math.abs(diffDays)}` : `D-${diffDays}`;
  };

  return (
    <div className="applied-container">
      <AppliedHeader />

      <div className="applied-filter-wrap">
        <button 
          className="applied-filter-btn"
          onClick={handleAppliedFilterClick}
        >
          {activeAppliedFilter}
          <img src={dropdownIcon} alt="드롭다운" />
        </button>
        <img 
          src={questionIcon} 
          alt="도움말" 
          className="question-icon"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <main className="applied-content">
        {appliedLectures.length > 0 ? (
          appliedLectures.map((lecture, index) => (
            <div
              key={lecture.id}
              ref={index === appliedLectures.length - 1 ? lastLectureElementRef : null}
              className="applied-card"
              onClick={() => handleLectureClick(lecture.postId)}
            >
              <div className="applied-date-row">
                <div className="applied-date">
                  신청일 {new Date(lecture.reservationDate).toLocaleDateString('ko-KR', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
                <span className={`status-badge ${lecture.status === 'CONFIRMED' ? 'confirmed' : 'pending'}`}>
                  {lecture.status === 'CONFIRMED' ? '참가확정' : '결제예정'}
                </span>
              </div>
              <div className="applied-card-main">
                <div className="applied-card-image">
                  <img src={lecture.imgURL} alt={lecture.title} />
                </div>
                <div className="applied-card-info">
                  <h2>{lecture.title}</h2>
                  <p>
                    {lecture.province} {lecture.city} · {calculateDday(lecture.startDate)} · {lecture.fee.toLocaleString()}원
                  </p>
                </div>
              </div>
              <div className="applied-card-footer">
                <button 
                  className={`action-button ${
                    lecture.myStatus === 'REVIEWED' 
                      ? 'completed'
                      : lecture.myStatus === 'DONE' 
                        ? 'review' 
                        : 'cancel'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (lecture.myStatus === 'REVIEWED') {
                      // 이미 리뷰가 작성된 경우 클릭 불가
                      return;
                    } else if (lecture.myStatus === 'DONE') {
                      handleReviewClick(lecture);
                    } else {
                      handleCancelClick(lecture.postId);
                    }
                  }}
                  disabled={lecture.myStatus === 'REVIEWED'}
                >
                  {lecture.myStatus === 'REVIEWED' 
                    ? '후기 작성 완료' 
                    : lecture.myStatus === 'DONE' 
                      ? '후기 작성' 
                      : '신청 취소'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-lectures">
            <p>신청한 강의가 없습니다.</p>
          </div>
        )}
        {loading && <div className="loading">로딩 중...</div>}
      </main>

      {isSheetOpen && (
        <ActionSheet
          options={sheetOptions}
          onSelect={handleSelect}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {isModalOpen && <AppliedModal onClose={() => setIsModalOpen(false)} />}

      {showCancelModal && (
        <CancelConfirmModal 
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelConfirm}
        />
      )}

      <BottomNavigation />
    </div>
  );
};

export default AppliedPage; 