import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Copy, Check, Star, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SharePrompt } from './SharePrompt';
import { motion } from 'framer-motion';

type PromptResultProps = {
  result: string;
  onRegenerate?: () => void;
  onSaveToFavorites?: () => void;
  isFavorite?: boolean;
};

export function PromptResult({ 
  result, 
  onRegenerate, 
  onSaveToFavorites,
  isFavorite = false 
}: PromptResultProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast({
      description: t('result.copied'),
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mt-6 overflow-hidden border border-purple-300/50 bg-white/40 backdrop-blur-sm dark:border-purple-900/50 dark:bg-black/40">
        <CardHeader className="bg-purple-100/50 dark:bg-purple-900/20">
          <CardTitle className="flex justify-between items-center">
            <span className="text-gradient">{t('result.title')}</span>
            {onSaveToFavorites && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onSaveToFavorites}
                className="transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30"
                aria-label={isFavorite ? t('favorites.remove') : t('favorites.add')}
              >
                {isFavorite ? (
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star className="h-5 w-5" />
                )}
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="p-4 rounded-md whitespace-pre-wrap backdrop-blur-sm border bg-purple-50 border-purple-200/50 dark:bg-purple-900/10 dark:border-purple-900/30">
            {result}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t bg-purple-100/50 border-purple-200/50 p-4 dark:bg-purple-900/20 dark:border-purple-900/30">
          {onRegenerate && (
            <Button variant="outline" onClick={onRegenerate} className="gap-2 transition-colors border-purple-300/50 hover:bg-purple-100 dark:border-purple-700/50 dark:hover:bg-purple-900/30">
              <RefreshCw className="h-4 w-4" />
              {t('result.regenerate')}
            </Button>
          )}
          <Button variant="secondary" onClick={copyToClipboard} className="gap-2 transition-colors bg-purple-200 hover:bg-purple-300 dark:bg-purple-900/40 dark:hover:bg-purple-900/60">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                {t('result.copied')}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                {t('result.copy')}
              </>
            )}
          </Button>
          <SharePrompt text={result} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
