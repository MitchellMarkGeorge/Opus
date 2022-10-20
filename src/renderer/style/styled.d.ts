import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primaryWhite: string;
      primaryPurple: string;
      primaryInterfaceColor: string;
      secondaryInterfaceColor: string;
    };
  }
}
