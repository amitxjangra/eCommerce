export const searchAlgorithm = (arr, search) => {
  let searchSubString = search.split(" ");
  return arr.filter((itm) => {
    if (
      searchSubString.find((i) =>
        itm.title.toLowerCase().includes(i.toLowerCase())
      )
    )
      return itm;
  });
};
