import { useEffect } from "react";

const usePageTitle = (title) => {
  //현재 html이 하나만 있으므로 document를 사용하면 index.html을 가리킴
  // const t = document.getElementsByTagName("title");
  // console.log(t); //HTMLCollection라는  유사 배열 형태 반환
  // console.log(t[0]); //<title>감정일기장</title>
  // console.log(t[0].innerText); //감정일기장

  useEffect(() => {
    // document.getElementsByTagName("title")은 HTML안의 <title> 태그를 모두 찾아서 가져옴
    // t[0]은 첫 번째 <title> 요소
    // t[0].innerText는 <title>안에 보이는 텍스트
    // innerText는 해당 요소 안의 텍스트 내용을 변경
    const $title = document.getElementsByTagName("title")[0]; //왜 title의 글자가 [0]에 해당?
    $title.innerText = title;
  }, [title]);
};
export default usePageTitle;
