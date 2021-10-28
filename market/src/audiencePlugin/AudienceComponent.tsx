import React from "react";
import { cbModal } from "@contentstack/venus-components";
import { cx } from "@emotion/css";
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
    } = props;

    console.error("props", props, attrs.audiences);

    const handleMouseDown = (event) => {
        if (event) event.preventDefault();
        console.log("rte saved selection", rte.getNode([0]), rte.selection.get(), savedSelection);
        cbModal({
            component: (modalProps) => (
                <AudienceModal
                    audiences={audienceList}
                    savedSelection={savedSelection}
                    rte={rte}
                    attrs={attrs}
                    {...props}
                    {...modalProps}
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
            data-type="market-pre"
        >
            {`[Market = ${attrs.audiences.join(", ")} ]`}
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
            data-type="market-post"
            data-attrs={JSON.stringify(attrs)}
            contentEditable={false}
            style={{ userSelect: "none", margin: "0 3px" }}
        >
            {"[MarketEnd]"}
            {children}
        </span>
    );
};
