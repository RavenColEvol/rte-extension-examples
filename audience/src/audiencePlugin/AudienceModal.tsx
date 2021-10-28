import React, { useState, Fragment, useEffect } from "react";
import { v4 } from "uuid";

import {
    Button,
    ButtonGroup,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Select,
    Field,
} from "@contentstack/venus-components";
import {
    ExpandCloseIcon,
    CheckedIcon,
    SemiCheckedIcon,
    UncheckedIcon,
    ExpandOpenIcon,
} from "./icons";

import CheckboxTree from "react-checkbox-tree";

import "./modal.css";

const AudienceModal = (props: any) => {
    let { rte, savedSelection, audiences, attrs = {}, slatePath } = props;
    console.error(
        "mayhem",
        props,
        savedSelection,
        attrs.expanded,
        attrs.checked
    );

    const [checked, setChecked] = useState<any>(attrs.checked || []);
    const [expanded, setExpanded] = useState<any>(attrs.expanded || []);

    useEffect(() => {
        console.error("useeffect", checked, expanded);
    }, [checked, expanded]);
    const handleAddRegion = (event) => {
        event.preventDefault();
        savedSelection = savedSelection || {
            anchor: rte.selection.getEnd([]),
            focus: rte.selection.getEnd([])
        }
        if (savedSelection) {
            let modifiedCheckedList: string[] = [];
            audiences.forEach((parent) => {
                if (checked.includes(parent.label)) {
                    return modifiedCheckedList.push(parent.label);
                }
                parent.children.map((child) => {
                    if (checked.includes(child.label)) {
                        return modifiedCheckedList.push(child.label);
                    }
                });
            });

            const audienceId = v4()
                .split("-")
                .join("");

            const audiencePost = {
                type: "audience-post",
                uid: v4()
                    .split("-")
                    .join(""),
                attrs: {
                    audienceId,
                },
                children: [{ text: "" }],
            };
            const audiencePre = {
                type: "audience-pre",
                uid: v4()
                    .split("-")
                    .join(""),
                attrs: {
                    audiences: modifiedCheckedList,
                    audienceId,
                    checked,
                    expanded,
                },
                children: [{ text: "" }],
            };

            if (props.attrs) {
                rte.setAttrs(audiencePre, {
                    at: slatePath,
                });
                const childPath = rte.selection.after(slatePath);
                const endPath = rte.selection.after(childPath.path);
                endPath.path.splice(3, 1);

                rte.setAttrs(audiencePost, {
                    at: endPath.path,
                });
            } else {
                rte.insertNode(audiencePost, { at: savedSelection.focus });
                rte.insertNode(audiencePre, { at: savedSelection.anchor });
            }

            const savedSelectionPath = savedSelection.anchor.path;

            const newSelection = {
                path: [
                    ...savedSelectionPath.slice(0, -1),
                    savedSelectionPath[savedSelectionPath.length - 1] + 2,
                ],
                offset: 0,
            };

            console.error("savedSelection", newSelection, savedSelection);
            rte.selection.set(rte.selection.getEnd([]));
        }

        props.closeModal();
    };
    return (
        <div>
            <ModalHeader title="Select Audience" closeModal={props.closeModal} />
            <ModalBody>
                <div
                    style={{
                        height: "234px",
                    }}
                >
                    <Field>
                        <CheckboxTree
                            iconsClass="fa5"
                            showNodeIcon={false}
                            nodes={audiences}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => {
                                setChecked(checked);
                            }}
                            onExpand={(expanded) => {
                                setExpanded(expanded);
                            }}
                            // nativeCheckboxes={true}
                            checkModel="all"
                            icons={{
                                check: <CheckedIcon />,
                                uncheck: <UncheckedIcon />,
                                halfCheck: <SemiCheckedIcon />,
                                expandOpen: <ExpandOpenIcon />,
                                expandClose: <ExpandCloseIcon />,
                            }}
                        />
                    </Field>
                </div>
            </ModalBody>

            <ModalFooter>
                <ButtonGroup>
                    <Button buttonType="light" onClick={props.closeModal}>
                        Cancel
                    </Button>
                    <Button
                        key="addButton"
                        id="addRegionBtn"
                        icon="CheckedWhite"
                        onClick={handleAddRegion}
                    >
                        <span>Add Selected</span>
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </div>
    );
};

export default AudienceModal;