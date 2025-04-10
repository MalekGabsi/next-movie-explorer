import { useRouter } from "next/router";
import NavMenu from "@/components/Navbar"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthPage = router.pathname.includes("/auth");
  const isNotFoundPage = router.pathname === "/404";


  return (
    <div>
      {!isAuthPage && !isNotFoundPage && <NavMenu />}

      <main>{children}</main>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Layout;
