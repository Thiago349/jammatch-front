import { useState, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "src/redux/store";

import { Skeleton } from "@mui/material";
import { Card, Flex, Typography } from "antd";
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { ImageUploader, CustomButton } from "src/components";

import { colors } from "src/styles/colors";

const { Title } = Typography

type MainCardProps = {
	width: string,
	setEditProfileModal?: Dispatch<SetStateAction<boolean>>,
	userSelf: any,
	isLoadingUserSelf: boolean
}

export const MainCard = ({
	width, 
	setEditProfileModal, 
	userSelf, 
	isLoadingUserSelf
}: MainCardProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [photoKey, setPhotoKey] = useState<number>(Date.now())
	const [bannerKey, setBannerKey] = useState<number>(Date.now())
		
	return (
		<Card 
			styles={{
				body: {
					padding: '24px'
				}
			}}
			style={{ 
				height: 'fit-content', 
				width: width, 
				maxWidth: '1128px',
				backgroundColor: colors.brand.light,
				cursor: 'default',
			}}
			bordered={false}
			cover={ 
				isLoadingUserSelf ?
					<Skeleton
						variant="rectangular"
						style={{
							width: '100%',
    						paddingTop: '28.37%',
    						height: '0'  
						}}
					/> :
					userSelf?.profile?.hasBanner ?
					<img 
						src={`https://jammatch-bucket.s3.amazonaws.com/${userSelf?.profile?.id}-banner?key=${bannerKey}`} 
					/>
						:
					<div
						style={{
							width: '100%',
							paddingTop: 'calc( 28.37% )',
							height: '0',
							background: `linear-gradient(90deg, ${colors.brand.dark} 0%, ${colors.brand.jamPurple} 100%)`,
						}}
					/>
				}
		>
			<div
				style={{
					position: 'absolute',
					top: '16px',
					right: '40px',
					borderRadius: '25%'
				}}
			>
				<ImageUploader
					aspect={ 1128 / 320 }
					profileId={userSelf?.profile?.id}
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
							height: '26px'
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
			</div>
			<Card.Meta
				title={
					<Flex justify='space-between' align='center'>
						{
							isLoadingUserSelf ?
							<Skeleton variant="rounded" height={32} width="30%" style={{ margin: '16px 0px'}} /> :
							<Title level={3} style={{
								margin: '16px 0px',
							}}>
								{userSelf?.profile?.name}
							</Title>
						}
						<CustomButton
							style={{ 
								height: '32px',
								width: '32px',
								marginRight: '16px',
								padding: 0
							}}
							disabled={isLoadingUserSelf}
							onClick={setEditProfileModal}
							>
							<EditOutlined style={{
								color: colors.brand.dark,
								fontSize: '20px',
							}}/>
						</CustomButton>
					</Flex>
				}
				avatar={
					isLoadingUserSelf ?
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
					<div
						style={{
							borderRadius: '50%',
							width: '160px',
							height: '160px',
							position: 'relative',
							top: '-104px',
							border: `${colors.brand.light} 3px solid`,
							overflow: 'hidden',
							backgroundColor: colors.primaryNeutral[200]
						}}
					>
						<ImageUploader
							aspect={ 1 }
							profileId={userSelf?.profile?.id}
							imageType="photo"
							onChange={setPhotoKey}
						>
							{
								userSelf?.profile?.hasPhoto ?
								<img 
									style={{
										width: '160px',
										height: '160px'
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
											fontSize: '140px',
											padding: '10px',
											overflow: 'hidden'
										}}
									/>
								</Flex>
							}
						</ImageUploader>
					</div>
				}
				description={
					isLoadingUserSelf ?
					<>
						{
							[1, 2, 3].map(key => <Skeleton
								key={key} 
								variant="rounded" 
								height={18} 
								width="100%" 
								style={{
									margin: '16px 0px',
							}}/>)
						}
					</> :
					<Title 
						level={5}
						style={{
							margin: '16px 0px',
							fontWeight: 'normal'
						}}
					>
						<div 
							style={{ fontWeight: 'normal', margin: '0px '}}
							dangerouslySetInnerHTML={{ __html: userSelf?.profile?.description }}
						/>
					</Title>
				}
			/>
		</Card>
	)
};

export default MainCard; 