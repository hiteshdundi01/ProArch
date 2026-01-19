'use client';

import { useDiagramStore } from '@/stores/diagramStore';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useDiagramStore();
    const isModern = theme === 'modern';

    return (
        <button
            onClick={toggleTheme}
            className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        transition-all duration-200
        ${isModern
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }
      `}
            title={`Switch to ${isModern ? 'Classic' : 'Modern'} theme`}
        >
            {isModern ? (
                <>
                    <FaMoon className="w-4 h-4" />
                    <span className="text-sm font-medium">Modern</span>
                </>
            ) : (
                <>
                    <FaSun className="w-4 h-4" />
                    <span className="text-sm font-medium">Classic</span>
                </>
            )}
        </button>
    );
}
