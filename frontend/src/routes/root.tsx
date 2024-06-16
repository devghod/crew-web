import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-full h-screen text-center content-center">
      <div className="">Hey, this is an awesome website to <span className="hover:text-sky-500">discover</span>.</div>
    </div>
  );
}
