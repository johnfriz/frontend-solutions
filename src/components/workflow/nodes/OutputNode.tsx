import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { FileOutput } from 'lucide-react';

export const OutputNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-50 border border-purple-200">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500"
      />
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-purple-100 text-purple-600">
          <FileOutput size={16} />
        </div>
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{data.category}</div>
        </div>
      </div>
    </div>
  );
});
