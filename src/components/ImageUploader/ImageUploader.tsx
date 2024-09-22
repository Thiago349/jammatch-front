import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient  } from '@tanstack/react-query'

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { putProfilePhoto } from 'src/services/api/endpoints';

type ImageUploaderProps = {
  aspect: number
  profileId: string
  imageType: string
  children?: JSX.Element | string,
  onChange?: Dispatch<SetStateAction<number>>
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    aspect,
    profileId,
    imageType,
    children,
    onChange
}) => {
    const queryClient = useQueryClient();
    
    const { mutate, isPending } = useMutation({
      mutationFn: putProfilePhoto,
      onSuccess: () => {
        onChange(Date.now())
        queryClient.invalidateQueries({ queryKey: ['getUserSelf'] })
      }
    })
    
    return (
      <ImgCrop aspect={aspect}>
        <Upload
          style={{
            maxHeight: 0
          }}
          showUploadList={false}
          beforeUpload={(file) => {
            const formData = new FormData()
            if (file.type.includes('image')) {
              formData.append('profileImage', file)
              formData.append('imageType', imageType)
              mutate({ formData, profileId })
            }
            return false 
          }}
        >
          {children}
        </Upload>
      </ImgCrop>
    );
};

export default ImageUploader;
