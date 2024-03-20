import React from "react";
import "../styles/JSONView.css";

const syntaxHighlight = (json) => {
  if (typeof json !== "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|[^\\"])*"(\s*:)?|\b(true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?))/g,
    (match) => {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
};

const JsonView = ({ data }) => {
  return (
    <pre
      dangerouslySetInnerHTML={{
        __html: syntaxHighlight(data),
      }}
    />
  );
};
export default JsonView;
