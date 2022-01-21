import store from "./store.js";

const returnResult = (ok, message = null) => ({
  ok,
  message,
});

export class Valid {
  constructor(id, name, mbti) {
    this.id = id;
    this.name = name;
    this.mbti = mbti;
  }

  isValidName = () => {
    const data = store.getLocalStorage();
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (this.id !== i && this.name === data[i].name) return false;
      }
    }
    return true;
  };

  isValidMbti = () => {
    if (this.mbti.length !== 4) return false;
    const mbti = this.mbti.toUpperCase();
    const [a, b, c, d] = Array.from(mbti);
    if (
      !(a === "E" || a == "I") ||
      !(b === "N" || b == "S") ||
      !(c === "F" || c == "T") ||
      !(d === "J" || d == "P")
    )
      return false;
    return true;
  };

  isValid = () => {
    if (this.name == "" || this.mbti == "")
      return returnResult(false, "이름과 mbti를 모두 입력해주세요.");

    if (!this.isValidMbti())
      return returnResult(false, "올바른 mbti를 입력해주세요.");

    if (!this.isValidName())
      return returnResult(false, "중복된 이름이 있어요.");
    return returnResult(true);
  };
}
