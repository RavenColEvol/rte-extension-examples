// /** @jsx jsx */
// import {jsx, css} from '@emotion/core';
//@ts-nocheck
import React from "react";
import ContentstackSDK from "@contentstack/app-sdk";
import { getGrammerSuggestion } from "./getGrammerSuggestion";
import { range } from "lodash";
import "./style.css";
import GrammarComponent from "./GrammarComponent";

let key: any;

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["location"];
  const RTE = await extensionObj["RTEPlugin"];

  if (!RTE) return;
  let response = [];

  const GrammerCheckPlugin = RTE("grammar-check", (rte: any) => {
    const handleDecorate = ([node, path]) => {
      let ranges = [];

      if (!rte._adv.Text.isText(node)) {
        return ranges;
      }
      if (response?.contentToReplace) {
        Array.from(response?.contentToReplace).forEach((elem) => {
          let value = { ...elem };
          ranges.push({
            "grammar-check": value,
            anchor: { path, offset: elem.start_offset },
            focus: { path, offset: elem.end_offset + 1 },
          });
        });
      }
      return ranges;
    };
    rte._adv.addToDecorate(handleDecorate);

    const handleClick = () => {
      let resp = Array.from(response.contentToReplace).find((elem) => {
        return (
          rte.selection.get().anchor.offset > elem.start_offset &&
          rte.selection.get().anchor.offset <= elem.end_offset
        );
      });
      if (resp) {
        let deletePath = {
          anchor: {
            path: [...rte.selection.get().anchor.path],
            offset: resp.start_offset,
          },
          focus: {
            path: [...rte.selection.get().anchor.path],
            offset: resp.end_offset + 1,
          },
        };
        let insertPath = {
          anchor: {
            path: [...rte.selection.get().anchor.path],
            offset: resp.start_offset,
          },
          focus: {
            path: [...rte.selection.get().anchor.path],
            offset: resp.start_offset,
          },
        };
        rte.selection.set(deletePath);
        rte.deleteText();
        rte.selection.set(insertPath);
        rte._adv.Editor.insertText(rte._adv.editor, resp.corrected_input);
        const index = response.contentToReplace.indexOf(resp);
        if (index > -1) {
          response.contentToReplace.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    };

    return {
      display: [],
      elementType: ["text"],
      render: (props: any) => {
        return <GrammarComponent {...props} handleClick={handleClick} />;
      },
    };
  });

  // GrammerCheckPlugin.on("keydown", async ({ event, rte }) => {
  //   if (event.key === ".") {
  //     response = await getGrammerSuggestion(
  //       rte.getNode(rte.selection.get())[0].text
  //     );
  //   }
  //   rte.selection.get();
  //   rte.selection.set(rte.selection.get());
  // });

  GrammerCheckPlugin.on('keydown',async ({event, rte}) =>  {
  //   console.log('keydown', event.key)
  //   if (!window.rte && rte) {
  //     window.rte = rte;
  // }
  //   key = event.key
  //   if(key === '.'){
  //     for (const [node, path] of rte._adv.Editor.nodes(rte._adv.editor, { at: rte.selection.get() })){
  //       if(node.type === 'doc'){
  //         Array.from(node?.children).forEach(async (child) => {
  //           if(child.type === 'p' && child?.children[0]?.text && child.children[0].text.length > 0){
  //             response = await getGrammerSuggestion(child.children[0].text)
  //             if(response){
  //               let nodeDOM = rte._adv.ReactEditor.toDOMNode(rte.getNode(rte.selection.get())[0]).firstChild.firstChild
  //               Array.from(response?.contentToReplace).forEach((elem) => {
  //                 colorRange(nodeDOM, elem.start_offset, elem.end_offset + 1)
  //               })
  //             }
  //           }
  //         })
  //       }
  //     }
  //   }
  })

  // GrammerCheckPlugin.on('change', async ({event, rte}) => {
  //   let resp;
  //   document.addEventListener('click', async (e) => {
  //     if(document.getElementsByClassName('grammarCheck')){
  //       if(document.getElementById('tooltip')){
  //         document.getElementById('tooltip')?.remove()
  //       }
  //       let top = window.getSelection()?.focusNode?.parentElement?.getBoundingClientRect().top
  //       let left = window.getSelection()?.focusNode?.parentElement?.getBoundingClientRect().left
  //       if(rte.selection.get().anchor.offset === rte.selection.get().focus.offset){
  //          resp = Array.from(response.contentToReplace).find((elem) => {
  //           return rte.selection.get().anchor.offset > elem.start_offset && rte.selection.get().anchor.offset <= elem.end_offset
  //         })
  //       }
  //       if(resp){
  //         let tooltip =  `<div style="width: 184px; height: 16px ;font-family: Inter ;font-style: normal ;font-size: 12px ; font-weight: 700;line-height: 135%; display: flex ;align-items: center ;letter-spacing: 0.01em ;color: #475161; margin-left: 15px">Grammer</div>
  //         <div style="width: 184px;height: 16px;font-family: Inter; font-style: normal;font-size: 12px;line-height: 130%;display: flex;align-items: center;color: #475161; margin-left: 15px">Use "${resp.corrected_input}" instead of "${resp.incorrect_input}".</div>
  //         <div id="grammar" style="width: fit-content;height: 20px; border: 1px solid #007A52; border-radius: 4px; margin-left: 15px; text-align: center"><span style="width: 10px;height: 20px;font-family: Inter; font-style: normal;font-size: 12px;line-height: 130%; text-align: center; color: #007A52; padding-right: 5px; padding-left: 5px">${resp.corrected_input}</span></div>`
  //         const tooltipContainer = document.createElement('div')
  //         tooltipContainer.innerHTML = tooltip
  //         tooltipContainer.id = 'tooltip'
  //           tooltipContainer.style.border = '1px solid rgba(34, 34, 34, 0.25)'
  //           tooltipContainer.style.position = 'absolute'
  //           tooltipContainer.style.top = `${top + 25}px`
  //           tooltipContainer.style.left = `${left}px`
  //           tooltipContainer.style.cursor = 'pointer'
  //           tooltipContainer.style.width = '214px'
  //           tooltipContainer.style.height = '101px'
  //           tooltipContainer.style.background = '#FFFFFF'
  //           // tooltipContainer.style.boxShadow = '0px 4px 30px rgba(34, 34, 34, 0.25)'
  //           tooltipContainer.style.borderRadius = '10px'
  //           tooltipContainer.style.display = 'flex'
  //           tooltipContainer.style.justifyContent = 'space-evenly'
  //           tooltipContainer.style.flexDirection = 'column'
  //           tooltipContainer.addEventListener(('click'), async (e) => {
  //             let deletePath = {
  //               anchor: {
  //                 path: [...rte.selection.get().anchor.path],
  //                 offset: resp.start_offset,
  //               },
  //               focus: {
  //                 path: [...rte.selection.get().anchor.path],
  //                 offset: resp.end_offset + 1,
  //               },
  //             };
  //             let insertPath = {
  //               anchor: {
  //                 path: [...rte.selection.get().anchor.path],
  //                 offset: resp.start_offset,
  //               },
  //               focus: {
  //                 path: [...rte.selection.get().anchor.path],
  //                 offset: resp.start_offset,
  //               },
  //             }

  //             rte.selection.set(deletePath);
  //             rte.deleteText()
  //             rte.selection.set(insertPath)
  //             rte._adv.Editor.insertText(rte._adv.editor, resp.corrected_input);
  //           })
  //           document.body.appendChild(tooltipContainer)
  //       }

  //     }
  //     else{
  //       document.getElementById('tooltip')?.remove()
  //     }
  //   })
  // })
  return {
    GrammerCheckPlugin,
  };
});

// function colorRange(elementname, x, y) { // color from coordinate x to y, within div elementname
//   let elem
//   elem = getTextNode(elementname);
//   const range = document.createRange();

//   var offset = elementname.innerText.length - elem.length;
//   range.setStart(elem, x - offset);
//   range.setEnd(elem, y - offset);

//   const span = document.createElement("span");
//   span.style.borderBottom = '2px solid #FFAE0A'
//   span.style.background = '#FFF8EB'

//   range.expand();
//   span.appendChild(range.extractContents());
//   range.insertNode(span);
// }

// function getTextNode(node) {
//   var oDiv = node;
//   var lastText = "";
//   for (var i = oDiv.childNodes.length - 1; i >= 0; i--) {
//     var curNode = oDiv.childNodes[i];
//     if (curNode.nodeName === "#text") {
//       lastText = curNode;
//       break;
//     }
//   }
//   return lastText;
// }
