import Image from "next/image";
import { signIn } from "next-auth/client";
function LogIn() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Image
        src="https://links.papareact.com/5me"
        width={300}
        height={300}
        objectFit="contain"
      />
      <h1
        onClick={signIn}
        className="p-5 bg-blue-500 mt-5 rounded-full text-center text-white cursor-pointer"
      >
        Login with Facebook
      </h1>
    </div>
  );
}
export default LogIn;
