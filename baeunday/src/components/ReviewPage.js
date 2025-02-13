import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6의 useNavigate 훅 import
import axios from 'axios';
import '../css/ReviewPage.css'; // CSS 파일 import
import reviewpagebackIcon from '../assets/images/Vector.svg';
import reviewstarIcon from '../assets/images/reviewstar.svg';
import reviewstarEmptyIcon from '../assets/images/reviewstar_empty.svg';
import reviewprofileImage from '../assets/examples/mainEx6.png'; // 경로 수정

const Review = ({ name, field, star, createdDate }) => {
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <img key={index} src={index < star ? reviewstarIcon : reviewstarEmptyIcon} alt="star" className="reviewpage-star" />
  ));

  // 날짜 포맷 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="reviewpage-review">
      <div className="reviewpage-user-info">
        <img src={reviewprofileImage} alt="Profile" className="reviewpage-profile-image" />
        <div className="reviewpage-name">{name}<span className="reviewpage-created-date">{formatDate(createdDate)}</span></div>
      </div>
      <div className="reviewpage-review-content">
        <div className="reviewpage-rating">{stars}</div>
        <p>{field}</p>
      </div>
    </div>
  );
};

function ReviewPage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용
  const [reviews, setReviews] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (currentCursor = null) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // 토큰 가져오기
      let url = 'http://43.202.15.40/api/review/me';
      
      if (currentCursor) {
        url += `?cursor=${currentCursor}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      
      if (currentCursor) {
        setReviews(prev => [...prev, ...data.body]);
      } else {
        setReviews(data.body);
      }
      
      setHasMore(data.cursor.hasNext);
      setCursor(data.cursor.nextCursor);
    } catch (error) {
      console.error('리뷰를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchReviews(cursor);
    }
  };

  return (
    <div>
      <div className="review-page-header">
        <button className="review-page-back-button" onClick={() => navigate('/mypage')}>
          <img src={reviewpagebackIcon} alt="Back" />
        </button>
        <div className="review-page-title">받은 평가</div>
      </div>

      <div className="reviewpage">
        {reviews.map((review) => (
          <Review key={review.review_id} {...review} />
        ))}
        {hasMore && (
          <button 
            onClick={loadMore} 
            disabled={loading}
            className="load-more-button"
          >
            {loading ? '로딩 중...' : '더 보기'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
