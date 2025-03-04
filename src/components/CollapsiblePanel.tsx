import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CollapsiblePanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  width?: string;
  collapsedWidth?: string;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  icon,
  children,
  defaultCollapsed = false,
  width = 'w-64',
  collapsedWidth = 'w-12'
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`border-r flex flex-col transition-all duration-300 ${collapsed ? collapsedWidth : width}`}>
      <div className="p-3 border-b flex items-center justify-between">
        {!collapsed && (
          <>
            <div className="flex items-center">
              {icon}
              <h2 className="font-medium ml-2">{title}</h2>
            </div>
          </>
        )}
        <button 
          className={`text-gray-500 hover:text-gray-700 ${collapsed ? 'mx-auto' : ''}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      {!collapsed && (
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsiblePanel;
