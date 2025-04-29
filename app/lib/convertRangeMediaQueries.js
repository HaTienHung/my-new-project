export function convertRangeMediaQueries(cssContent) {
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
