import React from 'react';
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Footer: React.FC = () => {
  const colStyle = { flex: '1', minWidth: '250px' };
  const titleStyle = { display: 'block', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'sans-serif' };
  const linkStyle = { color: 'white', textDecoration: 'none', display: 'block', marginBottom: '10px', opacity: '0.8', fontSize: '14px', fontFamily: 'sans-serif' };

  return (
    <footer style={{ backgroundColor: '#004A61', color: 'white', padding: '60px 80px 20px', marginTop: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Column 1: Mission */}
        <div style={colStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <img src={logo} style={{ height: '35px', filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Our Mission</span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: '0.8', fontFamily: 'sans-serif' }}>
            Lotus Blanc is a training restaurant dedicated to empowering Cambodian youth through professional hospitality training. Your patronage directly supports their futures.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div style={colStyle}>
          <span style={titleStyle}>Quick Links</span>
          <a href="#" style={linkStyle}>Home</a>
          <a href="#" style={linkStyle}>Menu</a>
          <a href="#" style={linkStyle}>Cooking Classes</a>
          <a href="#" style={linkStyle}>About PSE (The NGO)</a>
          <a href="#" style={linkStyle}>Support Us</a>
        </div>

        {/* Column 3: Contact & Hours */}
        <div style={colStyle}>
          <span style={titleStyle}>Contact & Hours</span>
          <div style={{ fontSize: '14px', lineHeight: '1.8', opacity: '0.8', fontFamily: 'sans-serif' }}>
            <p><strong>Address:</strong> #420 Tchecoslovaquie Blvd (St. 163)</p>
            <p><strong>Breakfast:</strong> Mon-Fri, 7:30 AM – 9:00 AM</p>
            <p><strong>Lunch:</strong> Mon-Fri, 12:00 PM – 2:00 PM</p>
            <p><strong>Email:</strong> booking@pse.ngo</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', opacity: '0.5', fontFamily: 'sans-serif' }}>
        © 2026 Lotus Blanc Training Restaurant
      </div>
    </footer>
  );
};

export default Footer;