import express from 'express';
import cors from 'cors';
import { CognitiveCore } from '../cognitive/mcp_core';

const app = express();
app.use(cors());
app.use(express.json());

const cognitiveCore = new CognitiveCore(process.env.MCP_API_KEY);

app.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  try {
    const response = await cognitiveCore.processInput(message, sessionId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;