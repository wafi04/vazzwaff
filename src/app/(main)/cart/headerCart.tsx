import {motion} from "framer-motion"
export function HeaderCart() {
  return (
    <section className="mb-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-blue-50"
      >
        Checkout
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-blue-300/80 mt-2"
      >
        Lengkapi Pembelianmu
      </motion.p>
    </section>
  );
}