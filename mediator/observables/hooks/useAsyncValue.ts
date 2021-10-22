import { useEffect } from "react";
import { useUpdate } from ".";
import { ObservableValue } from "..";

/**
 * This hook allows you subscribe to an ObservableValue and AsyncActionRunner.
 * @param observableValue The value to watch.
 *
 * ```ts
 * function MyComponent(){
 *  const mediator = useMediator();
 *  // This forces a rerender whenever the observable value changes.
 *  const value = useAsyncValue(mediator.someObservableValue);
 *
 *  return <div>{value}</div>
 * }
 * ```
 */
export function useAsyncValue<TValue, TInitial = TValue>(
  observableValue: ObservableValue<TValue, TInitial>
) {
  const update = useUpdate();

  useEffect(() => {
    const subscription = observableValue.onChange(update);
    return () => subscription.unsubscribe();
  }, [observableValue, update]);

  return observableValue.getValue();
}
