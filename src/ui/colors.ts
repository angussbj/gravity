import Color from "color";
import { random } from "utilities";

export const Colors = {
  BLACK: Color("#000000"),
  DARK: Color("#101113"),
  LIGHT: Color("#DCDDDF"),
  WHITE: Color("#FFFFFF"),
  random: (): Color =>
    Color.hsv(random(0, 360), random(50, 100), random(50, 100)),
};
