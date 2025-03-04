import React from 'react';
import { useNode } from '@craftjs/core';

interface CardProps {
  background?: string;
  padding?: number;
  borderRadius?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({
  background = '#ffffff',
  padding = 20,
  borderRadius = 4,
  shadow = 'md',
  children,
  className,
}: CardProps) => {
  const { connectors: { connect, drag }, selected } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const getShadowClass = () => {
    switch (shadow) {
      case 'none': return '';
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow';
      case 'lg': return 'shadow-lg';
      default: return 'shadow';
    }
  };

  return (
    <div
      ref={ref => connect(drag(ref as HTMLElement))}
      className={`${selected ? 'component-selected' : ''} ${getShadowClass()} ${className || ''}`}
      style={{
        background,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        position: 'relative',
        width: '100%',
      }}
    >
      {children}
      {selected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-1 rounded">
          Card
        </div>
      )}
    </div>
  );
};

const CardSettings = () => {
  const { actions: { setProp }, background, padding, borderRadius, shadow } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    borderRadius: node.data.props.borderRadius,
    shadow: node.data.props.shadow,
  }));

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Background</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setProp((props: CardProps) => props.background = e.target.value)}
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
          onChange={(e) => setProp((props: CardProps) => props.padding = parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Border Radius ({borderRadius}px)</label>
        <input
          type="range"
          value={borderRadius}
          min={0}
          max={20}
          onChange={(e) => setProp((props: CardProps) => props.borderRadius = parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Shadow</label>
        <select
          value={shadow}
          onChange={(e) => setProp((props: CardProps) => props.shadow = e.target.value as 'none' | 'sm' | 'md' | 'lg')}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  );
};

Card.craft = {
  props: {
    background: '#ffffff',
    padding: 20,
    borderRadius: 4,
    shadow: 'md',
  },
  related: {
    settings: CardSettings,
  },
  displayName: 'Card',
};
