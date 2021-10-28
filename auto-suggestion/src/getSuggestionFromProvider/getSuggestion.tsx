import { getOpenAISuggestion } from './Provider/getOpenAISuggestion';
import { getAPISuggestion } from './Provider/getApiSuggestion';

const Provider: any = {
  "open-ai": getOpenAISuggestion,
  "data-api": getAPISuggestion
}

export const getSuggestion = (text: any, providerType: any) => {
  let response = Provider[providerType](text)
  if(response){
    return response.then((data: any) => {
      return data
    })
  }
}
