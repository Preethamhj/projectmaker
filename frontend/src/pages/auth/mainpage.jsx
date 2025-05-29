import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaChartBar, FaCalendarAlt, FaBell, FaHeartbeat, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowRight, FaUsers, FaLock } from 'react-icons/fa';
import '../../index.css';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="text-center px-4 py-20 bg-gradient-to-r from-blue-900 to-gray-800 text-white h-screen w-screen flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-6xl"
      >
        <h1 className="text-5xl font-bold mb-4">
          <Typewriter
            options={{
              strings: ['THE FUTURE OF WORK', 'SMART TASK MANAGEMENT', 'TEAM COLLABORATION'],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Enhance team collaboration with our intelligent task tracking system designed for modern teams</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-xl hover:bg-blue-50 transition flex items-center justify-center gap-2"
          >
            Get Started <FaArrowRight />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/demo')}
            className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full shadow-xl hover:bg-white/10 transition"
          >
            Watch Demo
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

// Features Component
const features = [
  {
    icon: <FaTasks className="text-blue-500 text-3xl" />,
    title: 'Smart Tasking',
    desc: 'Assign and track tasks with intelligent prioritization',
  },
  {
    icon: <FaChartBar className="text-blue-500 text-3xl" />,
    title: 'Gantt Chart',
    desc: 'Visualize project timelines with interactive charts',
  },
  {
    icon: <FaCalendarAlt className="text-blue-500 text-3xl" />,
    title: 'Calendar Sync',
    desc: 'Seamlessly integrate with your existing calendars',
  },
  {
    icon: <FaHeartbeat className="text-yellow-500 text-3xl" />,
    title: 'Stress Monitor',
    desc: 'Track team workload and prevent burnout',
  },
  {
    icon: <FaBell className="text-blue-500 text-3xl" />,
    title: 'Smart Reminders',
    desc: 'AI-powered notifications for upcoming deadlines',
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#1e1e1e] to-[#121212] min-h-screen w-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">FEATURES</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Our platform offers everything you need to manage projects efficiently and keep your team on track.</p>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-xl shadow-2xl text-center transition-all duration-300 hover:shadow-blue-900"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center mb-4 h-16">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{feat.title}</h3>
              <p className="text-sm text-gray-300">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp",
    text: "SmartTask has transformed how our team collaborates. The intuitive interface and powerful features have increased our productivity by 40%."
  },
  {
    name: "Michael Chen",
    role: "Team Lead",
    company: "InnovateLabs",
    text: "The stress monitoring feature has been a game-changer for preventing burnout in our team. I can now better manage workloads and keep everyone happy."
  },
  {
    name: "Jessica Williams",
    role: "CEO",
    company: "StartupX",
    text: "As a fast-growing startup, we needed a solution that could scale with us. SmartTask has been the perfect fit, helping us stay organized through rapid growth."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-900 min-h-screen w-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="text-3xl font-bold mb-12 text-white">WHAT OUR USERS SAY</h2>
        
        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <p className="text-lg italic mb-6 text-gray-300">"{testimonials[activeIndex].text}"</p>
              <div>
                <p className="font-bold text-white">{testimonials[activeIndex].name}</p>
                <p className="text-sm text-gray-400">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full ${idx === activeIndex ? 'bg-blue-600' : 'bg-gray-700'}`}
              aria-label={`View testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "Up to 5 team members",
      "Basic task management",
      "Calendar integration",
      "Email support"
    ],
    highlighted: false,
    buttonText: "Start Free"
  },
  {
    name: "Professional",
    price: "$12",
    period: "per user/month",
    features: [
      "Unlimited team members",
      "Advanced task management",
      "Gantt charts & reporting",
      "Stress monitoring",
      "Priority support"
    ],
    highlighted: true,
    buttonText: "Try 14 Days Free"
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security",
      "Training & onboarding",
      "SLA guarantees"
    ],
    highlighted: false,
    buttonText: "Contact Sales"
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 px-6 bg-[#121212] min-h-screen w-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">PRICING PLANS</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Choose the perfect plan for your team's needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={`rounded-xl overflow-hidden shadow-lg ${plan.highlighted ? 'border-2 border-blue-400 ring-4 ring-blue-500/20' : 'border border-gray-700'}`}
            >
              <div className={`p-6 ${plan.highlighted ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-sm opacity-80">{plan.period}</span>}
                </div>
              </div>
              
              <div className="p-6 bg-gray-800 text-white">
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${plan.highlighted ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 w-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">SmartTask</h2>
          <p className="mt-4 text-sm">
            A smarter way to manage tasks, collaborate, and stay productive. Built for teams that aim for greatness.
          </p>
          <div className="mt-4 flex space-x-4 text-xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
            <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            <li><a href="/support" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="mt-2 text-sm text-gray-400">Subscribe to our newsletter</p>
          <form className="mt-4">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                aria-label="Subscribe"
              >
                <FaArrowRight />
              </button>
            </div>
          </form>
          <div className="mt-4">
            <a href="mailto:support@smarttask.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <FaEnvelope /> support@smarttask.com
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} SmartTask. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="/cookies" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const Mainpage = () => {
  const [loading, setLoading] = useState(true);

  // Force dark mode
  useEffect(() => {
    // Apply dark mode to root element
    document.documentElement.classList.add('dark');
    
    // Simulate loading resources
    const timer = setTimeout(() => setLoading(false), 1500);
    
    // Preload critical resources
    const preloadImages = () => {
      // You could add actual preloading logic here
    };
    
    preloadImages();
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-poppins overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-screen"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-screen overflow-hidden bg-[#121212] text-white"
          >
            <HeroSection />
            <Features />
            <Testimonials />
            <PricingSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mainpage;