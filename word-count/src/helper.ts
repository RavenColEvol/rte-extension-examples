export const setup = (ref: HTMLDivElement): HTMLSpanElement | null => {
  const wordCounter = document.createElement("span");
  wordCounter.id = "word-counter";
  wordCounter.innerHTML = 'Words: <span id="count">0</span>';
  ref.appendChild(wordCounter);
  return wordCounter.querySelector("#count");
}

export const update = (rte: any) => {
  const counter = rte["counter"];
  if (!counter) return;
  const value = rte.getNode([0]);
  const child = value[0]["children"];
  let count = 0;
  child.forEach((_: any, idx: Number) => {
    count += rte
      .string([0, idx])
      .split(" ")
      .filter((s: String) => s).length;
  });
  counter.innerHTML = String(count);
}
