import "./Button.css";

// text : 버튼에 쓰여질 글자를 받음
// type : 클래스를 개별적으로 지정하기 위해 받는 props(긍정, 일반, 부정 타입으로 설정) - css구현
// onClick : 버튼 클릭시 실행될 이벤트 핸들러 전달 받는 props

const Button = ({ text, type, onClick }) => {
  return (
    // 외부에서 전달받은 props를 이용하여 버튼 설정
    <button onClick={onClick} className={`Button Button_${type}`}>
      {/* type은 정의되어있지 않지만 오류x
     => className은 CSS를 위한 것이기 때문에  앞쪽의 ClassName이 적용 */}
      {text}
    </button>
  );
};

export default Button;
