import { Skeleton } from "@mui/material";

import { colors } from "src/styles/colors";

type CoverProps = {
	profile: any,
	isLoadingProfile: boolean,
	bannerKey: number
}

export const Cover = ({
	profile, 
	isLoadingProfile,
	bannerKey
}: CoverProps ) => {

	return (
		isLoadingProfile ?
		<Skeleton
			variant="rectangular"
			style={{
			width: '100%',
				paddingTop: '28.37%',
				height: '0'  
			}}
		/> :
		profile?.hasBanner ?
		<img 
			src={`https://jammatch-bucket.s3.amazonaws.com/${profile?.id}-banner?key=${bannerKey}`} 
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
	)
};

export default Cover; 