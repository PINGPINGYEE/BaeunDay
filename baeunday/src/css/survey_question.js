import React from 'react';
import '../css/survey_question.css';

const SurveyQuestion = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-title">강의 기획서 생성 안내</div>
        <div className="modal-text">
          <p>'만나장'가 강사님의 강의 기획서 작성을 도와드려요!
          빈칸에 맞춰 입력한 후 '생성하기' 버튼을 누르시면 작성한 내용을 바탕으로 AI가 기획서를 만들어요.
          </p>
          <p>'직접 작성' 버튼은 AI 개입 없이 내용을 스스로 작성하실 수 있어요.</p>
        </div>
        <button className="modal-confirm-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SurveyQuestion;
