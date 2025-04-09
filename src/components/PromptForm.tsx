
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

type PromptFormProps = {
  onSubmit: (data: PromptData) => void;
  isLoading: boolean;
};

export type PromptData = {
  style: string;
  keywords: string;
  subject: string;
};

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const { t } = useLanguage();
  
  const [style, setStyle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [subject, setSubject] = useState('');
  
  const [errors, setErrors] = useState({
    style: false,
    keywords: false,
    subject: false,
  });

  const validateForm = () => {
    const newErrors = {
      style: !style,
      keywords: !keywords,
      subject: !subject,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        style,
        keywords,
        subject,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="style">{t('form.promptStyle')}</Label>
        <Select value={style} onValueChange={setStyle}>
          <SelectTrigger id="style" className={errors.style ? 'border-red-500' : ''}>
            <SelectValue placeholder={t('form.promptStyle.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="creative">{t('style.creative')}</SelectItem>
            <SelectItem value="professional">{t('style.professional')}</SelectItem>
            <SelectItem value="academic">{t('style.academic')}</SelectItem>
            <SelectItem value="technical">{t('style.technical')}</SelectItem>
            <SelectItem value="conversational">{t('style.conversational')}</SelectItem>
            <SelectItem value="storytelling">{t('style.storytelling')}</SelectItem>
          </SelectContent>
        </Select>
        {errors.style && <p className="text-sm text-red-500">{t('error.requiredField')}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">{t('form.keywords')}</Label>
        <Input
          id="keywords"
          placeholder={t('form.keywords.placeholder')}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className={errors.keywords ? 'border-red-500' : ''}
        />
        {errors.keywords && <p className="text-sm text-red-500">{t('error.requiredField')}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t('form.subject')}</Label>
        <Input
          id="subject"
          placeholder={t('form.subject.placeholder')}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={errors.subject ? 'border-red-500' : ''}
        />
        {errors.subject && <p className="text-sm text-red-500">{t('error.requiredField')}</p>}
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('loading.message')}
          </>
        ) : (
          t('form.submit')
        )}
      </Button>
    </form>
  );
}
