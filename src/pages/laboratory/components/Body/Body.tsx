import { useState } from "react";
import { useAppSelector } from "src/redux/store";

import { Flex, Segmented, Typography } from "antd";

import { CustomButton } from "src/components";
import { languages } from 'src/resources/languages';
import { SegmentedOptions } from '../../constants'
import { RandomContent } from '..'

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
	const [segmentedValue, setSegmentedValue] = useState<string | number>('random');

	let content = <></>
	if (segmentedValue == 'random') content = <RandomContent />

	return (
		<Flex vertical
			style={{
				height: '100%',
				margin: '8px 0px',
				gap: '8px'
			}}	
		>
			<Title
				style={{ margin: '0px' }}
				level={4}
			>
				{ languages[language]?.laboratory?.chooseMethodTitle }
			</Title>
			<Segmented 
				options={SegmentedOptions(language)}
				value={segmentedValue} 
				onChange={setSegmentedValue}
			/>
			<Flex style={{
				height: '100%',
				border: `solid ${colors.primaryNeutral[200]} 2px`,
				borderRadius: '8px'
			}}>
				{content}
			</Flex>
		</Flex>
	)
};

export default Body; 