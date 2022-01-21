import { User } from "./type";

const store = {
  setLocalStorage(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  },
  getLocalStorage(): User[] {
    return JSON.parse(localStorage.getItem("users"));
  },
};

export default store;
