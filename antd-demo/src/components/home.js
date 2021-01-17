import React from "react";
import "antd/dist/antd.css";
import "./styles/home.css";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NOMADA_KEY, UPLOUD_IMAGE_API } from "../keys";

const { Dragger } = Upload;

const Home = () => {
  const history = useHistory();

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(UPLOUD_IMAGE_API, {
      method: "POST",
      headers: {
        Nomada: NOMADA_KEY,
      },
      body: formData,
    });

    const data = await response.json();

    if (data.actorName) {
      onSuccess(data);
    } else {
      console.log(data);
      onError(data.error);
    }
  };

  const onChange = async (info) => {
    const { status, response, error } = info.file;
    console.log(info);

    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} subido exitosamente`);
      history.push("/resultado", response);
    } else if (status === "error") {
      message.error(error);
    }
  };

  const draggerProps = {
    name: "file",
    customRequest,
    maxCount: 1,
    beforeUpload: (file) => {
      if ((file.type !== "image/png", file.type !== "image/jpeg")) {
        message.error(`${file.name} is not a png/jpg file`);
      }
      return file.type === "image/png" || file.type === "image/jpeg";
    },
  };

  return (
    <React.Fragment>
      <div className="container-updata">
        <h1>¿Quién es este actor?</h1>
        <Dragger
          {...draggerProps}
          onChange={onChange}
          accept="image/png, image/jpeg"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Haz click o arrastra una imagen</p>
          <p className="ant-upload-hint">
            Selecciona la foto de un actor famoso para conocer quién es y en qué
            películas ha salido.
          </p>
        </Dragger>
      </div>
    </React.Fragment>
  );
};

export default Home;
