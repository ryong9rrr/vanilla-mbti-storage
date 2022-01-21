import { $ } from "./js/DOM.js";
import { Valid } from "./js/Valid.js";

const store = {
  setLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("users"));
  },
};

function App() {
  this.users = [];
  this.init = () => {
    if (store.getLocalStorage() && store.getLocalStorage().length > 0) {
      this.users = store.getLocalStorage();
    }
    render();
  };
  const formPreventDefault = () => {
    return $("#form").addEventListener("submit", (e) => {
      e.preventDefault();
    });
  };

  const makeLi = (user, index) => {
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

  const countList = () => {
    const count = $(".mbti-list").querySelectorAll("li").length;
    $(".mbti-count").textContent = `총 ${count}명`;
  };

  const render = () => {
    store.setLocalStorage(this.users);
    const listTemplate = this.users
      .map((user, index) => makeLi(user, index))
      .join("");
    $(".mbti-list").innerHTML = listTemplate;
    countList();
  };

  const addList = () => {
    const name = $("#form-name").value;
    const mbti = $("#form-mbti").value;
    // 유효성 검사
    const newId = $(".mbti-list").querySelectorAll("li").length + 1;
    const valid = new Valid(newId, name, mbti);
    const { ok, message } = valid.isValid();
    if (!ok) return alert(message);
    // 유효성 검사를 통과하면
    $("#form-name").value = $("#form-mbti").value = "";
    $("#form-name").focus();
    // 렌더링
    this.users.push({ name, mbti: mbti.toUpperCase() });
    render();
  };

  const editValue = (e, type) => {
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

  const editName = (e) => {
    const { listId, newValue } = editValue(e, "name");
    const valid = new Valid(listId, newValue, "");
    if (!valid.isValidName()) {
      return alert("중복된 이름이 있어요.");
    }
    this.users[listId].name = newValue;
    render();
  };

  const editMbti = (e) => {
    const { listId, newValue } = editValue(e, "mbti");
    const valid = new Valid(listId, "", newValue.toUpperCase());
    if (!valid.isValidMbti()) {
      return alert("올바른 mbti를 입력해주세요.");
    }
    this.users[listId].mbti = newValue.toUpperCase();
    render();
  };

  const removeList = (e) => {
    if (confirm("정말 삭제할까요?")) {
      const listId = Number(e.target.closest("li").dataset.listId);
      this.users.splice(listId, 1);
      render();
    }
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
    if (e.target.classList.contains("btn-remove")) {
      return removeList(e);
    }
  });
}

const app = new App();
app.init();
