'use client';

import { useCallback, useRef, useEffect, useState } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useDiagramStore } from '@/stores/diagramStore';
import { SAMPLE_TEMPLATES } from '@/lib/templates/sampleTemplates';
import { FaUndo, FaRedo, FaList, FaKeyboard } from 'react-icons/fa';

export default function CodeEditor() {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const { code, setCode, undo, redo, canUndo, canRedo, parseError } = useDiagramStore();
    const [showTemplates, setShowTemplates] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);

    // Handle editor mount
    const handleEditorMount: OnMount = useCallback((editor) => {
        editorRef.current = editor;

        // Add keyboard shortcuts
        editor.addCommand(
            // Ctrl/Cmd + Z for undo
            2048 | 56, // KeyMod.CtrlCmd | KeyCode.KeyZ
            () => undo()
        );

        editor.addCommand(
            // Ctrl/Cmd + Shift + Z for redo
            2048 | 1024 | 56, // KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyZ
            () => redo()
        );
    }, [undo, redo]);

    // Handle code changes
    const handleChange: OnChange = useCallback((value) => {
        if (value !== undefined) {
            setCode(value);
        }
    }, [setCode]);

    // Load template
    const loadTemplate = useCallback((templateCode: string) => {
        setCode(templateCode);
        setShowTemplates(false);
    }, [setCode]);

    // Global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                undo();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    return (
        <div className="flex flex-col h-full bg-gray-900">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    {/* Undo/Redo */}
                    <button
                        onClick={undo}
                        disabled={!canUndo()}
                        className={`
              p-2 rounded transition-colors
              ${canUndo()
                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-600 cursor-not-allowed'
                            }
            `}
                        title="Undo (Ctrl+Z)"
                    >
                        <FaUndo className="w-4 h-4" />
                    </button>
                    <button
                        onClick={redo}
                        disabled={!canRedo()}
                        className={`
              p-2 rounded transition-colors
              ${canRedo()
                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-600 cursor-not-allowed'
                            }
            `}
                        title="Redo (Ctrl+Shift+Z)"
                    >
                        <FaRedo className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-700 mx-2" />

                    {/* Templates dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <FaList className="w-3 h-3" />
                            Templates
                        </button>

                        {showTemplates && (
                            <div className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                                {SAMPLE_TEMPLATES.map((template) => (
                                    <button
                                        key={template.name}
                                        onClick={() => loadTemplate(template.code)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="text-sm text-white font-medium">{template.name}</div>
                                        <div className="text-xs text-gray-400">{template.description}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Shortcuts help */}
                <div className="relative">
                    <button
                        onClick={() => setShowShortcuts(!showShortcuts)}
                        className="p-2 rounded text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                        title="Keyboard shortcuts"
                    >
                        <FaKeyboard className="w-4 h-4" />
                    </button>

                    {showShortcuts && (
                        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 z-50">
                            <h3 className="text-sm font-medium text-white mb-3">Keyboard Shortcuts</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Undo</span>
                                    <kbd className="px-2 py-0.5 bg-gray-700 rounded text-gray-300">Ctrl+Z</kbd>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Redo</span>
                                    <kbd className="px-2 py-0.5 bg-gray-700 rounded text-gray-300">Ctrl+Shift+Z</kbd>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Save</span>
                                    <kbd className="px-2 py-0.5 bg-gray-700 rounded text-gray-300">Auto-save</kbd>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Error banner */}
            {parseError && (
                <div className="px-4 py-2 bg-red-900/50 border-b border-red-800 text-red-300 text-sm">
                    ⚠️ {parseError}
                </div>
            )}

            {/* Monaco Editor */}
            <div className="flex-1">
                <Editor
                    defaultLanguage="markdown"
                    value={code}
                    onChange={handleChange}
                    onMount={handleEditorMount}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        fontFamily: "'Fira Code', 'Consolas', monospace",
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        padding: { top: 16 },
                        renderLineHighlight: 'line',
                        cursorStyle: 'line',
                        cursorBlinking: 'smooth',
                    }}
                />
            </div>

            {/* Click outside to close dropdowns */}
            {(showTemplates || showShortcuts) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowTemplates(false);
                        setShowShortcuts(false);
                    }}
                />
            )}
        </div>
    );
}
