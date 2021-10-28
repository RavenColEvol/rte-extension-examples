import React, { useState } from "react";
import { v4 } from "uuid";
import {
    Button,
    ButtonGroup,
    ModalBody,
    ModalHeader,
    ModalFooter,
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
    const { rte, savedSelection, audiences, attrs = {}, slatePath } = props;
    console.error(
        "mayhem",
        props,
        savedSelection,
        attrs.expanded,
        attrs.checked
    );

    const [checked, setChecked] = useState<any>(attrs.checked || []);
    const [expanded, setExpanded] = useState<any>(attrs.expanded || []);

    const handleAddRegion = (event) => {
        event.preventDefault();

        if (savedSelection) {
            let modifiedCheckedList:any[] = []
            audiences.map((parent:any) => {
                if (checked.includes(parent.label)) {
                return modifiedCheckedList.push(parent.label)
                }
                parent.children.map((child) => {
                if (checked.includes(child.label)) {
                    return modifiedCheckedList.push(child.label)
                }
                child.children.map((grandChild) => {
                    if (checked.includes(grandChild.label)) {
                    return modifiedCheckedList.push(grandChild.label)
                    }
                    if (grandChild.children) {
                    grandChild.children.map((greatGrandChild) => {
                        if (checked.includes(greatGrandChild.label)) {
                        return modifiedCheckedList.push(greatGrandChild.label)
                        }
                    })
                    }
                })
                })
            })
            console.log('modified list', modifiedCheckedList);
            const audienceId = v4()
                .split("-")
                .join("");

            const audiencePost = {
                type: "market-post",
                uid: v4()
                    .split("-")
                    .join(""),
                attrs: {
                    audienceId,
                },
                children: [{ text: "" }],
            };
            const audiencePre = {
                type: "market-pre",
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
            rte.selection.set(rte.selection.getEnd([]));
        }

        props.closeModal();
    };
    return (
        <div>
            <ModalHeader title="Select Market" closeModal={props.closeModal} />
            <ModalBody>
                <div
                    style={{
                        height: "234px",
                    }}
                >
                    <Field labelText="Select Region">
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
                            nativeCheckboxes={true}
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
                        <span>Add Market</span>
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </div>
    );
};

export default AudienceModal;
