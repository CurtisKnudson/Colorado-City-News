import * as React from "react";
import { Layout } from "@components/layout";
import { SpinnerDotted } from "spinners-react";
import { ACCENT } from "@constants/design";

const Loading = () => {
  return (
    <Layout>
      <div className="center-all min-h-screen -mt-16">
        <SpinnerDotted size={100} thickness={100} speed={100} color={ACCENT} />
      </div>
    </Layout>
  );
};

export default Loading;
