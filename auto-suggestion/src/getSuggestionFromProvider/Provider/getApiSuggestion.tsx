let url ='https://dev-text-analytics-api.contentstack.com/get_predictions/'

export const getAPISuggestion = async (text: any) => {
   return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authtoken': 'bltbcdc58e1d6cbb0ad'
      },
      body: JSON.stringify({ text: text, max_op_words: 3, max_time: 1, max_predictions: 1 })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json()
      })
      .then(data => {
        return data[0].generated_text.substr(text.length)
      })
      .catch(err => console.log('error', err))
  }