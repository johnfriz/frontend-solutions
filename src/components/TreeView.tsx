import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';
import { ExplorerNode } from '../data/explorerConfig';

interface TreeViewProps {
  data: ExplorerNode[];
  onSelectItem: (item: ExplorerNode, parentName?: string) => void;
}

interface TreeItemProps {
  node: ExplorerNode;
  level: number;
  onSelectItem: (item: ExplorerNode, parentName?: string) => void;
  parentName?: string;
  isRoot?: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, level, onSelectItem, parentName, isRoot = false }) => {
  // Always open by default, especially for root
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = (e: React.MouseEvent) => {
    if (hasChildren && !isRoot) {
      setIsOpen(!isOpen);
      e.stopPropagation();
    }
  };

  const handleItemClick = () => {
    // For root node or file nodes, update the chat title
    if (isRoot) {
      onSelectItem(node);
    } else if (node.type === 'file') {
      onSelectItem(node, parentName);
    } else if (hasChildren && !isRoot) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center py-1 px-2 hover:bg-gray-200 rounded cursor-pointer ${isRoot ? 'bg-gray-100' : ''}`}
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleItemClick}
      >
        {hasChildren ? (
          <span className="mr-1" onClick={toggleOpen}>
            {isOpen || isRoot ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        ) : (
          <span className="w-4 mr-1"></span>
        )}
        
        {node.type === 'folder' ? (
          <Folder size={16} className="mr-1 text-blue-500" />
        ) : (
          <FileText size={16} className="mr-1 text-gray-500" />
        )}
        
        <span className={`text-sm ${isRoot ? 'font-medium' : ''}`}>{node.name}</span>
      </div>
      
      {(isOpen || isRoot) && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeItem 
              key={child.id} 
              node={child} 
              level={level + 1} 
              onSelectItem={onSelectItem}
              parentName={node.name}
              isRoot={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ data, onSelectItem }) => {
  return (
    <div className="h-full overflow-auto">
      {data.map((node) => (
        <TreeItem 
          key={node.id} 
          node={node} 
          level={0} 
          onSelectItem={onSelectItem}
          isRoot={true}
        />
      ))}
    </div>
  );
};

export default TreeView;
