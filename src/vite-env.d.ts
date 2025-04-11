/// <reference types="vite/client" />

// Declarações para os módulos que não têm tipos explícitos
declare module 'lucide-react';
declare module 'framer-motion';

// Outras declarações globais necessárias
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // adicione mais variáveis de ambiente aqui se necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
