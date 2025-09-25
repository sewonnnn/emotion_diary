import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { createContext, useReducer, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

// 실제 일기 데이터를 관리하기 위한 함수
// state에는 data가 저장, action에는 dispatch로 전달한 매개변수 저장
function reducer(state, action) {
  let nextState; // 추가, 수정, 삭제 후 변경된 스테이트를 저장하기 위한 변수
  switch (action.type) {
    // 기존의 일기 목록을 보여주기 위한 INIT ,action.data === parseData(로컬스토리지에서 가져온 기존의 일기 객체들)
    case "INIT":
      return action.data;
    case "CREATE": // 일기 데이터 추가하는 액션
      nextState = [action.data, ...state]; // 기존 상태에 새로운 데이터를 앞에 추가한 것을 nextState에 저장
      break;
    case "UPDATE":
      nextState = state.map((data) =>
        // 각 일기의 id와 수정할 일기 id를 비교하여
        // 일치하면 전달받은 데이터로 값을 변경
        String(data.id) === String(action.data.id) ? action.data : data
      );
      break;
    case "DELETE":
      // 삭제 요청이 발생한 일기 id와 기존에 일기들의 id를 비교하여
      // 다른 id를 가진 일기들만 새로운 배열로 반환
      nextState = state.filter((data) => String(data.id) !== String(action.id));
      break;
    default:
      // 정의 되지 않은 action.type이면 현재 상태 그대로 반환
      return state;
  }
  //일기가 생성, 수정, 삭제될때마다 일기의 현재 데이터를 바로바로
  // 로컬 스토리지에 저장
  //stringify(스트링어파이)
  localStorage.setItem("diary", JSON.stringify(nextState)); //diary라는 키로 nextState객체를 저장(객체 저장시 문자로 바꿔주어야함)
  return nextState;
}

// Context 사용 이유: 모든 컴포넌트에 공유하기 위해서
// 일기 데이터 관리하는 Context 생성(상태값 변화)
export const DiaryStateContext = createContext();

// CRUD 기능을 하는 함수관리하는 Context 생성
//  (상태값이 변화x 데이터가 들어감 -> 리렌더링이 안되는 것들만 묶기 위함)
export const DiaryDispatchContext = createContext();

// 1. "/": 모든 일기를 조회하는 Home페이지
// 2. "/new": 새로운 일기를 작성하는 New페이지
// 3. "/diary": 일기를 상세히 조회하는 Diary페이지

function App() {
  //일기 객체들을 저장하고 값이 변할 때마다 리렌더링
  const [data, dispatch] = useReducer(reducer, []); //배열안에 일기값을 넣기 때문에 빈배열로 해줌

  // 로컬 스토리지에서 값을 가져오기 전에 다른 페이지 컴포넌트들이 렌더링 되면 문제 발생
  // ex) 일기 상세보기 페이지에서 새로고침하면 없는 일기라고 뜨는 문제 발생
  // 따라서 로딩기능을 만들 필요가 있음. ->  로딩 여부를 저장하는 state를 추가
  const [isLoading, setIsLoading] = useState(true); //현재 로딩 중 true
  //일기의 id를 관리하기 위한 변수선언
  const idRef = useRef(0); // 리액트 변수이므로 새로고침 or 웹브라우저 재시작시 초기화 발생

  //컴퍼넌트가 마운트 되었을 때 딱 한번만 로컬 스토리지에서 값을 받아오도록 처리
  //로컬 스토리지에서 값을 받아와서 첫 화면에 그 값들(데이터 객체)를 뿌림(사용자에게는 기존의 일기 목록이 뜸)
  useEffect(() => {
    // getItem은 값을 "읽기"만 함. 삭제되지 않음.
    const storedData = localStorage.getItem("diary"); // diary라는 키로 일기들이 저장되어있음
    if (!storedData) {
      //데이터가 없다면 (null), 그냥 setIsLoading(false)로 로딩 종료
      setIsLoading(false); // 데이터가 없기 때문에 로딩 종료
      return;
    }

    const parseData = JSON.parse(storedData); //웹스토리지에 저장된 문자열 형태의 일기 데이터를 객체로 변환

    let maxId = 0; // id 최대값 저장을 위한 변수
    //maxId를 설정하기 전,  새로고침, 다시시작한 후 글을 수정하게 되면 idRef의 값은 0으로 초기화 되어있는 상태이기 때문에
    //수정된 글의 아이디는 다시 0이 되어버림, 충돌이 일어남
    //최대값을 찾아서 저장해야 새로고침, 다시시작해도 id가 유지되도록함
    //ex) id의 최대값이 2라면, 그 다음에 올 글은 그 최대값의 +1 이 되어 등록됨
    parseData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id;
      }
    });

    //새로고침 후 수정할 때 사용되는 값(새로고침 시 딱 한번만 실행)
    idRef.current = maxId + 1; // 새 일기의 id지정

    // 기존에 웹스토리지에 저장된 일기 데이터를 reducer() 전달
    // 기존의 일기 목록을 보여주기 위한 dispatch
    dispatch({
      type: "INIT",
      data: parseData, //localStorage에서 가져온 데이터의 객체
    });
    //디스패치함수가 실행되어 데이터 스테이트의 초기값을 설정한 뒤 로딩 종료 처리 필요
    setIsLoading(false);
  }, []); // 마운트 될때만 실행되도록 deps를 빈배열로 지정

  //새 일기 작성
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // id 자동 부여
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...🔍</div>;
  }

  return (
    <>
      {/* <button
        onClick={() => {
          onCreate(new Date().getTime(), 5, "힘듦");
        }}
      >
        일기 추가 테스트 버튼
      </button>

      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 3, "수정된 일기 입니다");
        }}
      >
        1번 일기 수정 테스트 버튼
      </button>

      <button
        onClick={() => {
          onDelete(1);
        }}
      >
        1번일기 삭제 테스트 버튼
      </button> */}

      {/*😘 2번 Context 활용하기 😘*/}
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          {/*😘 1번 페이지 라우팅 😘*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
