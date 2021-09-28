import React from 'react';

const Youtube = (props:any) => (
    <iframe 
        style={{width: '100%', height: '250px'}} 
        contentEditable={false} src={props.url} 
        allowFullScreen={true} frameBorder={0}/>
)

export default Youtube