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
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            loop: Infinity,
            ease: "linear",
            duration: 1
          }}
        />
        <motion.p 
          className="mt-4 text-lg font-semibold text-primary"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default GlobalLoading;