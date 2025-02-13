import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from "../assets/images/left-arrow.svg";
import tripleIcon from "../assets/images/triple-bar.svg";
import jjimIcon from "../assets/images/jjim.svg";
import '../css/headerComponent.css';
import jjimedIcon from "../assets/images/jjimed.svg";

const LectureHeader = ({ isInstructor, isHearted, onHeartClick, lectureId }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const handleMenuClick = () => {
    setShowActions(true);
  };

  const handleActionSelect = (action) => {
    switch (action) {

      case '삭제':
        console.log('삭제하기');
        break;
      default:
        break;
    }
    setShowActions(false);
  };

  return (
    <>
      <header className="lecture-detail-header">
        <div className="lecture-header-left">
          <button onClick={() => navigate(-1)} className="lecture-back-button">
            <img src={backIcon} alt="뒤로가기" className="back-icon" />
          </button>
        </div>
        <div className="lecture-header-right">
          {isInstructor ? (
            <button className="lecture-menu-button" onClick={handleMenuClick}>
              <img src={tripleIcon} alt="메뉴" id="lecture-menu-icon" />
            </button>
          ) : (
            <button className="lecture-menu-button" onClick={onHeartClick}>
              <img 
                src={isHearted ? jjimedIcon : jjimIcon} 
                alt={isHearted ? "찜됨" : "찜하기"} 
                id="lecture-jjim-icon" 
              />
            </button>
          )}
        </div>
      </header>

      {showActions && isInstructor && (
        <div className="action-sheet-overlay" onClick={() => setShowActions(false)}>
          <div className="action-sheet" onClick={e => e.stopPropagation()}>
            
            <button 
              className="action-button delete"
              onClick={() => handleActionSelect('삭제')}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LectureHeader;