"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const Editor = () => {
  const [text, setText] = useState("");

  const handleChange = (value: string) => {
    console.log("value", value);
    setText(value);
  };

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
