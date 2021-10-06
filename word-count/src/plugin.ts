import ContentstackSDK from "@contentstack/app-sdk";
import "./style.css";
import { withWordCounter } from "./wordCounter";



export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["Extension"];
  const RTE = await extensionObj["RTEPlugin"];

  if(!RTE) return [];
  const WordCount = withWordCounter(RTE);
  return [WordCount];
});
