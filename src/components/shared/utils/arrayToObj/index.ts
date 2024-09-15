import { Item } from "@shared/store/model";

const arrayToObj = (items: Item[]) => {
  return items.reduce(
    (acc, item) => {
      acc[item.key] = item.value;
      return acc;
    },
    {} as { [key: string]: string },
  );
};

export default arrayToObj;
