import { useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

/**
 * React effect hook that ignores the first invocation (e.g. on mount). The signature is exactly the same as the useEffect hook.
 * https://github.com/streamich/react-use/blob/master/docs/useUpdateEffect.md
 */
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
