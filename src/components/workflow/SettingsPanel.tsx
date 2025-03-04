import React from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  selectedNodeId: string | null;
  nodes: any[];
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  selectedNodeId, 
  nodes, 
  setNodes, 
  onClose 
}) => {
  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  
  if (!selectedNode) {
    return (
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Settings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-500">No node selected</p>
      </div>
    );
  }
  
  const updateNodeSettings = (key: string, value: any) => {
    setNodes(
      nodes.map(node => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              settings: {
                ...node.data.settings,
                [key]: value
              }
            }
          };
        }
        return node;
      })
    );
  };
  
  const renderTriggerSettings = () => {
    const settings = selectedNode.data.settings;
    
    if (selectedNode.data.label === 'Webhook') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Endpoint</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm"
              value={settings.endpoint || '/webhook/trigger'}
              onChange={(e) => updateNodeSettings('endpoint', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Method</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.method || 'POST'}
              onChange={(e) => updateNodeSettings('method', e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Authentication</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.auth || 'none'}
              onChange={(e) => updateNodeSettings('auth', e.target.value)}
            >
              <option value="none">None</option>
              <option value="api_key">API Key</option>
              <option value="bearer">Bearer Token</option>
            </select>
          </div>
        </>
      );
    }
    
    if (selectedNode.data.label === 'Schedule') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Cron Expression</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm"
              value={settings.cron || '0 * * * *'}
              onChange={(e) => updateNodeSettings('cron', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Example: 0 * * * * (every hour)</p>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.timezone || 'UTC'}
              onChange={(e) => updateNodeSettings('timezone', e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
            </select>
          </div>
        </>
      );
    }
    
    return (
      <p className="text-sm text-gray-500">No specific settings for this trigger type.</p>
    );
  };
  
  const renderActionSettings = () => {
    const settings = selectedNode.data.settings;
    
    if (selectedNode.data.label === 'API Request') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm"
              value={settings.url || 'https://api.example.com'}
              onChange={(e) => updateNodeSettings('url', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Method</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.method || 'GET'}
              onChange={(e) => updateNodeSettings('method', e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Headers</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={3}
              value={settings.headers || '{\n  "Content-Type": "application/json"\n}'}
              onChange={(e) => updateNodeSettings('headers', e.target.value)}
            />
          </div>
        </>
      );
    }
    
    if (selectedNode.data.label === 'Database Query') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Connection</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.connection || 'default'}
              onChange={(e) => updateNodeSettings('connection', e.target.value)}
            >
              <option value="default">Default Connection</option>
              <option value="mysql">MySQL</option>
              <option value="postgres">PostgreSQL</option>
              <option value="mongodb">MongoDB</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Query</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={4}
              value={settings.query || 'SELECT * FROM users WHERE status = "active"'}
              onChange={(e) => updateNodeSettings('query', e.target.value)}
            />
          </div>
        </>
      );
    }
    
    if (selectedNode.data.label === 'AI Processing') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Model</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.model || 'gpt-4'}
              onChange={(e) => updateNodeSettings('model', e.target.value)}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3">Claude 3</option>
              <option value="custom">Custom Model</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Prompt</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={4}
              value={settings.prompt || 'Analyze the following data and provide insights:'}
              onChange={(e) => updateNodeSettings('prompt', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Temperature</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              className="w-full"
              value={settings.temperature || 0.7}
              onChange={(e) => updateNodeSettings('temperature', parseFloat(e.target.value))}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0 (Precise)</span>
              <span>{settings.temperature || 0.7}</span>
              <span>1 (Creative)</span>
            </div>
          </div>
        </>
      );
    }
    
    return (
      <p className="text-sm text-gray-500">No specific settings for this action type.</p>
    );
  };
  
  const renderOutputSettings = () => {
    const settings = selectedNode.data.settings;
    
    if (selectedNode.data.label === 'API Response') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Status Code</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.statusCode || 200}
              onChange={(e) => updateNodeSettings('statusCode', parseInt(e.target.value))}
            >
              <option value="200">200 - OK</option>
              <option value="201">201 - Created</option>
              <option value="400">400 - Bad Request</option>
              <option value="401">401 - Unauthorized</option>
              <option value="404">404 - Not Found</option>
              <option value="500">500 - Server Error</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Response Type</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.responseType || 'json'}
              onChange={(e) => updateNodeSettings('responseType', e.target.value)}
            >
              <option value="json">JSON</option>
              <option value="xml">XML</option>
              <option value="text">Plain Text</option>
              <option value="html">HTML</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Headers</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={3}
              value={settings.headers || '{\n  "Content-Type": "application/json"\n}'}
              onChange={(e) => updateNodeSettings('headers', e.target.value)}
            />
          </div>
        </>
      );
    }
    
    if (selectedNode.data.label === 'Message') {
      return (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Channel</label>
            <select
              className="w-full p-2 border rounded text-sm"
              value={settings.channel || 'slack'}
              onChange={(e) => updateNodeSettings('channel', e.target.value)}
            >
              <option value="slack">Slack</option>
              <option value="teams">Microsoft Teams</option>
              <option value="discord">Discord</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Recipients</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm"
              value={settings.recipients || '#general'}
              onChange={(e) => updateNodeSettings('recipients', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Message Template</label>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={4}
              value={settings.template || 'Workflow completed successfully with result: {{result}}'}
              onChange={(e) => updateNodeSettings('template', e.target.value)}
            />
          </div>
        </>
      );
    }
    
    return (
      <p className="text-sm text-gray-500">No specific settings for this output type.</p>
    );
  };
  
  const renderSettings = () => {
    switch (selectedNode.data.category) {
      case 'Triggers':
        return renderTriggerSettings();
      case 'Actions':
        return renderActionSettings();
      case 'Outputs':
        return renderOutputSettings();
      default:
        return <p className="text-sm text-gray-500">No settings available</p>;
    }
  };
  
  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Node Settings</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      
      <div className="mb-4 pb-4 border-b">
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="font-medium">{selectedNode.data.label}</span>
        </div>
        <div className="text-xs text-gray-500">{selectedNode.data.category}</div>
        <div className="text-xs text-gray-500">ID: {selectedNode.id}</div>
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Node Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-sm"
          value={selectedNode.data.label}
          onChange={(e) => {
            setNodes(
              nodes.map(node => {
                if (node.id === selectedNodeId) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      label: e.target.value
                    }
                  };
                }
                return node;
              })
            );
          }}
        />
      </div>
      
      <div className="mb-4 pb-2 border-b">
        <h4 className="text-sm font-medium mb-2">Node Settings</h4>
        {renderSettings()}
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Advanced</h4>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Error Handling</label>
          <select
            className="w-full p-2 border rounded text-sm"
            value={selectedNode.data.settings?.errorHandling || 'stop'}
            onChange={(e) => updateNodeSettings('errorHandling', e.target.value)}
          >
            <option value="stop">Stop Workflow</option>
            <option value="continue">Continue Workflow</option>
            <option value="retry">Retry Node</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Timeout (seconds)</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-sm"
            value={selectedNode.data.settings?.timeout || 30}
            onChange={(e) => updateNodeSettings('timeout', parseInt(e.target.value))}
            min={1}
            max={300}
          />
        </div>
      </div>
    </div>
  );
};
