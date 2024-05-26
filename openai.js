const OpenAI = require("openai");
const openAIKey = "";
const openai = new OpenAI({
  apiKey: openAIKey,
});

const templateHebrew = `
    [
        {
            "basic": "the basic text for a sentence",
            "basicHelp": "the basic text for a sentence with nikudot",
            "english": "the english translation for a sentence"
        }
    ]
`;

const templateChinese = `
    [
        {
            "basic": "the basic text for a sentence",
            "basicHelp": "the basic text for a sentence in pinyin",
            "english": "the english translation for a sentence"
        }
    ]
`;

// const chinesePrompt = `Turn all the provided Chinese text into more basic Chinese suitable for someone who is 5 years old. A sentence in Chinese ends with the '。' symbol. For each sentence in the provided text, provide the more basic version of the sentence, the more basic version of the sentence in pinyin, and the English translation. Return the response only as a JSON object with this template: ${templateChinese}. This is the provided text: ${sampleChineseText}`;

const makeRequestToOpenAIHebrew = async (text) => {
  console.log("Making request...");
  const hebrewPrompt = `Turn all the provided Hebrew text into more basic Hebrew for a 12 year old native Hebrew reading level. For each sentence in the provided text, generate the more basic version of the sentence, the more basic version of the sentence with nikudot, and the English translation. Return the response only as a JSON object with this template: ${templateHebrew}. This is the provided text: ${text}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: hebrewPrompt,
      },
    ],
    // stream: true,
  });
  console.log("Data returned is ");
  const result = completion.choices[0].message.content;
  console.log(result);
  try {
    const jsonObj = JSON.parse(result);
    console.log(jsonObj);
    return jsonObj;
  } catch (e) {
    throw e;
  }

  //   for await (const chunk of stream) {
  //     process.stdout.write(chunk.choices[0]?.delta?.content || "");
  //   }
};

module.exports = {
  makeRequestToOpenAIHebrew,
};
