
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export function LoadingAnimation() {
  const { t } = useLanguage();

  const dotVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.8,
      }
    },
  };

  // Simular texto sendo gerado
  const loadingText = t('loading.generating');
  const charVariants = {
    initial: { opacity: 0 },
    animate: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl"
    >
      <Card className="p-6 border-gradient">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden mb-6">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary rounded-full"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "linear"
              }}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                variants={dotVariants}
                initial="initial"
                animate="animate"
                custom={i * 0.2} // stagger
                transition={{ delay: i * 0.2 }}
              />
            ))}
          </div>
          
          <div className="font-mono text-center text-lg">
            <div className="flex justify-center">
              {loadingText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          
          <p className="mt-4 text-muted-foreground text-center max-w-md">
            {t('loading.message')}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
