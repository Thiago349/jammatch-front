import { useState, Dispatch, SetStateAction } from 'react';

import { Flex, Typography } from 'antd'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography

type HTMLEditorPros = {
  width?: string,
  text: string,
  setText?: Dispatch<SetStateAction<string>>,
  title?: string,
  color: string,
  backgroundColor: string,
}

const HTMLEditor = ({
    width,
    text,
    setText,
    title,
    color,
    backgroundColor,
}: HTMLEditorPros) => {
  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <Flex vertical style={{ width: width ?? '100%', gap: 8 }}>
      {
				title ? 
					<Title style={{ 
							color: color, 
							margin: 0, 
							fontSize: 12 
						}}>
							{title}
					</Title> : 
					null
			}

      <ReactQuill 
          value={text} 
          onChange={handleChange} 
          style={{
            backgroundColor: backgroundColor
          }}
      />
    </Flex>
  );
};

export default HTMLEditor;