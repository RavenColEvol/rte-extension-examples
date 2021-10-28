/** @jsx jsx */
//@ts-nocheck
import ContentstackSDK from '@contentstack/app-sdk';
import {renderAutoSuggestion} from './utils'
let key: any;

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk['Extension'];
  const RTE = await extensionObj['RTEPlugin'];

  const AutoSuggestionPlugin = RTE("auto-suggestion", (rte: any) => {
    return {
      displayOn: [],
    };
  });

  AutoSuggestionPlugin.on('keydown', ({event, rte}) => {
    key = event.key
    if(event.key === 'Tab' && document.getElementById('shadowDiv')?.childNodes[0].textContent?.length > 0){
      event.preventDefault()
      rte.insertText(document.getElementById('shadowDiv')?.childNodes[0].textContent, {at: rte.selection.get()})
      document.getElementById('shadowDiv').childNodes[0].innerHTML = ''
    }
  })

  AutoSuggestionPlugin.on('change', ({rte}: any) => {
    renderAutoSuggestion(rte, key)
  })

  return {
    AutoSuggestionPlugin
  }
});

