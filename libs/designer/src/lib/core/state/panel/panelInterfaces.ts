import type { PanelLocation } from '@microsoft/designer-ui';

export type PanelMode = 'Operation' | 'Discovery' | 'WorkflowParameters' | 'NodeSearch' | 'Error' | 'Connection';

export interface PanelState {
  collapsed: boolean;
  selectedNodes: string[];
  currentPanelMode?: PanelMode;
  referencePanelMode?: PanelMode;
  panelLocation?: PanelLocation;
  isParallelBranch: boolean;
  relationshipIds: RelationshipIds;
  selectedTabId: string | undefined;
  selectedOperationGroupId: string;
  selectedOperationId: string;
  addingTrigger: boolean;
  isLoading?: boolean;
  creatingConnection?: boolean;
}

export interface RelationshipIds {
  graphId: string;
  parentId?: string;
  childId?: string;
}
