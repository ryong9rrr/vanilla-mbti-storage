import { EditResult } from "./type";

export const editValue = (e: MouseEvent, type: string): EditResult => {
  const parse = {
    ["name"]: "이름을",
    ["mbti"]: "MBTI를",
  };
  const listId = Number(e.target.closest("li").dataset.listId);
  const $element = e.target.closest("li").querySelector(`.mbti-list-${type}`);
  const newValue =
    prompt(`${parse[type]} 수정할까요?`, $element.textContent) ||
    $element.textContent;
  return { listId, newValue };
};
