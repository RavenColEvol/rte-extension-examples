// import React from 'react';

// export function highlightRange(elementname: any, x: any, y: any) {
//     let elem
//     elem = getTextNode(elementname);
//     const range = document.createRange();
  
//     var offset = elementname.innerText.length - elem.length;
//     range.setStart(elem, x - offset);
//     range.setEnd(elem, y - offset);
  
//     const span = document.createElement("span");
//     span.style.borderBottom = '2px solid #FFAE0A'
//     span.style.background = '#FFF8EB'
  
//     range.expand();
//     span.appendChild(range.extractContents());
//     range.insertNode(span);
//   }
  
//   function getTextNode(node) {
//     var oDiv = node;
//     var lastText = "";
//     for (var i = oDiv.childNodes.length - 1; i >= 0; i--) {
//       var curNode = oDiv.childNodes[i];
//       if (curNode.nodeName === "#text") {
//         lastText = curNode;
//         break;
//       }
//     }
//     return lastText;
//   }