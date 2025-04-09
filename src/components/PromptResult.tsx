
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type PromptResultProps = {
  result: string;
  onRegenerate?: () => void;
};

export function PromptResult({ result, onRegenerate }: PromptResultProps) {
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
    <Card className="w-full max-w-xl mt-6">
      <CardHeader>
        <CardTitle>{t('result.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-secondary rounded-md whitespace-pre-wrap">
          {result}
        </div>
        <div className="flex space-x-2">
          {onRegenerate && (
            <Button variant="outline" onClick={onRegenerate}>
              {t('result.regenerate')}
            </Button>
          )}
          <Button variant="secondary" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {t('result.copied')}
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                {t('result.copy')}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
