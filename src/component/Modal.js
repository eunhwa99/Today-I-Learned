import "../css/style.css";

// 모달 컴포넌트
function Modal({ fact, userNote, onNoteChange, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Fact Details</h2>
        <p>
          <strong>Text:</strong> {fact.text}
        </p>
        <p>
          <strong>Source:</strong>{" "}
          <a href={fact.source} target="_blank" rel="noopener noreferrer">
            {fact.source}
          </a>
        </p>
        <p>
          <strong>Created In:</strong> {fact.createdIn}
        </p>

        <h3 className="note-title">NOTE</h3>
        <div className="note-container">
          <textarea
            value={userNote}
            onChange={onNoteChange}
            placeholder="Write your detailed note here..."
            rows="5"
            style={{ width: "100%" }}
          />
          <button
            onClick={() => {
              //alert("Saved!!");
              onClose();
            }}
            className="save-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
