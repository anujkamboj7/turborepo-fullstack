// import { authClient } from "../lib/auth-client";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  // const {
  //   data: session,
  //   isPending: isLoading,
  //   error,
  // } = authClient.useSession();

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error...</p>;
  // }

  // console.log(session);

  // const res = await fetch(`${process.env.API_URL}/api/auth/session`, {
  //   method: "GET",
  //   headers: {
  //     // Important: forward cookies for session
  //     cookie: "", // will fix below
  //   },
  //   cache: "no-store", // prevent caching for auth
  // });

  // console.log(res);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <main>
        <h1 className='text-2xl text-amber-200'> Hello from Web App</h1>
      </main>
    </div>
  );
}
