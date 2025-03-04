import React from 'react';
import { useNode } from '@craftjs/core';

interface ContainerProps {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  className?: string;
}

export const Container = ({
  background = 'transparent',
  padding = 0,
  children,
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  className,
}: ContainerProps) => {
  const { connectors: { connect, drag }, selected } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={ref => connect(drag(ref as HTMLElement))}
      className={`${selected ? 'component-selected' : ''} ${className || ''}`}
      style={{
        background,
        padding: `${padding}px`,
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        position: 'relative',
        width: '100%',
      }}
    >
      {children}
      {selected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-1 rounded">
          Container
        </div>
      )}
    </div>
  );
};

const ContainerSettings = () => {
  const { actions: { setProp }, background, padding, flexDirection, justifyContent, alignItems } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    flexDirection: node.data.props.flexDirection,
    justifyContent: node.data.props.justifyContent,
    alignItems: node.data.props.alignItems,
  }));

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Background</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setProp((props: ContainerProps) => props.background = e.target.value)}
          className="w-full p-1 border rounded h-8"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Padding ({padding}px)</label>
        <input
          type="range"
          value={padding}
          min={0}
          max={50}
          onChange={(e) => setProp((props: ContainerProps) => props.padding = parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Flex Direction</label>
        <select
          value={flexDirection}
          onChange={(e) => setProp((props: ContainerProps) => props.flexDirection = e.target.value as 'row' | 'column')}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </div>
      
      <div>
        <label className="text-sm block mb-1">Justify Content</label>
        <select
          value={justifyContent}
          onChange={(e) => setProp((props: ContainerProps) => props.justifyContent = e.target.value as any)}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="flex-start">Start</option>
          <option value="flex-end">End</option>
          <option value="center">Center</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
        </select>
      </div>
      
      <div>
        <label className="text-sm block mb-1">Align Items</label>
        <select
          value={alignItems}
          onChange={(e) => setProp((props: ContainerProps) => props.alignItems = e.target.value as any)}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="flex-start">Start</option>
          <option value="flex-end">End</option>
          <option value="center">Center</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>
    </div>
  );
};

Container.craft = {
  props: {
    background: 'transparent',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  related: {
    settings: ContainerSettings,
  },
  displayName: 'Container',
};
