import * as React from "react";
import { useLoadingBarContext } from "@providers/loadingBar/loadinBarContext";

import styles from "@modules/loadBar.module.css";

export const LoadingBar = () => {
  const [isLoading] = useLoadingBarContext();

  return (
    <div
      className={`${
        isLoading ? `fixed top-0 left-0 h-1 w-full ${styles.shine} ` : "hidden"
      }`}
    ></div>
  );
};
