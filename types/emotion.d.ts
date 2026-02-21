import "@emotion/react";

import { TTheme } from "@/styles";
declare module "@emotion/react" {
  // eslint-disable-next-line
  export interface Theme extends TTheme {}
}
