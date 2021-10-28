import ContentstackSDK from "@contentstack/app-sdk";
import "./style.css";
import { withWordCounter } from "./wordCounter";


export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["Extension"];
  const RTE = await extensionObj["RTEPlugin"];
  
  if(!RTE) return [];
  const WordCount = withWordCounter(RTE);
  return {
    WordCount
  };
});

// export default {
//   "WordCount": {
//     get: (rte:any) => {
//       console.log("rte called", rte.getConfig());
//       return ({
//       "registry": {
//           "title": "Word Count",
//           "toolbar": {
//               "inHoveringToolbar": false,
//               "inMainToolbar": false
//           },
//           "dndOptions": {},
//           "isContentstackElement": true,
//           "isExtension": true
//       },
//       "meta": {
//           "id": "word-count",
//           "elementType": null,
//           "editorCallbacks": {},
//           "isDependent": false
//       }})
//     }
//   }
// }