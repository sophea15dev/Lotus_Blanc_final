import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

// Import all your gallery images
import Img from '../assets/img1.jpg';
import Img1 from '../assets/img2.jpg';
import Img2 from '../assets/img3.jpg';
import Img3 from '../assets/img4.jpg';
import Img4 from '../assets/img5.jpg';
import Img5 from '../assets/img6.jpg';
import Img6 from '../assets/img7.jpg';
import Img7 from '../assets/img8.jpg';
import Img8 from '../assets/img9.jpg';
import Img9 from '../assets/img10.jpg';
import Img10 from '../assets/img11.jpg';
import Img11 from '../assets/img12.jpg';
import Img12 from '../assets/img13.jpg';
import Img13 from '../assets/img14.jpg';
import Img15 from '../assets/img15.jpg';

const images = [Img, Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13, Img15];

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for the fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Tailwind classes to trigger the animation
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
    <div ref={scrollRef} className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <header 
        className="h-[450px] flex items-center justify-center bg-cover bg-center relative"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200")' 
        }}
      >
        <h1 className="reveal opacity-0 translate-y-10 transition-all duration-1000 text-[50px] font-bold text-white text-center px-4">
          Welcome to Lotus Blanc
        </h1>      
      </header>

      {/* 2. ABOUT & CONTACT INFO */}
      <section className="reveal opacity-0 translate-y-10 transition-all duration-1000 py-[100px] px-[40px] max-w-[1200px] mx-auto flex flex-col md:flex-row gap-[60px]">       
        <div className="flex-1">
          <h2 className="text-[#FF7043] text-[24px] mb-[20px] font-semibold">About Lotus Blanc</h2>
          <p className="leading-[1.8] text-[#555]">
            Lotus Blanc is a training restaurant dedicated to providing professional hospitality 
            training for Cambodian youth. Our students provide fine dining service under expert supervision.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-[15px] text-gray-700">
          <div className="flex gap-[9px] items-start">
            <MapPin className="text-[#FF7043] shrink-0" /> 
            <span>#420, Tchecoslovaquie Blvd (St. 163), Phnom Penh</span>
          </div>
          <div className="flex gap-[9px] items-center">
            <Phone className="text-[#FF7043] shrink-0" /> 
            <span>+855 (0) 23 995 651</span>
          </div>
          <div className="flex gap-[9px] items-center">
            <Mail className="text-[#FF7043] shrink-0" /> 
            <span>booking@pse.ngo</span>
          </div>
        </div>
      </section>

      {/* 3. GALLERY SECTION */}
      <section className="py-[40px] px-[20px] bg-[#fdfdfd] text-center">
        <h2 className="text-[32px] mb-[40px] text-[#2C3E50] underline underline-offset-[10px] decoration-1">
          Gallery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-[15px] max-w-[1100px] mx-auto">
          {images.map((image, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-10 transition-all duration-700 h-[180px] rounded-[8px] overflow-hidden shadow-[0_3px_5px_rgba(0,0,0,0.1)] group"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <img
                src={image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={`Gallery ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIRECTION SECTION */}
      <section className="py-[8px] px-[20px] text-center bg-white mb-20">
        <h2 className="reveal opacity-0 translate-y-10 transition-all duration-700 text-[32px] mb-[40px] text-[#003366] font-bold underline underline-offset-[8px] decoration-1">
          Direction
        </h2>
        
        <div className="max-w-[1100px] mx-auto reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200">
          <div className="w-full h-[500px] rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#ddd] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8718919018413!2d104.9123893148098!3d11.560641991792193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513e00000001%3A0x7d87d9a8c6a0c20a!2sLotus%20Blanc%20Restaurant!5e0!3m2!1sen!2skh!4v1647845678901!5m2!1sen!2skh" 
              width="100%" 
              height="100%" 
              className="border-0" 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;