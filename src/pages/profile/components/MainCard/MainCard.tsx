import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "src/redux/store";
import { getUserSelf } from "src/services/api/endpoints";

import { Card, Flex, Button, Typography } from "antd";
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
			cover={ <img src="src/styles/banner.png" /> }
		>
			<Card.Meta
				title={
					isLoadingUserSelf ?
					<Skeleton variant="rounded" height={32} width="30%" style={{ margin: '16px 0px'}} /> :
					<Title level={3} style={{
						margin: '16px 0px',
					}}>
						{userSelf?.name}
					</Title>
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
							dangerouslySetInnerHTML={{ __html: userSelf?.description }}
						/>
					</Title>
				}
			/>
		</Card>
	)
};

export default MainCard; 