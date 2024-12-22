import { SAVEDATA, FETCHDATA, DELETEDATA } from "./Router.js";

export const loadFacts = async (state, dispatch) => {
  dispatch({ type: "FETCH_REQUEST" });

  try {
    // 데이터를 불러오는 API 호출
    const data = await FETCHDATA(
      state.currentPage,
      state.pageSize,
      state.currentCategory
    );

    // 성공적으로 데이터를 불러왔을 때
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (err) {
    // 실패했을 때
    dispatch({ type: "FETCH_FAILURE", error: err.message });
  }
};

export const saveFacts = async (newData, state, dispatch) => {
  const data = await SAVEDATA(newData);
  if (state.category !== "all") {
    dispatch({ type: "SET_CATEGORY", category: "all" });
  } else {
    if (state.currentPage !== 0) {
      dispatch({ type: "SET_PAGE", page: 0 });
    } else {
      loadFacts(state, dispatch);
    }
  }
};

export const deleteFacts = async (id, state, dispatch) => {
  const data = await DELETEDATA(id);
  loadFacts(state, dispatch);
};
