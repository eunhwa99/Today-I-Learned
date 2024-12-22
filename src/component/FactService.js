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
  loadFacts(state, dispatch);
  //   if (state.currentPage == 0) {
  //     // DB에서 꺼내오는 게 아니라 메모리에서 수동 조작
  //     setFacts((prevFacts) => {
  //       // 새로운 데이터를 추가하고, pageSize개 이상이면 가장 오래된 아이템을 삭제
  //       const updatedFacts = [data.item, ...prevFacts];

  //       if (updatedFacts.length > pageSize) {
  //         updatedFacts.pop(); // 배열의 마지막 요소(가장 오래된 아이템) 삭제
  //       }

  //       return updatedFacts;
  //     });
  //   }
  //   setCurrentPage(0); // DB에서 로드 후 페이지 0으로 설정
};

export const deleteFacts = async (id, state, dispatch) => {
  const data = await DELETEDATA(id);
  loadFacts(state, dispatch);
};
