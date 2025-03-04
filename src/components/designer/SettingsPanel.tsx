import React from 'react';
import { useEditor } from '@craftjs/core';

export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selectedNode = null;
    
    if (currentNodeId) {
      selectedNode = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected: selectedNode,
      isEnabled: state.options.enabled,
    };
  });

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Settings</h3>
      {!selected && (
        <div className="text-gray-500 text-sm">
          Select a component to edit its properties
        </div>
      )}
      
      {selected && selected.settings && isEnabled && (
        <div>
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">{selected.name}</h4>
            <div className="bg-white p-3 rounded border border-gray-200">
              {React.createElement(selected.settings)}
            </div>
          </div>
          
          {selected.isDeletable && (
            <button
              className="text-red-500 text-sm hover:text-red-700 flex items-center"
              onClick={() => actions.delete(selected.id)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};
