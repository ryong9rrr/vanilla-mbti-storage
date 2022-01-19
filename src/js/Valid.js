export class Valid {
  constructor(name, mbti) {
    this.name = name;
    this.mbti = mbti;
  }

  isValidName = () => {
    // if 중복된 이름이 있으면 return false;
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
      return { ok: false, message: "이름과 mbti를 모두 입력해주세요." };

    if (!this.isValidMbti())
      return { ok: false, message: "올바른 mbti를 입력해주세요." };

    if (!this.isValidName())
      return { ok: false, message: "중복된 이름이 있어요." };
    return { ok: true, message: null };
  };
}
