import { ChatOpenAI } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import http from 'http'; // Importing 'http' module using ES module syntax
import dotenv from 'dotenv';
dotenv.config();

const loader = new TextLoader("./JobDescription.txt");
const apiKey = process.env.OPENAI_API_KEY;

const createChatChain = () => {
    const chatModel = new ChatOpenAI({
        openAIApiKey: apiKey,
    });

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world class technical documentation writer."],
        ["user", "{input}"],
    ]);

    const llmchain = prompt.pipe(chatModel);

    return llmchain;
};

async function chatInvoke(question) {
    // Assuming retriever, prompt, and model are defined elsewhere
    const chain = RunnableSequence.from([
        {
            context: retriever,
            question: new RunnablePassthrough(),
        },
        prompt,
        model,
        new StringOutputParser(),
    ]);

    const result = await chain.invoke(question);
    return result;
}

function greet(name) {
    console.log(name);
    return `Hello, ${name}!`;
}

module.exports = { greet, chatInvoke };
  