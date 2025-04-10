import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '@/components/Header';
import { PromptForm, PromptData } from '@/components/PromptForm';
import { PromptResult } from '@/components/PromptResult';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { PromptHistory, HistoryItem } from '@/components/PromptHistory';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Clock, Star } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const HISTORY_KEY = 'prompt-history';
const FAVORITES_KEY = 'prompt-favorites';

const Index = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastData, setLastData] = useState<PromptData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<HistoryItem[]>([]);
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PromptData | undefined>(undefined);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const generatePrompt = async (data: PromptData) => {
    setIsLoading(true);
    setResult(null);
    setLastData(data);

    const promptId = uuidv4();
    setCurrentPromptId(promptId);

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
      
      let resultText = '';
      
      if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].output) {
        resultText = responseData[0].output;
      } else {
        resultText = JSON.stringify(responseData);
      }
      
      setResult(resultText);
      
      const newHistoryItem: HistoryItem = {
        id: promptId,
        prompt: resultText,
        timestamp: new Date(),
        style: data.style,
        keywords: data.keywords,
        subject: data.subject,
        favorite: false
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 19)]);
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

  const handleToggleFavorite = (id: string) => {
    const historyItem = history.find(item => item.id === id);
    
    if (historyItem) {
      const existingFavoriteIndex = favorites.findIndex(item => item.id === id);
      
      if (existingFavoriteIndex >= 0) {
        setFavorites(prev => prev.filter(item => item.id !== id));
        
        setHistory(prev => 
          prev.map(item => 
            item.id === id ? { ...item, favorite: false } : item
          )
        );
        
        toast({
          description: t('favorites.removed'),
          duration: 2000,
        });
      } else {
        setFavorites(prev => [{ ...historyItem, favorite: true }, ...prev]);
        
        setHistory(prev => 
          prev.map(item => 
            item.id === id ? { ...item, favorite: true } : item
          )
        );
        
        toast({
          description: t('favorites.added'),
          duration: 2000,
        });
      }
    }
    
    if (id === currentPromptId) {
      const isFavorite = favorites.some(item => item.id === id);
      if (isFavorite) {
        setCurrentPromptId(null);
      }
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setResult(item.prompt);
    setLastData({
      style: item.style,
      keywords: item.keywords,
      subject: item.subject
    });
    setCurrentPromptId(item.id);
    setFormData({
      style: item.style,
      keywords: item.keywords,
      subject: item.subject
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast({
      description: t('history.cleared'),
      duration: 2000,
    });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    setHistory(prev => 
      prev.map(item => ({ ...item, favorite: false }))
    );
    toast({
      description: t('favorites.cleared'),
      duration: 2000,
    });
  };

  const isCurrentPromptFavorite = currentPromptId 
    ? favorites.some(item => item.id === currentPromptId)
    : false;

  const handleToggleCurrentFavorite = () => {
    if (currentPromptId) {
      handleToggleFavorite(currentPromptId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3 space-y-8">
              <motion.div 
                className="glass-panel p-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PromptForm 
                  onSubmit={generatePrompt} 
                  isLoading={isLoading} 
                  initialData={formData}
                />
              </motion.div>
              
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingAnimation />
                  </motion.div>
                )}
                
                {result && !isLoading && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <PromptResult 
                      result={result} 
                      onRegenerate={handleRegenerate}
                      onSaveToFavorites={handleToggleCurrentFavorite}
                      isFavorite={isCurrentPromptFavorite}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block w-full md:w-1/3">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="history" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    {t('history.title')}
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex-1">
                    <Star className="h-4 w-4 mr-2" />
                    {t('favorites.title')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-4">
                  <PromptHistory 
                    items={history} 
                    onSelect={handleSelectHistoryItem}
                    onToggleFavorite={handleToggleFavorite}
                    onClear={handleClearHistory}
                  />
                </TabsContent>
                <TabsContent value="favorites" className="mt-4">
                  <PromptHistory 
                    items={favorites} 
                    onSelect={handleSelectHistoryItem}
                    onToggleFavorite={handleToggleFavorite}
                    onClear={handleClearFavorites}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:hidden fixed bottom-6 right-6 z-10">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                    <Sparkles className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>{t('history.title')}</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <Tabs defaultValue="history" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="history" className="flex-1">
                          <Clock className="h-4 w-4 mr-2" />
                          {t('history.title')}
                        </TabsTrigger>
                        <TabsTrigger value="favorites" className="flex-1">
                          <Star className="h-4 w-4 mr-2" />
                          {t('favorites.title')}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="history" className="mt-4">
                        <PromptHistory 
                          items={history} 
                          onSelect={handleSelectHistoryItem}
                          onToggleFavorite={handleToggleFavorite}
                          onClear={handleClearHistory}
                        />
                      </TabsContent>
                      <TabsContent value="favorites" className="mt-4">
                        <PromptHistory 
                          items={favorites} 
                          onSelect={handleSelectHistoryItem}
                          onToggleFavorite={handleToggleFavorite}
                          onClear={handleClearFavorites}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
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
