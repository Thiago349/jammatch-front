import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch, unauthorize, spotifyUnauthorize, persistor  } from "src/redux/store"

import { Dropdown, Layout, Flex, Typography } from 'antd'
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { LogoLightHorizontal, CustomButton, CustomComponents } from 'src/components'
import { MenuButton } from '..'
import { CaretDownFilled, CaretUpFilled, SpotifyOutlined, LogoutOutlined } from '@ant-design/icons'

import { handleSpotifyLogin } from "src/utils"
import { useUserData } from "src/hooks"
import { colors } from 'src/styles/colors'
import { useQueryClient } from "@tanstack/react-query";

const { Header } = Layout
const { Title } = Typography

export const MenuHeader = () => {
	const queryClient = useQueryClient();

	const [photoKey, setPhotoKey] = useState<number>(Date.now())
	const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false)
	const { userSelf, isLoadingUserSelf, spotifySelf, isLoadingSpotifySelf } = useUserData()

	const language = useAppSelector(state => state.language.name)
	const spotifyAuthorization = useAppSelector(state => state.spotifyAuthentication.status)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	
	const handleLogout = async () => {
		dispatch(unauthorize())
		dispatch(spotifyUnauthorize())
		queryClient.invalidateQueries({ queryKey: ['getUserSelf'] })
		await persistor.flush()
		
		window.location.reload()
		navigate('/login', { replace: true })
	}

	const dropdownItems: MenuProps['items'] = [
		{
		  label:
		  	<MenuButton
				icon={
					<SpotifyOutlined 
						style={{ fontSize: '24px', color: spotifyAuthorization ? '#1DB954' : 'inherit'  }}
					/>
				}
				onClick={handleSpotifyLogin}
				text={ spotifyAuthorization ? spotifySelf?.display_name : "Conectar" }
			/>,
		  key: '0'
		},
		{
		  label:
		  	<MenuButton
				icon={
					<LogoutOutlined 
						style={{ fontSize: '24px', color: 'red' }}
					/>
				}
				onClick={handleLogout}
				text={ "Desconectar" }
			/>,
		  key: '1',
		}
	];

	const headerStyle: React.CSSProperties = {
		width: '100vw',
		height: '48px',
		padding: '6px',
		backgroundColor: colors.brand.dark,
		borderBottom: `solid ${colors.primaryNeutral[1000]} 2px`,
	}

	return (
		<Header style={headerStyle}>
			<Flex justify='space-between' style={{ height: '100%', margin:'0px 27.5px' }}>
				<CustomButton 
						style={{ 
							height: '100%', 
							padding: 0, 
							border: 0 
						}}
						onClick={() => navigate('/home')}
					>
					<LogoLightHorizontal height="100%"/>
				</CustomButton>
				<Dropdown 
					menu={{ items: dropdownItems }} 
					trigger={['click']}
					onOpenChange={setProfileMenuOpen}
					overlayStyle={{
						top: '52px'
					}}
				>
					<Flex align="center" style={{
						height: '100%',
						cursor: 'grab'
					}}>
						{
							userSelf?.profile?.hasPhoto ?
							<img 
								style={{
									width: '32px',
									height: '32px',
									margin: '0px 10px',
									borderRadius: '50%'
								}} 
								src={`https://jammatch-bucket.s3.amazonaws.com/${userSelf?.profile?.id}-photo?key=${photoKey}`} 
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
										backgroundColor: colors.brand.light,
										margin: '0px 10px',
										borderRadius: '50%',
										padding: '4px',
										fontSize: '24px',
										overflow: 'hidden'
									}}
								/>
							</Flex>
						}
						<Flex vertical justify="space-between" style={{
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}>
							<Title style={{
								color: colors.brand.light,
								margin: 0,
								fontSize: '16px',
								textOverflow: 'ellipsis'
							}}
							>
								{userSelf?.profile?.name}
							</Title>
							<Title style={{
								color: colors.primaryNeutral[500],
								margin: 0,
								fontSize: '12px',
								textOverflow: 'ellipsis'
							}}
							>
								{userSelf?.username}
							</Title>
						</Flex>
						<CaretDownFilled 
							style={{
								color: colors.brand.light,
								margin: '0px 10px',
								fontSize: '16px',
								transition: 'transform 0.3s ease',
								transform: profileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
							}}
						/>
					</Flex>
				</Dropdown>
			</Flex>
		</Header>
	)
}

export default MenuHeader 