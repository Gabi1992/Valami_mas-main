import React from "react";

// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer"
import Services2 from "../components/Sections/Services2"
import Pricing from "../components/Sections/Pricing";

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}


