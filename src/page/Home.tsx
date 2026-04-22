import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

// Import your local images (adjust paths if needed)
import PSE from '../assets/pse.jpg';
import Img1 from '../assets/img2.jpg';
import Img2 from '../assets/img3.jpg';
import Img3 from '../assets/img4.jpg';
import Img4 from '../assets/img5.jpg';
import Img5 from '../assets/img6.jpg';
import Img6 from '../assets/img7.jpg';
import Img7 from '../assets/img8.jpg';
import Img8 from '../assets/img9.jpg';
import Img9 from '../assets/img10.jpg';
// You can add more later if you want to show more than 10 images

const images = [PSE, Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = scrollRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col min-h-screen w-full bg-white m-0 p-0 overflow-x-hidden antialiased"
    >
      {/* HERO SECTION */}
      <header
        className="relative h-[500px] md:h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${PSE})`,
        }}
      >
        <div className="text-center px-6 max-w-4xl">
          <h1 className="reveal text-5xl md:text-6xl font-black text-white italic uppercase tracking-[-3px] leading-none mb-4">
            WELCOME TO <span className="text-[#f26522]">LOTUS BLANC</span>
          </h1>
          <p className="reveal text-white/90 text-lg md:text-2xl font-semibold uppercase tracking-[4px]">
            FINE DINING & PROFESSIONAL TRAINING
          </p>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[#f26522] text-4xl font-black italic mb-6">
              About Lotus Blanc
            </h2>
            <p className="text-lg text-[#004e70] leading-relaxed">
              Lotus Blanc is a training restaurant dedicated to providing professional hospitality 
              training for Cambodian youth. Our students provide fine dining service under expert supervision.
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 space-y-8 text-[#004e70]">
            <div className="flex gap-5 items-start">
              <MapPin className="text-[#f26522] mt-1 flex-shrink-0" size={28} />
              <p className="font-medium">
                #420, Tchecoslovaquie Blvd (St. 163), Phnom Penh
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <Phone className="text-[#f26522] flex-shrink-0" size={28} />
              <p className="font-medium">+855 (0) 23 995 651</p>
            </div>
            <div className="flex gap-5 items-center">
              <Mail className="text-[#f26522] flex-shrink-0" size={28} />
              <p className="font-medium">booking@pse.ngo</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-[#fdfdfd]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#004e70] italic">Gallery</h2>
          <div className="h-1 w-20 bg-[#f26522] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto px-6">
          {images.map((image, i) => (
            <div
              key={i}
              className="reveal h-56 rounded-3xl overflow-hidden shadow-md group"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <img
                src={image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={`Lotus Blanc Gallery ${i + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* DIRECTION / MAP SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#004e70] italic">Direction</h2>
        </div>
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.1118182766867!2d104.90858187585093!3d11.543818344569654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310950fd2f613c77%3A0xc3457d5494d93708!2sLotus%20Blanc%20Restaurant!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
            width="100%"
            height="450"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Home;