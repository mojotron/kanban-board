import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { ProjectWithId } from '../../types/projectType';

export const useProjectDetails = (projectId: string | undefined) => {
  const { getDocument, pending, error } = useFirestore();
  const [isCanceled, setIsCanceled] = useState(false);
  const [project, setProject] = useState<ProjectWithId | undefined>(undefined);

  useEffect(() => {
    if (projectId === undefined) return;
    const getProjectData = async () => {
      const data = await getDocument<ProjectWithId>('projects', projectId);
      if (!isCanceled) {
        setProject(data);
      }
    };

    getProjectData();

    return () => setIsCanceled(true);
  }, [projectId, getDocument]);

  return { project, pending, error };
};
