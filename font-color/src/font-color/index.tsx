//@ts-nocheck
import React from 'react';
import { Icon, Dropdown } from '@contentstack/venus-components'
import COLORS from './color';

const ColorComponent = (props:any) => {
    const { leaf } = props;
    return <span {...props.attrs} {...props.attributes} style={{color: leaf['font-color']}}>{props.children}</span>
}

export const createFontColor = (RTE:any) => {
    const FontColor = RTE('font-color', () => ({
        title: 'Font Color',
        iconName: <FCIcon/>,
        Component: (props) => { console.log('props', props); return <ColorComponent {...props} />},
        display: ['toolbar'],
        elementType: ['text']
    }));

    FontColor.on('exec', (rte:any) => {
        if(!window.rte) {
            window.rte = rte;
        }
    })

    // FontColor.on('keydown', (e:any) => {
    //     console.log('here ravi', e.event.key);
    // })
    console.log("Font color", FontColor.get())
    return FontColor;
}

const list = COLORS.map((_) => ({
    label: <span style={{color: _['color']}}>{_['name']}</span>,
    value: _['color'],
    showAsActive: true,
    action: () => {
        const {rte} = window;
        const isColor = rte.hasMark('font-color');
       
        if(isColor) {
            rte.removeMark('font-color');
        } else {
            rte.addMark('font-color', _['color']);
        }
    }
}))

function FCIcon() {
    return (
        <Dropdown list={list} type={'click'} highlightActive={true}>
            <Icon style={{padding: '0 6px'}} icon="Edit" size="original" />
        </Dropdown>
    )
}