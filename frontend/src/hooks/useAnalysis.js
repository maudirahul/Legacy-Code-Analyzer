import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../services/api';

export const useUserHistory =()=>{
   return useQuery({
    queryKey:["analysisHistory"],
    queryFn: async ()=>{
        const response = await api.get("/project");
        return response.data;
    }
   })
}

export const useProjectGraph =(projectId)=>{
   return useQuery({
    queryKey:["projectGraph", projectId],
    queryFn: async()=>{
        const response = await api.get(`/project/${projectId}/graph`);
        return response.data;
    },
    enabled: !!projectId,
   })
}

export const useProjectFiles = (projectId)=>{
    return useQuery({
    queryKey: ["projectFiles", projectId],
    queryFn: async () => {
      const response = await api.get(`/project/${projectId}/files`);
      return response.data;
    },
    enabled: !!projectId, // Only run if we have an ID
  });
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId) => {
      const response = await api.delete(`/project/${projectId}`);
      return response.data;
    },
    onSuccess: () => {
      // This forces the sidebar to instantly re-fetch the recent projects!
      queryClient.invalidateQueries(["userHistory"]); 
    },
  });
};