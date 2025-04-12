export const generateYAxis = () => {
  const yAxisLabels = [];

  for (let i = 1000000; i >= 0; i -= 200000) {
    yAxisLabels.push(`${i / 1000}K`);
  }

  const topLabel = 1000000; // 1 triệu

  return { yAxisLabels, topLabel };
};

