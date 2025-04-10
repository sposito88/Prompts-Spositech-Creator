
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Share2, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

type SharePromptProps = {
  text: string;
};

export function SharePrompt({ text }: SharePromptProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(text);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      description: t('share.copied'),
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          {t('share.title')}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 p-0 bg-black border border-gray-800">
        <DialogHeader className="p-4 text-center border-b border-gray-800">
          <DialogTitle>{t('share.title')}</DialogTitle>
        </DialogHeader>

        <div className="px-4 py-6">
          <div className="text-center mb-6">
            <div className="flex justify-center gap-2 mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-0"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank')}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-0"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white border-0"
                onClick={() => window.open(`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`, '_blank')}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#DD4B39] hover:bg-[#DD4B39]/90 text-white border-0"
                onClick={() => window.open(`mailto:?subject=${t('share.emailSubject')}&body=${shareText}%0A%0A${shareUrl}`, '_blank')}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative flex items-center justify-center mt-4 mb-2">
              <div className="w-full border-t border-gray-700"></div>
              <span className="px-3 bg-black text-gray-500 text-sm">{t('share.copy')}</span>
              <div className="w-full border-t border-gray-700"></div>
            </div>
            
            <Button 
              onClick={copyToClipboard} 
              variant="secondary" 
              className="w-full gap-2 mt-4"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {t('share.copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t('share.copy')}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
