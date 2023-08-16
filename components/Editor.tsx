"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "background",
      "color",
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: ["", "center", "right", "justify"] }],
    ["link", "image"],
    ["clean", "code"],
  ],
};

const formats = [
  "background",
  "header",
  "bold",
  "color",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "code",
];

const Editor = (props: any) => {
  const [text, setText] = useState("");
  const handleChange = (value: string) => {
    setText(value);
    props.setFormData({
      ...props.formData,
      ["description"]: value,
    });
  };

  return (
    <div className="quill-content">
      <ReactQuill
        value={text}
        modules={modules}
        formats={formats}
        placeholder="Write something"
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
