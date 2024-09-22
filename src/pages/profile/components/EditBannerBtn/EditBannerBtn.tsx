import { Dispatch, SetStateAction } from "react";

import { EditOutlined } from '@ant-design/icons'

import { ImageUploader, CustomButton } from "src/components";

import { colors } from "src/styles/colors";

type ChildrenProps = {
	profile: any,
	setBannerKey: Dispatch<SetStateAction<number>>
}

export const Children = ({
	profile,
	setBannerKey
}: ChildrenProps ) => {
	return (
		<ImageUploader
			aspect={ 1128 / 320 }
			profileId={profile?.id}
			imageType="banner"
			onChange={setBannerKey}
		>
			<CustomButton
				defaultBgColor={colors.brand.light}
				defaultColor={colors.brand.dark}
				hoverBgColor={colors.brand.jamPurple}
				hoverColor={colors.brand.light}
				style={{
					padding: '0px',
					border: '0px',
					width: '26px',
					height: '26px',
            		borderRadius: '25%'
				}}
			>
				<EditOutlined 
					style={{
						fontSize: '16px',
						overflow: 'hidden'
					}}
				/>
			</CustomButton>
		</ImageUploader>
	)
};

export default Children; 