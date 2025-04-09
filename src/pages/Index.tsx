
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptForm, PromptData } from '@/components/PromptForm';
import { PromptResult } from '@/components/PromptResult';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastData, setLastData] = useState<PromptData | null>(null);

  const generatePrompt = async (data: PromptData) => {
    setIsLoading(true);
    setResult(null);
    setLastData(data);

    try {
      const response = await fetch('https://n8n.spositech.com.br/webhook/creator-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const responseData = await response.json();
      setResult(responseData.prompt || responseData.result || JSON.stringify(responseData));
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        variant: "destructive",
        title: t('error.general'),
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastData) {
      generatePrompt(lastData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 mb-8">
            <PromptForm onSubmit={generatePrompt} isLoading={isLoading} />
          </div>
          
          {isLoading && <LoadingAnimation />}
          
          {result && !isLoading && (
            <PromptResult result={result} onRegenerate={handleRegenerate} />
          )}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2023 Spositech Prompt Generation</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
