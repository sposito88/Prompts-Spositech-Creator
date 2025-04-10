
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
};

export function PromptHistory({ items, onSelect, onToggleFavorite, onClear }: PromptHistoryProps) {
  const { t } = useLanguage();
  
  if (items.length === 0) {
    return (
      <Card className="w-full bg-black/30 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">{t('history.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-4">{t('history.empty')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-black/30 border border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">{t('history.title')}</CardTitle>
        <Button variant="outline" size="sm" onClick={onClear} className="border-gray-700 text-gray-300 hover:bg-gray-800">
          {t('history.clear')}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-3 border border-gray-800 rounded-md hover:bg-gray-900 transition-colors cursor-pointer flex justify-between group"
                onClick={() => onSelect(item)}
              >
                <div className="flex-1 mr-2 overflow-hidden">
                  <p className="font-medium truncate text-white">{item.style} - {item.subject}</p>
                  <div className="flex items-center text-xs text-gray-400 space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white hover:bg-transparent"
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
