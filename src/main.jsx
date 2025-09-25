// BrowserRouter 컴포넌트를 리액트 라우터 돔에서 불러오기
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // BrowserRouter는 브라우저의 현재 주소를 저장하고 감지하는 역할
  // 리액트 앱 컴포넌트의 모든 컴포넌트들이 현재 브라우저의 주소를 불러와서 사용하고
  // 변화를 감지할 수 있도록 처리
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
