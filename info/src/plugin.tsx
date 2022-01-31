import React from 'react'
import { Icon } from '@contentstack/venus-components'
import ContentstackSDK from "@contentstack/app-sdk";
import './style.css';

export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = sdk["location"];
    const RTE = await extensionObj["RTEPlugin"];
    if(!RTE) return ;

    const Info = RTE('info', () => ({
        title: 'Info',
        icon: <Icon className='p-x-6' icon="InfoCircle" size="original" />,
        render: (props:any) => {
            return (
                <p {...props.attrs} className='info'>
                    <div contentEditable="false" className='p-t-1'>
                        <Icon className='p-x-6' icon="InfoCircleWhite" size="original" />
                    </div>
                    <div className='info__content'>
                        {props.children}
                    </div>
                </p>
            )
        },
        display: ['toolbar'],
        elementType: ['block']
    }));

    return {
        Info
    };
}).catch(err => {
    console.log('err', err);
});
