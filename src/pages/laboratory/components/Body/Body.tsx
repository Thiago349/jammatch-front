import { useState } from "react";
import { useAppSelector } from "src/redux/store";

import { Badge, Flex, Segmented, Typography } from "antd";
import { InboxOutlined } from '@ant-design/icons'

import { colors } from "src/styles/colors";
import { languages } from 'src/resources/languages';

import { CustomButton } from "src/components";

import { RandomContent, PlaylistDrawer } from '..'
import { NewPlaylistModal } from "../../modals";
import { MethodOptions } from '../../constants'


const { Title } = Typography

type BodyProps = {
}

export const Body = ({
}: BodyProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [newPlaylistModal, setNewPlaylistModal] = useState<boolean>(false)
	const [newPlaylistDrawer, setNewPlaylistDrawer] = useState<boolean>(false);
	const [newPlaylists, setNewPlaylists] = useState<any[]>([])
	const [segmentedValue, setSegmentedValue] = useState<string | number>('random');
    const [pageNumber, setPageNumber] = useState<number>(0)


	let content = <></>
	if (segmentedValue == 'random') content = <RandomContent 
		setNewPlaylistModal={setNewPlaylistModal}
		setNewPlaylists={setNewPlaylists}
		playlists={newPlaylists}
		setPageNumber={setPageNumber}
	/>

	return (
		<Flex vertical
			style={{
				height: '100%',
				margin: '0px',
				gap: '16px'
			}}
		>
			<Flex
				justify="space-between"
				style={{
					width: '100%'
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
				<Badge 
					count={newPlaylists.length}
					color={colors.brand.dark}
					size="small"
				>
					<CustomButton
						style={{
							padding: '0px',
							width: '32px',
							height: '32px'
						}}
						defaultColor={colors.brand.dark}
						defaultBgColor={colors.brand.light}
						hoverColor={colors.brand.light}
						hoverBgColor={colors.brand.jamPurple}
						onClick={setNewPlaylistDrawer}
						disabled={newPlaylists.length == 0}
					>
						<InboxOutlined 
							style={{
								color: 'inherit',
								fontSize: '24px',
							}}
							width='16px'
							height='16px'
						/>
					</CustomButton>
				</Badge>
			</Flex>
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
				}}
			>
				{content}
			</Flex>
			<NewPlaylistModal
				setModal={setNewPlaylistModal}
				modalStatus={newPlaylistModal}
				setNewPlaylists={setNewPlaylists}
				playlists={newPlaylists}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			/>
			<PlaylistDrawer
				setDrawer={setNewPlaylistDrawer}
				drawerStatus={newPlaylistDrawer}
				setNewPlaylists={setNewPlaylists}
				playlists={newPlaylists}
				setNewPlaylistModal={setNewPlaylistModal}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			>

			</PlaylistDrawer>
		</Flex>
	)
};

export default Body; 