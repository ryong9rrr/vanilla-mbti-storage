const addItem = (name, mbti) => {
  cy.get("[data-cy-name=name]").type(`${name}`);
  cy.get("[data-cy-mbti=mbti]").type(`${mbti}{enter}`);
};

const checkName = (name) => cy.get(".mbti-list-name").should("have.text", name);

const checkMbti = (mbti) => cy.get(".mbti-list-mbti").should("have.text", mbti);

const checkCount = (n) =>
  cy.get(".mbti-count").should("have.text", `총 ${n}명`);

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
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
    checkCount(1);
  });

  it("올바르지 않은 mbti를 입력했을 때", () => {
    addItem("홍길동", "esfz");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("올바른 mbti를 입력해주세요.");
    });
  });

  it("중복된 이름을 추가했을 때", () => {
    addItem("홍길동", "ESFJ");
    addItem("홍길동", "ESFJ");
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`중복된 이름이 있어요.`);
    });
  });

  it("리스트 두 개 추가하고 카운트 체크", () => {
    addItem("홍길동", "ESFJ");
    addItem("용상윤", "infj");
    checkName("홍길동용상윤");
    checkMbti("ESFJINFJ");
    checkCount(2);
  });

  // 수정
  it("이름 수정하기", () => {
    addItem("홍길동", "ESFJ");
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns("용상윤");
      cy.get(".btn-edit-name").click();
    });
    checkName("용상윤");
  });

  it("이름 수정하려했다가 취소하기", () => {
    addItem("홍길동", "ESFJ");
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns(false);
      cy.get(".btn-edit-name").click();
    });
    checkName("홍길동");
  });

  it("중복된 이름으로 수정하기", () => {
    addItem("홍길동", "ESFJ");
    addItem("신짱구", "ESFJ");
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns("신짱구");
      cy.get("[data-list-id=0]>div>.btn-edit-name").click();
      cy.on("window:alert", (txt) => {
        expect(txt).to.contains("중복된 이름이 있어요.");
      });
    });
  });

  it("mbti 수정하기", () => {
    addItem("홍길동", "ESFJ");
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns("infj");
      cy.get(".btn-edit-mbti").click();
    });
    checkMbti("INFJ");
  });

  it("mbti 수정하려했다가 취소하기", () => {
    addItem("홍길동", "ESFJ");
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns(false);
      cy.get(".btn-edit-mbti").click();
    });
    checkMbti("ESFJ");
  });

  it("잘못된 mbti로 수정하기", () => {
    addItem("홍길동", "ESFJ");
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns("infz");
      cy.get(".btn-edit-mbti").click();
      cy.on("window:alert", (txt) => {
        expect(txt).to.contains("올바른 mbti를 입력해주세요.");
      });
    });
  });

  it("리스트 삭제하기", () => {
    addItem("홍길동", "ESFJ");
    checkCount(1);
    cy.get(".btn-remove").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(`정말 삭제할까요?`);
    });
    cy.on("window:confirm", () => true);
    checkCount(0);
  });

  it("리스트 삭제하려했다가 취소하기", () => {
    addItem("홍길동", "ESFJ");
    cy.get(".btn-remove").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(`정말 삭제할까요?`);
    });
    cy.on("window:confirm", () => false);
    checkName("홍길동");
    checkMbti("ESFJ");
    checkCount(1);
  });

  it("리스트 여러개 삭제하고 순서확인하기", () => {
    addItem("홍길동", "ESFJ");
    addItem("용상윤", "infj");
    addItem("노진구", "infp");
    addItem("신짱구", "ESFP");
    addItem("흰둥이", "intp");
    cy.get("[data-list-id=4]>.btn-remove").click();
    cy.get("[data-list-id=0]>.btn-remove").click();
    cy.get("[data-list-id=1]>.btn-remove").click();
    checkName("용상윤신짱구");
    checkMbti("INFJESFP");
    checkCount(2);
  });

  it("새로고침해서 데이터 남아있는지 확인하기", () => {
    addItem("홍길동", "ESFJ");
    addItem("용상윤", "infj");
    addItem("노진구", "infp");
    addItem("신짱구", "ESFP");
    addItem("흰둥이", "intp");
    cy.get("[data-list-id=4]>.btn-remove").click();
    cy.get("[data-list-id=0]>.btn-remove").click();
    cy.get("[data-list-id=1]>.btn-remove").click();
    checkName("용상윤신짱구");
    checkMbti("INFJESFP");
    checkCount(2);
    cy.reload();
    checkName("용상윤신짱구");
    checkMbti("INFJESFP");
    checkCount(2);
  });
});
