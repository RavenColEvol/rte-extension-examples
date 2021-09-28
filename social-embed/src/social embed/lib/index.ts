//@ts-nocheck
export const getEmbedType = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = url.match(regex);
  if (match) {
    return {
      type: "Youtube",
      props: {
        url: `https://www.youtube.com/embed/${match[1]}`,
      },
    };
  }

  const regex2 = /(?:twitter\.com\/[^\/]+\/status(?:es)?\/)([0-9]+)/i;
  const match2 = url.match(regex2);
  if (match2) {
    return {
      type: "Twitter",
      props: {
        id: match2[1],
      },
    };
  }

  return {
    type: "iframe",
    props: {
      url,
    },
  };
};
