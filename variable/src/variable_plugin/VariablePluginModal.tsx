import React, { useState, Fragment } from "react";
import {
    Button,
    ButtonGroup,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Select,
} from "@contentstack/venus-components";
import EmptyStateComponent from './UnconfiguredState'

import "./modal.css";

const VariablePluginModal = (props: any) => {
    const [value, updateValue] = useState<{
        label: string;
        value: { uid: string; title: string };
    } | null>(null);
    const [isConfigured, setIsConfigured] = useState(props.variableData.length > 0 ? true : false)
    const { rte, invalidConfig } = props;


    React.useEffect(() => {
        const [node] = rte.getNodes({
            match: (n: any) => n.type === "variable-plugin",
        });

        if (node) {
            const variable = node?.[0]?.attrs?.var;
            updateValue({
                label: variable.title,
                value: variable,
            });
        }
    }, []);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!value) return;

        const [node] = rte.getNodes({
            match: (n: any) => n.type === "variable-plugin",
            at: props.savedSelection,
        });
        if (node) {
            const variable = node?.[0]?.attrs?.var;
            if (variable !== value.label) {
                rte.setAttrs(
                    {
                        ...node[0],
                        attrs: { ...node[0].attrs, var: value.label },
                    },
                    { at: node[1] }
                );
            }
        } else {
            rte.insertNode({
                type: "variable-plugin",
                attrs: {
                    var: value.value,
                },
                children: [{ text: "" }],
            }, {
                at: props.savedSelection || rte.selection.getEnd([]),
            });
        }

        props.closeModal();
    };

    return (
        <Fragment>
            <ModalHeader title={"Variable"} closeModal={props.closeModal} />
            <ModalBody>
                <EmptyStateComponent isConfigured={isConfigured} invalidConfig={invalidConfig}>
                <form onSubmit={handleSubmit}>
                    <Select
                        selectLabel="Single Variable"
                        value={value}
                        onChange={updateValue}
                        options={props.variableData}
                        placeholder="Select Variable"
                        width="200px"
                    />
                </form>
                </EmptyStateComponent>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button
                        key="cancel"
                        buttonType="light"
                        onClick={props.closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!isConfigured}
                        key="add"
                        icon="CheckedWhite"
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </Fragment>
    );
};

export default VariablePluginModal;
