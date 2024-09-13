import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "src/redux/store";
import { getUserSelf } from "src/services/api/endpoints";

import { Card, Flex, Button, Typography } from "antd";
import { CustomButton } from "src/components";
import { EditOutlined } from '@ant-design/icons'
import { Skeleton } from "@mui/material";
import { EditProfileModal } from "../../modal";

import { languages } from "src/resources/languages";
import { colors } from "src/styles/colors";
const { Title } = Typography

type MainCardProps = {
	width: string
}

export const MainCard = ({width}: MainCardProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false)

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
			cover={ <img src="src/styles/banner.png" /> }
		>
			<Card.Meta
				title={
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
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
							onClick={setEditModalStatus}
							disabled={isLoadingUserSelf}
							>
							<EditOutlined style={{
								color: colors.brand.dark,
								margin: '0px 10px',
								fontSize: '24px',
							}}/>
						</CustomButton>
					</div>
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
					<img 
						style={{
							borderRadius: '50%',
							width: '160px',
							position: 'relative',
							top: '-104px',
							border: `${colors.brand.light} 3px solid`
						}} 
						src="src/styles/profile-pic.png" 
					/>
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
		<EditProfileModal 
			setModalStatus={setEditModalStatus}
			modalStatus={editModalStatus}
			profileId={userSelf?.profile?.id}
		/>
		</Card>
	)
};

export default MainCard; 