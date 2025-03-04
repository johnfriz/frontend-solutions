import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Text } from './components/Text';
import { Button } from './components/Button';
import { Container } from './components/Container';
import { Card } from './components/Card';
import { Image } from './components/Image';
import { Type, Square, Layout, CreditCard, Image as ImageIcon } from 'lucide-react';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Components</h3>
      <div className="space-y-3">
        <div
          ref={ref => connectors.create(ref as HTMLElement, <Text text="Text Component" />)}
          className="bg-white p-3 rounded border border-gray-200 shadow-sm flex items-center cursor-move hover:border-blue-500 hover:shadow-md transition-all"
        >
          <Type size={16} className="mr-2 text-gray-500" />
          <span>Text</span>
        </div>
        
        <div
          ref={ref => connectors.create(ref as HTMLElement, <Button text="Button" variant="primary" />)}
          className="bg-white p-3 rounded border border-gray-200 shadow-sm flex items-center cursor-move hover:border-blue-500 hover:shadow-md transition-all"
        >
          <Square size={16} className="mr-2 text-gray-500" />
          <span>Button</span>
        </div>
        
        <div
          ref={ref => connectors.create(
            ref as HTMLElement, 
            <Element canvas is={Container} padding={10} background="#ffffff" />
          )}
          className="bg-white p-3 rounded border border-gray-200 shadow-sm flex items-center cursor-move hover:border-blue-500 hover:shadow-md transition-all"
        >
          <Layout size={16} className="mr-2 text-gray-500" />
          <span>Container</span>
        </div>
        
        <div
          ref={ref => connectors.create(
            ref as HTMLElement, 
            <Element canvas is={Card} padding={10} background="#f8fafc" />
          )}
          className="bg-white p-3 rounded border border-gray-200 shadow-sm flex items-center cursor-move hover:border-blue-500 hover:shadow-md transition-all"
        >
          <CreditCard size={16} className="mr-2 text-gray-500" />
          <span>Card</span>
        </div>
        
        <div
          ref={ref => connectors.create(
            ref as HTMLElement, 
            <Image src="https://via.placeholder.com/300x150" alt="Placeholder" />
          )}
          className="bg-white p-3 rounded border border-gray-200 shadow-sm flex items-center cursor-move hover:border-blue-500 hover:shadow-md transition-all"
        >
          <ImageIcon size={16} className="mr-2 text-gray-500" />
          <span>Image</span>
        </div>
      </div>
    </div>
  );
};
