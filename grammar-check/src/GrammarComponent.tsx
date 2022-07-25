import React from 'react'
import Tippy from "@tippyjs/react";
import GrammarCheckTooltip from './GrammarCheckTooltip';

const GrammarComponent = (props: any, handleClick: any) => {
    return (
        <span className="tippy-inline">
            <Tippy
                appendTo={document.body}
                className="p-0"
                placement='bottom-start'
                trigger="click"
                interactive={true}
                content={
                    <GrammarCheckTooltip {...props} handleClick={props.handleClick}/>
                }
            >
            <span style={{borderBottom: '2px solid #FFAE0A', background: '#FFF8EB'}}>{props.children}</span>
            </Tippy>
        </span>
    );
};

export default GrammarComponent;