import React from 'react';
import { useNode } from '@craftjs/core';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextProps {
  text: string;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  fontWeight?: 'normal' | 'bold' | 'light';
  className?: string;
}

export const Text = ({
  text,
  fontSize = 16,
  textAlign = 'left',
  color = '#000000',
  fontWeight = 'normal',
  className,
}: TextProps) => {
  const { connectors: { connect, drag }, selected, actions, id } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={ref => connect(drag(ref as HTMLElement))}
      className={`${selected ? 'component-selected' : ''} ${className || ''}`}
      style={{ position: 'relative' }}
    >
      <p
        style={{
          fontSize: `${fontSize}px`,
          textAlign,
          color,
          fontWeight,
          margin: '0',
          padding: '10px',
        }}
      >
        {text}
      </p>
      {selected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-1 rounded">
          Text
        </div>
      )}
    </div>
  );
};

const TextSettings = () => {
  const { actions: { setProp }, fontSize, textAlign, color, fontWeight, text } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    textAlign: node.data.props.textAlign,
    color: node.data.props.color,
    fontWeight: node.data.props.fontWeight,
    text: node.data.props.text,
  }));

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setProp((props: TextProps) => props.text = e.target.value)}
          className="w-full p-1 border rounded text-sm"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Font Size</label>
        <div className="flex items-center">
          <input
            type="range"
            value={fontSize}
            min={10}
            max={50}
            onChange={(e) => setProp((props: TextProps) => props.fontSize = parseInt(e.target.value))}
            className="w-full mr-2"
          />
          <span className="text-sm">{fontSize}px</span>
        </div>
      </div>
      
      <div>
        <label className="text-sm block mb-1">Text Align</label>
        <div className="flex space-x-1">
          <button
            className={`p-1 rounded ${textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            onClick={() => setProp((props: TextProps) => props.textAlign = 'left')}
          >
            <AlignLeft size={16} />
          </button>
          <button
            className={`p-1 rounded ${textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            onClick={() => setProp((props: TextProps) => props.textAlign = 'center')}
          >
            <AlignCenter size={16} />
          </button>
          <button
            className={`p-1 rounded ${textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            onClick={() => setProp((props: TextProps) => props.textAlign = 'right')}
          >
            <AlignRight size={16} />
          </button>
        </div>
      </div>
      
      <div>
        <label className="text-sm block mb-1">Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setProp((props: TextProps) => props.color = e.target.value)}
          className="w-full p-1 border rounded h-8"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Font Weight</label>
        <select
          value={fontWeight}
          onChange={(e) => setProp((props: TextProps) => props.fontWeight = e.target.value as 'normal' | 'bold' | 'light')}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="light">Light</option>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>
      </div>
    </div>
  );
};

Text.craft = {
  props: {
    text: 'Text Component',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
    fontWeight: 'normal',
  },
  related: {
    settings: TextSettings,
  },
  displayName: 'Text',
};
