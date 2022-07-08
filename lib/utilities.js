/*
    Takes 2 Parameters ( A string, and int the number of characters you want to display
*/
export const truncateWord = (string, stringDisplayLength) => {
  return string.length > stringDisplayLength
    ? string.substring(0, stringDisplayLength) + "..."
    : string;
};

/*
  takes a number string and adds commas
*/
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
