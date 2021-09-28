import ContentstackSDK from "@contentstack/app-sdk";
import "./style.css";

function setup(ref:HTMLDivElement):HTMLSpanElement|null {
  const wordCounter = document.createElement("span");
  wordCounter.id = "word-counter";
  wordCounter.innerHTML = 'Words: <span id="count">0</span>';
  ref.appendChild(wordCounter);
  return wordCounter.querySelector("#count");
}

function update(rte: any) {
  const counter = rte['counter'];
  if(!counter) return;
  const value = rte.getNode([0]);
  const child = value[0]["children"];
  let count = 0;
  child.forEach((_:any, idx: Number) => {
    count += rte
      .string([0, idx])
      .split(" ")
      .filter((s:String) => s).length;
  });
  counter.innerHTML = String(count);
}


export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["Extension"];
  const RTE = await extensionObj["RTEPlugin"];

  if(!RTE) return [];
  const WordCount = RTE("word-count", (rte) => {
    rte['counter'] = setup(rte['ref']);
    update(rte);
    
    return {
      title: "Word Count",
      displayOn: [],
    };
  });
  
  // @ts-ignore
  WordCount.on("change", ({ rte }) => {
    update(rte);
  });

  return [WordCount];
});
