export const CSS_PRESETS = [
  {
    id: "card",
    name: "프로필 카드 스타일",
    css: `display: flex;
flex-direction: column;
align-items: center;
padding: 24px;
background-color: #ffffff;
border-radius: 12px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
width: 320px;`,
  },
  {
    id: "button",
    name: "프라이머리 버튼",
    css: `display: inline-flex;
align-items: center;
justify-content: center;
padding: 12px 24px;
background-color: #3b82f6;
color: #ffffff;
border-radius: 8px;
font-weight: 600;
cursor: pointer;`,
  },
  {
    id: "layout",
    name: "반응형 그리드 레이아웃",
    css: `display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
padding: 20px;
width: 100%;`,
  },
];
