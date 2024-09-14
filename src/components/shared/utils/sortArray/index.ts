import { HistoryRequest } from "@shared/store/slices/historySlice";

export const sortArrayDate = (arr: HistoryRequest[]) => {
  const newArr = [...arr];
  return newArr.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};
