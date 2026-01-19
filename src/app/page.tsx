'use client';

import dynamic from 'next/dynamic';
import { Panel, Group, Separator } from 'react-resizable-panels';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { FaGithub, FaCubes } from 'react-icons/fa';

// Dynamic import to avoid SSR issues with Monaco and React Flow
const CodeEditor = dynamic(
  () => import('@/components/editor/CodeEditor'),
  { ssr: false, loading: () => <EditorSkeleton /> }
);

const DiagramCanvas = dynamic(
  () => import('@/components/canvas/DiagramCanvas'),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

function EditorSkeleton() {
  return (
    <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
      <div className="text-gray-600">Loading editor...</div>
    </div>
  );
}

function CanvasSkeleton() {
  return (
    <div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading canvas...</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <FaCubes className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ProArch</h1>
            <p className="text-xs text-gray-500">Professional Architecture Diagrams</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="View on GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="flex-1 overflow-hidden">
        <Group orientation="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <Panel defaultSize="35%" minSize="20%" maxSize="60%">
            <CodeEditor />
          </Panel>

          {/* Resize Handle */}
          <Separator className="w-1.5 bg-gray-200 hover:bg-indigo-400 transition-colors cursor-col-resize" />

          {/* Diagram Canvas Panel */}
          <Panel defaultSize="65%" minSize="40%">
            <DiagramCanvas />
          </Panel>
        </Group>
      </main>

      {/* Footer */}
      <footer className="px-6 py-2 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
        Built with Next.js, React Flow & Tailwind CSS • Mermaid syntax compatible
      </footer>
    </div>
  );
}
