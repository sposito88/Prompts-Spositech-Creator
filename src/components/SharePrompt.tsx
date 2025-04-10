
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          {t('share.title')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">{t('share.title')}</h4>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank')}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank')}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`, '_blank')}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-[#DD4B39] hover:bg-[#DD4B39]/90 text-white"
              onClick={() => window.open(`mailto:?subject=${t('share.emailSubject')}&body=${shareText}%0A%0A${shareUrl}`, '_blank')}
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>

          <div className="pt-2">
            <Button 
              onClick={copyToClipboard} 
              variant="secondary" 
              className="w-full gap-2"
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
      </PopoverContent>
    </Popover>
  );
}
