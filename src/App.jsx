import { useState, useEffect } from 'react'
import './App.css'

import logo from './assets/logo.png'
import grid1 from './assets/grid1.jpeg'
import grid2 from './assets/grid2.jpeg'
import grid3 from './assets/grid3.jpeg'
import blog1 from './assets/blog1.jpeg'
import blog2 from './assets/blog2.jpeg'
import blog3 from './assets/blog3.jpeg'
import menuItem1 from './assets/menu_item 1.jpeg'
import menuItem2 from './assets/menu_item 2.jpeg'
import menuItem3 from './assets/menu_item 3.jpeg'


function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fade-in animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
        }
      })
    }, observerOptions)

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach(el => observer.observe(el))

    return () => {
      fadeElements.forEach(el => observer.unobserve(el))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSuccessMessage('Thank you for your review! We appreciate your feedback.')
    setFormData({ name: '', email: '', phone: '', message: '' })
    // Auto-hide message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000)
  }

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <ul className={`nav-links nav-links-left ${isNavOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={() => setIsNavOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsNavOpen(false)}>About</a></li>
          <li><a href="#blog" onClick={() => setIsNavOpen(false)}>Stories</a></li>
        </ul>
        <a href="#" className="nav-logo">
          <img src={logo} alt="Bagh Logo" />
        </a>
        <ul className={`nav-links nav-links-right ${isNavOpen ? 'active' : ''}`}>
          <li><a href="#menu" onClick={() => setIsNavOpen(false)}>Menu</a></li>
          <li><a href="#contact" onClick={() => setIsNavOpen(false)}>Contact</a></li>
          <li><a href="#" onClick={() => setIsNavOpen(false)}>Reservation</a></li>
        </ul>
        <div className={`nav-toggle ${isNavOpen ? 'active' : ''}`} onClick={() => setIsNavOpen(!isNavOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-grid">
          <div className="hero-grid-item">
            <img src={grid1} alt="Desi Cuisine" />
          </div>
          <div className="hero-grid-item">
            <img src={grid2} alt="Authentic Flavors" />
          </div>
          <div className="hero-grid-item">
            <img src={grid3} alt="Fine Dining" />
          </div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          <h1 className="hero-title">Authentic Desi Fine Dining</h1>
          <p className="hero-description">
            Experience the rich heritage of South Asian cuisine, where every dish tells a story 
            of tradition, passion, and culinary excellence. Welcome to Bagh—where elegance meets flavor.
          </p>
          <div className="hero-buttons">
            <button>Reserve a Table</button>
            <button className="btn-secondary">Explore Menu</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section section-alt">
        <div className="about-container">
          <div className="about-content fade-in fade-in-left">
            <h2>The Art of Desi Cuisine</h2>
            <p>
              At Bagh, we believe that dining is more than just a meal—it's an experience that 
              engages all the senses. Our master chefs bring decades of expertise, crafting each 
              dish with the finest ingredients sourced from across the subcontinent.
            </p>
            <p>
              From the aromatic biryanis of Hyderabad to the rich curries of Punjab, every recipe 
              in our kitchen has been passed down through generations, perfected over time, and 
              presented with modern elegance.
            </p>
            <button>Learn More</button>
          </div>
          <div className="about-image fade-in fade-in-right">
            <img src={blog1} alt="Bagh Interior" />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section">
        <div className="section-header fade-in">
          <h2>Stories & Traditions</h2>
          <p>
            Discover the tales behind our dishes, the culture that inspires us, 
            and the passion that drives our culinary artistry.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </div>
        <div className="blog-grid fade-in fade-in-stagger">
          <article className="blog-card fade-in">
            <div className="blog-image">
              <img src={blog1} alt="The Legacy of Biryani" />
              <span className="blog-date">Jan 10, 2026</span>
            </div>
            <div className="blog-content">
              <h3>The Legacy of Biryani</h3>
              <p>
                Explore the royal origins of this beloved dish and how our chefs honor 
                centuries-old traditions in every fragrant grain.
              </p>
              <a href="#" className="blog-link">
                Read More <span>→</span>
              </a>
            </div>
          </article>
          <article className="blog-card fade-in">
            <div className="blog-image">
              <img src={blog2} alt="Spices of the Subcontinent" />
              <span className="blog-date">Jan 05, 2026</span>
            </div>
            <div className="blog-content">
              <h3>Spices of the Subcontinent</h3>
              <p>
                A journey through the aromatic world of South Asian spices—from Kashmir's 
                saffron to Kerala's cardamom.
              </p>
              <a href="#" className="blog-link">
                Read More <span>→</span>
              </a>
            </div>
          </article>
          <article className="blog-card fade-in">
            <div className="blog-image">
              <img src={blog3} alt="The Art of Tandoor" />
              <span className="blog-date">Dec 28, 2025</span>
            </div>
            <div className="blog-content">
              <h3>The Art of Tandoor</h3>
              <p>
                Discover the ancient technique of clay oven cooking and why our tandoori 
                dishes carry an unmistakable smoky perfection.
              </p>
              <a href="#" className="blog-link">
                Read More <span>→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section section-alt">
        <div className="section-header fade-in">
          <h2>Signature Creations</h2>
          <p>
            Indulge in our carefully curated selection of dishes, each one a masterpiece 
            of flavor, texture, and presentation.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </div>
        <div className="menu-grid fade-in fade-in-stagger">
          <div className="menu-item fade-in">
            <div className="menu-image">
              <img src={menuItem1} alt="Chicken Changezi" />
            </div>
            <div className="menu-details">
              <h3>Chicken Changezi</h3>
              <div className="menu-price">
                <span className="menu-tag">Chef's Special</span>
              </div>
            </div>
          </div>
          <div className="menu-item fade-in">
            <div className="menu-image">
              <img src={menuItem2} alt="Beef Behari Boti" />
            </div>
            <div className="menu-details">
              <h3>Beef Behari Boti</h3>
              <div className="menu-price">
                <span className="menu-tag">Signature</span>
              </div>
            </div>
          </div>
          <div className="menu-item fade-in">
            <div className="menu-image">
              <img src={menuItem3} alt="BBQ Platter" />
            </div>
            <div className="menu-details">
              <h3>BBQ Platter</h3>
              <div className="menu-price">
                <span className="menu-tag">Classic</span>
              </div>
            </div>
          </div>
          <button className="menu-button">View Full Menu</button>
        </div>
      </section>

      {/* Contact & Reviews Section */}
      <section id="contact" className="section">
        <div className="section-header fade-in">
          <h2>Connect With Us</h2>
          <p>
            We would love to hear from you. Visit us, share your experience, 
            or make a reservation at one of our locations.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </div>
        <div className="contact-reviews-container">
          {/* Contact Side */}
          <div className="contact-side fade-in fade-in-left">
            <h3>Our Locations</h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-text">
                  <h4>Gulberg</h4>
                  <p>HEC Park, Off MM Alam Rd, Block B2 Block B 2 Gulberg III, Lahore, 54600, Pakistan</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-text">
                  <h4>DHA</h4>
                  <p>Mezzanine Floor, Gold crest mall sector DD phase 4 Dha lahore, above Street 2, Sector DD Dha Phase 4, Lahore, Pakistan</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="contact-text">
                  <h4>Reservations</h4>
                  <p>Bagh Gulberg: 0320-9992244<br />Bagh DHA: 0320-9993344</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>reservations@baghrestaurant.com</p>
                </div>
              </div>
            </div>
            <div className="maps-container">
              <div className="map-wrapper">
                <h4>Gulberg</h4>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108898.86397763349!2d74.23759804335938!3d31.4667241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905a1b66551b7%3A0xa05e074e579e61aa!2sBagh%20-%20The%20Desi%20Experience!5e0!3m2!1sen!2s!4v1768675508065!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Downtown Location"
                ></iframe>
              </div>
              <div className="map-wrapper">
                <h4>DHA</h4>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108898.86397763349!2d74.23759804335938!3d31.4667241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391907de92a9e065%3A0x852b223e10956c4d!2sBagh%20-%20Gold%20Crest%20Mall%20DHA!5e0!3m2!1sen!2s!4v1768675569721!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Uptown Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Reviews Side */}
          <div className="reviews-side fade-in fade-in-right">
            <h3>Share Your Experience</h3>
            {successMessage && (
              <div className="success-message">
                <span>✓</span> {successMessage}
              </div>
            )}
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03XX-XXXXXXX"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Review</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your dining experience at Bagh..."
                  required
                ></textarea>
              </div>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container fade-in fade-in-stagger">
          <div className="footer-brand fade-in">
            <div className="footer-logo">
              <img src={logo} alt="Bagh Logo" />
            </div>
            <p>
              Where tradition meets elegance. Experience the finest desi cuisine 
              in an atmosphere of timeless sophistication.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#blog">Stories</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#">Private Dining</a></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Reservations</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Opening Hours</h4>
            <div className="footer-hours">
              <p>Monday - Sunday <span>1PM - 1AM</span></p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bagh Restaurant. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
