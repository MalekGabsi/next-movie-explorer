import { useRouter } from "next/router";
import NavMenu from "@/components/Navbar"; 

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthPage = router.pathname.includes("/auth");
  const isNotFoundPage = router.pathname === "/404";


  return (
    <div>
      {!isAuthPage && !isNotFoundPage && <NavMenu />}

      <main>{children}</main>

    </div>
  );
};

export default Layout;
