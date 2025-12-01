declare module 'gulp-webp' {
  import { Transform } from 'stream';

  interface WebpOptions {
    quality?: number;
    method?: number;
    lossless?: boolean;
    nearLossless?: boolean;
    smartSubsample?: boolean;
    preset?: string;
    size?: number;
    alphaQuality?: number;
    effort?: number;
  }

  function webp(options?: WebpOptions): Transform;

  export = webp;
}






