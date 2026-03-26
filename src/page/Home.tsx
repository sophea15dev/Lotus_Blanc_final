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
  const galleryRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const imgs = galleryRef.current?.querySelectorAll('.fade-in');
    imgs?.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>

      {/* 1. HERO SECTION */}
      <header style={{ 
        height: '450px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: 'white'
      }}>
        <h1 className="fade-in" style={{ fontSize: '50px', fontWeight: 'bold' }}>
          Welcome to Lotus Blanc
        </h1>      
      </header>

      {/* 2. ABOUT & CONTACT INFO */}
      <section 
        className="fade-in"
        style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '60px' }}
      >       
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#FF7043', fontSize: '24px', marginBottom: '20px' }}>About Lotus Blanc</h2>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            Lotus Blanc is a training restaurant dedicated to providing professional hospitality 
            training for Cambodian youth. Our students provide fine dining service under expert supervision.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '9px' }}><MapPin color="#FF7043"/> <span>#420, Tchecoslovaquie Blvd (St. 163), Phnom Penh</span></div>
          <div style={{ display: 'flex', gap: '9px' }}><Phone color="#FF7043"/> <span>+855 (0) 23 995 651</span></div>
          <div style={{ display: 'flex', gap: '9px' }}><Mail color="#FF7043"/> <span>booking@pse.ngo</span></div>
        </div>
      </section>

      {/* 3. GALLERY SECTION */}
      <section style={{ padding: "40px 20px", backgroundColor: "#fdfdfd", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "40px",
            textDecoration: "underline",
            color: "#2C3E50",
            textUnderlineOffset: "10px",
          }}
        >
          Gallery
        </h2>

        <div
          ref={galleryRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "15px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="fade-in"
              style={{
                height: "180px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={image}
                className="gallery-img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={`Gallery ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIRECTION SECTION */}
      <section style={{ padding: '8px 20px', textAlign: 'center', backgroundColor: '#fff' }}>
        <h2 style={{ 
          fontSize: '32px', 
          marginBottom: '40px', 
          color: '#003366', 
          textDecoration: 'underline', 
          textUnderlineOffset: '8px',
          fontWeight: 'bold' 
        }}>
          Direction
        </h2>
        
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ 
            width: '100%', 
            height: '500px', 
            borderRadius: '10px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #ddd',
            position: 'relative'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.013917415162!2d104.91238477585375!3d11.550882344406263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951167a5b3a4d%3A0x600c0179975f850e!2sLotus%20Blanc%20Training%20Restaurant!5e0!3m2!1sen!2skh!4v1711200000000!5m2!1sen!2skh" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
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