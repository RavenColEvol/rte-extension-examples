/** @jsx jsx */
//@ts-nocheck
import { jsx } from "@emotion/core";

// 1 include app sdk
import ContentstackSDK from "@contentstack/app-sdk";
import {
    AudiencePostTag,
    AudiencePreTag,
} from "./audiencePlugin/AudienceComponent";
import AudienceModal from "./audiencePlugin/AudienceModal";
import { cbModal } from "@contentstack/venus-components";

import { fieldExtractor } from "./audiencePlugin/lib";
import { AudienceIcon } from "./audiencePlugin/icons";

// step 2 initialize contentstack app sdk
export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = await sdk["Extension"];
    const RTE = await extensionObj["RTEPlugin"];

    const config = {
        content_type: "audience",
        field: "group",
        group_title: "title",
    };
    try {
        const query = await sdk.stack
            .ContentType(config.content_type)
            .Entry.Query()
            .find();

        const entries = query.entries || [];
        
        const audiences = entries.map((entry) => {
            const audience = {
                label: entry.title,
                value: entry.title,
                children: [],
            };

            if (config.field) {
                if (!entry.hasOwnProperty(config.field))
                    throw Error("invalid group title");

                audience.children = fieldExtractor(
                    entry[config.field],
                    config.group_title
                );
            } else {
                if (!entry.hasOwnProperty("group"))
                    throw Error("invalid group title");

                audience.children = fieldExtractor(
                    entry.group,
                    config.group_title
                );
            }

            return audience;
        });

        const AudiencePlugin = RTE("audience", () => ({
            title: "Audience",
            iconName: <AudienceIcon />,
            dnd: {
                disable: true,
                hideSelectionBackground: true,
            },
            elementType: ["inline"],
            displayOn: ["toolbar"],
        }));

        const AudiencePre = RTE("audience-pre", (rte) => ({
            Component: (props) => {
                const savedSelection = rte.selection.get();
                return (
                    <AudiencePreTag
                        {...props}
                        rte={rte}
                        audienceList={audiences}
                        savedSelection={savedSelection}
                    />
                );
            },
            elementType: ["inline", "void"],
            dnd: {
                disable: true,
                hideSelectionBackground: true,
            },
            displayOn: [],
        }));

        const AudiencePost = RTE("audience-post", () => ({
            Component: AudiencePostTag,
            elementType: ["inline", "void"],
            dnd: {
                disable: true,
                hideSelectionBackground: true,
            },
            displayOn: [],
        }));

        AudiencePlugin.on("exec", (rte) => {
            const savedSelection = rte.selection.get();
            cbModal({
                component: (props) => (
                    <AudienceModal
                        audiences={audiences}
                        savedSelection={savedSelection}
                        rte={rte}
                        {...props}
                    />
                ),

                modalProps: {
                    shouldReturnFocusAfterClose: false,
                    customClass: "variable-extension-modal",
                },
            });
        });

        AudiencePre.on("copy", (...props) => {
            console.error("copy", props);
        });

        AudiencePre.on("deleteBackward", (props) => {
            const { rte } = props;

            const selection = rte.selection.get();
            const previousElementLocation = rte.selection.before(selection);

            if (previousElementLocation) {
                const [match] = rte.getNodes({
                    at: previousElementLocation,
                    match: (n) => n.type === "audience-pre",
                    mode: "lowest",
                });

                if (match) {
                    const element: any = match[0];
                    const path = match[1];

                    const start = {
                        offset: 0,
                        path: [...path, 0],
                    };

                    if (
                        rte.selection.isPointEqual(
                            previousElementLocation,
                            start
                        )
                    ) {
                        const audienceId = element?.attrs?.audienceId;
                        if (audienceId) {
                            for (const [element] of rte.generators.elements()) {
                                const entry: any = { ...element };
                                if (entry.type === "audience-post") {
                                    if (
                                        audienceId === entry?.attrs?.audienceId
                                    ) {
                                        rte.removeNode(element);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        AudiencePost.on("deleteBackward", (props) => {
            const { rte } = props;

            const selection = rte.selection.get();
            const previousElementLocation = rte.selection.before(selection);

            if (previousElementLocation) {
                const [match] = rte.getNodes({
                    at: previousElementLocation,
                    match: (n) => n.type === "audience-post",
                    mode: "lowest",
                });

                if (match) {
                    const element: any = match[0];
                    const path = match[1];

                    const start = {
                        offset: 0,
                        path: [...path, 0],
                    };

                    if (
                        rte.selection.isPointEqual(
                            previousElementLocation,
                            start
                        )
                    ) {
                        const audienceId = element?.attrs?.audienceId;
                        if (audienceId) {
                            for (const [element] of rte.generators.elements()) {
                                const entry: any = { ...element };
                                if (entry.type === "audience-pre") {
                                    if (
                                        audienceId === entry?.attrs?.audienceId
                                    ) {
                                        rte.removeNode(element);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        
        return {
            AudiencePlugin,
            AudiencePre,
            AudiencePost
        }
    } catch (err) {
        console.error("errr", err);
        return []
    }

    // step 5 return the plugin
});

// blank boilerplate
