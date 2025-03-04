import React from 'react';
import { useNode } from '@craftjs/core';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  text,
  variant = 'primary',
  size = 'medium',
  onClick,
  className,
}: ButtonProps) => {
  const { connectors: { connect, drag }, selected } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'outline':
        return 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50';
      case 'text':
        return 'bg-transparent text-blue-600 hover:bg-blue-50';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-xs py-1 px-2';
      case 'medium':
        return 'text-sm py-2 px-4';
      case 'large':
        return 'text-base py-3 px-6';
      default:
        return 'text-sm py-2 px-4';
    }
  };

  return (
    <div
      ref={ref => connect(drag(ref as HTMLElement))}
      className={`${selected ? 'component-selected' : ''}`}
      style={{ position: 'relative' }}
    >
      <button
        className={`rounded font-medium transition-colors ${getVariantClasses()} ${getSizeClasses()} ${className || ''}`}
        onClick={onClick}
      >
        {text}
      </button>
      {selected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-1 rounded">
          Button
        </div>
      )}
    </div>
  );
};

const ButtonSettings = () => {
  const { actions: { setProp }, text, variant, size } = useNode((node) => ({
    text: node.data.props.text,
    variant: node.data.props.variant,
    size: node.data.props.size,
  }));

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Button Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setProp((props: ButtonProps) => props.text = e.target.value)}
          className="w-full p-1 border rounded text-sm"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Variant</label>
        <select
          value={variant}
          onChange={(e) => setProp((props: ButtonProps) => props.variant = e.target.value as 'primary' | 'secondary' | 'outline' | 'text')}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
          <option value="text">Text</option>
        </select>
      </div>
      
      <div>
        <label className="text-sm block mb-1">Size</label>
        <select
          value={size}
          onChange={(e) => setProp((props: ButtonProps) => props.size = e.target.value as 'small' | 'medium' | 'large')}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  );
};

Button.craft = {
  props: {
    text: 'Button',
    variant: 'primary',
    size: 'medium',
  },
  related: {
    settings: ButtonSettings,
  },
  displayName: 'Button',
};
