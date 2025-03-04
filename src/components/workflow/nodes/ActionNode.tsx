import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Cpu } from 'lucide-react';

export const ActionNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-50 border border-green-200">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-green-500"
      />
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-green-100 text-green-600">
          <Cpu size={16} />
        </div>
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{data.category}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-green-500"
      />
    </div>
  );
});
