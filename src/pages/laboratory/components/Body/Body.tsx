import { useState } from "react";
import { useAppSelector } from "src/redux/store";

import { Flex, Segmented, Typography } from "antd";

import { CustomComponents } from "src/components";
import { languages } from 'src/resources/languages';
import { SegmentedOptions } from '../../constants'
import { RandomContent } from '..'
import { NewPlaylistModal } from "../../modals";

import { colors } from "src/styles/colors";

const { Title } = Typography

type BodyProps = {
	profile: any,
	isLoadingProfile: boolean
}

export const Body = ({
	profile, 
	isLoadingProfile
}: BodyProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [newPlaylistModal, setNewPlaylistModal] = useState<boolean>(false)
	const [newPlaylist, setNewPlaylist] = useState<any>(null)
	const [segmentedValue, setSegmentedValue] = useState<string | number>('random');

	let content = <></>
	if (segmentedValue == 'random') content = <RandomContent 
		setNewPlaylistModal={ setNewPlaylistModal }
		setNewPlaylist={ setNewPlaylist }
	/>

	return (
		<Flex vertical
			style={{
				height: '100%',
				margin: '0px',
				gap: '16px'
			}}
		>
			<Title
				style={{ 
					margin: '0px' 
				}}
				level={4}
			>
				{ languages[language]?.laboratory?.chooseMethodTitle }
			</Title>
			<CustomComponents>
				<Segmented 
					style={{
						width: 'fit-content',
					}}
					options={SegmentedOptions(language)}
					value={segmentedValue} 
					onChange={setSegmentedValue}
				/>
			</CustomComponents>
			<Flex 
				style={{
					height: '100%',
					border: `solid ${colors.primaryNeutral[200]} 2px`,
					borderRadius: '8px'
			}}>
				{content}
			</Flex>
			<NewPlaylistModal 
				setModalStatus={setNewPlaylistModal}
				modalStatus={newPlaylistModal}
				profile={profile}
				playlist={newPlaylist}
			/>
		</Flex>
	)
};

export default Body; 