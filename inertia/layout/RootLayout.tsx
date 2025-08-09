import React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import ScrollProgressIndicator from "~/components/ScrollProgressIndicator";
import ParticleBackground from "~/components/ParticleBackground";
import CustomCursor from "~/components/CustomCursor";
import Preloader from "~/components/Preloader";
import StickyEmail from "~/components/StickyEmail";
import PageTransition from "~/components/PageTransition";

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
      <Navbar />

      <PageTransition>
        <main>{children}</main>
      </PageTransition>

      <Footer />

      <CustomCursor />
      <Preloader />
      <ScrollProgressIndicator />
      <ParticleBackground />
      <StickyEmail />
    </ReactLenis>
  );
}
