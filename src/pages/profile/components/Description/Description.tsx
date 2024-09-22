import { Skeleton } from "@mui/material";
import { Typography } from "antd";

const { Title } = Typography

type DescriptionProps = {
	description: any,
	isLoadingProfile: boolean
}

export const Description = ({
	description, 
	isLoadingProfile
}: DescriptionProps ) => {
	return (
		isLoadingProfile ?
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
			dangerouslySetInnerHTML={{ __html: description }}
			/>
		</Title>
	)
};

export default Description; 