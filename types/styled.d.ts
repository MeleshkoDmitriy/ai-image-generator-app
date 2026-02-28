import "styled-components";
import { TTheme } from "@/styles";

declare module "styled-components/native" {
  // eslint-disable-next-line
  export interface DefaultTheme extends TTheme {}
}
