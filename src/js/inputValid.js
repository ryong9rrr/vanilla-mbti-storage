// 유효한 mbti인지
function validMBTI(strings) {
  if (strings.length !== 4) return false;
  const mbti = strings.toUpperCase();
  const [a, b, c, d] = Array.from(mbti);
  if (
    !(a === "E" || a == "I") ||
    !(b === "N" || b == "S") ||
    !(c === "F" || c == "T") ||
    !(d === "J" || a == "P")
  )
    return false;
  return true;
}
