'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    Panel,
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from '@/components/nodes/nodeTypes';
import { useDiagramStore } from '@/stores/diagramStore';
import { parseMermaid } from '@/lib/parser/mermaidParser';
import { applyDagreLayout } from '@/lib/layout/dagreLayout';
import { exportToPng, exportToSvg, copyToClipboard } from '@/lib/export/exportCanvas';
import { FaDownload, FaImage, FaCopy, FaExpand, FaCompress } from 'react-icons/fa';

function DiagramCanvasInner() {
    const reactFlowInstance = useReactFlow();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { code, theme, setParseError, setParsedDiagram } = useDiagramStore();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    // Parse and layout on code or theme change
    useEffect(() => {
        const parseAndLayout = async () => {
            try {
                const parsed = await parseMermaid(code);
                setParsedDiagram(parsed);
                setParseError(null);

                const { nodes: layoutNodes, edges: layoutEdges } = applyDagreLayout(parsed, theme);
                setNodes(layoutNodes);
                setEdges(layoutEdges);

                // Fit view after layout
                setTimeout(() => {
                    reactFlowInstance.fitView({ padding: 0.2 });
                }, 50);
            } catch (err) {
                setParseError(err instanceof Error ? err.message : 'Parse error');
            }
        };

        parseAndLayout();
    }, [code, theme, reactFlowInstance, setNodes, setEdges, setParseError, setParsedDiagram]);

    // Export handlers
    const handleExportPng = useCallback(async () => {
        const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
        if (viewport) {
            await exportToPng(viewport, 'proarch-diagram');
        }
        setExportMenuOpen(false);
    }, []);

    const handleExportSvg = useCallback(async () => {
        const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
        if (viewport) {
            await exportToSvg(viewport, 'proarch-diagram');
        }
        setExportMenuOpen(false);
    }, []);

    const handleCopyToClipboard = useCallback(async () => {
        const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
        if (viewport) {
            await copyToClipboard(viewport);
        }
        setExportMenuOpen(false);
    }, []);

    // Fullscreen toggle
    const toggleFullscreen = useCallback(() => {
        if (!canvasRef.current) return;

        if (!document.fullscreenElement) {
            canvasRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    // Minimap node color
    const nodeColor = (node: Node) => {
        if (node.type === 'cluster') return '#dbeafe';
        return theme === 'modern' ? '#f1f5f9' : '#e5e7eb';
    };

    return (
        <div ref={canvasRef} className="w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.1}
                maxZoom={2}
                attributionPosition="bottom-left"
                proOptions={{ hideAttribution: true }}
                className={theme === 'modern' ? 'bg-gray-50' : 'bg-white'}
            >
                <Background
                    color={theme === 'modern' ? '#e2e8f0' : '#d1d5db'}
                    gap={20}
                    size={1}
                />
                <Controls
                    className="bg-white rounded-lg shadow-md border border-gray-200"
                    showInteractive={false}
                />
                <MiniMap
                    nodeColor={nodeColor}
                    maskColor="rgba(255, 255, 255, 0.8)"
                    className="bg-white rounded-lg shadow-md border border-gray-200"
                />

                {/* Export Panel */}
                <Panel position="top-right" className="flex gap-2">
                    {/* Export dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setExportMenuOpen(!exportMenuOpen)}
                            className={`
                flex items-center gap-2 px-3 py-2 rounded-lg shadow-md
                bg-white border border-gray-200 text-gray-700
                hover:bg-gray-50 transition-colors
              `}
                        >
                            <FaDownload className="w-4 h-4" />
                            <span className="text-sm font-medium">Export</span>
                        </button>

                        {exportMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <button
                                    onClick={handleExportPng}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <FaImage className="w-4 h-4" />
                                    Export as PNG
                                </button>
                                <button
                                    onClick={handleExportSvg}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <FaDownload className="w-4 h-4" />
                                    Export as SVG
                                </button>
                                <button
                                    onClick={handleCopyToClipboard}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <FaCopy className="w-4 h-4" />
                                    Copy to Clipboard
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Fullscreen toggle */}
                    <button
                        onClick={toggleFullscreen}
                        className={`
              flex items-center gap-2 px-3 py-2 rounded-lg shadow-md
              bg-white border border-gray-200 text-gray-700
              hover:bg-gray-50 transition-colors
            `}
                        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                        {isFullscreen ? (
                            <FaCompress className="w-4 h-4" />
                        ) : (
                            <FaExpand className="w-4 h-4" />
                        )}
                    </button>
                </Panel>
            </ReactFlow>

            {/* Click outside to close export menu */}
            {exportMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setExportMenuOpen(false)}
                />
            )}
        </div>
    );
}

export default function DiagramCanvas() {
    return (
        <ReactFlowProvider>
            <DiagramCanvasInner />
        </ReactFlowProvider>
    );
}
