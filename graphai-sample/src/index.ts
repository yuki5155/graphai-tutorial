import { GraphAI } from 'graphai';
import { openAIAgent } from '@graphai/openai_agent';

// 基本的なコピーエージェントを定義
const simpleCopyAgent = async (context: {
    inputs: any[];
    params?: any;
}) => {
    const summary = context.inputs[0];
    const theme = context.inputs[1];
    return { text: `Summary: ${summary}\nTheme: ${theme}` };
};

// OpenAIAgentのインスタンスを作成
const OpenAIAgent = new openAIAgent();

// GraphAIで使用するデータフロー定義
const graphData = {
    version: 0.2,
    nodes: {
        movieSummary: {
            agentId: 'openAIAgent',
            params: {
                model: 'gpt-4'
            },
            inputs: [
                { prompt: 'Explain the plot of The Matrix in one sentence.' }
            ]
        },
        movieTheme: {
            agentId: 'openAIAgent',
            params: {
                model: 'gpt-4'
            },
            inputs: [
                { prompt: 'What is the main theme of The Matrix in one sentence?' }
            ]
        },
        result: {
            agentId: 'simpleCopyAgent',
            inputs: [
                { nodeId: 'movieSummary', key: 'text' },
                { nodeId: 'movieTheme', key: 'text' }
            ],
            isResult: true
        }
    }
};

async function runGraphAI() {
    // エージェント関数の定義
    const callbackDictionary = {
        openAIAgent: OpenAIAgent.handle.bind(OpenAIAgent),  // bindを使用してthisを保持
        simpleCopyAgent: simpleCopyAgent
    };

    const graphai = new GraphAI(graphData, callbackDictionary);

    try {
        const results = await graphai.run();
        const resultData = results.result as { text: string };
        if (resultData) {
            console.log('Results:', resultData.text);
        } else {
            console.log('No results available');
        }
    } catch (error) {
        console.error('Error:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
    }
}

runGraphAI();