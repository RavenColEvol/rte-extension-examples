import React from 'react'
import { EmptyState } from "@contentstack/venus-components"
import UnconfigurateIcon from "./UnconfigurateState"

import "./index.css"
const EmptyStateComponent = ({children,isConfigured=false, invalidConfig}) => {
    const {isConfigInvalid, errorHeading, errorMessage} = invalidConfig
    return (
        <>
            {!isConfigured ? (
                <div className="UnconfigurateState--center">
                    <EmptyState heading={isConfigInvalid ? errorHeading : 'Configuration not saved'} img={<UnconfigurateIcon />} description={<div>
                        <div style={{ paddingBottom: "20px" }}>
                            {
                                isConfigInvalid ? errorMessage : 'In order to make this extension accessible within the stack, please save the configurations in Marketplace.'
                            }
                        </div>
                    </div>}
                    />
                </div>
                ) : children}
        </>
    )
}
export default EmptyStateComponent