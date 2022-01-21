export type User = {
  name: string;
  mbti: string;
};

export type List = string;

export type EditResult = {
  listId: number;
  newValue: string;
};

export type ValidResult = {
  ok: boolean;
  message: string | null;
};
