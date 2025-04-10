import "@/styles/globals.css"; // your Tailwind or custom CSS
import Layout from "@/components/Layout"; // Adjust the import path if necessary
export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
