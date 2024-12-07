import { MCPClient } from '@anthropic-ai/sdk';

class CognitiveCore {
  constructor(apiKey) {
    this.mcp = new MCPClient(apiKey);
    this.context = new Map();
  }

  async processInput(userInput, sessionId) {
    const context = this.context.get(sessionId) || [];
    
    const response = await this.mcp.createCompletion({
      messages: [
        ...context,
        { role: 'user', content: userInput }
      ],
      model: 'claude-3-opus-20240229'
    });

    this.updateContext(sessionId, userInput, response.content);
    return response;
  }

  updateContext(sessionId, input, response) {
    const currentContext = this.context.get(sessionId) || [];
    currentContext.push(
      { role: 'user', content: input },
      { role: 'assistant', content: response }
    );
    this.context.set(sessionId, currentContext.slice(-10));
  }
}