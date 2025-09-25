export const getStringDate = (targetDate) => {
  // Date 객체를 yyyy-MM-dd 형식으로 변환
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  // 월과 일이 한자리 수라면 앞에 0 붙이기
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
