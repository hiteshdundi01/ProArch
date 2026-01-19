'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ServiceNodeData } from '@/types/diagram';
import { getIconForLabel } from '@/lib/icons/iconMapper';

const ServiceNode = memo(({ data }: NodeProps<ServiceNodeData>) => {
    const { label, subtitle, theme } = data;
    const { icon: Icon, color } = getIconForLabel(label);

    const isModern = theme === 'modern';

    return (
        <div
            className={`
        relative px-4 py-3 min-w-[180px]
        ${isModern
                    ? 'bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-200/50'
                    : 'bg-white rounded-md border-2 border-gray-300'
                }
        transition-all duration-200 hover:shadow-xl
      `}
        >
            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                className={`
          w-3 h-3 border-2 
          ${isModern
                        ? 'bg-white border-gray-300 hover:border-blue-500'
                        : 'bg-gray-200 border-gray-400'
                    }
        `}
            />
            <Handle
                type="source"
                position={Position.Right}
                className={`
          w-3 h-3 border-2 
          ${isModern
                        ? 'bg-white border-gray-300 hover:border-blue-500'
                        : 'bg-gray-200 border-gray-400'
                    }
        `}
            />

            {/* Content */}
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                    className={`
            flex items-center justify-center flex-shrink-0
            ${isModern ? 'w-10 h-10 rounded-lg' : 'w-8 h-8 rounded'}
          `}
                    style={{
                        backgroundColor: isModern ? `${color}15` : `${color}20`,
                    }}
                >
                    <Icon
                        size={isModern ? 24 : 20}
                        style={{ color }}
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                    <span
                        className={`
              font-semibold truncate
              ${isModern ? 'text-gray-800 text-sm' : 'text-gray-700 text-xs'}
            `}
                    >
                        {label}
                    </span>
                    {subtitle && (
                        <span
                            className={`
                text-gray-500 truncate
                ${isModern ? 'text-xs' : 'text-[10px]'}
              `}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>

            {/* Selection indicator */}
            <div
                className={`
          absolute inset-0 rounded-xl pointer-events-none
          transition-all duration-200
          ring-0 hover:ring-2 hover:ring-blue-400/50
        `}
            />
        </div>
    );
});

ServiceNode.displayName = 'ServiceNode';

export default ServiceNode;
