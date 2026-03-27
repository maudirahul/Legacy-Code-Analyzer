import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// --- Hook 1: ZIP File Upload ---
export const useUploadZip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();

      // 1. Append the actual file
      formData.append("file", file);

      // 2. Append the required fields your Express controller expects!
      formData.append("sourceType", "zip");

      // We can derive a clean project name by stripping the ".zip" from the filename
      const cleanName = file.name.replace(/\.zip$/i, "");
      formData.append("projectName", cleanName);

      // 3. Hit the correct unified upload route
      const response = await api.post("/project/upload", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysisHistory"] });
    },
  });
};

// --- Hook 2: GitHub URL Import ---
export const useAnalyzeGithub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (repoUrl) => {
      // Send the exact JSON structure your backend expects
      const payload = {
        sourceType: "github",
        repoUrl: repoUrl,
      };

      // Hit the same unified upload route
      const response = await api.post("/project/upload", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysisHistory"] });
    },
  });
};
