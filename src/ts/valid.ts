import store from "./store";
import { User, ValidResult } from "./type";

const validResult = (
  ok: boolean,
  message: string | null = null
): ValidResult => ({
  ok,
  message,
});
export class Valid {
  id: number;
  name: string;
  mbti: string;

  constructor(id: number, name: string, mbti: string) {
    this.id = id;
    this.name = name;
    this.mbti = mbti;
  }

  isValidName = (): boolean => {
    const data: User[] = store.getLocalStorage();
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (this.id !== i && this.name === data[i].name) return false;
      }
    }
    return true;
  };

  isValidMbti = (): boolean => {
    if (this.mbti.length !== 4) return false;
    const mbti: string = this.mbti.toUpperCase();
    const [a, b, c, d]: string[] = Array.from(mbti);
    if (
      !(a === "E" || a == "I") ||
      !(b === "N" || b == "S") ||
      !(c === "F" || c == "T") ||
      !(d === "J" || d == "P")
    )
      return false;
    return true;
  };

  isValid = (): ValidResult => {
    if (this.name == "" || this.mbti == "")
      return validResult(false, "이름과 mbti를 모두 입력해주세요.");

    if (!this.isValidMbti())
      return validResult(false, "올바른 mbti를 입력해주세요.");

    if (!this.isValidName()) return validResult(false, "중복된 이름이 있어요.");
    return validResult(true);
  };
}
