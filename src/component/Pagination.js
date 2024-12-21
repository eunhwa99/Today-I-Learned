import "../css/Page.css";
function Pagination({ currentPage, setCurrentPage, totalPages }) {
  if (totalPages === 0) totalPages = 1;

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1); // 이전 페이지로 이동
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1); // 다음 페이지로 이동
    }
  };

  return (
    <div className="pagination-container">
      <a
        href="#"
        className={`previous ${currentPage === 0 ? "disabled" : ""}`}
        onClick={handlePrevPage}
        aria-disabled={currentPage === 0}
      >
        &#8249;
      </a>
      <span className="page-info">
        Page {currentPage + 1} of {totalPages}
      </span>
      <a
        href="#"
        className={`next ${currentPage === totalPages - 1 ? "disabled" : ""}`}
        onClick={handleNextPage}
        aria-disabled={currentPage === totalPages - 1}
      >
        &#8250;
      </a>
    </div>
  );
}

export default Pagination;
