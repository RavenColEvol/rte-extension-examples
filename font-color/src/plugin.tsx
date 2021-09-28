import React from 'react'
import ContentstackSDK from "@contentstack/app-sdk";
import { createFontColor } from './font-color/index';

export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = await sdk["Extension"];
    const RTE = await extensionObj["RTEPlugin"];

    const FontColor = createFontColor(RTE);

    return {
        FontColor
    };
});
