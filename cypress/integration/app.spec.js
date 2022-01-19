const addItem = (person) => {
  const { name, mbti } = person;
  cy.get("[data-cy-name=name]").type(`${name}`);
  cy.get("[data-cy-mbti=mbti]").type(`${mbti}{enter}`);
};

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("마우스 클릭으로 리스트 하나 추가하기", () => {
    // We'll store our item text in a variable so we can reuse it
    const name = "홍길동";
    const mbti = "ESFJ";
    cy.get("[data-cy-name=name]").type(`${name}`);
    cy.get("[data-cy-mbti=mbti]").type(`${mbti}`);

    cy.get(".btn-add").click();

    cy.get(".mbti-list>li")
      .last()
      .get(".mbti-list-name>span")
      .should("have.text", name);

    cy.get(".mbti-list>li")
      .last()
      .get(".mbti-list-mbti>span")
      .should("have.text", mbti);
  });

  it("엔터키로 리스트 하나 추가하고 카운트 체크", () => {
    addItem({ name: "홍길동", mbti: "ESFJ" });
    cy.get(".mbti-list-name>span").should("have.text", "홍길동");
    cy.get(".mbti-list-mbti>span").should("have.text", "ESFJ");
    cy.get(".mbti-count").should("have.text", "총 1명");
  });

  it("리스트 두 개 추가하고 카운트 체크", () => {
    // We'll store our item text in a variable so we can reuse it
    addItem({ name: "홍길동", mbti: "ESFJ" });
    addItem({ name: "용상윤", mbti: "infj" });
    cy.get(".mbti-list-name>span").should("have.text", "홍길동용상윤");
    cy.get(".mbti-list-mbti>span").should("have.text", "ESFJINFJ");
    cy.get(".mbti-count").should("have.text", "총 2명");
  });
});
