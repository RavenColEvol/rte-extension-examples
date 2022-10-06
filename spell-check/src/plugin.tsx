// /** @jsx jsx */
// import {jsx, css} from '@emotion/core';
//@ts-nocheck
import React from "react";
import ContentstackSDK from "@contentstack/app-sdk";
import { getSpellSuggestion } from "./getSpellSuggestion";
import "./style.css";
import SpellComponent from "./SpellComponent";
import isHotkey from 'is-hotkey'

let key: any;

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["location"];
  const RTE = await extensionObj["RTEPlugin"];

  if (!RTE) return;
  let response = [];

  const SpellCheckPlugin = RTE("spell-check", (rte: any) => {
    const handleDecorate = ([node, path]) => {
      let ranges = [];

      if (!rte._adv.Text.isText(node)) {
        return ranges;
      }
      if (response?.contentToReplace) {
        Array.from(response?.contentToReplace).forEach((elem) => {
          let value = { ...elem };
          ranges.push({
            "spell-check": value,
            anchor: { path, offset: elem.start_offset },
            focus: { path, offset: elem.end_offset + 1 },
          });
        });
      }
      return ranges;
    };
    rte._adv.addToDecorate(handleDecorate);

    const handleClick = (spelling) => {
      // console.log("RESPONSE", response)
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
        rte._adv.Editor.insertText(rte._adv.editor, spelling);
        
        const deleteResponseindex = response.contentToReplace.indexOf(resp);
        // console.log("response",response.contentToReplace,deleteResponseindex)
        if (deleteResponseindex > -1) {
          response.contentToReplace.splice(deleteResponseindex, 1); 
          if(response.contentToReplace?.length > 0){
            // console.log("TEST:", resp.incorrect_input, spelling)
            //corrected output's length > incorrect input's length
            if(spelling.length > resp.incorrect_input.length){
              // console.log("HERE")
              let difference = spelling.length - resp.incorrect_input.length
              Array.from(response.contentToReplace).map((elem, index) => {
              // console.log("Difference", elem, difference, index, deleteResponseindex)

                  // if(index >= deleteResponseindex){
                    // console.log("HERERRERERERE")
                    elem.start_offset = elem.start_offset + difference
                    elem.end_offset = elem.end_offset + difference
                  // }
                return elem
              })
            }
            //corrected output's length < incorrect input's length
            if(spelling.length < resp.incorrect_input.length){
              // console.log("HERE 2")
              let difference =  resp.incorrect_input.length - spelling.length
              Array.from(response.contentToReplace).map((elem, index) => {
                  // if(index >= deleteResponseindex){
                    elem.start_offset = elem.start_offset - difference
                    elem.end_offset = elem.end_offset - difference
                  // }
                return elem
              })
            }
          }
        }
      }
    };

    return {
      display: [],
      elementType: ["text"],
      render: (props: any) => {
        return <SpellComponent {...props} handleClick={handleClick} />;
      },
    };
  });

  SpellCheckPlugin.on("keydown", async (props) => {
    const {rte, event} = props
    props["editor"] = rte._adv.editor
    if (response?.contentToReplace?.length > 0) {
      const input = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z0-9-_ ]/.test(input) || event.keyCode >= 186 && event.keyCode <=192 || event.keyCode >= 219 && event.keyCode <= 222 || !isHotkey('ctrl+a') || !isHotkey('ctrl+c') || !isHotkey('ctrl+v')) {
        if(rte.selection.get().anchor.offset <= response?.contentToReplace[0].start_offset){
          Array.from(response.contentToReplace).map((elem, index) => {
              elem.start_offset = elem.start_offset + 1;
              elem.end_offset = elem.end_offset + 1;
            return elem;
          });
        }
        else{
          let element = Array.from(response.contentToReplace).find((elem, index) => {
            if(rte.selection.get().anchor.offset <= elem.start_offset && rte.selection.get().anchor.offset >= response.contentToReplace[index - 1]?.end_offset){
              
              return elem
            }
          })
          if(element){
            Array.from(response.contentToReplace).map((elem, index) => {
          if(index >= response.contentToReplace.indexOf(element)){
            elem.start_offset = elem.start_offset + 1;
            elem.end_offset = elem.end_offset + 1;
          }
          return elem;
        });
          }

        }
      }
      if(event.keyCode === 8){
        if(rte.selection.get().anchor.offset <= response?.contentToReplace[0].start_offset){
          Array.from(response.contentToReplace).map((elem, index) => {
              elem.start_offset = elem.start_offset - 1;
              elem.end_offset = elem.end_offset - 1;
            return elem;
          });
        }
        else{
          let element = Array.from(response.contentToReplace).find((elem, index) => {
            if(rte.selection.get().anchor.offset <= elem.start_offset && rte.selection.get().anchor.offset >= response.contentToReplace[index - 1]?.end_offset){
              
              return elem
            }
          })
          if(element){
            Array.from(response.contentToReplace).map((elem, index) => {
          if(index >= response.contentToReplace.indexOf(element)){
            elem.start_offset = elem.start_offset - 1;
            elem.end_offset = elem.end_offset - 1;
          }
          return elem;
        });
          }

        }
      }
      // if(event.keyCode === 32){
      //   console.log('response', response)
      // }
    }

   if(event.keyCode === 32){
    response = await getSpellSuggestion(
      rte.getNode(rte.selection.get())[0].text
    );
    rte.selection.get();
    rte.selection.set(rte.selection.get());
   }
  //  console.log("RESPONSE", response)
  });

  return {
    SpellCheckPlugin,
  };
});


