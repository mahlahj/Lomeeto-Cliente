import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import "./ModalUpload.scss";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../../gql/post";
import { toast } from "react-toastify";

export default function ModalUpload({ show, setShow }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop, //le pasa la imagen automaticamente
  });

  const onCLose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const result = await publish({
        variables: {
          file: fileUpload.file,
        },
      });
      const { data } = result;
      if (!data.publish.status) {
        toast.warning("Error en la publicación");
        isLoading(false);
      } else {
        onCLose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal size="small" open={show} onClose={onCLose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Arrasta tu foto aquí</p>
            <input {...getInputProps()} />
          </>
        )}
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload  btn-action" onClick={onPublish}>
          Publicar
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
}
