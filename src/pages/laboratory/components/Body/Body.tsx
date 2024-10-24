import { useState } from "react";
import { useAppSelector } from "src/redux/store";

import { Flex, Segmented, Typography } from "antd";

import { languages } from 'src/resources/languages';
import { MethodOptions } from '../../constants'
import { RandomContent } from '..'
import { NewPlaylistModal } from "../../modals";

import { colors } from "src/styles/colors";

const { Title } = Typography

type BodyProps = {
}

export const Body = ({
}: BodyProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [newPlaylistModal, setNewPlaylistModal] = useState<boolean>(false)
	const [newPlaylists, setNewPlaylists] = useState<any[]>([])
	const [segmentedValue, setSegmentedValue] = useState<string | number>('random');

	let content = <></>
	if (segmentedValue == 'random') content = <RandomContent 
		setNewPlaylistModal={ setNewPlaylistModal }
		setNewPlaylists={ setNewPlaylists }
		playlists={ newPlaylists }
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
			<Segmented 
				style={{
					width: 'fit-content',
				}}
				options={MethodOptions(language)}
				value={segmentedValue} 
				onChange={setSegmentedValue}
			/>
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
				setNewPlaylists={setNewPlaylists}
				playlists={newPlaylists}
			/>
		</Flex>
	)
};

export default Body; 