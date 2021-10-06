import { update, setup } from "./helper";

export const withWordCounter = (RTE: any) => {
  const WordCount = RTE("word-count", (rte: any) => {
    rte["counter"] = setup(rte["ref"]);
    update(rte);

    return {
      title: "Word Count",
      displayOn: [],
    };
  });

  WordCount.on("change", ({ rte }:any) => {
    update(rte);
  });
  return WordCount;
};
