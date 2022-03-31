interface IMetadata {
  /**
   * Name of decoder used to decompress image data e.g. `jpeg`, `png`, `webp`, `gif`, `svg`
   */
  format?: any;
  /**
   * Number of pixels wide
   */
  width?: number;
  size?: any;
  depth: string;
  density: number;
  /**
   * Number of pixels high
   */
  height?: number;
  /**
   * Name of colour space interpretation e.g. srgb, rgb, scrgb, cmyk, lab, xyz, b-w ...
   */
  space: string;
  /**
   * Number of bands e.g. `3` for sRGB, `4` for CMYK
   */
  channels: number;
  chromaSubsampling: string;
  /**
   * Boolean indicating the presence of an embedded ICC profile
   */
  hasProfile: boolean;
  /**
   * Boolean indicating the presence of an alpha transparency channel
   */
  hasAlpha?: boolean;
  isProgressive?: boolean;
  /**
   * Number value of the EXIF Orientation header, if present
   */
  orientation?: number;
  /**
   * Buffer containing raw EXIF data, if present
   */
  exif?: Buffer;
  /**
   * Buffer containing raw ICC profile data, if present
   */
  icc?: Buffer;
}
