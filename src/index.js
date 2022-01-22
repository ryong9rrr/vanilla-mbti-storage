import { $, formPreventDefault, makeLi } from "./js/dom.js";
import { Valid } from "./js/valid.js";
import store from "./js/store.js";

class App {
  constructor() {
    this._users = [];
    if (store.getLocalStorage()) {
      this._users = store.getLocalStorage();
    }
  }

  run = () => {
    this.#initEventListener();
    this.#render();
  };

  #countList = () =>
    ($(".mbti-count").textContent = `총 ${this._users.length}명`);

  #render = () => {
    store.setLocalStorage(this._users);
    const listTemplate = this._users
      .map((user, index) => makeLi(user, index))
      .join("");
    $(".mbti-list").innerHTML = listTemplate;
    this.#countList();
  };

  #editValue = (e, type) => {
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

  #addList = () => {
    const name = $("#form-name").value;
    const mbti = $("#form-mbti").value;
    // 유효성 검사
    const valid = new Valid(this._users.length + 1, name, mbti);
    const { ok, message } = valid.isValid();
    if (!ok) return alert(message);
    // 유효성 검사를 통과하면
    $("#form-name").value = $("#form-mbti").value = "";
    $("#form-name").focus();
    // 렌더링
    this._users.push({ name, mbti: mbti.toUpperCase() });
    return this.#render();
  };

  #editName = (e) => {
    const { listId, newValue } = this.#editValue(e, "name");
    const valid = new Valid(listId, newValue, "");
    if (!valid.isValidName()) {
      return alert("중복된 이름이 있어요.");
    }
    this._users[listId].name = newValue;
    return this.#render();
  };

  #editMbti = (e) => {
    const { listId, newValue } = this.#editValue(e, "mbti");
    const valid = new Valid(listId, "", newValue.toUpperCase());
    if (!valid.isValidMbti()) {
      return alert("올바른 mbti를 입력해주세요.");
    }
    this._users[listId].mbti = newValue.toUpperCase();
    return this.#render();
  };

  #removeList = (e) => {
    if (confirm("정말 삭제할까요?")) {
      const listId = Number(e.target.closest("li").dataset.listId);
      this._users.splice(listId, 1);
      return this.#render();
    }
  };

  #initEventListener = () => {
    formPreventDefault();
    //추가
    $(".btn-add").addEventListener("click", this.#addList);
    $("#form").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        return this.#addList();
      }
    });
    //수정, 삭제
    $(".mbti-list").addEventListener("click", (e) => {
      // 이름 수정
      if (e.target.classList.contains("btn-edit-name")) {
        return this.#editName(e);
      }
      // mbti 수정
      if (e.target.classList.contains("btn-edit-mbti")) {
        return this.#editMbti(e);
      }
      // 삭제
      if (e.target.classList.contains("btn-remove")) {
        return this.#removeList(e);
      }
    });
  };
}

const app = new App();

document.addEventListener("DOMContentLoaded", app.run());
