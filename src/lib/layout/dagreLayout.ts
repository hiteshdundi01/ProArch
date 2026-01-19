import dagre from 'dagre';
import { Node, Edge } from 'reactflow';
import { ParsedDiagram } from '@/types/diagram';
import { ServiceNodeData, ClusterNodeData } from '@/types/diagram';

// Node dimensions
const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;
const CLUSTER_PADDING = 40;

interface LayoutOptions {
    direction: 'TB' | 'LR' | 'BT' | 'RL';
    nodeSpacing: number;
    rankSpacing: number;
}

/**
 * Apply dagre layout to nodes and edges
 */
export function applyDagreLayout(
    parsedDiagram: ParsedDiagram,
    theme: 'classic' | 'modern',
    options?: Partial<LayoutOptions>
): { nodes: Node[]; edges: Edge[] } {
    const { nodes: diagramNodes, edges: diagramEdges, subgraphs, direction } = parsedDiagram;

    const layoutOptions: LayoutOptions = {
        direction: options?.direction || direction,
        nodeSpacing: options?.nodeSpacing || 60,
        rankSpacing: options?.rankSpacing || 100,
    };

    // Create dagre graph
    const g = new dagre.graphlib.Graph({ compound: true });
    g.setGraph({
        rankdir: layoutOptions.direction,
        nodesep: layoutOptions.nodeSpacing,
        ranksep: layoutOptions.rankSpacing,
        marginx: 20,
        marginy: 20,
    });
    g.setDefaultEdgeLabel(() => ({}));

    // Add subgraph (cluster) nodes first
    for (const subgraph of subgraphs) {
        g.setNode(subgraph.id, {
            label: subgraph.label,
            clusterLabelPos: 'top',
            width: 0, // Will be calculated based on children
            height: 0,
        });
    }

    // Add regular nodes
    for (const node of diagramNodes) {
        g.setNode(node.id, {
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            label: node.label,
        });

        // Set parent if node belongs to a subgraph
        if (node.parentId) {
            g.setParent(node.id, node.parentId);
        }
    }

    // Add edges
    for (const edge of diagramEdges) {
        g.setEdge(edge.source, edge.target, {
            label: edge.label || '',
        });
    }

    // Run layout
    dagre.layout(g);

    // Calculate cluster bounds
    const clusterBounds: Map<string, { minX: number; minY: number; maxX: number; maxY: number }> = new Map();

    for (const subgraph of subgraphs) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        for (const nodeId of subgraph.nodeIds) {
            const nodePos = g.node(nodeId);
            if (nodePos) {
                minX = Math.min(minX, nodePos.x - NODE_WIDTH / 2);
                minY = Math.min(minY, nodePos.y - NODE_HEIGHT / 2);
                maxX = Math.max(maxX, nodePos.x + NODE_WIDTH / 2);
                maxY = Math.max(maxY, nodePos.y + NODE_HEIGHT / 2);
            }
        }

        if (minX !== Infinity) {
            clusterBounds.set(subgraph.id, {
                minX: minX - CLUSTER_PADDING,
                minY: minY - CLUSTER_PADDING - 30, // Extra space for label
                maxX: maxX + CLUSTER_PADDING,
                maxY: maxY + CLUSTER_PADDING,
            });
        }
    }

    // Convert to React Flow nodes
    const flowNodes: Node[] = [];

    // Add cluster nodes first (so they render behind)
    for (const subgraph of subgraphs) {
        const bounds = clusterBounds.get(subgraph.id);
        if (bounds) {
            flowNodes.push({
                id: subgraph.id,
                type: 'cluster',
                position: { x: bounds.minX, y: bounds.minY },
                data: {
                    label: subgraph.label,
                    theme,
                } as ClusterNodeData,
                style: {
                    width: bounds.maxX - bounds.minX,
                    height: bounds.maxY - bounds.minY,
                },
                draggable: true,
                selectable: true,
                zIndex: -1,
            });
        }
    }

    // Add regular nodes
    for (const node of diagramNodes) {
        const nodePos = g.node(node.id);
        if (nodePos) {
            flowNodes.push({
                id: node.id,
                type: 'service',
                position: {
                    x: nodePos.x - NODE_WIDTH / 2,
                    y: nodePos.y - NODE_HEIGHT / 2,
                },
                data: {
                    label: node.label,
                    theme,
                } as ServiceNodeData,
                parentId: node.parentId,
                extent: node.parentId ? 'parent' : undefined,
                draggable: true,
            });
        }
    }

    // Convert to React Flow edges
    const flowEdges: Edge[] = diagramEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        label: edge.label,
        animated: edge.animated,
        style: {
            stroke: theme === 'modern' ? '#94a3b8' : '#6b7280',
            strokeWidth: edge.style === 'thick' ? 3 : 2,
            strokeDasharray: edge.style === 'dashed' ? '5,5' : undefined,
        },
        labelStyle: {
            fill: '#64748b',
            fontSize: 12,
            fontWeight: 500,
        },
        labelBgStyle: {
            fill: '#ffffff',
            fillOpacity: 0.8,
        },
        markerEnd: {
            type: 'arrowclosed' as const,
            color: theme === 'modern' ? '#94a3b8' : '#6b7280',
        },
    }));

    return { nodes: flowNodes, edges: flowEdges };
}
