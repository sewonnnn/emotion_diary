// 이미지를 불러오는 기능을 별도의 코드로 구현하여
// 이미지 관리 효율성 높임

// 경로 주의

import emotion1 from "../assets/emotion1.png";
import emotion2 from "../assets/emotion2.png";
import emotion3 from "../assets/emotion3.png";
import emotion4 from "../assets/emotion4.png";
import emotion5 from "../assets/emotion5.png";

//이미지들의 번호를 이용하여 불러올 이미지 선택하여 반환하는 함수
//App.jsx에서 이 함수를 사용하기 위해 export 키워드 사용
//리액트에서는 컴포넌트 밖으로 따로 export
export function getEmotionImage(emotionId) {
  switch (emotionId) {
    case 1:
      return emotion1;
    case 2:
      return emotion2;
    case 3:
      return emotion3;
    case 4:
      return emotion4;
    case 5:
      return emotion5;
    default:
      return null;
  }
}
