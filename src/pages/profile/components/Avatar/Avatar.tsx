import { useState } from "react"

import { Skeleton } from "@mui/material"
import { Flex, Typography } from "antd"
import { UserOutlined, SpotifyOutlined } from '@ant-design/icons'
import { ImageUploader, CustomButton } from "src/components"

import { colors } from "src/styles/colors"

const { Title } = Typography

type AvatarProps = {
	profile: any,
	isLoadingProfile: boolean
}

export const Avatar = ({
	profile, 
	isLoadingProfile
}: AvatarProps ) => {
	const [photoKey, setPhotoKey] = useState<number>(Date.now())
	
	return (
		isLoadingProfile ?
		<Skeleton 
			variant="circular" 
			height={160}
			style={{
				borderRadius: '50%',
				width: '160px',
				position: 'relative',
				top: '-104px',
				border: `${colors.brand.light} 3px solid`
		}} /> :
		<>
		<div
			style={{
				borderRadius: '50%',
				width: '160px',
				height: '160px',
				position: 'relative',
				top: '-94.5px',
				border: `${colors.brand.light} 3px solid`,
				overflow: 'hidden',
				backgroundColor: colors.primaryNeutral[200]
			}}
		>
			<ImageUploader
				aspect={ 1 }
				profileId={profile?.id}
				imageType="photo"
				onChange={setPhotoKey}
			>
				{
					profile?.hasPhoto ?
					<img 
						style={{
							width: '160px',
							height: '160px'
						}} 
						src={`https://jammatch-bucket.s3.amazonaws.com/${profile?.id}-photo?key=${photoKey}`} 
					/> :
					<Flex
						justify="center"
						align="center"
						style={{
							overflow: 'hidden'
						}}
					>
						<UserOutlined 
							style={{
								color: colors.brand.dark,
								fontSize: '140px',
								padding: '10px',
								overflow: 'hidden'
							}}
						/>
					</Flex>
				}
			</ImageUploader>
		</div>
			
		</>
	)
}

export default Avatar