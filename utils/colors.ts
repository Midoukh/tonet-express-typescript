import sharp from "sharp";

export const getDominantColor = async (input: any): Promise<any> => {
  const { dominant } = await sharp(input).stats();
  const { r, g, b } = dominant;
  return new Promise((resolve) => resolve({ r, g, b }));
};
