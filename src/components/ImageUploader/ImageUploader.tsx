import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query'

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';

import { putProfile } from 'src/services/api/endpoints';

type ImageUploaderProps = {
  aspect: number
  profileId: string
  imageType: string
  children?: JSX.Element | string,
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    aspect,
    profileId,
    imageType,
    children
}) => {
    const { mutate, isPending } = useMutation({
      mutationFn: putProfile
    })
    
    return (
      <ImgCrop aspect={aspect}>
        <Upload
          beforeUpload={(file) => {
            const formData = new FormData()
            formData.append('profileImage', file)
            formData.append('imageType', imageType)
            mutate({ formData, profileId })
            return false 
          }}
        >
          {children}
        </Upload>
      </ImgCrop>
    );
};

export default ImageUploader;
