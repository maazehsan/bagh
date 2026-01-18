import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

// Letter animation variants
const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

// Animated text component with letter-by-letter animation (runs once)
const AnimatedTitle = ({ text, className }) => {
  return (
    <motion.h1 className={className} initial="hidden" animate="visible">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnimation}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// Instagram posts data
const instagramPosts = [
  { id: 1, image: grid1, likes: '2,847', comments: '156' },
  { id: 2, image: blog1, likes: '3,291', comments: '203' },
  { id: 3, image: menuItem1, likes: '4,102', comments: '287' },
  { id: 4, image: grid2, likes: '2,156', comments: '142' },
  { id: 5, image: menuItem2, likes: '3,874', comments: '198' },
  { id: 6, image: blog2, likes: '2,693', comments: '167' },
]

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const { scrollYProgress } = useScroll()
  // Simplified - removed heroScale transform for better performance
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
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
    setTimeout(() => setSuccessMessage(''), 5000)
  }

  const heroImages = [grid1, grid2, grid3]

  return (
    <>
      {/* Navigation */}
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavOpen ? 'nav-open' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={`nav-toggle ${isNavOpen ? 'active' : ''}`} onClick={() => setIsNavOpen(!isNavOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <motion.a 
          href="#" 
          className="nav-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <img src={logo} alt="Bagh Logo" />
        </motion.a>
        
        <ul className="nav-links nav-links-left">
          {['Home', 'About', 'Stories'].map((item, i) => (
            <motion.li 
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
            >
              <a href={`#${item.toLowerCase()}`} onClick={() => setIsNavOpen(false)}>{item}</a>
            </motion.li>
          ))}
        </ul>
        
        <ul className="nav-links nav-links-right">
          {['Menu', 'Contact', 'Reservation'].map((item, i) => (
            <motion.li 
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
            >
              <a href={item === 'Reservation' ? '#' : `#${item.toLowerCase()}`} onClick={() => setIsNavOpen(false)}>{item}</a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div 
              className="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.ul 
                className="mobile-nav-links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['Home', 'About', 'Stories', 'Menu', 'Contact', 'Reservation'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <a 
                      href={item === 'Reservation' ? '#' : `#${item.toLowerCase()}`} 
                      onClick={() => setIsNavOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-grid">
          <AnimatePresence mode="wait">
            {heroImages.map((img, index) => (
              index === activeImage && (
                <motion.div 
                  key={index}
                  className="hero-fullscreen-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <img src={img} alt="Bagh Ambiance" />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-image-indicators">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === activeImage ? 'active' : ''}`}
              onClick={() => setActiveImage(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.div 
          className="hero-content"
          style={{ opacity: heroOpacity }}
        >
          <motion.span 
            className="hero-tagline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
          EST. 2026 LAHORE 
          </motion.span>
          
          <AnimatedTitle text="Authentic Desi Fine Dining" className="hero-title" />
          
          <motion.div 
            className="hero-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
          />
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Experience the rich heritage of South Asian cuisine, where every dish tells a story 
            of tradition, passion, and culinary excellence. Welcome to Bagh - where elegance meets flavor.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Reserve a Table
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Menu
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span>Scroll to Discover</span>
          <motion.div 
            className="scroll-line"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section section-alt">
        <div className="about-container">
          <motion.div 
            className="about-content"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="section-label">Our Story</span>
            <h2>The Art of<br /><span className="highlight">Desi Cuisine</span></h2>
            <div className="about-divider">
              <span></span>
              <div className="diamond"></div>
              <span></span>
            </div>
            <p>
              At Bagh, we believe that dining is more than just a meal - it is an experience that 
              engages all the senses. Our master chefs bring decades of expertise, crafting each 
              dish with the finest ingredients sourced from across the subcontinent.
            </p>
            <p>
              From the aromatic biryanis of Hyderabad to the rich curries of Punjab, every recipe 
              in our kitchen has been passed down through generations, perfected over time, and 
              presented with modern elegance.
            </p>
            <motion.div 
              className="about-stats"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="stat" variants={fadeUp}>
                <span className="stat-number">5+</span>
                <span className="stat-label">Years of Excellence</span>
              </motion.div>
              <motion.div className="stat" variants={fadeUp}>
                <span className="stat-number">50+</span>
                <span className="stat-label">Signature Dishes</span>
              </motion.div>
              <motion.div className="stat" variants={fadeUp}>
                <span className="stat-number">2</span>
                <span className="stat-label">Prime Locations</span>
              </motion.div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Our Journey
            </motion.button>
          </motion.div>
          <motion.div 
            className="about-image"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="image-frame">
              <motion.img 
                src={blog1} 
                alt="Bagh Interior"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>
            </div>
            <motion.div 
              className="floating-badge"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <p>Premium Quality</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section">
        <motion.div 
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="section-label">From Our Kitchen</span>
          <h2>Stories & <span className="highlight">Traditions</span></h2>
          <p>
            Discover the tales behind our dishes, the culture that inspires us, 
            and the passion that drives our culinary artistry.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </motion.div>
        
        <motion.div 
          className="blog-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { img: blog1, title: "The Legacy of Biryani", date: "Jan 10, 2026", desc: "Explore the royal origins of this beloved dish and how our chefs honor centuries-old traditions in every fragrant grain." },
            { img: blog2, title: "Spices of the Subcontinent", date: "Jan 05, 2026", desc: "A journey through the aromatic world of South Asian spices from Kashmir saffron to Kerala cardamom." },
            { img: blog3, title: "The Art of Tandoor", date: "Dec 28, 2025", desc: "Discover the ancient technique of clay oven cooking and why our tandoori dishes carry an unmistakable smoky perfection." }
          ].map((blog, index) => (
            <motion.article 
              key={index}
              className="blog-card"
              variants={scaleUp}
              whileHover={{ y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="blog-image">
                <motion.img 
                  src={blog.img} 
                  alt={blog.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="blog-date">{blog.date}</span>
                <div className="blog-overlay">
                  <span className="read-indicator">Read Story</span>
                </div>
              </div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <motion.a 
                  href="#" 
                  className="blog-link"
                  whileHover={{ x: 10 }}
                >
                  Read More
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section section-alt">
        <motion.div 
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="section-label">Culinary Excellence</span>
          <h2>Signature <span className="highlight">Creations</span></h2>
          <p>
            Indulge in our carefully curated selection of dishes, each one a masterpiece 
            of flavor, texture, and presentation.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </motion.div>
        
        <motion.div 
          className="menu-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { img: menuItem1, title: "Chicken Changezi", tag: "Chefs Special" },
            { img: menuItem2, title: "Beef Behari Boti", tag: "Signature" },
            { img: menuItem3, title: "BBQ Platter", tag: "Classic" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="menu-item"
              variants={scaleUp}
            >
              <motion.div 
                className="menu-image"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img 
                  src={item.img} 
                  alt={item.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="menu-overlay">
                  <motion.button
                    className="menu-cta"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
              <div className="menu-details">
                <h3>{item.title}</h3>
                <div className="menu-price">
                  <span className="menu-tag">{item.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="menu-cta-container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button 
            className="menu-button"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 55, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Menu
          </motion.button>
        </motion.div>
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="section instagram-section">
        <motion.div 
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="section-label">@baghrestaurant</span>
          <h2>Follow Us on <span className="highlight">Instagram</span></h2>
          <p>
            Join our culinary community and stay updated with our latest creations, 
            behind-the-scenes moments, and exclusive offers.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </motion.div>

        <motion.div 
          className="instagram-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {instagramPosts.map((post) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-post"
              variants={scaleUp}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img src={post.image} alt={`Instagram post ${post.id}`} />
              <motion.div 
                className="instagram-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="instagram-stats">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    {post.likes}
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/></svg>
                    {post.comments}
                  </span>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="instagram-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a 
            href="https://instagram.com/baghpk"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 55, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow @baghpk
          </motion.a>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section-alt">
        <motion.div 
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="section-label">Get in Touch</span>
          <h2>Connect <span className="highlight">With Us</span></h2>
          <p>
            We would love to hear from you. Visit us, share your experience, 
            or make a reservation at one of our locations.
          </p>
          <div className="section-divider">
            <span></span>
            <div className="diamond"></div>
            <span></span>
          </div>
        </motion.div>
        
        <div className="contact-reviews-container">
          <motion.div 
            className="contact-side"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3>Our Locations</h3>
            <div className="contact-info">
              {[
                { icon: 'location', title: 'Gulberg', text: 'HEC Park, Off MM Alam Rd, Block B2 Block B 2 Gulberg III, Lahore, 54600, Pakistan' },
                { icon: 'location', title: 'DHA', text: 'Mezzanine Floor, Gold crest mall sector DD phase 4 Dha lahore, above Street 2, Sector DD Dha Phase 4, Lahore, Pakistan' },
                { icon: 'phone', title: 'Reservations', text: 'Bagh Gulberg: 0320-9992244\nBagh DHA: 0320-9993344' },
                { icon: 'email', title: 'Email', text: 'reservations@baghrestaurant.com' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="contact-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="contact-icon">
                    {item.icon === 'location' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    )}
                    {item.icon === 'phone' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    )}
                    {item.icon === 'email' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    )}
                  </div>
                  <div className="contact-text">
                    <h4>{item.title}</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="maps-container">
              <motion.div 
                className="map-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h4>Gulberg</h4>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108898.86397763349!2d74.23759804335938!3d31.4667241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905a1b66551b7%3A0xa05e074e579e61aa!2sBagh%20-%20The%20Desi%20Experience!5e0!3m2!1sen!2s!4v1768675508065!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Downtown Location"
                ></iframe>
              </motion.div>
              <motion.div 
                className="map-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h4>DHA</h4>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108898.86397763349!2d74.23759804335938!3d31.4667241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391907de92a9e065%3A0x852b223e10956c4d!2sBagh%20-%20Gold%20Crest%20Mall%20DHA!5e0!3m2!1sen!2s!4v1768675569721!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Uptown Location"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="reviews-side"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3>Share Your Experience</h3>
            <AnimatePresence>
              {successMessage && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <span>?</span> {successMessage}
                </motion.div>
              )}
            </AnimatePresence>
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
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
                </motion.div>
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
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
                </motion.div>
              </div>
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03XX-XXXXXXX"
                />
              </motion.div>
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label htmlFor="message">Your Review</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your dining experience at Bagh..."
                  required
                ></textarea>
              </motion.div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Review
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-pattern"></div>
        <motion.div 
          className="footer-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="footer-brand" variants={fadeUp}>
            <motion.div 
              className="footer-logo"
              whileHover={{ scale: 1.05 }}
            >
              <img src={logo} alt="Bagh Logo" />
            </motion.div>
            <p>
              Where tradition meets elegance. Experience the finest desi cuisine 
              in an atmosphere of timeless sophistication.
            </p>
            <div className="social-links">
              {[
                { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
              ].map((social) => (
                <motion.a 
                  key={social.name}
                  href="#" 
                  className="social-link" 
                  aria-label={social.name}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path}/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="footer-column" variants={fadeUp}>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {['Home', 'About Us', 'Our Menu', 'Stories', 'Contact'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={`#${link.toLowerCase().replace(' ', '')}`}>{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div className="footer-column" variants={fadeUp}>
            <h4>Services</h4>
            <ul className="footer-links">
              {['Private Dining', 'Catering', 'Gift Cards', 'Events', 'Reservations'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div className="footer-column" variants={fadeUp}>
            <h4>Opening Hours</h4>
            <div className="footer-hours">
              <p>Monday - Sunday <span>1PM - 1AM</span></p>
            </div>
            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <motion.button
                  className="newsletter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>©2026 Bagh Restaurant. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </motion.div>
      </footer>
    </>
  )
}

export default App
