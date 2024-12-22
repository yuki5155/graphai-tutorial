import { GraphAI } from "graphai";
import * as agents from "@graphai/vanilla";

const graph_data = {
  version: 0.5,
  nodes: {
    prompt: {
      value: "What is artificial intelligence?"
    },
    llm: {
      agent: "openAICompletionsAgent",  // Changed from openAIAgent to openAICompletionsAgent
      params: {
        model: "gpt-4-turbo-preview"
      },
      inputs: {
        prompt: ":prompt"
      }
    },
    output: {
      agent: "copyAgent",
      params: {
        namedKey: "text"
      },
      console: {
        after: true
      },
      inputs: {
        text: ":llm.text"
      },
      isResult: true
    }
  }
};

export const main = async () => {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Please set OPENAI_API_KEY environment variable");
    return;
  }
  
  // Let's also log available agents to debug
  console.log("Available agents:", Object.keys(agents));
  
  const graph = new GraphAI(graph_data, agents);
  const result = await graph.run();
  console.log(JSON.stringify(result));
};

if (process.argv[1] === __filename) {
  main();
}