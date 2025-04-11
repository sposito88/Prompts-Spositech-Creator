import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Clock, Star, StarOff } from 'lucide-react';

export type HistoryItem = {
  id: string;
  prompt: string;
  timestamp: Date;
  style: string;
  keywords: string;
  subject: string;
  favorite: boolean;
};

type PromptHistoryProps = {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onClear: () => void;
  title?: string;
  emptyMessage?: string;
};

export function PromptHistory({ 
  items, 
  onSelect, 
  onToggleFavorite, 
  onClear,
  title,
  emptyMessage
}: PromptHistoryProps) {
  const { t } = useLanguage();
  
  const displayTitle = title || t('history.title');
  const displayEmptyMessage = emptyMessage || t('history.empty');
  
  if (items.length === 0) {
    return (
      <Card className="w-full bg-white/60 border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-gray-100">{displayTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">{displayEmptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/60 border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gray-800 dark:text-gray-100">{displayTitle}</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear} 
          className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          {t('history.clear')}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-3 bg-white/80 border border-gray-200 rounded-md hover:bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700 dark:hover:bg-gray-800/70 transition-colors cursor-pointer flex justify-between group"
                onClick={() => onSelect(item)}
              >
                <div className="flex-1 mr-2 overflow-hidden">
                  <p className="font-medium truncate text-gray-800 dark:text-gray-100">{item.style} - {item.subject}</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-purple-600 hover:bg-transparent dark:text-gray-500 dark:hover:text-purple-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                >
                  {item.favorite ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
