import React, {useState} from 'react'
import Tippy from "@tippyjs/react";
import SpellCheckTooltip from './SpellCheckTooltip';

const SpellComponent = (props: any, handleClick: any) => {
    const [visible, setVisible] = useState(false)
    return (
        <span className="tippy-inline">
            <Tippy
                appendTo={document.body}
                className="p-0"
                placement='bottom-start'
                trigger="click"
                visible={visible}
                interactive={true}
                onClickOutside={() => setVisible(false)}
                content={
                    <SpellCheckTooltip {...props} handleClick={props.handleClick} setVisible={setVisible}/>
                }
            >
            <span style={{borderBottom: '2px solid #D62400', background: '#FFEEEB'}} onClick={() => setVisible(true)}>{props.children}</span>
            </Tippy>
        </span>
    );
};

export default SpellComponent;