export const toCapitalize = (str: string) => {
  //   split the string by space and then map over it and return the first letter of each word uppercased and other letters lowercased and then join them back
  return (
    str &&
    str
      .trim()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  );
};
