import { GraphAI } from "graphai";
import * as vanillaAgents from "@graphai/vanilla";
import * as openaiAgent from "@graphai/openai_agent";

const graph_data = {
  version: 0.5,
  nodes: {
    llm: {
      agent: "openAIAgent",
      params: {
        model: "gpt-4"
      },
      inputs: {
        prompt: "What is artificial intelligence?"
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
      }
    }
  }
};

export const main = async () => {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Please set OPENAI_API_KEY environment variable");
    return;
  }
  
  const agents = {
    ...vanillaAgents,
    ...openaiAgent
  };
  
  const graph = new GraphAI(graph_data, agents);
  const result = await graph.run();
  console.log(JSON.stringify(result));
};

if (process.argv[1] === __filename) {
  main();
}