//@ts-nocheck
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { SkeletonTile } from '@contentstack/venus-components'
var callbacks = [];

declare const window: any;

const addScript = (src, cb) => {
  if (callbacks.length === 0) {
    callbacks.push(cb)
    var s = document.createElement('script')
    s.setAttribute('src', src)
    s.onload = () => callbacks.forEach((cb) => cb())
    document.body.appendChild(s)
  } else {
    callbacks.push(cb)
  }
}

const Twitter = ({ id, parentClass }) => {
  const [loading, setLoading] = useState(true);
  const videoId = encodeURIComponent(id);
  const tweetRef = useRef();

  const renderTweet = () => {
    const { current } = tweetRef;
    window.twttr.widgets.createTweetEmbed(videoId, current)
  }

  useEffect(() => {
    if (!window.twttr) {
      addScript('https://platform.twitter.com/widgets.js', renderTweet)
    } else {
      renderTweet()
    }
    
    const handleLoad = (e) => {
      const rendered = e.data['twttr.embed'].method === 'twttr.private.rendered';
      const isCurrentTweet = rendered && e.data['twttr.embed'].params[0].data.tweet_id === videoId;
      if(rendered && isCurrentTweet) {
        setLoading(false);
        removeEventListener('message', handleLoad);
      }
    }
    addEventListener('message', handleLoad);
  }, []);

  return (
    <Fragment>
      {loading && <SkeletonTile 
        numberOfTiles={1}
        tileHeight={150}
        tileWidth={500}
      />}
      <div className={`${parentClass}`} ref={tweetRef}></div>
    </Fragment>
  );
}


export default Twitter;
