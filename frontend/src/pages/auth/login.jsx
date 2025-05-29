import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaGoogle, FaGithub, FaLinkedin, FaChartLine, FaLightbulb, FaRegClock, FaRegChartBar, FaTasks, FaUsers, FaBrain, FaRocket } from 'react-icons/fa';
import '../../index.css';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Animated Icon Component
const AnimatedIcon = ({ icon, delay }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: delay 
      }}
      className="text-blue-500 text-3xl"
    >
      {icon}
    </motion.div>
  );
};

// Floating Icon Animation
const FloatingIcon = ({ icon, x, y, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: [y, y - 10, y],
        x: [x, x + 5, x]
      }}
      transition={{ 
        delay: delay,
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute text-blue-400/30 text-2xl"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {icon}
    </motion.div>
  );
};

// Quotes for the sidebar
const quotes = [
  {
    text: "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
    author: "Paul J. Meyer"
  },
  {
    text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    author: "Steve Jobs"
  },
  {
    text: "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one.",
    author: "Mark Twain"
  }
];

// Product benefits
const benefits = [
  {
    icon: <FaChartLine />,
    title: "Productivity Boost",
    description: "Increase team efficiency by 40%"
  },
  {
    icon: <FaRegClock />,
    title: "Time Saving",
    description: "Reduce planning time by 60%"
  },
  {
    icon: <FaRegChartBar />,
    title: "Visual Analytics",
    description: "Clear insights at a glance"
  },
  {
    icon: <FaUsers />,
    title: "Team Synergy",
    description: "Enhanced collaboration"
  }
];

function Login() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  // Force dark mode and simulate loading
  useEffect(() => {
    // Apply dark mode to root element
    document.documentElement.classList.add('dark');
    
    // Simulate loading resources
    const timer = setTimeout(() => setLoading(false), 1000);
    
    // Rotate quotes every 10 seconds
    const quoteTimer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 10000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Login attempt with:', formData);
    // For demo purposes, navigate to dashboard after "authentication"
    // navigate('/dashboard');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

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
            className="w-screen h-screen overflow-hidden bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white flex items-center justify-center"
          >
            <div className="w-full max-w-6xl h-full md:h-auto flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
              {/* Left Side - Product Info & Quote */}
              <motion.div 
                variants={slideIn}
                initial="hidden"
                animate="visible"
                className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-gray-800 p-8 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Floating background icons */}
                <div className="absolute inset-0 overflow-hidden">
                  <FloatingIcon icon={<FaTasks />} x={10} y={20} delay={0.5} />
                  <FloatingIcon icon={<FaChartLine />} x={80} y={15} delay={0.8} />
                  <FloatingIcon icon={<FaUsers />} x={20} y={70} delay={1.2} />
                  <FloatingIcon icon={<FaRegChartBar />} x={70} y={60} delay={1.5} />
                  <FloatingIcon icon={<FaBrain />} x={40} y={40} delay={1.8} />
                  <FloatingIcon icon={<FaRocket />} x={85} y={85} delay={2.1} />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6">SmartTask</h2>
                  <h3 className="text-2xl font-semibold mb-4">Elevate Your Project Management</h3>
                  <p className="text-gray-300 mb-8">Our intelligent system helps teams collaborate effectively, track progress seamlessly, and deliver projects on time.</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <AnimatedIcon icon={benefit.icon} delay={0.1 * (index + 1)} />
                        <div>
                          <h4 className="font-semibold">{benefit.title}</h4>
                          <p className="text-sm text-gray-300">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 relative z-10"
                >
                  <p className="text-lg italic mb-3 text-gray-200">
                    "{quotes[quoteIndex].text}"
                  </p>
                  <p className="text-right text-sm text-blue-300">— {quotes[quoteIndex].author}</p>
                </motion.div>
              </motion.div>
              
              {/* Right Side - Login Form */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="w-full md:w-1/2 p-8 bg-gray-900/80 backdrop-blur-xl"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                  <p className="text-gray-400">Sign in to continue to SmartTask</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="text-gray-500" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    Sign In <FaArrowRight />
                  </motion.button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
                    >
                      <FaGoogle className="text-lg" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
                    >
                      <FaGithub className="text-lg" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
                    >
                      <FaLinkedin className="text-lg" />
                    </motion.button>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-400">Don't have an account? </span>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    href="/register" 
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    Sign up now
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;