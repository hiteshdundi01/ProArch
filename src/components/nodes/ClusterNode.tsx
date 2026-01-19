'use client';

import { memo } from 'react';
import { NodeProps, NodeResizer } from 'reactflow';
import { ClusterNodeData } from '@/types/diagram';

const ClusterNode = memo(({ data, selected }: NodeProps<ClusterNodeData>) => {
    const { label, theme } = data;
    const isModern = theme === 'modern';

    return (
        <div className="relative w-full h-full">
            <NodeResizer
                minWidth={200}
                minHeight={150}
                isVisible={selected}
                lineClassName="border-blue-400"
                handleClassName="w-3 h-3 bg-white border-2 border-blue-400 rounded"
            />

            {/* Cluster container */}
            <div
                className={`
          w-full h-full
          ${isModern
                        ? 'bg-gradient-to-br from-blue-50/80 to-slate-50/80 rounded-2xl border-2 border-dashed border-blue-200/70'
                        : 'bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'
                    }
          backdrop-blur-sm
        `}
            >
                {/* Label badge */}
                <div
                    className={`
            absolute left-4 -top-3 px-3 py-1
            ${isModern
                            ? 'bg-blue-100 text-blue-700 rounded-full text-xs font-medium shadow-sm'
                            : 'bg-gray-200 text-gray-600 rounded text-xs font-medium'
                        }
          `}
                >
                    {label}
                </div>
            </div>
        </div>
    );
});

ClusterNode.displayName = 'ClusterNode';

export default ClusterNode;
