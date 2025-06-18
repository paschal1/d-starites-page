import '../styles/globals.css';

import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import CallToAction from '../components/CallToAction';
import WorkingProcess from "../components/WorkingProcess";
import Team from '../components/Team';
import Blog from '../components/BlogSection';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Projects />
      <WorkingProcess />
      <Team />
      <Blog />
      <CallToAction />
      <Footer />
    </>
  );
}
