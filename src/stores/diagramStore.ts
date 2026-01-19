import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DiagramState, ParsedDiagram } from '@/types/diagram';

const MAX_HISTORY = 50;

const DEFAULT_CODE = `graph LR
    subgraph "Service Cluster"
    I[Nginx Ingress] --> G1[gRPC Service 1]
    I --> G2[gRPC Service 2]
    end
    G1 --> R[Redis Cache]
    G1 --> P[Postgres DB]
`;

export const useDiagramStore = create<DiagramState>()(
    persist(
        (set, get) => ({
            // Code state
            code: DEFAULT_CODE,
            setCode: (code: string) => {
                const state = get();
                // Only push to history if code actually changed
                if (code !== state.code) {
                    state.pushHistory(code);
                }
                set({ code, parseError: null });
            },

            // History for undo/redo
            history: [DEFAULT_CODE],
            historyIndex: 0,

            pushHistory: (code: string) => {
                const state = get();
                // Remove any future states (if we're in the middle of history)
                const newHistory = state.history.slice(0, state.historyIndex + 1);
                newHistory.push(code);

                // Limit history size
                if (newHistory.length > MAX_HISTORY) {
                    newHistory.shift();
                }

                set({
                    history: newHistory,
                    historyIndex: newHistory.length - 1,
                });
            },

            undo: () => {
                const state = get();
                if (state.historyIndex > 0) {
                    const newIndex = state.historyIndex - 1;
                    set({
                        historyIndex: newIndex,
                        code: state.history[newIndex],
                        parseError: null,
                    });
                }
            },

            redo: () => {
                const state = get();
                if (state.historyIndex < state.history.length - 1) {
                    const newIndex = state.historyIndex + 1;
                    set({
                        historyIndex: newIndex,
                        code: state.history[newIndex],
                        parseError: null,
                    });
                }
            },

            canUndo: () => {
                const state = get();
                return state.historyIndex > 0;
            },

            canRedo: () => {
                const state = get();
                return state.historyIndex < state.history.length - 1;
            },

            // Theme
            theme: 'modern',
            toggleTheme: () => {
                set((state) => ({
                    theme: state.theme === 'classic' ? 'modern' : 'classic',
                }));
            },

            // Parse state
            parseError: null,
            setParseError: (error: string | null) => set({ parseError: error }),

            // Parsed result
            parsedDiagram: null,
            setParsedDiagram: (diagram: ParsedDiagram | null) => set({ parsedDiagram: diagram }),
        }),
        {
            name: 'proarch-diagram-storage',
            partialize: (state) => ({
                code: state.code,
                theme: state.theme,
                history: state.history,
                historyIndex: state.historyIndex,
            }),
        }
    )
);
