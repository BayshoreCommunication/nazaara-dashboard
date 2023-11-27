import { TGetProduct } from "@/types/types";

const showLastNLeters = (str: TGetProduct[], n: number) => {
  // seperate the product slug using comma. then get the last 6 letters of each id and the last id will not have comma
  // only return max 3 products slug
  const strArray = str.map((elem) => "..." + elem.slug.slice(-n));
  const strArrayLength = strArray.length;
  if (strArrayLength === 0) {
    return "None";
  } else if (strArrayLength === 1) {
    return "[" + strArray[0] + "]";
  } else {
    const s = strArray.slice(0, 3).join(", ");
    return "[" + s + ", ...more]";
  }
};

export { showLastNLeters };
