import React, { useEffect, useRef, useState } from "react";

interface IgProps {
  url: string;
}

const getIgEmbedUrl = (_url:string) => {
    const url = new URL(_url);
    return `${url.protocol}//${url.hostname}${url.pathname}embed`;
}

export const Instagram = ({ url }: IgProps) => {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(284)
  const igEmbedUrl = getIgEmbedUrl(url);

  useEffect(() => {
    const handleEvent = (e:MessageEvent) => {
      if (e.origin === "https://www.instagram.com" && (JSON.parse(e.data).details.height)) {
        if (ref.current && ref.current.contentWindow === e.source) {
          setHeight(JSON.parse(e.data).details.height)
          window.removeEventListener('message', handleEvent)
        }
      }
    }

    if (ref.current) {
      window.addEventListener('message', handleEvent)
    }

    return () => {
      window.removeEventListener('message', handleEvent)
    }
  }, [])

  return (
    <>
      <iframe
        ref={ref}
        src={igEmbedUrl}
        width={540}
        height={height}
      />
    </>
  );
};
