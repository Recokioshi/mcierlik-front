import { MantineSize, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";

export const useMediaQueryForBeakpoint = (size: MantineSize) => {
  const theme = useMantineTheme();
  const breakpoints = theme.breakpoints;
  const breakpointsList = Object.keys(breakpoints) as unknown as MantineSize[];
  const sizeIndex = breakpointsList.indexOf(size);

  const min  = `(min-width: ${breakpoints[size]}px)`;
  const max = size === breakpointsList[breakpointsList.length - 1] ? `` : `(max-width: ${breakpoints[breakpointsList[sizeIndex + 1]]}px)`;

  const matches = useMediaQuery(`${min}${max ? ` and ${max}` : ''}`, false);
  return matches;
}
