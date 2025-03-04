import React, { useState } from 'react';
import { Palette, TestTube, Rocket, Settings, BarChart } from 'lucide-react';

interface TabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const TabPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('design');

  const tabs: TabProps[] = [
    {
      id: 'design',
      label: 'Design',
      icon: <Palette size={18} />,
      content: (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Design Panel</h2>
          <div className="space-y-4">
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Color Palette</h3>
              <div className="flex space-x-2">
                {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                  <div 
                    key={color} 
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-300" 
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Typography</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Heading</span>
                  <select className="border rounded p-1 text-sm">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Montserrat</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span>Body</span>
                  <select className="border rounded p-1 text-sm">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'test',
      label: 'Test',
      icon: <TestTube size={18} />,
      content: (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Test Panel</h2>
          <div className="space-y-4">
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Unit Tests</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Component Tests: 24/24 passing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Utility Tests: 12/12 passing</span>
                </div>
              </div>
            </div>
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Integration Tests</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>API Tests: 8/10 passing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>UI Flow Tests: 5/5 passing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'deploy',
      label: 'Deploy',
      icon: <Rocket size={18} />,
      content: (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Deploy Panel</h2>
          <div className="space-y-4">
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Environments</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Development</span>
                  <span className="text-green-500 text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Staging</span>
                  <span className="text-green-500 text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Production</span>
                  <span className="text-gray-500 text-sm">Inactive</span>
                </div>
              </div>
            </div>
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Recent Deployments</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">v1.2.0</span>
                    <span>2 days ago</span>
                  </div>
                  <div className="text-gray-500">Staging</div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">v1.1.5</span>
                    <span>5 days ago</span>
                  </div>
                  <div className="text-gray-500">Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'manage',
      label: 'Manage',
      icon: <Settings size={18} />,
      content: (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Manage Panel</h2>
          <div className="space-y-4">
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Project Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Project Name</span>
                  <input type="text" className="border rounded p-1 text-sm" defaultValue="Explorer UI" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Description</span>
                  <input type="text" className="border rounded p-1 text-sm" defaultValue="UI Explorer with TreeView" />
                </div>
              </div>
            </div>
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Team Members</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>John Doe</span>
                  <span className="text-gray-500">Admin</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Jane Smith</span>
                  <span className="text-gray-500">Developer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Alex Johnson</span>
                  <span className="text-gray-500">Designer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'monitor',
      label: 'Monitor',
      icon: <BarChart size={18} />,
      content: (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Monitor Panel</h2>
          <div className="space-y-4">
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">System Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>CPU Usage</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Memory</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Disk</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded p-3">
              <h3 className="font-medium mb-2">Recent Errors</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-red-500">API Timeout</span>
                    <span>10 min ago</span>
                  </div>
                  <div className="text-gray-500">GET /api/users</div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-yellow-500">Slow Query</span>
                    <span>1 hour ago</span>
                  </div>
                  <div className="text-gray-500">SELECT * FROM users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabPanel;
