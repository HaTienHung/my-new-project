import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cssFilePath = join(__dirname, "css output path");

function convertRangeMediaQueries(cssContent) {
  const greaterThanOrEqualPattern =
    /@media\s*\(\s*width\s*>=\s*([0-9]+)(px|em|rem|vh|vw|%)\s*\)/g;
  const lessThanOrEqualPattern =
    /@media\s*\(\s*width\s*<=\s*([0-9]+)(px|em|rem|vh|vw|%)\s*\)/g;

  let updatedCss = cssContent.replace(
    greaterThanOrEqualPattern,
    (_, value, unit) => `@media (min-width: ${value}${unit})`
  );

  updatedCss = updatedCss.replace(
    lessThanOrEqualPattern,
    (_, value, unit) => `@media (max-width: ${value}${unit})`
  );

  const rangePattern =
    /@media\s*\(\s*([0-9]+)(px|em|rem|vh|vw|%)\s*<=\s*width\s*<=\s*([0-9]+)(px|em|rem|vh|vw|%)\s*\)/g;
  updatedCss = updatedCss.replace(
    rangePattern,
    (_, minValue, minUnit, maxValue, maxUnit) =>
      `@media (min-width: ${minValue}${minUnit}) and (max-width: ${maxValue}${maxUnit})`
  );

  return updatedCss;
}

async function main() {
  try {
    let totalStartTime = Date.now();
    const data = await fs.readFile(cssFilePath, "utf8");

    const updatedCss = convertRangeMediaQueries(data);

    await fs.writeFile(cssFilePath, updatedCss, "utf8");

    const totalEndTime = Date.now();
    const totalDuration = totalEndTime - totalStartTime;

    console.log(
      `Converted range media queries to normal media queries in ${totalDuration} ms`
    );
  } catch (err) {
    console.error("Error converting range media queries:", err);
  }
}

main();
