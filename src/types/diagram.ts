// Diagram element types
export interface DiagramNode {
  id: string;
  label: string;
  shape?: 'rect' | 'rounded' | 'diamond' | 'circle';
  parentId?: string; // For subgraph membership
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: 'solid' | 'dashed' | 'thick';
  animated?: boolean;
}

export interface DiagramSubgraph {
  id: string;
  label: string;
  nodeIds: string[];
}

export interface ParsedDiagram {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  subgraphs: DiagramSubgraph[];
  direction: 'TB' | 'LR' | 'BT' | 'RL';
}

// React Flow node data
export interface ServiceNodeData {
  label: string;
  subtitle?: string;
  iconKey?: string;
  theme: 'classic' | 'modern';
}

export interface ClusterNodeData {
  label: string;
  theme: 'classic' | 'modern';
}

// Store types
export interface DiagramState {
  // Code
  code: string;
  setCode: (code: string) => void;
  
  // History for undo/redo
  history: string[];
  historyIndex: number;
  pushHistory: (code: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Theme
  theme: 'classic' | 'modern';
  toggleTheme: () => void;
  
  // Parse state
  parseError: string | null;
  setParseError: (error: string | null) => void;
  
  // Parsed result
  parsedDiagram: ParsedDiagram | null;
  setParsedDiagram: (diagram: ParsedDiagram | null) => void;
}

// Export options
export interface ExportOptions {
  format: 'png' | 'svg';
  scale: number;
  backgroundColor: string;
}
