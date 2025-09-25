import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off", // 안쓰는 변수 경고처리 수정
      "react/prop-type": "off", // 변수의 타입을 체크 -> 안정성 높아짐
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
      "react-hooks/exhaustive-deps": "off", // 의존성 배열 경고 끄기
    },
  },
];
