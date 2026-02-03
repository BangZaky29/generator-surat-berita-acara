import React from 'react';
import { Layout, FileText, Edit3 } from 'lucide-react';

interface MobileActionButtonProps {
    view: 'form' | 'preview';
    onClick: () => void;
}

const MobileActionButton: React.FC<MobileActionButtonProps> = ({ view, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-90"
        >
            {view === 'form' ? (
                <FileText className="w-6 h-6 animate-in zoom-in duration-300" />
            ) : (
                <Edit3 className="w-6 h-6 animate-in zoom-in duration-300" />
            )}
        </button>
    );
};

export default MobileActionButton;
