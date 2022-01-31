import React from "react";
import Youtube from "./medias/Youtube";
import Twitter from "./medias/Twitter";
import { Instagram } from "./medias/Instagram";
import { getEmbedType } from "./lib";

const SocialEmbed = (props:any) => {
  const { attributes, attrs, children } = props;
  const embeds:any = {
    Youtube,
    Twitter,
    Instagram
  };

  const result = getEmbedType(attrs.url);
  const Embed = embeds[result.type];

  return (
    <div
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
