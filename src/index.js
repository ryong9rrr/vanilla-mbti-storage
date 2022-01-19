import { $ } from "./js/DOM.js";
import { Valid } from "./js/Valid.js";

function App() {
  const formPreventDefault = () => {
    return $("#form").addEventListener("submit", (e) => {
      e.preventDefault();
    });
  };

  const makeList = (name, mbti) => {
    return `
      <li>
        <div>
          <span class="mbti-list-name">${name}</span>
          <button class="btn-edit btn-edit-name shadow">수정</button>
        </div>
        <div>
          <span class="mbti-list-mbti">${mbti}</span>
          <button class="btn-edit btn-edit-mbti shadow">수정</button>
        </div>
        <button class="btn-delete shadow">삭제</button>
      </li>
    `;
  };

  const addList = () => {
    const name = $("#form-name").value;
    const mbti = $("#form-mbti").value;
    const valid = new Valid(name, mbti);
    // 유효성 검사
    const { ok, message } = valid.isValid();
    if (!ok) return alert(message);
    // 리스트 추가
    const listTemplate = makeList(name, mbti.toUpperCase());
    $("#form-name").value = $("#form-mbti").value = "";
    $("#form-name").focus();
    $(".mbti-list").insertAdjacentHTML("beforeend", listTemplate);
    // 카운트
    const count = $(".mbti-list").querySelectorAll("li").length;
    $(".mbti-count").textContent = `총 ${count}명`;
  };

  const editValue = (e, type) => {
    const parse = {
      ["name"]: "이름을",
      ["mbti"]: "MBTI를",
    };
    const $element = e.target.closest("li").querySelector(`.mbti-list-${type}`);
    const newValue =
      prompt(`${parse[type]} 수정할까요?`, $element.textContent) ||
      $element.textContent;
    return { $element, newValue };
  };

  const editName = (e) => {
    const { $element, newValue } = editValue(e, "name");
    const valid = new Valid(newValue, "");
    if (!valid.isValidName()) {
      return alert("중복된 이름이 있어요.");
    }
    $element.textContent = newValue;
  };

  const editMbti = (e) => {
    const { $element, newValue } = editValue(e, "mbti");
    const valid = new Valid("", newValue.toUpperCase());
    if (!valid.isValidMbti()) {
      return alert("올바른 mbti를 입력해주세요.");
    }
    $element.textContent = newValue.toUpperCase();
  };

  const removeList = (e) => {
    console.log("리스트 삭제");
  };

  // 이벤트

  formPreventDefault();

  //추가
  $(".btn-add").addEventListener("click", addList);
  $("#form").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addList();
    }
  });

  //수정, 삭제
  $(".mbti-list").addEventListener("click", (e) => {
    // 이름 수정
    if (e.target.classList.contains("btn-edit-name")) {
      return editName(e);
    }
    // mbti 수정
    if (e.target.classList.contains("btn-edit-mbti")) {
      return editMbti(e);
    }
    // 삭제
    if (e.target.classList.contains("btn-delete")) {
      return removeList(e);
    }
  });
}

App();
