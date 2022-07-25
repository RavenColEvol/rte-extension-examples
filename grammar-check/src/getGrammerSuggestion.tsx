let url = 'https://dev-generic-grammar-correction.csnonprod.com/get_predictions'

export const getGrammerSuggestion = async (text: any) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'authtoken': 'blt6d21a41330598489',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ input_text: `${text}.` })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json()
      })
      .then(data => {
        return data
      })
      .catch(err => console.log('error', err))
   
  }