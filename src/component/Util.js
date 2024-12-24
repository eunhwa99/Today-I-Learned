export const formatCreatedIn = (dateString) => {
  // "T"를 기준으로 날짜와 시간을 분리하고, 초까지만 추출
  return (
    dateString.split("T")[0] + " " + dateString.split("T")[1].substring(0, 8)
  );
};
