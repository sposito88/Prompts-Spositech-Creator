
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptHistory, HistoryItem } from './PromptHistory';
import { Clock, Star } from 'lucide-react';

interface HistoryTabsProps {
  history: HistoryItem[];
  favorites: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onClearHistory: () => void;
  onClearFavorites: () => void;
}

export function HistoryTabs({
  history,
  favorites,
  onSelectItem,
  onToggleFavorite,
  onClearHistory,
  onClearFavorites
}: HistoryTabsProps) {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="history" className="w-full">
      <TabsList className="w-full bg-black/50 border border-gray-800">
        <TabsTrigger 
          value="history" 
          className="flex-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white"
        >
          <Clock className="h-4 w-4 mr-2" />
          {t('history.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="favorites" 
          className="flex-1 data-[state=active]:bg-gray-800 data-[state=active]:text-white"
        >
          <Star className="h-4 w-4 mr-2" />
          {t('favorites.title')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="history" className="mt-4">
        <PromptHistory 
          items={history} 
          onSelect={onSelectItem}
          onToggleFavorite={onToggleFavorite}
          onClear={onClearHistory}
        />
      </TabsContent>
      
      <TabsContent value="favorites" className="mt-4">
        <PromptHistory 
          items={favorites} 
          onSelect={onSelectItem}
          onToggleFavorite={onToggleFavorite}
          onClear={onClearFavorites}
        />
      </TabsContent>
    </Tabs>
  );
}
