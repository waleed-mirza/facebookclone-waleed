import Head from "next/head";
import Header from "../components/Header";
import { getSession } from "next-auth/client";
import LogIn from "../components/LogIn";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

export default function Home({ session }) {
  if (!session) return <LogIn />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Fbclone-Waleed</title>
      </Head>

      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
