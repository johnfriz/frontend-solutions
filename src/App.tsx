import React, { useState } from 'react';
import TreeView from './components/TreeView';
import ChatWindow from './components/ChatWindow';
import TabPanel from './components/TabPanel';
import ResizablePanels from './components/ResizablePanels';
import CollapsiblePanel from './components/CollapsiblePanel';
import { defaultExplorerConfig, ExplorerNode } from './data/explorerConfig';
import { Layout, Code } from 'lucide-react';
import './index.css';

function App() {
  const [chatTitle, setChatTitle] = useState('Chat');
  
  const handleSelectItem = (item: ExplorerNode, parentName?: string) => {
    if (item.type === 'file' && parentName) {
      setChatTitle(`Chat : ${parentName}`);
    } else if (item.type === 'folder' && item.name === 'Solution') {
      // Special case for root node
      setChatTitle(`Chat - Solution`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-800 text-white p-3 flex items-center">
        <Code size={24} className="mr-2" />
        <h1 className="text-xl font-semibold">Explorer UI</h1>
        <div className="ml-auto flex space-x-4">
          <button className="text-sm hover:text-blue-300">Documentation</button>
          <button className="text-sm hover:text-blue-300">Settings</button>
          <button className="text-sm hover:text-blue-300">Help</button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Collapsible Explorer */}
        <CollapsiblePanel 
          title="Explorer" 
          icon={<Layout size={16} />}
          defaultCollapsed={false}
        >
          <div className="p-2">
            <TreeView 
              data={defaultExplorerConfig} 
              onSelectItem={handleSelectItem}
            />
          </div>
        </CollapsiblePanel>
        
        {/* Middle and Right Panels - Resizable */}
        <div className="flex-1 flex">
          <ResizablePanels>
            {/* Middle Panel - Chat */}
            <div className="flex flex-col h-full">
              <div className="p-3 border-b">
                <h2 className="font-medium">{chatTitle}</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatWindow title={chatTitle} />
              </div>
            </div>
            
            {/* Right Panel - Tabs */}
            <div className="flex flex-col h-full">
              <TabPanel />
            </div>
          </ResizablePanels>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t p-2 text-xs text-gray-500 flex justify-between">
        <div>Explorer UI v1.0.0</div>
        <div>© 2023 Explorer UI</div>
      </footer>
    </div>
  );
}

export default App;
