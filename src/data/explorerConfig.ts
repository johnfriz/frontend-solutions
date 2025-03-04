export type ExplorerNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: ExplorerNode[];
};

export const defaultExplorerConfig: ExplorerNode[] = [
  {
    id: 'root',
    name: 'Solution',
    type: 'folder',
    children: [
      {
        id: 'agents',
        name: 'Agents',
        type: 'folder',
        children: [
          {
            id: 'agent-1',
            name: 'Customer Support Agent',
            type: 'file'
          },
          {
            id: 'agent-2',
            name: 'Data Analysis Agent',
            type: 'file'
          },
          {
            id: 'agent-3',
            name: 'Content Creation Agent',
            type: 'file'
          }
        ]
      },
      {
        id: 'workflows',
        name: 'Workflows',
        type: 'folder',
        children: [
          {
            id: 'workflow-1',
            name: 'Customer Onboarding',
            type: 'file'
          },
          {
            id: 'workflow-2',
            name: 'Data Processing Pipeline',
            type: 'file'
          }
        ]
      },
      {
        id: 'tools',
        name: 'Tools',
        type: 'folder',
        children: [
          {
            id: 'tool-1',
            name: 'Text Analyzer',
            type: 'file'
          },
          {
            id: 'tool-2',
            name: 'Image Generator',
            type: 'file'
          },
          {
            id: 'tool-3',
            name: 'Data Visualizer',
            type: 'file'
          }
        ]
      },
      {
        id: 'connections',
        name: 'Connections',
        type: 'folder',
        children: [
          {
            id: 'connection-1',
            name: 'Database Connection',
            type: 'file'
          },
          {
            id: 'connection-2',
            name: 'API Integration',
            type: 'file'
          }
        ]
      },
      {
        id: 'knowledge',
        name: 'Knowledge',
        type: 'folder',
        children: [
          {
            id: 'knowledge-1',
            name: 'Product Documentation',
            type: 'file'
          },
          {
            id: 'knowledge-2',
            name: 'Training Materials',
            type: 'file'
          },
          {
            id: 'knowledge-3',
            name: 'FAQ Database',
            type: 'file'
          }
        ]
      },
      {
        id: 'memory',
        name: 'Memory',
        type: 'folder',
        children: [
          {
            id: 'memory-1',
            name: 'Conversation History',
            type: 'file'
          },
          {
            id: 'memory-2',
            name: 'User Preferences',
            type: 'file'
          }
        ]
      }
    ]
  }
];
