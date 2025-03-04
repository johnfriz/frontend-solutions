import { create } from 'zustand';

interface WorkflowState {
  workflows: Record<string, any>;
  currentWorkflow: string | null;
  isConnected: boolean;
  saveWorkflow: (workflow: any) => void;
  loadWorkflow: (id: string) => any;
  setConnection: (status: boolean) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: {},
  currentWorkflow: null,
  isConnected: false,
  
  saveWorkflow: (workflow) => {
    const id = 'workflow-' + Date.now();
    set((state) => ({
      workflows: {
        ...state.workflows,
        [id]: workflow
      },
      currentWorkflow: id
    }));
    
    // In a real implementation, this would send the workflow to the backend
    console.log('Saving workflow to backend:', workflow);
    
    // Simulate a websocket message
    setTimeout(() => {
      console.log('Workflow saved on backend');
    }, 500);
  },
  
  loadWorkflow: (id) => {
    const { workflows } = get();
    return workflows[id] || null;
  },
  
  setConnection: (status) => {
    set({ isConnected: status });
  }
}));
