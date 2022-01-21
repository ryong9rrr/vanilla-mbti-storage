const store = {
  setLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("users"));
  },
};

export default store;
