import { $, formPreventDefault, makeLi } from "./js/dom.js";
import { Valid } from "./js/valid.js";
import { editValue } from "./js/utils.js";
import store from "./js/store.js";

function App() {
  this.users = [];
  this.init = () => {
    if (store.getLocalStorage()) {
      this.users = store.getLocalStorage();
    }
    initEventListener();
    render();
  };

  const render = () => {
    store.setLocalStorage(this.users);
    const listTemplate = this.users
      .map((user, index) => makeLi(user, index))
      .join("");
    $(".mbti-list").innerHTML = listTemplate;
    $(".mbti-count").textContent = `총 ${this.users.length}명`;
  };

  const addList = () => {
    const name = $("#form-name").value;
    const mbti = $("#form-mbti").value;
    // 유효성 검사
    const valid = new Valid(this.users.length + 1, name, mbti);
    const { ok, message } = valid.isValid();
    if (!ok) return alert(message);
    // 유효성 검사를 통과하면
    $("#form-name").value = $("#form-mbti").value = "";
    $("#form-name").focus();
    // 렌더링
    this.users.push({ name, mbti: mbti.toUpperCase() });
    return render();
  };

  const editName = (e) => {
    const { listId, newValue } = editValue(e, "name");
    const valid = new Valid(listId, newValue, "");
    if (!valid.isValidName()) {
      return alert("중복된 이름이 있어요.");
    }
    this.users[listId].name = newValue;
    return render();
  };

  const editMbti = (e) => {
    const { listId, newValue } = editValue(e, "mbti");
    const valid = new Valid(listId, "", newValue.toUpperCase());
    if (!valid.isValidMbti()) {
      return alert("올바른 mbti를 입력해주세요.");
    }
    this.users[listId].mbti = newValue.toUpperCase();
    return render();
  };

  const removeList = (e) => {
    if (confirm("정말 삭제할까요?")) {
      const listId = Number(e.target.closest("li").dataset.listId);
      this.users.splice(listId, 1);
      return render();
    }
  };

  // 이벤트
  const initEventListener = () => {
    formPreventDefault();
    //추가
    $(".btn-add").addEventListener("click", addList);
    $("#form").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        return addList();
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
  };
}

const app = new App();
app.init();
