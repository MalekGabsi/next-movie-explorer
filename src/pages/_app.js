// pages/_app.js
import { UserProvider } from "@/context/UserContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store"; 
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </UserProvider>
    </Provider>
  );
}
