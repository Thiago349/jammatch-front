import { Button, ConfigProvider } from 'antd';

import { colors } from 'src/styles/colors';

type CustomButtonProps = {
	style?: React.CSSProperties,
	children?: JSX.Element | string,
	icon?: any,
	defaultColor?: string,
	defaultBgColor?: string,
	hoverColor?: string,
	hoverBgColor?: string,
	onClick?: any,
	disabled?: boolean,
	loading?: boolean,
	onForm?: boolean
}

export const CustomButton = ({ style, children, icon, defaultColor, defaultBgColor, hoverColor, hoverBgColor, onClick=null, disabled=false, loading=false, onForm=false }: CustomButtonProps ) => {
	return (
		<ConfigProvider theme={{
			components: {
			  Button: {
				defaultBg: defaultBgColor ?? 'transparent',
				defaultBorderColor:  defaultBgColor ?? 'transparent',
				defaultColor: defaultColor ?? colors.brand.light,
				defaultHoverBg: hoverBgColor ?? defaultBgColor ?? 'transparent',
				defaultHoverBorderColor: hoverBgColor ?? defaultBgColor ?? 'transparent',
				defaultHoverColor: hoverColor ?? colors.brand.light,
				defaultActiveBg: defaultBgColor ?? 'transparent',
				defaultActiveBorderColor:  defaultBgColor ?? 'transparent',
				defaultActiveColor:  defaultColor ?? colors.brand.light,
				borderColorDisabled:  'transparent'
			  }
			}
		  }}>
			<Button disabled={disabled} loading={loading} htmlType={onForm ? 'submit' : 'button'} icon={icon} style={style} onClick={onClick}>
				{children}
			</Button>
		</ConfigProvider>
	)
};

export default CustomButton; 