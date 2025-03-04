import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  Connection,
  Edge,
  NodeTypes,
  EdgeTypes,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Save, Play, Plus, Settings, Trash2 } from 'lucide-react';
import { NodePanel } from './NodePanel';
import { CustomNode } from './nodes/CustomNode';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';
import { OutputNode } from './nodes/OutputNode';
import { SettingsPanel } from './SettingsPanel';
import { useWorkflowStore } from './store/workflowStore';

// Define custom node types
const nodeTypes: NodeTypes = {
  customNode: CustomNode,
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  outputNode: OutputNode,
};

const WorkflowBuilder: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const { saveWorkflow, loadWorkflow, isConnected } = useWorkflowStore();

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3b82f6',
      },
    }, eds)),
    [setEdges]
  );

  // Handle drag and drop from the node panel
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const name = event.dataTransfer.getData('application/nodeName');
      const category = event.dataTransfer.getData('application/nodeCategory');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !reactFlowBounds || !reactFlowInstance) {
        return;
      }

      // Get position of the drop
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      // Create a new node
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          label: name,
          category,
          settings: {},
        },
      };
      
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Handle node selection
  const onNodeClick = (_: React.MouseEvent, node: any) => {
    setSelectedNode(node.id);
    setShowSettings(true);
  };

  // Save the current workflow
  const handleSave = () => {
    if (nodes.length === 0) {
      alert('Cannot save an empty workflow');
      return;
    }
    
    saveWorkflow({
      nodes,
      edges,
    });
    
    alert('Workflow saved successfully!');
  };

  // Execute the workflow
  const handleExecute = () => {
    if (nodes.length === 0) {
      alert('Cannot execute an empty workflow');
      return;
    }
    
    // In a real implementation, this would send the workflow to the backend
    console.log('Executing workflow:', { nodes, edges });
    alert('Workflow execution started!');
  };

  // Load a sample workflow for demonstration
  const loadSampleWorkflow = () => {
    const sampleNodes = [
      {
        id: 'trigger-1',
        type: 'triggerNode',
        position: { x: 100, y: 100 },
        data: { 
          label: 'Webhook Trigger',
          category: 'Trigger',
          settings: {
            endpoint: '/webhook/sample',
            method: 'POST',
          },
        },
      },
      {
        id: 'action-1',
        type: 'actionNode',
        position: { x: 400, y: 100 },
        data: { 
          label: 'Process Data',
          category: 'Action',
          settings: {
            operation: 'transform',
            parameters: { format: 'json' },
          },
        },
      },
      {
        id: 'output-1',
        type: 'outputNode',
        position: { x: 700, y: 100 },
        data: { 
          label: 'API Response',
          category: 'Output',
          settings: {
            statusCode: 200,
            responseType: 'json',
          },
        },
      },
    ];
    
    const sampleEdges = [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'action-1',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
      {
        id: 'edge-2',
        source: 'action-1',
        target: 'output-1',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      },
    ];
    
    setNodes(sampleNodes);
    setEdges(sampleEdges);
  };

  // Clear the current workflow
  const clearWorkflow = () => {
    if (window.confirm('Are you sure you want to clear the current workflow?')) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      setShowSettings(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-3 flex justify-between items-center">
        <h3 className="font-medium">Workflow Builder</h3>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          <button 
            onClick={() => loadSampleWorkflow()}
            className="flex items-center text-sm px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
            title="Load Sample"
          >
            <Plus size={14} className="mr-1" />
            Sample
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center text-sm px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
            title="Save Workflow"
          >
            <Save size={14} className="mr-1" />
            Save
          </button>
          <button 
            onClick={handleExecute}
            className="flex items-center text-sm px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200"
            title="Execute Workflow"
          >
            <Play size={14} className="mr-1" />
            Execute
          </button>
          <button 
            onClick={clearWorkflow}
            className="flex items-center text-sm px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
            title="Clear Workflow"
          >
            <Trash2 size={14} className="mr-1" />
            Clear
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r overflow-auto bg-gray-50">
          <NodePanel />
        </div>
        
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              snapToGrid
              snapGrid={[15, 15]}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              attributionPosition="bottom-right"
            >
              <Controls />
              <Background color="#aaa" gap={16} />
              <Panel position="top-right">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded ${showSettings ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                  title="Toggle Settings Panel"
                >
                  <Settings size={20} />
                </button>
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
        
        {showSettings && (
          <div className="w-64 border-l overflow-auto bg-gray-50">
            <SettingsPanel 
              selectedNodeId={selectedNode} 
              nodes={nodes} 
              setNodes={setNodes} 
              onClose={() => {
                setShowSettings(false);
                setSelectedNode(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;
