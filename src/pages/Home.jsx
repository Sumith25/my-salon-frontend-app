import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gradient-to-br from-pink-50 to-white flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Unwind. Refresh. Shine.
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Your trusted beauty partner for effortless appointments, luxury services, and expert care.
          </p>
          <Link
            to="/services"
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition"
          >
            Explore Our Services
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Salon illustration"
          className="rounded-2xl shadow-lg max-w-sm lg:max-w-md"
        />
      </main>
    </div>
  );
}
