import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import navHome from '../assets/images/nav-home.svg';
import navPost from '../assets/images/nav-post.svg';
import navHeart from '../assets/images/nav-heart.svg';
import navPerson from '../assets/images/nav-person.svg';
import '../css/bottomNavigation.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavStyle = (path) => {
    return {
      opacity: currentPath === path ? 1 : 0.6,
      color: '#323E36'
    };
  };

  const handlePlusClick = () => {
    navigate('/survey');
  };

  return (
    <nav className="bottom-nav">
      <button 
        className="nav-item" 
        onClick={() => navigate('/mainpage')}
        style={getNavStyle('/mainpage')}
      >
        <img src={navHome} alt="홈" />
        <span>홈</span>
      </button>
      
      <button 
        className="nav-item" 
        onClick={() => navigate('/applied')}
        style={getNavStyle('/applied')}
      >
        <img src={navPost} alt="신청한" />
        <span>신청한</span>
      </button>

      <button 
        className="nav-item plus"
        onClick={handlePlusClick}
      >
        <div className="plus-circle">
          <span>+</span>
        </div>
      </button>

      <button 
        className="nav-item" 
        onClick={() => navigate('/wishlist')}
        style={getNavStyle('/wishlist')}
      >
        <img src={navHeart} alt="찜" />
        <span>찜</span>
      </button>

      <button 
        className="nav-item" 
        onClick={() => navigate('/mypage')}
        style={getNavStyle('/mypage')}
      >
        <img src={navPerson} alt="내 정보" />
        <span>내 정보</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;