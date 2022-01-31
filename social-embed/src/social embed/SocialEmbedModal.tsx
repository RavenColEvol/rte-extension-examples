import React, { useState, Fragment } from "react";
import {
  Field,
  TextInput,
  Button,
  ButtonGroup,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@contentstack/venus-components";

const SocialEmbedModal = (props: any) => {
  const [url, setUrl] = useState("");
  const { rte } = props;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //* Insert social-embed node with the url
    rte.insertNode(
      {
        type: "social-embed",
        attrs: {
          url,
        },
        children: [{ text: "" }],
      },
      {
        at: props.savedSelection,
      }
    );
    props.closeModal();
  };

  return (
    <Fragment>
      <ModalHeader
        title={'Social Media Embed'}
        closeModal={props.closeModal}
      />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Field labelText="Embed URL">
            <TextInput
              autoFocus
              name="embeded_url"
              placeholder="Enter Embeded url"
              type="url"
              value={url}
              onChange={(e:any) => setUrl(e.target.value)}
            />
          </Field>
        </form>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button key="cancel" buttonType="light" onClick={props.closeModal}>
            Cancel
          </Button>
          <Button key="add" icon="CheckedWhite" onClick={handleSubmit}>
            Add
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </Fragment>
  );
};

export default SocialEmbedModal;
