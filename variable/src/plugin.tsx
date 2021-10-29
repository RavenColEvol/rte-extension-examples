/** @jsx jsx */
//@ts-nocheck
import { jsx } from "@emotion/core";

// 1 include app sdk
import ContentstackSDK from "@contentstack/app-sdk";
import VariableComponent from "./variable_plugin/VariableComponent";
import VariableIcon from "./variable_plugin/VariableIcon";
import VariablePluginModal from "./variable_plugin/VariablePluginModal";
import { cbModal } from "@contentstack/venus-components";

import { fieldExtractor } from "./variable_plugin/lib";

// step 2 initialize contentstack app sdk
export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = await sdk["Extension"];
    const RTE = await extensionObj["RTEPlugin"];
    if (!RTE) return;

    // step 3 create a plugin
    // step 4 register the plugin using RTE Plugin

    const config = {
        content_type: "group_data",
        field: "group",
    };
    try {
        const query = await sdk.stack
            .ContentType(config.content_type)
            .Entry.Query()
            .find();

        const entries = query.entries || [];

        const files: { [key: string]: any } = {};
        entries.forEach((entry) => {
            let variables = {};
            if (config.field) {
                const field = entry[config.field];
                if (!field)
                    throw new Error(
                        "Group is missing or provide a proper name for field"
                    );

                variables = fieldExtractor(field, entry.uid);
            } else {
                const field = entry.group;
                if (!field)
                    throw new Error(
                        "Group is missing or provide a proper name for field"
                    );

                variables = fieldExtractor(field, entry.uid);
            }

            files[entry.uid] = { value: variables, title: entry.title };
        });

        const variableOptions: { [key: string]: any }[] = [];

        Object.values(files).forEach(
            (file: { [key: string]: any; value: any }) => {
                Object.entries(file.value).forEach(
                    ([key, value]: [string, any]) => {
                        variableOptions.push({
                            label: key,
                            value: {
                                uid: value.uid,
                                title: key,
                            },
                        });
                    }
                );
            }
        );

        const SocialEmbedPlugin = RTE("variable-plugin", () => ({
            title: "Insert Variable",
            iconName: <VariableIcon />,
            Component: (props) => (
                <VariableComponent variableData={files} {...props} />
            ),
            dnd: {
                disable: true,
                hideSelectionBackground: true,
            },
            elementType: ["inline", "void"],
            displayOn: ["toolbar"],
        }));

        SocialEmbedPlugin.on("exec", (rte) => {
            const savedSelection = rte.selection.get();
            cbModal({
                component: (props) => (
                    <VariablePluginModal
                        variableData={variableOptions}
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

        return {
            SocialEmbedPlugin,
        };
    } catch (err) {
        console.error("errr", err);
    }
});
