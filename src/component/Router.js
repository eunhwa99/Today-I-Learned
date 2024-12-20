export const FETCHDATA = (setFacts, page = 0, size = 10, category = "all") => {
  const url = `http://localhost:8080/til/items?page=${page}&size=${size}&category=${category}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setFacts(data); // 데이터를 상태에 설정
    })
    .catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
};

export const SAVEDATA = (newFact, setFacts) => {
  fetch("http://localhost:8080/til/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFact), // 서버에 보낼 데이터
  })
    .then((response) => response.json())
    .then((data) => {
      setFacts((prevFacts) => [...prevFacts, data]); // 새 아이템을 기존 리스트에 추가
    })
    .catch((error) => {
      console.error("There was an error posting the data!", error);
    });
};

export const UPDATEDATA = (id, key, data) => {
  // key와 data를 객체 형식으로 묶어보냄
  const requestData = {
    [key]: data, // key를 속성명으로, data를 값으로 설정
  };

  fetch(`http://localhost:8080/til/item?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData), // 객체를 JSON으로 변환하여 body로 전송
  }).catch((error) => {
    console.error("There was an error posting the data!", error);
  });
};

export const DELETEDATA = (id, setFacts) => {
  // DELETE 요청을 보내는 fetch
  fetch(`http://localhost:8080/til/item?id=${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Item deleted successfully");
        setFacts((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete item");
      }
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
    });
};
