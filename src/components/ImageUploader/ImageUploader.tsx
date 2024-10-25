import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store";

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { languages } from 'src/resources/languages';

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
    const language = useAppSelector(state => state.language.name)

    const { mutate, isPending } = useMutation({
      mutationFn: putProfilePhoto,
      onSuccess: () => {
        onChange(Date.now())
        queryClient.invalidateQueries({ queryKey: ['getUserSelf'] })
      }
    })
    
    return (
      <ImgCrop aspect={aspect} 
        modalTitle=' '
        modalOk={languages[language].confirmBtn}
        modalCancel={languages[language].cancelBtn}
      >
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
