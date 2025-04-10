
import React, { useState, useEffect } from 'react';
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
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type PromptFormProps = {
  onSubmit: (data: PromptData) => void;
  isLoading: boolean;
  initialData?: PromptData;
};

export type PromptData = {
  style: string;
  keywords: string;
  subject: string;
};

export function PromptForm({ onSubmit, isLoading, initialData }: PromptFormProps) {
  const { t } = useLanguage();
  
  // Define validation schema
  const formSchema = z.object({
    style: z.string().min(1, { message: t('error.requiredField') }),
    keywords: z.string().min(1, { message: t('error.requiredField') }),
    subject: z.string().min(1, { message: t('error.requiredField') }),
  });

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      style: initialData?.style || '',
      keywords: initialData?.keywords || '',
      subject: initialData?.subject || '',
    },
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        style: initialData.style,
        keywords: initialData.keywords,
        subject: initialData.subject,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.promptStyle')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="glass-panel-inner">
                        <SelectValue placeholder={t('form.promptStyle.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="creative">{t('style.creative')}</SelectItem>
                      <SelectItem value="professional">{t('style.professional')}</SelectItem>
                      <SelectItem value="academic">{t('style.academic')}</SelectItem>
                      <SelectItem value="technical">{t('style.technical')}</SelectItem>
                      <SelectItem value="conversational">{t('style.conversational')}</SelectItem>
                      <SelectItem value="storytelling">{t('style.storytelling')}</SelectItem>
                      <SelectItem value="persuasive">{t('style.persuasive')}</SelectItem>
                      <SelectItem value="instructional">{t('style.instructional')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.keywords')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.keywords.placeholder')}
                      className="glass-panel-inner"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.subject')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.subject.placeholder')}
                      className="glass-panel-inner"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('loading.message')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t('form.submit')}
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
