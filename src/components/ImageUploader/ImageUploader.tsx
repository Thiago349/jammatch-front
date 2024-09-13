import React, { useState, Dispatch, SetStateAction } from 'react';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';

type ImageUploaderProps = {
  setSelectedFile: Dispatch<SetStateAction<RcFile>>
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    setSelectedFile
}) => {
    const [fileList, setFileList] = useState<Array<any>>([]);

    return (
      <ImgCrop rotationSlider>
        <Upload
          beforeUpload={(file) => {
            const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                setFileList([{ url: reader.result }]);
            };
            setSelectedFile(file)
            return false 
          }}
          maxCount={1}
          listType="picture-card"
          fileList={fileList}
          onPreview={() => false}
        >
          {'+'}
        </Upload>
      </ImgCrop>
    );
};

export default ImageUploader;
