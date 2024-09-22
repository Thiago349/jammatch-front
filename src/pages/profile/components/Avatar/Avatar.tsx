import { useState } from "react"
import { useAppSelector } from "src/redux/store"

import { Skeleton } from "@mui/material"
import { Flex } from "antd"
import { UserOutlined, SpotifyOutlined } from '@ant-design/icons'
import { ImageUploader, CustomButton } from "src/components"

import { colors } from "src/styles/colors"
import querystring from 'querystring'

type AvatarProps = {
	profile: any,
	isLoadingProfile: boolean
}

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

const generateRandomString = (length: number) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export const Avatar = ({
	profile, 
	isLoadingProfile
}: AvatarProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [photoKey, setPhotoKey] = useState<number>(Date.now())
	
	const handleSpotifyLogin = () => {
		const state = generateRandomString(16)
		const scope = 'user-read-private user-read-email'

		const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: clientId,
				scope: scope,
				redirect_uri: redirectUri,
				state: state
			})

		window.location.href = spotifyAuthUrl
	}

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
			<CustomButton 
				onClick={handleSpotifyLogin}
				defaultBgColor={colors.brand.light}
				defaultColor={colors.brand.dark}
				hoverBgColor={colors.brand.dark}
				hoverColor={colors.brand.light}
				style={{
					justifyContent: 'end',
					alignSelf: 'end',
					width: '32px',
					height: '32px',
					borderRadius: '100%',
					padding: '1px'
				}}
			>
				<SpotifyOutlined style={{
					fontSize: '28px'
				}}/>
			</CustomButton>
		</>
	)
}

export default Avatar