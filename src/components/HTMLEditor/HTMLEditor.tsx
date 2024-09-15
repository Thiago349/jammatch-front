import { useState, Dispatch, SetStateAction } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type HTMLEditorPros = {
	text: string,
	setText?: Dispatch<SetStateAction<string>>,
}

const HTMLEditor = ({
    text,
    setText
}: HTMLEditorPros) => {
  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <ReactQuill 
        value={text} 
        onChange={handleChange} 
    />
  );
};

export default HTMLEditor;