import mermaid from 'mermaid';
import { ParsedDiagram, DiagramNode, DiagramEdge, DiagramSubgraph } from '@/types/diagram';

// Initialize mermaid for parsing
mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    flowchart: {
        htmlLabels: true,
        curve: 'basis',
    },
});

/**
 * Parse Mermaid syntax and extract nodes, edges, and subgraphs
 */
export async function parseMermaid(code: string): Promise<ParsedDiagram> {
    // Default result
    const result: ParsedDiagram = {
        nodes: [],
        edges: [],
        subgraphs: [],
        direction: 'LR',
    };

    if (!code.trim()) {
        return result;
    }

    try {
        // Parse using mermaid's parser
        const { svg, bindFunctions } = await mermaid.render('temp-diagram', code);

        // Since mermaid doesn't expose the AST directly in newer versions,
        // we'll parse the mermaid syntax manually for flowcharts
        return parseFlowchartSyntax(code);
    } catch {
        // If mermaid.render fails, try manual parsing
        return parseFlowchartSyntax(code);
    }
}

/**
 * Manual parser for flowchart/graph syntax
 */
function parseFlowchartSyntax(code: string): ParsedDiagram {
    const nodes: Map<string, DiagramNode> = new Map();
    const edges: DiagramEdge[] = [];
    const subgraphs: DiagramSubgraph[] = [];
    let direction: 'TB' | 'LR' | 'BT' | 'RL' = 'LR';

    const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('%%'));

    // Track current subgraph
    const subgraphStack: { id: string; label: string; nodeIds: string[] }[] = [];
    let subgraphCounter = 0;

    for (const line of lines) {
        // Parse direction from graph declaration
        const graphMatch = line.match(/^(graph|flowchart)\s+(TB|TD|BT|LR|RL)/i);
        if (graphMatch) {
            const dir = graphMatch[2].toUpperCase();
            direction = (dir === 'TD' ? 'TB' : dir) as 'TB' | 'LR' | 'BT' | 'RL';
            continue;
        }

        // Parse subgraph start
        const subgraphMatch = line.match(/^subgraph\s+(?:"([^"]+)"|(\S+))?/i);
        if (subgraphMatch) {
            const label = subgraphMatch[1] || subgraphMatch[2] || `Subgraph ${subgraphCounter}`;
            const id = `subgraph-${subgraphCounter++}`;
            subgraphStack.push({ id, label, nodeIds: [] });
            continue;
        }

        // Parse subgraph end
        if (line.toLowerCase() === 'end') {
            const completed = subgraphStack.pop();
            if (completed) {
                subgraphs.push({
                    id: completed.id,
                    label: completed.label,
                    nodeIds: completed.nodeIds,
                });
            }
            continue;
        }

        // Parse edges: A --> B, A[Label A] --> B[Label B], A -->|text| B, etc.
        const edgePatterns = [
            // With labels on both nodes and edge
            /^(\w+)(?:\[([^\]]*)\]|\(([^\)]*)\)|\{([^\}]*)\})?\s*(-->|---|-\.->|==>)(?:\|([^\|]*)\|)?\s*(\w+)(?:\[([^\]]*)\]|\(([^\)]*)\)|\{([^\}]*)\})?/,
        ];

        let matched = false;
        for (const pattern of edgePatterns) {
            const match = line.match(pattern);
            if (match) {
                const sourceId = match[1];
                const sourceLabel = match[2] || match[3] || match[4] || sourceId;
                const edgeType = match[5];
                const edgeLabel = match[6];
                const targetId = match[7];
                const targetLabel = match[8] || match[9] || match[10] || targetId;

                // Add source node
                if (!nodes.has(sourceId)) {
                    const node: DiagramNode = {
                        id: sourceId,
                        label: sourceLabel,
                        shape: getShapeFromSyntax(match[2] ? '[' : match[3] ? '(' : match[4] ? '{' : '['),
                    };
                    if (subgraphStack.length > 0) {
                        node.parentId = subgraphStack[subgraphStack.length - 1].id;
                        subgraphStack[subgraphStack.length - 1].nodeIds.push(sourceId);
                    }
                    nodes.set(sourceId, node);
                }

                // Add target node
                if (!nodes.has(targetId)) {
                    const node: DiagramNode = {
                        id: targetId,
                        label: targetLabel,
                        shape: getShapeFromSyntax(match[8] ? '[' : match[9] ? '(' : match[10] ? '{' : '['),
                    };
                    if (subgraphStack.length > 0) {
                        node.parentId = subgraphStack[subgraphStack.length - 1].id;
                        subgraphStack[subgraphStack.length - 1].nodeIds.push(targetId);
                    }
                    nodes.set(targetId, node);
                }

                // Add edge
                edges.push({
                    id: `edge-${edges.length}`,
                    source: sourceId,
                    target: targetId,
                    label: edgeLabel,
                    style: getEdgeStyle(edgeType),
                    animated: edgeType === '-.->' || edgeType === '-.->',
                });

                matched = true;
                break;
            }
        }

        // Parse standalone node definitions (A[Label])
        if (!matched) {
            const nodeMatch = line.match(/^(\w+)(?:\[([^\]]*)\]|\(([^\)]*)\)|\{([^\}]*)\})\s*$/);
            if (nodeMatch) {
                const nodeId = nodeMatch[1];
                const label = nodeMatch[2] || nodeMatch[3] || nodeMatch[4] || nodeId;

                if (!nodes.has(nodeId)) {
                    const node: DiagramNode = {
                        id: nodeId,
                        label: label,
                        shape: getShapeFromSyntax(nodeMatch[2] ? '[' : nodeMatch[3] ? '(' : '{'),
                    };
                    if (subgraphStack.length > 0) {
                        node.parentId = subgraphStack[subgraphStack.length - 1].id;
                        subgraphStack[subgraphStack.length - 1].nodeIds.push(nodeId);
                    }
                    nodes.set(nodeId, node);
                }
            }
        }
    }

    return {
        nodes: Array.from(nodes.values()),
        edges,
        subgraphs,
        direction,
    };
}

function getShapeFromSyntax(char: string): DiagramNode['shape'] {
    switch (char) {
        case '(':
            return 'rounded';
        case '{':
            return 'diamond';
        default:
            return 'rect';
    }
}

function getEdgeStyle(edgeType: string): DiagramEdge['style'] {
    switch (edgeType) {
        case '---':
            return 'solid';
        case '-.->':
        case '-.-':
            return 'dashed';
        case '==>':
            return 'thick';
        default:
            return 'solid';
    }
}
