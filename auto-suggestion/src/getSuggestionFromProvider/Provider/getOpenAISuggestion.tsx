//@ts-ignore
import OpenAIApi from 'openai-api-node'

var openai = new OpenAIApi("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")

export const getOpenAISuggestion = (text: any) => {
    return openai.CompletionsCreate(text)
      .then(function (data: any) {
          return data.choices[0].text;
      })
      .catch(function (err: any) {
        console.log(err)
      })
  }
