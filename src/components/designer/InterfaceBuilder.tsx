import React, { useEffect, useState } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { io } from 'socket.io-client';
import { Text } from './components/Text';
import { Button } from './components/Button';
import { Container } from './components/Container';
import { Card } from './components/Card';
import { Image } from './components/Image';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { Lock, Unlock } from 'lucide-react';

// Mock user permissions - in a real app, this would come from your auth system
const USER_PERMISSIONS = {
  canEdit: true,
  canAddComponents: true,
  canDeleteComponents: true,
  canModifySettings: true
};

const InterfaceBuilder: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [editorEnabled, setEditorEnabled] = useState(USER_PERMISSIONS.canEdit);
  
  // Setup websocket connection
  useEffect(() => {
    // In a real implementation, this would connect to your actual backend
    // For demo purposes, we're just simulating the connection
    const mockConnection = () => {
      console.log('Simulating websocket connection...');
      setConnected(true);
      
      // Simulate receiving updates from the backend
      setTimeout(() => {
        console.log('Received update from backend');
        // In a real implementation, this would update the editor state
      }, 3000);
    };
    
    mockConnection();
    
    // In a real implementation, you would connect to your websocket server:
    /*
    const socket = io('your-websocket-server-url');
    
    socket.on('connect', () => {
      setConnected(true);
      console.log('Connected to websocket server');
    });
    
    socket.on('interface-update', (data) => {
      console.log('Received interface update:', data);
      // Update the editor state with the new data
    });
    
    socket.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from websocket server');
    });
    
    return () => {
      socket.disconnect();
    };
    */
  }, []);
  
  const toggleEditorEnabled = () => {
    if (USER_PERMISSIONS.canEdit) {
      setEditorEnabled(!editorEnabled);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-3 flex justify-between items-center">
        <h3 className="font-medium">Interface Builder</h3>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center ${connected ? 'text-green-500' : 'text-red-500'}`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {connected ? 'Connected' : 'Disconnected'}
          </div>
          <button 
            onClick={toggleEditorEnabled}
            className={`flex items-center text-sm px-2 py-1 rounded ${editorEnabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            disabled={!USER_PERMISSIONS.canEdit}
            title={USER_PERMISSIONS.canEdit ? 'Toggle edit mode' : 'You do not have permission to edit'}
          >
            {editorEnabled ? <Unlock size={14} className="mr-1" /> : <Lock size={14} className="mr-1" />}
            {editorEnabled ? 'Editing' : 'Locked'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <Editor
          resolver={{ Text, Button, Container, Card, Image }}
          enabled={editorEnabled}
        >
          <div className="flex h-full">
            {editorEnabled && USER_PERMISSIONS.canAddComponents && (
              <div className="w-64 border-r overflow-auto bg-gray-50">
                <Toolbox />
              </div>
            )}
            
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <Frame>
                <Element
                  canvas
                  is={Container}
                  background="#ffffff"
                  padding={20}
                  className="min-h-[400px] rounded shadow"
                >
                  <Element
                    is={Card}
                    background="#f8fafc"
                    padding={20}
                    className="mb-4"
                  >
                    <Text text="Welcome to the Interface Builder" fontSize={20} />
                    <Text text="This is a sample card component that you can customize." fontSize={14} />
                  </Element>
                  
                  <Element
                    is={Container}
                    flexDirection="row"
                    justifyContent="space-between"
                    padding={0}
                    className="mb-4"
                  >
                    <Button text="Primary Button" variant="primary" />
                    <Button text="Secondary Button" variant="secondary" />
                  </Element>
                  
                  <Element
                    is={Image}
                    src="https://via.placeholder.com/400x200"
                    alt="Placeholder"
                    className="mb-4"
                  />
                </Element>
              </Frame>
            </div>
            
            {editorEnabled && USER_PERMISSIONS.canModifySettings && (
              <div className="w-64 border-l overflow-auto bg-gray-50">
                <SettingsPanel />
              </div>
            )}
          </div>
        </Editor>
      </div>
    </div>
  );
};

export default InterfaceBuilder;
