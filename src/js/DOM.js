export const $ = (selector) => document.querySelector(selector);

export const makeLi = (user, index) => {
  return `
      <li data-list-id="${index}">
        <div>
          <span class="mbti-list-name">${user.name}</span>
          <button class="btn-edit btn-edit-name shadow">수정</button>
        </div>
        <div>
          <span class="mbti-list-mbti">${user.mbti}</span>
          <button class="btn-edit btn-edit-mbti shadow">수정</button>
        </div>
        <button class="btn-remove shadow">삭제</button>
      </li>
    `;
};

export const formPreventDefault = () => {
  return $("#form").addEventListener("submit", (e) => e.preventDefault());
};
