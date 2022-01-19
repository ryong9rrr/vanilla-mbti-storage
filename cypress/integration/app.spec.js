const addItem = (name, mbti) => {
  cy.get("[data-cy-name=name]").type(`${name}`);
  cy.get("[data-cy-mbti=mbti]").type(`${mbti}{enter}`);
};

const checkName = (name) => cy.get(".mbti-list-name").should("have.text", name);

const checkMbti = (mbti) => cy.get(".mbti-list-mbti").should("have.text", mbti);

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  // 추가
  it("마우스 클릭으로 리스트 하나 추가하기", () => {
    // We'll store our item text in a variable so we can reuse it
    const name = "홍길동";
    const mbti = "ESFJ";
    cy.get("[data-cy-name=name]").type(`${name}`);
    cy.get("[data-cy-mbti=mbti]").type(`${mbti}`);

    cy.get(".btn-add").click();

    cy.get(".mbti-list>li")
      .last()
      .get(".mbti-list-name")
      .should("have.text", name);

    cy.get(".mbti-list>li")
      .last()
      .get(".mbti-list-mbti")
      .should("have.text", mbti);
  });

  it("엔터키로 리스트 하나 추가하고 카운트 체크", () => {
    addItem("홍길동", "ESFJ");
    checkName("홍길동");
    checkMbti("ESFJ");
    cy.get(".mbti-count").should("have.text", "총 1명");
  });

  it("올바르지 않은 mbti를 입력했을 때", () => {
    addItem("홍길동", "esfz");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("올바른 mbti를 입력해주세요.");
    });
  });

  it("리스트 두 개 추가하고 카운트 체크", () => {
    addItem("홍길동", "ESFJ");
    addItem("용상윤", "infj");
    checkName("홍길동용상윤");
    checkMbti("ESFJINFJ");
    cy.get(".mbti-count").should("have.text", "총 2명");
  });

  // 수정
  it("이름 수정하기", () => {
    addItem("홍길동", "ESFJ");
  });

  it("mbti 수정하기", () => {
    addItem("홍길동", "ESFJ");
  });
});
