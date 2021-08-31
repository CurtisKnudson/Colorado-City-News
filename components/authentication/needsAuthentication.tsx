import { useSession } from "next-auth/client";
import { SignIn } from "./components";

export const NeedsAuthentication: React.FC = ({ children }) => {
  const [session] = useSession();
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
