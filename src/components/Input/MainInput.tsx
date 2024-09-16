import { Dispatch, SetStateAction } from 'react';

import { Input, Flex, Typography } from 'antd';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';

import { colors } from 'src/styles/colors';

const { Title } = Typography

type MainInputProps = {
	width?: string,
	title?: string,
	color: string,
	backgroundColor: string,
	variant?: "outlined" | "borderless" | "filled",
	onChange: Dispatch<SetStateAction<string | null>>,
	defaultValue?: string
}

export const MainInput = ({ width, title, color, backgroundColor, variant='outlined', onChange, defaultValue }: MainInputProps ) => {
	return (
		<Flex vertical style={{ width: width ?? '100%', gap: 8 }}>
			{
				title ? 
					<Title style={{ 
							color: color, 
							margin: 0, 
							fontSize: 12 
						}}>
							{title}
					</Title> : 
					null
			}

			<Input 
				onChange={(value) => onChange(value.target.value)} 
				variant={variant}
				defaultValue={defaultValue ?? ''}
				style={{ 
					backgroundColor: backgroundColor, 
					color, 
					fontSize: 16, 
					padding: 8,
					height: 32, 
					width: width ?? '100%' 
				}}/>				
		</Flex>
	)
};

export default MainInput; 