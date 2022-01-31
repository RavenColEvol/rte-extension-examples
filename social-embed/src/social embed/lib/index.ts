//@ts-nocheck
export const getEmbedType = (url: string) => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = url.match(youtubeRegex);
  if (match) {
    return {
      type: "Youtube",
      props: {
        url: `https://www.youtube.com/embed/${match[1]}`,
      },
    };
  }

  const twitterRegex = /(?:twitter\.com\/[^\/]+\/status(?:es)?\/)([0-9]+)/i;
  const twitterMatch = url.match(twitterRegex);
  if (twitterMatch) {
    return {
      type: "Twitter",
      props: {
        id: twitterMatch[1],
      },
    };
  }

  // handle html embeds
  const parser = new DOMParser();
  const doc = parser.parseFromString(url, 'text/html');
  

  const igBlockquote = doc.querySelector('.instagram-media');
  if(igBlockquote) {
    const url = igBlockquote.getAttribute('data-instgrm-permalink');
    return {
      type: 'Instagram',
      props: {
        url: url
      }
    }
  }

  return {
    type: "iframe",
    props: {
      url,
    },
  };
};
