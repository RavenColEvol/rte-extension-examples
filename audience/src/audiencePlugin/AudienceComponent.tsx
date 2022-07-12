import React from "react";
import { cbModal } from "@contentstack/venus-components";
import AudienceModal from "./AudienceModal";

import "./style.css";

export const AudiencePreTag = (props) => {
    const {
        attributes,
        attrs,
        children,
        audienceList,
        savedSelection,
        rte,
        invalidConfig
    } = props;

    console.error("props", props, attrs.audiences);

    const handleMouseDown = (event) => {
        if (event) event.preventDefault();
        cbModal({
            component: (modalProps) => (
                <AudienceModal
                    audiences={audienceList}
                    savedSelection={savedSelection}
                    rte={rte}
                    attrs={attrs}
                    {...props}
                    {...modalProps}
                    invalidConfig={invalidConfig}
                />
            ),

            modalProps: {
                //@ts-ignore
                shouldReturnFocusAfterClose: false,
                customClass: "variable-extension-modal",
            },
        });
    };

    return (
        <span
            onMouseDown={handleMouseDown}
            {...attributes}
            className="audience-plugin"
            data-attrs={JSON.stringify(attrs)}
            contentEditable={false}
            style={{ userSelect: "none", margin: "0 2px" }}
            data-type="audience-pre"
        >
            {`[Audience = ${attrs.audiences.join(", ")} ]`}
            {children}
        </span>
    );
};

export const AudiencePostTag = (props) => {
    const { attributes, attrs, children } = props;

    return (
        <span
            {...attributes}
            className="audience-plugin"
            data-type="audience-post"
            data-attrs={JSON.stringify(attrs)}
            contentEditable={false}
            style={{ userSelect: "none", margin: "0 3px" }}
        >
            {"[AudienceEnd]"}
            {children}
        </span>
    );
};