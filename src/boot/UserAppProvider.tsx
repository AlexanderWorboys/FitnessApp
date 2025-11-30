import { useEffect } from "react"
import { useWorkoutStore } from "../store/workout/useWorkoutStore"
import { getAllTemplates, initWorkoutDb } from "../database/workoutDb"
import { startSyncListener } from "../store/sync/startSyncListener"

export const UserAppProvider = ({ children }: { children: React.ReactNode }) => {
    const setTemplates = useWorkoutStore((state) => state.setTemplates)
    
    
      useEffect(() => {
        const setupDb = async () => {
          await initWorkoutDb()
          useWorkoutStore.getState().loadWorkoutHistory();
          const templates = await getAllTemplates()
          setTemplates(templates)
        }
        setupDb()
      }, [])
    
      useEffect(() => {
        startSyncListener();
      }, []);

      return children;
}