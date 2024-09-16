import { Dispatch, SetStateAction } from 'react';

import { Input, Flex, Typography } from 'antd';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';

import { colors } from 'src/styles/colors';

const { Title } = Typography

type LoginInputProps = {
	width?: string,
	title?: string,
	color: string,
	password?: boolean,
	onChange: Dispatch<SetStateAction<string | null>>
}

export const LoginInput = ({ width, title, color, password, onChange }: LoginInputProps ) => {
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

			{ 
				!password ? 
					<Input 
						onChange={(value) => onChange(value.target.value)} 
						variant="borderless" 
						style={{ 
							backgroundColor: colors.primaryNeutral[800], 
							color: colors.brand.light, 
							fontSize: 16, 
							padding: 8,
							height: 42, 
							width: width ?? '100%' 
						}}/> :
					<Input.Password 
						onChange={(value) => onChange(value.target.value)} 
						variant="borderless" 
						style={{ 
							backgroundColor: colors.primaryNeutral[800], 
							color: colors.brand.light, 
							fontSize: 16, 
							padding: 8,
							height: 42, 
							width: width ?? '100%' 
						}} 
						iconRender={
							(visible) => (visible ? 
								<EyeFilled style={{ color: colors.brand.light }}/> : 
								<EyeInvisibleFilled style={{ color: colors.brand.light }}/>
						)} 
					/>
			}
		</Flex>
	)
};

export default LoginInput; 