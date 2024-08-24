import { useAppSelector } from "src/redux/store";
import { useNavigate } from "react-router-dom";

import { Layout, Flex, Button } from 'antd';
import { LogoLightHorizontal, CustomButton } from 'src/components';

import { colors } from 'src/styles/colors';
import { languages } from 'src/resources/languages';

const { Header } = Layout;

export const MenuHeader = () => {
	const language = useAppSelector(state => state.language.name)
	const navigate = useNavigate()

	const headerStyle: React.CSSProperties = {
		width: '100vw',
		height: '48px',
		padding: '6px',
		backgroundColor: colors.brand.dark,
		borderBottom: `solid ${colors.primaryNeutral[1000]} 2px`,
	  };

	return (
		<Header style={headerStyle}>
			<Flex justify='space-between' style={{ height: '100%' }}>
				<CustomButton 
					style={{ 
						height: '100%', 
						padding: 0, 
						border: 0 
					}}
					onClick={() => navigate('/menu')}
					>
					<LogoLightHorizontal height="100%" margin='0px 0px 0px 10px'/>
				</CustomButton>
			</Flex>
		</Header>
	)
};

export default MenuHeader; 