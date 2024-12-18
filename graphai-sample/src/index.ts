import { GraphAI } from 'graphai';
import { openAIAgent } from '@graphai/openai_agent';

// 基本的なコピーエージェントを定義
const simpleCopyAgent = async (context: {
    inputs: any[];
    params?: any;
}) => {
    return { text: context.inputs[0] };
};

// GraphAIで使用するデータフロー定義
const graphData = {
    version: 0.2,
    nodes: {
        movieSummary: {
            id: 'movieSummary',
            agentId: 'openAIAgent',
            params: {
                model: 'gpt-4'
            },
            inputs: [{ prompt: 'Explain the plot of The Matrix in one sentence.' }]
        },
        movieTheme: {
            id: 'movieTheme',
            agentId: 'openAIAgent',
            params: {
                model: 'gpt-4'
            },
            inputs: [{ prompt: 'What is the main theme of The Matrix in one sentence?' }]
        },
        result: {
            id: 'result',
            agentId: 'simpleCopyAgent',
            inputs: [`Summary: ${':movieSummary.text'}\nTheme: ${':movieTheme.text'}`],
            isResult: true
        }
    }
};

async function runGraphAI() {
    const callbackDictionary = {
        openAIAgent: openAIAgent,
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