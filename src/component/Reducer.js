const initialState = {
  facts: [],
  isLoading: false,
  error: null,
  currentPage: 0,
  currentCategory: "all",
  pageSize: 5,
  totalElements: 0,
};

function factsReducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        facts: action.payload.items,
        totalElements: action.payload.totalCount,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.error };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_CATEGORY":
      return { ...state, currentCategory: action.category };
    default:
      return state;
  }
}

export { initialState, factsReducer };
