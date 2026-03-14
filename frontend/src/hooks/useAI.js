import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

export const usePredefinedAnalysis = () => {
  return useMutation({
    mutationFn: async ({ projectId, filePath, promptKey }) => {
      const payload = {
        projectId: projectId,
        filePath: filePath,
        promptType: "predefined",
        promptKey: promptKey, // e.g., 'file_role'
        userPrompt: "",
        detailLevel: "concise",
      };

      const response = await api.post(`/ai/explain`, payload);
      return response.data;
    },
  });
};

export const useCustomPrompt = () => {
  return useMutation({
    mutationFn: async ({ projectId, messages, filePath }) => {
      const payload = {
        projectId: projectId,
        messages: messages, 
        filePath: filePath,
      };

      const response = await api.post(`/ai/chat`, payload);
      return response.data;
    },
  });
};