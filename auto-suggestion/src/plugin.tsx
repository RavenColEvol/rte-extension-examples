/** @jsx jsx */
//@ts-nocheck
import ContentstackSDK from '@contentstack/app-sdk';
import {renderAutoSuggestion, renderSuggestion} from './utils'
let key: any;

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk['location'];
  const RTE = await extensionObj['RTEPlugin'];

  const AutoSuggestionPlugin = RTE("auto-suggestion", (rte: any) => {
    return {
      displayOn: [],
    };
  });

  AutoSuggestionPlugin.on('keydown', (props) => {
    const {rte, event} = props
    props["editor"] = rte._adv.editor
    key = event.key
    if(event.key === 'Tab' && document.getElementById('shadowDiv')?.childNodes[0]?.textContent?.length > 0){
      event.preventDefault()
      rte.insertText(document.getElementById('shadowDiv')?.childNodes[0].textContent, {at: rte.selection.get()})
      document.getElementById('shadowDiv').childNodes[0].innerHTML = ''
    }
    if(event.keyCode === 32){
      renderAutoSuggestion(rte, key)
    }
    else{
      if(document.getElementById('shadowDiv')?.childNodes[0].textContent?.length > 0){
        renderSuggestion(window.getSelection()?.anchorNode, document.getElementById('shadowDiv')?.childNodes[0]?.textContent, key, false)
      }
    }

  })

  AutoSuggestionPlugin.on('change', ({event, rte}: any) => {
    // renderAutoSuggestion(rte, key)
  })

  return {
    AutoSuggestionPlugin
  }
});

