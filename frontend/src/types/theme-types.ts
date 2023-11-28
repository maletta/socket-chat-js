interface ITheme {
  palette: IPalette;
}

interface IPalette {
  primary: IPaletteItem;
  secondary: IPaletteItem;
  tertiary: IPaletteItem;
  black: IPaletteItem;
  gray: IPaletteItem;
  commom: IPalleteItemCommom;
}

interface IPaletteItem {
  main: string;
  dark: string;
  light: string;
}

interface IPalleteItemCommom {
  white: string;
  black: string;
}

export type { ITheme };
