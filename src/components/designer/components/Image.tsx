import React from 'react';
import { useNode } from '@craftjs/core';

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: number;
  className?: string;
}

export const Image = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  borderRadius = 0,
  className,
}: ImageProps) => {
  const { connectors: { connect, drag }, selected } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={ref => connect(drag(ref as HTMLElement))}
      className={`${selected ? 'component-selected' : ''} ${className || ''}`}
      style={{ position: 'relative', width: '100%' }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          borderRadius: `${borderRadius}px`,
          display: 'block',
        }}
      />
      {selected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-1 rounded">
          Image
        </div>
      )}
    </div>
  );
};

const ImageSettings = () => {
  const { actions: { setProp }, src, alt, width, height, borderRadius } = useNode((node) => ({
    src: node.data.props.src,
    alt: node.data.props.alt,
    width: node.data.props.width,
    height: node.data.props.height,
    borderRadius: node.data.props.borderRadius,
  }));

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Image URL</label>
        <input
          type="text"
          value={src}
          onChange={(e) => setProp((props: ImageProps) => props.src = e.target.value)}
          className="w-full p-1 border rounded text-sm"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setProp((props: ImageProps) => props.alt = e.target.value)}
          className="w-full p-1 border rounded text-sm"
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Width</label>
        <input
          type="text"
          value={width}
          onChange={(e) => setProp((props: ImageProps) => props.width = e.target.value)}
          className="w-full p-1 border rounded text-sm"
          placeholder="100%, 200px, etc."
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Height</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setProp((props: ImageProps) => props.height = e.target.value)}
          className="w-full p-1 border rounded text-sm"
          placeholder="auto, 200px, etc."
        />
      </div>
      
      <div>
        <label className="text-sm block mb-1">Border Radius ({borderRadius}px)</label>
        <input
          type="range"
          value={borderRadius}
          min={0}
          max={50}
          onChange={(e) => setProp((props: ImageProps) => props.borderRadius = parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

Image.craft = {
  props: {
    src: 'https://via.placeholder.com/400x200',
    alt: 'Placeholder image',
    width: '100%',
    height: 'auto',
    borderRadius: 0,
  },
  related: {
    settings: ImageSettings,
  },
  displayName: 'Image',
};
