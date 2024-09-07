import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch, unauthorize  } from "src/redux/store";

import { Layout, Flex } from 'antd';
import { LogoLightHorizontal, CustomButton } from 'src/components';
import { LogoutOutlined } from '@ant-design/icons'

import { colors } from 'src/styles/colors';
import { languages } from 'src/resources/languages';

const { Header } = Layout;

export const MenuHeader = () => {
	const language = useAppSelector(state => state.language.name)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(unauthorize())
		navigate('/login', { replace: true })
	};

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
					onClick={() => navigate('/home')}
					>
					<LogoLightHorizontal height="100%" margin='0px 0px 0px 10px'/>
				</CustomButton>
				<CustomButton 
					style={{
						display: 'flex',
						justifyContent: 'start',
						padding: 0
					}}
					onClick={handleLogout}
					>
					<LogoutOutlined style={{
							color: 'red',
							margin: '0px 10px',
							fontSize: '24px',
						}}/>
				</CustomButton>
			</Flex>
		</Header>
	)
};

export default MenuHeader; 