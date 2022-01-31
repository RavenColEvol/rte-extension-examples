/** @jsx jsx */
//@ts-nocheck
import { jsx } from '@emotion/core';

// 1 include app sdk
import ContentstackSDK from '@contentstack/app-sdk';
import SocialEmbedIcon from './social embed/SocialEmbedIcon';
import SocialEmbed from './social embed/SocialEmbed';
import SocialEmbedModal from './social embed/SocialEmbedModal';
import { cbModal } from '@contentstack/venus-components';


// step 2 initialize contentstack app sdk
export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk['location'];
  const RTE = await extensionObj['RTEPlugin'];
  if(!RTE) return {};
  // step 3 create a plugin
  // step 4 register the plugin using RTE Plugin
  const SocialEmbedPlugin = RTE('social-embed',() => ({
    icon: SocialEmbedIcon,
    title: "Social Embed",
    render: SocialEmbed,
    elementType: ['void'],
    display: ['toolbar']
  }));
  
  SocialEmbedPlugin.on('exec', (rte) => {
    const savedSelection = rte.selection.get();
    //* Open a modal when button is clicked
    cbModal({
      component: (props) => <SocialEmbedModal savedSelection={savedSelection} rte={rte} {...props}/>,
      modalProps: {
        shouldReturnFocusAfterClose: false
      }
    });
  });

  // step 5 return the plugin
  return {
    SocialEmbedPlugin
  }
});

// blank boilerplate