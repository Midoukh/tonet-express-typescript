export const bytesToMB = (val: number): number => {
  console.log(val);
  return Number((val / Math.pow(2, 20)).toFixed(3));
};
