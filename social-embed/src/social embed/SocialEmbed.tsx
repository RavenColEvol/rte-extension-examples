//@ts-nocheck
import React from "react";
import Youtube from "./Youtube";
import Twitter from "./Twitter";
import { getEmbedType } from "./lib";

const SocialEmbed = (props) => {
  const { attributes, attrs, children, rte } = props;
  const embeds:any = {
    Youtube,
    Twitter,
  };

  const result = getEmbedType(attrs.url);
  const Embed = embeds[result.type];

  return (
    <div
      {...attrs}
      {...attributes}
      style={{
        width: "100%",
      }}
    >
      <Embed {...result.props} />
      {children}
    </div>
  );
};

export default SocialEmbed;