import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </main>
      
  );
};

export default api.withTRPC(MyApp);
