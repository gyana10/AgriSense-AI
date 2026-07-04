import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import Stats from "../../components/sections/Stats";
import Services from "../../components/sections/Services";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
    </>
  );
}

export default Home;