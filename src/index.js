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
        <div class="mbti-list-name">
          <span>${name}</span>
          <button class="btn-edit btn-edit-name shadow">수정</button>
        </div>
        <div class="mbti-list-mbti">
          <span>${mbti}</span>
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
    const { ok, message } = valid.isValid();
    if (!ok) return alert(message);
    const listTemplate = makeList(name, mbti.toUpperCase());
    $("#form-name").value = $("#form-mbti").value = "";
    $("#form-name").focus();
    $(".mbti-list").insertAdjacentHTML("beforeend", listTemplate);
    const count = $(".mbti-list").querySelectorAll("li").length;
    $(".mbti-count").textContent = `총 ${count}명`;
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
      console.log("이름 수정");
      return;
    }
    // mbti 수정
    if (e.target.classList.contains("btn-edit-mbti")) {
      console.log("mbti 수정");
    }
    // 삭제
    if (e.target.classList.contains("btn-delete")) {
      console.log("리스트 삭제");
    }
  });
}

App();
