import { $, formPreventDefault, makeLi } from "./ts/dom";
import store from "./ts/store";
import { EditResult, List, User, ValidResult } from "./ts/type";
import { editValue } from "./ts/utils";
import { Valid } from "./ts/valid";

class App {
  private users: User[];

  constructor() {
    this.users = [];

    if (store.getLocalStorage()) {
      this.users = store.getLocalStorage();
    }
  }

  run = (): void => {
    this.initEventListener();
    this.render();
  };

  protected render = () => {
    store.setLocalStorage(this.users);
    const list: List[] = this.users.map((user: User, index: number) =>
      makeLi(user, index)
    );
    $(".mbti-list").innerHTML = list.join("");
    $(".mbti-count").textContent = `총 ${this.users.length}명`;
  };

  protected addList = () => {
    const name = $("#form-name").value;
    const mbti = $("#form-mbti").value;
    // 유효성 검사
    const valid = new Valid(this.users.length + 1, name, mbti);
    const { ok, message }: ValidResult = valid.isValid();
    if (!ok) return alert(message);
    // 유효성 검사를 통과하면
    $("#form-name").value = $("#form-mbti").value = "";
    $("#form-name").focus();
    // 렌더링
    this.users.push({ name, mbti: mbti.toUpperCase() });
    return this.render();
  };

  protected editName = (e: MouseEvent) => {
    const { listId, newValue }: EditResult = editValue(e, "name");
    const valid = new Valid(listId, newValue, "");
    if (!valid.isValidName()) {
      return alert("중복된 이름이 있어요.");
    }
    this.users[listId].name = newValue;
    return this.render();
  };

  protected editMbti = (e: MouseEvent) => {
    const { listId, newValue }: EditResult = editValue(e, "mbti");
    const valid = new Valid(listId, "", newValue.toUpperCase());
    if (!valid.isValidMbti()) {
      return alert("올바른 mbti를 입력해주세요.");
    }
    this.users[listId].mbti = newValue.toUpperCase();
    return this.render();
  };

  protected removeList = (e: MouseEvent) => {
    if (confirm("정말 삭제할까요?")) {
      const listId = Number(e.target.closest("li").dataset.listId);
      this.users.splice(listId, 1);
      return this.render();
    }
  };

  // 이벤트
  protected initEventListener = () => {
    formPreventDefault();
    //추가
    $(".btn-add").addEventListener("click", this.addList);
    $("#form").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        return this.addList();
      }
    });
    //수정, 삭제
    $(".mbti-list").addEventListener("click", (e: MouseEvent) => {
      // 이름 수정
      if (e.target.classList.contains("btn-edit-name")) {
        return this.editName(e);
      }
      // mbti 수정
      if (e.target.classList.contains("btn-edit-mbti")) {
        return this.editMbti(e);
      }
      // 삭제
      if (e.target.classList.contains("btn-remove")) {
        return this.removeList(e);
      }
    });
  };
}

const app = new App();

document.addEventListener("DOMContentLoaded", app.run());
