import { http } from "./http";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionRequest {
  messages: ChatMessage[];
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stop?: string[] | null;
}

export const postToAI =  async(cropName:string, regionName:string): Promise<any> => {
    const requestBody: ChatCompletionRequest = {
        messages: [
            {
            role: "system",
            content: "You are an AI assistant that helps farmers find information about farming."
            },
            {
            role: "user",
            content: `Hello, I'm a new farmer. I want to know about planting ${cropName} in a ${regionName}.`
            }
        ],
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 800,
        stop: null
        };

  const result = await http<any,any>({
      path: '/',
      method: 'post',
      body: requestBody,
      accessToken: '2aFsvhzbhYEf1PJ6sM4BlNk9FeE008zPuCafGkXNeA59B4WYXwxGJQQJ99BEACfhMk5XJ3w3AAAAACOGlTdi'
  });
  if (result.ok) {
      return result;
  } else {
      return("There was an error");
  }
}