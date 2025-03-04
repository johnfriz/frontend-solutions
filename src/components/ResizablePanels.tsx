import React from 'react';
import Split from 'react-split';

interface ResizablePanelsProps {
  children: React.ReactNode[];
  sizes?: number[];
  minSize?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  gutterClassName?: string;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  children,
  sizes = [50, 50],
  minSize = 100,
  direction = 'horizontal',
  className = '',
  gutterClassName = ''
}) => {
  return (
    <Split
      sizes={sizes}
      minSize={minSize}
      direction={direction}
      className={`split ${direction === 'horizontal' ? 'flex flex-1' : 'flex-col'} ${className}`}
      gutterSize={4}
      gutterAlign="center"
      dragInterval={1}
      cursor={direction === 'horizontal' ? 'col-resize' : 'row-resize'}
      gutter={() => {
        const gutter = document.createElement('div');
        gutter.className = `gutter ${gutterClassName} ${
          direction === 'horizontal' 
            ? 'gutter-horizontal hover:bg-blue-400 cursor-col-resize' 
            : 'gutter-vertical hover:bg-blue-400 cursor-row-resize'
        }`;
        return gutter;
      }}
    >
      {children}
    </Split>
  );
};

export default ResizablePanels;
