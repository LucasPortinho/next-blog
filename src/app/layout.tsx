import { Container } from "@/components/Container/index";
import { Footer } from "@/components/Footer/index";
import { Header } from "@/components/Header/index";
import { ToastifyContainer } from "@/components/ToastifyContainer/index";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The blog - Feito com Next.js",
    template: '%s | The blog', // Para as rotas filho, o %s será o titulo delas
  },
  description: "Descrição da página",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="light">
        {/* Aqui posso colocar elementos universais como headers e footers*/}
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
