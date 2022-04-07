import React, { Fragment, ReactElement, useState } from "react";
import {
    Button,
    ButtonGroup,
    cbModal,
    Field,
    Icon,
    ModalBody,
    ModalFooter,
    ModalHeader,
    TextInput,
    Tooltip,
} from "@contentstack/venus-components";
import ContentstackSDK from "@contentstack/app-sdk";
import "./style.css";
import { IRteParam } from "@contentstack/app-sdk/dist/src/RTE/types";
import { Element } from "./interface";

export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = await sdk["location"];
    const RTE = await extensionObj["RTEPlugin"];
    if (!RTE) return;

    const CommentPlugin = RTE("comment", (rte) => ({
        title: "Comment",
        icon: <CommentIcon />,
        render: Comment,
        displayOn: ["hoveringToolbar"],
        elementType: ["inline"],
        //@ts-ignore
        dnd: {
            disable: true,
            hideSelectionBackground: true,
        },
    }));

    //@ts-ignore
    CommentPlugin.on("exec", (rte) => {
        const isComment = rte.isNodeOfType("comment");
        if (isComment) {
            // rte.unWrapNode({
            //     match: (node:Element) => node.type === 'comment'
            // });
        } else {
            const commentBody = {
                type: "comment",
                attrs: {
                    comments: [],
                },
            };
            rte.wrapNode(commentBody, { split: true });
        }
    });

    return {
        CommentPlugin,
    };
});

interface CommentProps {
    attrs: any;
    attributes: any;
    children: ReactElement;
    rte: IRteParam;
    element: Element;
}

function Comment(props: CommentProps) {
    const { attrs, children, rte, element } = props;
    console.log('props', props);
    const path = rte.getPath(element);
    const handleEdit = () => {
        cbModal({
            component: (props: any) => <CommentModal {...props} path={path} rte={rte} comments={attrs['comments']} />,
            modalProps: {
                size: 'dynamic',
                shouldReturnFocusAfterClose: false,
                customClass: 'comment_modal',
            }
        });
    };
    const handleUncomment = () => {
        //@ts-ignore
        rte.unWrapNode({
            match: (node: Element) => node.type === "comment",
        });
    };
    return (
        <span {...props.attributes} className="comment">
            <Tooltip
                //@ts-ignore
                appendTo={rte.ref}
                position="bottom"
                trigger="click"
                content={
                    <Fragment>
                        <Icon
                            onClick={handleEdit}
                            className="btn mr-8"
                            icon="Edit"
                            size="original"
                        />
                        <Icon
                            onClick={handleUncomment}
                            className="btn"
                            icon="Delete"
                            size="original"
                        />
                    </Fragment>
                }
            >
                {children}
            </Tooltip>
        </span>
    );
}

function CommentIcon() {
    return <Icon className="p-6" icon="Edit" size="original" />;
}

function CommentModal(props: any) {
    const [comments, setComments] = useState(props['comments']);
    const [comment, setComment] = useState('');
    const handleChange = (e:any) => { setComment(e.target.value) };
    const handleClick = () => {
        setComments([...comments, comment]);
        setComment('');
    };
    const handleClose = () => {
        const { rte, path } = props;
        const newAttrs = {
            attrs: {
                comments
            }
        }
        rte.setAttrs(newAttrs, {
            at: path
        });
        setComments([]);
        setComment('');
        props.closeModal();
    }
    return (
        <>
            <ModalHeader title="Comments" closeModal={handleClose} />
            <ModalBody>
                <ul className="comment_list">
                    {
                        comments.map((comment:string) => <li className="comment_list__item">{comment}</li>)
                    }
                </ul>
                <TextInput
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    required
                    placeholder="Enter Comment"
                    id="comment"
                />
            </ModalBody>

            <ModalFooter>
                <Button onClick={handleClick} key="cancel">
                    Add Comment
                </Button>
            </ModalFooter>
        </>
    );
}
