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
      <TabsList className="w-full bg-gray-100 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
        <TabsTrigger 
          value="history" 
          className="flex-1 text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:text-purple-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-purple-300"
        >
          <Clock className="h-4 w-4 mr-2" />
          {t('history.title')}
        </TabsTrigger>
        <TabsTrigger 
          value="favorites" 
          className="flex-1 text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:text-purple-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-purple-300"
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
          title={t('history.title')}
          emptyMessage={t('history.empty')}
        />
      </TabsContent>
      
      <TabsContent value="favorites" className="mt-4">
        <PromptHistory 
          items={favorites} 
          onSelect={onSelectItem}
          onToggleFavorite={onToggleFavorite}
          onClear={onClearFavorites}
          title={t('favorites.title')}
          emptyMessage={t('favorites.empty')}
        />
      </TabsContent>
    </Tabs>
  );
}
