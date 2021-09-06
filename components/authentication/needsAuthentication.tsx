import { useSession } from "next-auth/react";
import { SignIn } from "./components";

export const NeedsAuthentication: React.FC = ({ children }) => {
  const { data: session } = useSession({
    required: true,
  });
  return (
    <>
      {session && <div>{children}</div>}
      {!session && (
        <>
          <div>You must be signed in to view this page. </div>
          <div>
            <SignIn />
          </div>
        </>
      )}
    </>
  );
};
