import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-500 p-6">
      <div className="w-full max-w-[500px] space-y-4">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
