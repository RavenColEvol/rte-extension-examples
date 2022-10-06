let url = 'https://dev-datascience.csnonprod.com/spellcheck/spell-check'

export const getSpellSuggestion = async (text: any) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'authtoken': 'blt0920c21fdb59ab35',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ input_text: text })
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