import type { HistoryItem } from '../types';

const STORAGE_KEY = 'berita_acara_history';

export const saveToHistory = (item: HistoryItem) => {
    const history = getHistory();
    const index = history.findIndex(h => h.id === item.id);

    if (index >= 0) {
        history[index] = item;
    } else {
        history.push(item);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const deleteFromHistory = (id: string) => {
    const history = getHistory().filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};
