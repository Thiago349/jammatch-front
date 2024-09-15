import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "src/redux/store";
import { getUserSelf } from "src/services/api/endpoints";

import { Card, Flex, Typography } from "antd";
import { ImageUploader } from "src/components";

import { CustomButton } from "src/components";
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Skeleton } from "@mui/material";

import { languages } from "src/resources/languages";
import { colors } from "src/styles/colors";
const { Title } = Typography

type MainCardProps = {
	width: string
}

export const MainCard = ({width}: MainCardProps ) => {
	const language = useAppSelector(state => state.language.name)

	const { data: userSelf, isLoading: isLoadingUserSelf } = useQuery({
		queryKey: ['getUserSelf'],
		queryFn: getUserSelf,
	  })
	
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
					(
						userSelf?.profile?.hasBanner ?
						<img 
							style={{
								borderRadius: '50%',
								width: '160px',
								height: '160px',
								position: 'relative',
								top: '-104px',
								border: `${colors.brand.light} 3px solid`
							}} 
							src={`https://jammatch-bucket.s3.amazonaws.com/${userSelf?.profile?.id}-banner`} 
						/> :
						<div
							style={{
								width: '100%',
								paddingTop: '28.37%',
								height: '0',
								background: `linear-gradient(90deg, ${colors.brand.dark} 0%, ${colors.brand.jamPurple} 100%)`,
							}}
						/>
					) 
				}
		>
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
							>
							<EditOutlined style={{
								color: colors.brand.dark,
								margin: '0px 10px',
								fontSize: '24px',
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
							aspect={1/1}
							profileId={userSelf?.profile?.id}
						>
							{
								userSelf?.profile?.hasPhoto ?
								<img 
									style={{
										width: '160px',
										height: '160px'
									}} 
									src={`https://jammatch-bucket.s3.amazonaws.com/${userSelf?.profile?.id}-photo`} 
								/> :
								<Flex
									justify="center"
									align="center"
									style={{
										overflow: 'hidden',
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