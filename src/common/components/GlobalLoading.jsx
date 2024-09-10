import React from 'react';
import { useSupabaseAuth } from '../../integrations/supabase/auth';
import { motion } from 'framer-motion';

const GlobalLoading = () => {
  const { loading } = useSupabaseAuth();

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <motion.div 
          className="w-24 h-24 mb-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            },
            scale: {
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            },
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </motion.div>
        <motion.p 
          className="text-xl font-semibold text-primary"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading Lion Studio...
        </motion.p>
        <motion.div
          className="mt-4 flex space-x-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlobalLoading;