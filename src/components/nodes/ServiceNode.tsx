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
        relative px-3 py-2 min-w-[140px]
        ${isModern
                    ? 'bg-white rounded-lg border border-gray-200 shadow-md shadow-gray-200/40'
                    : 'bg-white rounded-md border-2 border-gray-300'
                }
        transition-all duration-200 hover:shadow-lg
      `}
        >
            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                className={`
          w-2 h-2 border-2 
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
          w-2 h-2 border-2 
          ${isModern
                        ? 'bg-white border-gray-300 hover:border-blue-500'
                        : 'bg-gray-200 border-gray-400'
                    }
        `}
            />

            {/* Content */}
            <div className="flex items-center gap-2">
                {/* Icon */}
                <div
                    className={`
            flex items-center justify-center flex-shrink-0
            ${isModern ? 'w-7 h-7 rounded-md' : 'w-6 h-6 rounded'}
          `}
                    style={{
                        backgroundColor: isModern ? `${color}15` : `${color}20`,
                    }}
                >
                    <Icon
                        size={isModern ? 16 : 14}
                        style={{ color }}
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                    <span
                        className={`
              font-semibold truncate leading-tight
              ${isModern ? 'text-gray-800 text-xs' : 'text-gray-700 text-[11px]'}
            `}
                    >
                        {label}
                    </span>
                    {subtitle && (
                        <span
                            className={`
                text-gray-500 truncate
                ${isModern ? 'text-[10px]' : 'text-[9px]'}
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
          absolute inset-0 rounded-lg pointer-events-none
          transition-all duration-200
          ring-0 hover:ring-2 hover:ring-blue-400/50
        `}
            />
        </div>
    );
});

ServiceNode.displayName = 'ServiceNode';

export default ServiceNode;
