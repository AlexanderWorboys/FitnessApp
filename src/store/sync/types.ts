export type SyncActionType = "CREATE" | "UPDATE" | "DELETE";
export type SyncEntity = "WORKOUT" | "EXERCISE" | "TEMPLATE";

export type SyncAction = {
  id: string;
  type: SyncActionType;
  entity: SyncEntity;
  payload: any;
  timestamp: number;
};
