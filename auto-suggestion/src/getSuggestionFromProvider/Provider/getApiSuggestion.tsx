let url ='https://dev-generic-bert-suggestions.csnonprod.com/get_predictions'

export const getAPISuggestion = async (text: any) => {
   return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authtoken': 'blt5f30be324b965645'
      },
      body: JSON.stringify({ input_text: text})
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json()
      })
      .then(data => {
        return data.substr(text.length)
      })
      .catch(err => {console.log('error', err)
      throw new Error(err)
    }
      )
  }
