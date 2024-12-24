import "../css/Modal.css";
import { formatCreatedIn } from "./Util";
import { FaSearch } from "react-icons/fa"; // 아이콘 라이브러리

function Modal({ fact, userNote, onNoteChange, onClose }) {
  // 자세히 보기 버튼 클릭 시 팝업 띄우기 (임시로 alert 사용)
  const handleViewPostClick = () => {
    alert(fact.text); // 나중에 모달을 사용해 내용 보여주기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>TIL Details</h2>

        <div className="meta-data-section">
          <p className="item-text">{fact.text}</p>
          <div className="meta-data-wrapper">
            <p className="item-detail">
              <strong>Source:</strong>
              <a
                href={fact.source}
                target="_blank"
                rel="noopener noreferrer"
                className="item-source"
              >
                {fact.source}
              </a>
            </p>
            <p className="item-detail">
              <strong>Created:</strong> {formatCreatedIn(fact.createdIn)}
            </p>
          </div>
        </div>

        {/* NOTE 영역 */}
        <h3 className="note-title">
          NOTE
          <button onClick={handleViewPostClick} className="view-post-btn">
            <FaSearch />
          </button>
        </h3>
        <div className="note-container">
          <textarea
            value={userNote}
            onChange={onNoteChange}
            placeholder="Write your detailed note here..."
            rows="5"
            className="note-textarea"
          />
        </div>

        {/* 버튼들 */}
        <div className="modal-actions">
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
