export const ALL_KEY = "ALL";

// turn repeated chars into { "R|H|K": "hexColor" }
export const HIGHLIGHTER_COLORS: { [char: string]: string } = [
  ["#d2f4ec", ["R", "H", "K"]],
  ["#aec6cf", ["D", "E"]],
  ["#fbded3", ["S", "T", "N", "Q"]],
  ["#fbf3d9", ["C", "G", "P"]],
  ["#ffd6e5", ["A", "V", "", "I", "L", "M", "F", "Y", "W"]],
].reduce((obj, [value, keys]) => {
  for (const key of keys) {
    Object.defineProperty(obj, key, { value });
  }
  return obj;
}, {});
