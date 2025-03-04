import React from 'react';
import { 
  Zap, 
  Database, 
  MessageSquare, 
  FileText, 
  Mail, 
  Clock, 
  Code, 
  Webhook, 
  Bot, 
  Cpu, 
  Send, 
  FileOutput 
} from 'lucide-react';

interface NodeCategory {
  name: string;
  items: NodeItem[];
}

interface NodeItem {
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const NodePanel: React.FC = () => {
  const nodeCategories: NodeCategory[] = [
    {
      name: 'Triggers',
      items: [
        {
          type: 'triggerNode',
          name: 'Webhook',
          description: 'Trigger workflow via HTTP request',
          icon: <Webhook size={16} />
        },
        {
          type: 'triggerNode',
          name: 'Schedule',
          description: 'Trigger workflow on a schedule',
          icon: <Clock size={16} />
        },
        {
          type: 'triggerNode',
          name: 'Event',
          description: 'Trigger on system event',
          icon: <Zap size={16} />
        }
      ]
    },
    {
      name: 'Actions',
      items: [
        {
          type: 'actionNode',
          name: 'API Request',
          description: 'Make HTTP requests',
          icon: <Send size={16} />
        },
        {
          type: 'actionNode',
          name: 'Database Query',
          description: 'Query a database',
          icon: <Database size={16} />
        },
        {
          type: 'actionNode',
          name: 'AI Processing',
          description: 'Process data with AI',
          icon: <Bot size={16} />
        },
        {
          type: 'actionNode',
          name: 'Code Execution',
          description: 'Run custom code',
          icon: <Code size={16} />
        },
        {
          type: 'actionNode',
          name: 'Email',
          description: 'Send email notifications',
          icon: <Mail size={16} />
        }
      ]
    },
    {
      name: 'Outputs',
      items: [
        {
          type: 'outputNode',
          name: 'API Response',
          description: 'Return data to API caller',
          icon: <FileOutput size={16} />
        },
        {
          type: 'outputNode',
          name: 'Message',
          description: 'Send a message',
          icon: <MessageSquare size={16} />
        },
        {
          type: 'outputNode',
          name: 'Document',
          description: 'Generate a document',
          icon: <FileText size={16} />
        }
      ]
    }
  ];

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, nodeName: string, nodeCategory: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/nodeName', nodeName);
    event.dataTransfer.setData('application/nodeCategory', nodeCategory);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-3 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Nodes</h3>
        <span className="text-xs text-gray-500">Drag to canvas</span>
      </div>
      
      {nodeCategories.map((category) => (
        <div key={category.name} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-600">{category.name}</h4>
          <div className="space-y-1">
            {category.items.map((item) => (
              <div
                key={`${category.name}-${item.name}`}
                className="border rounded p-2 bg-white hover:bg-blue-50 hover:border-blue-200 cursor-grab transition-colors"
                draggable
                onDragStart={(event) => onDragStart(event, item.type, item.name, category.name)}
              >
                <div className="flex items-center">
                  <div className="mr-2 text-blue-500">{item.icon}</div>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
