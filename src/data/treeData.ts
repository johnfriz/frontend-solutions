export const treeData = [
  {
    id: '1',
    name: 'Project',
    type: 'folder' as const,
    children: [
      {
        id: '2',
        name: 'src',
        type: 'folder' as const,
        children: [
          {
            id: '3',
            name: 'components',
            type: 'folder' as const,
            children: [
              {
                id: '4',
                name: 'Button.tsx',
                type: 'file' as const
              },
              {
                id: '5',
                name: 'Card.tsx',
                type: 'file' as const
              },
              {
                id: '6',
                name: 'Input.tsx',
                type: 'file' as const
              }
            ]
          },
          {
            id: '7',
            name: 'pages',
            type: 'folder' as const,
            children: [
              {
                id: '8',
                name: 'Home.tsx',
                type: 'file' as const
              },
              {
                id: '9',
                name: 'About.tsx',
                type: 'file' as const
              },
              {
                id: '10',
                name: 'Contact.tsx',
                type: 'file' as const
              }
            ]
          },
          {
            id: '11',
            name: 'utils',
            type: 'folder' as const,
            children: [
              {
                id: '12',
                name: 'helpers.ts',
                type: 'file' as const
              },
              {
                id: '13',
                name: 'api.ts',
                type: 'file' as const
              }
            ]
          },
          {
            id: '14',
            name: 'App.tsx',
            type: 'file' as const
          },
          {
            id: '15',
            name: 'main.tsx',
            type: 'file' as const
          }
        ]
      },
      {
        id: '16',
        name: 'public',
        type: 'folder' as const,
        children: [
          {
            id: '17',
            name: 'index.html',
            type: 'file' as const
          },
          {
            id: '18',
            name: 'favicon.ico',
            type: 'file' as const
          }
        ]
      },
      {
        id: '19',
        name: 'package.json',
        type: 'file' as const
      },
      {
        id: '20',
        name: 'tsconfig.json',
        type: 'file' as const
      },
      {
        id: '21',
        name: 'README.md',
        type: 'file' as const
      }
    ]
  }
];
