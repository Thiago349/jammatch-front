import { useState } from 'react';
import { useAppSelector, useAppDispatch, expand, retract } from "src/redux/store";

import { Button, Flex, Layout } from 'antd';
import { ExperimentOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'

import SideButton from './SideButton';

import { colors } from 'src/styles/colors';
import { languages } from 'src/resources/languages';

const { Sider } = Layout;

export const MenuSider = () => {
	const language = useAppSelector(state => state.language.name)
	const dispatch = useAppDispatch()
	const siderExpanded = useAppSelector(state => state.sider.expanded)
	
	const siderStyle: React.CSSProperties = {
		backgroundColor: colors.brand.dark,
		height: 'calc( 100vh - 48px )',
	};

	return (
		<Sider width={siderExpanded ? '208px' : '64px'} style={siderStyle}>
			<Flex vertical justify='space-between' align='center' style={{ height: '100%', padding: '8px' }}>
				<Flex vertical justify='center' align='start' style={{ width: '100%', gap: '8px' }}>
					<SideButton 
						label={languages[language].siderProfileBtn}
						icon={<UserOutlined style={{
							color: colors.brand.light,
							margin: '0px 12px',
							fontSize: '20px',
						}}/>}
						siderExpanded={siderExpanded}
						route='/profile'
					/>
					<SideButton 
						label={languages[language].siderLaboratoryBtn}
						icon={<ExperimentOutlined style={{
							color: colors.brand.light,
							margin: '0px 12px',
							fontSize: '20px',
						}}/>}
						siderExpanded={siderExpanded}
						route='/laboratory'
					/>
				</Flex>
				<Button
					type="text"
					icon={siderExpanded ? <MenuFoldOutlined style={{ color: colors.brand.light }}/> : <MenuUnfoldOutlined style={{ color: colors.brand.light }}/>}
					onClick={() => dispatch( siderExpanded ? retract() : expand())}
					style={{
						width: '16px',
						border: '0px',
						padding: '0px',
						justifySelf: 'flex-end',
						alignSelf: 'center'
					}}
				/>
			</Flex>
		</Sider>
	)
};

export default MenuSider; 