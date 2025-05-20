'use client'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}   // 👈 position de départ
        animate={{ opacity: 1, y: 0 }}     // 👈 position d'arrivée
        transition={{ duration: 0.6 }}     // 👈 durée de l'animation
      >
        <motion.h1
          className="text-4xl font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Bienvenue sur mon portfolio
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ThemeSwitcher />
        </motion.div>
      </motion.div>
    </main>
  )
}
