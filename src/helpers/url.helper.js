export const LSHFilterQueryGenerator = (criteria) => {
  const _query = {};
  for (const [key, value] of Object.entries(criteria)) {
    if (key !== "page" && key !== "step") {
      _query[key] = {};
      for (const [operator, filterValue] of Object.entries(value)) {
        if (operator === "in" || operator === "nin") {
          _query[key]["$" + operator] = filterValue.split(",");
        } else if (operator === "eq") {
          if (
            filterValue.toLowerCase() === "true" ||
            filterValue.toLowerCase() === "false"
          ) {
            _query[key] = filterValue.toLowerCase() === "true" ? 1 : 0;
          } else if (isNumeric(filterValue)) {
            _query[key] = Number(filterValue);
          } else {
            _query[key] = filterValue;
          }
        } else if (operator === "ctn") {
          _query[key] = { $regex: filterValue, $options: "i" };
        } else {
          _query[key]["$" + operator] = filterValue;
        }
      }
    }
  }
  console.log(_query);
  return _query;
};

const isNumeric = (str) => {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};
