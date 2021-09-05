import { useRef } from "react";

/**
 * Returns true if component is just mounted (on first render) and false otherwise.
 * Documentation: https://github.com/streamich/react-use/blob/master/docs/useFirstMountState.md
 */
export function useFirstMountState(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
