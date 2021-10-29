//@ts-nocheck
import React from "react";
import Tippy, { useSingleton } from "@tippyjs/react";
import { cx } from "@emotion/css";

import "./style.css";

const DataViewerTooltip = ({ field }) => {
    return (
        <div>
            <pre className="data-box">
                {JSON.stringify(field, null, 4) ?? "Not Found"}
            </pre>
        </div>
    );
};

const VariableComponent = (props) => {
    const { attributes, attrs, children, variableData } = props;
    const [source, target] = useSingleton({
        overrides: ["placement"]
    });
    console.error("books", variableData, attrs.var);
    const fileTitle = variableData[attrs.var.uid]?.title;
    const fileData = variableData[attrs.var.uid]?.value?.[attrs.var.title];

    return (
        <span className="tippy-inline" {...attributes}>
            <Tippy 
                singleton={source}  
            />
            <Tippy
                appendTo={document.body}
                singleton={target}
                zIndex={909}
                className="p-0"
                position="bottom"
                trigger="click"
                variantType="light"
                content={
                    <span
                        contentEditable={false}
                        className={cx("hyperlink-info-tooltip", {
                            "hyperlink-info-tooltip--invalid": !variableData.hasOwnProperty(
                                attrs.var
                            ),
                        })}
                    >
                        <DataViewerTooltip field={fileData?.field} />
                    </span>
                }
            >
                <span
                    className={cx("variable-plugin", {
                        "variable-plugin--invalid": !fileData,
                    })}
                >
                    {`{{ ${fileTitle && fileTitle + ":"} ${attrs.var.title} }}`}
                </span>
            </Tippy>
            {children}
        </span>
    );
};

export default VariableComponent;
