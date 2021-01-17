import React from "react";
import "antd/dist/antd.css";
import "./styles/home.css";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Dragger } = Upload;

const Home = (props) => {
  console.log(props);

  const history = useHistory();

  const uploadFile = async (event) => {
    const file = event;
    const formData = new FormData();

    formData.append("file", file);

    const uploadApi = "https://whois.nomada.cloud/upload";

    const response = await fetch(uploadApi, {
      method: "POST",
      headers: {
        Nomada: "ODI0ZTAxMWQtMDBmZi00YzFhLWE2MzEtZTU3ZWU4ZTViZTMx",
      },
      body: formData,
    });
    return response.json();
  };

  const onChange = async (info) => {
    const { status } = info.file;

    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      const res = await uploadFile(info.file.originFileObj);
      console.log(res);
      history.push("/resultado", res);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const draggerProps = {
    name: "file",
    multiple: true,
    action: "https://whois.nomada.cloud/upload",
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
