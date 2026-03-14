const {
  generateExplanation,
  generateChatResponse,
} = require("../services/ai.service");

exports.explainFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const explanation = await generateExplanation({ ...req.body, userId });

    return res.status(200).json({ explanation });
  } catch (error) {
    console.error("AI ERROR:", error);
    return res.status(500).json({
      message: "Failed to generate explanation",
    });
  }
};

exports.chat = async (req, res) => {
  try {
    const { projectId, messages, filePath } = req.body;
    const userId = req.user.id;

    if (!projectId || !messages) {
      return res.status(400).json({
        message: "projectId and messages are required",
      });
    }

    const reply = await generateChatResponse({
      projectId,
      userId,
      messages,
      filePath,
    });

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        error: "API Limit Reached",
        retryDelay:
          error.errorDetails?.find((d) => d.retryDelay)?.retryDelay || "30s",
      });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
