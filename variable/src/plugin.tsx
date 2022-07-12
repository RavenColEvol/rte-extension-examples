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
  const extensionObj = await sdk["location"];
  const RTE = await extensionObj["RTEPlugin"];
  if (!RTE) return;
  const variableOptions: { [key: string]: any }[] = [];
  const files: { [key: string]: any } = {};
  let VariablePlugin;
  let invalidConfig = {
    isConfigInvalid: false,
    errorHeading: "",
    errorMessage: "",
  };
  try {
    VariablePlugin = RTE("variable-plugin", async (rte) => {
      const config = await rte.getConfig();
    // const config = {
    //     "content_type" : "group_data",
    //     "field": "group",
    //     "group_title": "name"
    // }
      if(config.content_type && config.field && config.group_title){
        try {
          const query = await sdk.stack
            .ContentType(config.content_type)
            .Entry.Query()
            .find();
          const entries = query.entries || [];
          entries.forEach((entry) => {
            let variables = {};
            if (config.field) {
              const field = entry[config.field];
              if (!field)
                throw new Error(
                  "Group is missing or provide a proper name for field"
                );

              variables = fieldExtractor(field, entry.uid, config.group_title);
            } else {
              const field = entry.group;
              if (!field)
                throw new Error(
                  "Group is missing or provide a proper name for field"
                );

              variables = fieldExtractor(field, entry.uid, config.group_title);
            }
            files[entry.uid] = { value: variables, title: entry.title };
          });

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
        } catch (err) {
          invalidConfig.isConfigInvalid = true;
          if (
            typeof err === "object" &&
            err.toString()?.includes("Field title not found")
          ) {
            invalidConfig.errorHeading = "Invalid Group Title";
            invalidConfig.errorMessage =
              "The group title provided in app configuration is either invalid or does not exist. Please verify the app config settings in Marketplace and try again.";
          } else if (
            typeof err === "object" &&
            err
              .toString()
              ?.includes("Group is missing or provide a proper name for field")
          ) {
            (invalidConfig.errorHeading = "Invalid Field UID"),
              (invalidConfig.errorMessage =
                "The field provided in app configuration is either invalid or does not exist. Please verify the app config settings in Marketplace and try again.");
          } else if (
            typeof err === "string" &&
            err.includes("The Content Type")
          ) {
            (invalidConfig.errorHeading = "Invalid Content Type UID"),
              (invalidConfig.errorMessage =
                "The content type provided in app configuration is either invalid or does not exist. Please verify the app config settings in Marketplace and try again.");
          }
          else if (
            typeof err === "object" &&
            err
              .toString()
              ?.includes("Group must be multiple")
          ) {
            (invalidConfig.errorHeading = "Group must be multiple"),
              (invalidConfig.errorMessage =
                `The field "${config.field}" provided in app configuration must be multiple`);
          }
        }
      }
      return {
        title: "Insert Variable",
        icon: <VariableIcon />,
        render: (props) => (
          <VariableComponent variableData={files} {...props} />
        ),
        dnd: {
          disable: true,
          hideSelectionBackground: true,
        },
        elementType: ["inline", "void"],
        displayOn: ["toolbar"],
      };
    });

    VariablePlugin.on("exec", (rte) => {
      const savedSelection = rte.selection.get();
      cbModal({
        component: (props) => (
          <VariablePluginModal
            variableData={variableOptions}
            savedSelection={savedSelection}
            rte={rte}
            {...props}
            invalidConfig={invalidConfig}
          />
        ),

        modalProps: {
          shouldReturnFocusAfterClose: false,
          customClass: "variable-extension-modal",
        },
      });
    });
    VariablePlugin.on("beforeRender", (rte) => {
      if (rte.element.type === "variable-plugin") {
        rte.DisableDND = true;
        rte.DisableSelectionHalo = true;
      }
    });
    return {
      VariablePlugin,
    };
  } catch (err) {
    console.error("errr", err);
  }
});
