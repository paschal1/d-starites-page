// app/about/page.tsx
import '../../styles/globals.css';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Footer from '../../components/Footer';
import Services from '../../components/Services';
import ContactUs from '../../components/ContactUs';

export default function About() {
  return (
    <div>
      <Header />
      <Hero />
      <section className="py-20 text-center">
       <Services />
       <ContactUs />
      </section>
      <Footer />
    </div>
  );
}
