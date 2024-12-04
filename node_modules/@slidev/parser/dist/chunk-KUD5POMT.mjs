// src/utils.ts
import { isNumber, range, uniq } from "@antfu/utils";
function parseRangeString(total, rangeStr) {
  if (!rangeStr || rangeStr === "all" || rangeStr === "*")
    return range(1, total + 1);
  if (rangeStr === "none")
    return [];
  const pages = [];
  for (const part of rangeStr.split(/[,;]/g)) {
    if (!part.includes("-")) {
      pages.push(+part);
    } else {
      const [start, end] = part.split("-", 2);
      pages.push(
        ...range(+start, !end ? total + 1 : +end + 1)
      );
    }
  }
  return uniq(pages).filter((i) => i <= total).sort((a, b) => a - b);
}
function parseAspectRatio(str) {
  if (isNumber(str))
    return str;
  if (!Number.isNaN(+str))
    return +str;
  const [wStr = "", hStr = ""] = str.split(/[:/x|]/);
  const w = Number.parseFloat(wStr.trim());
  const h = Number.parseFloat(hStr.trim());
  if (Number.isNaN(w) || Number.isNaN(h) || h === 0)
    throw new Error(`Invalid aspect ratio "${str}"`);
  return w / h;
}

export {
  parseRangeString,
  parseAspectRatio
};
