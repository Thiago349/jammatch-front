import { ConfigProvider } from 'antd';

import { colors } from 'src/styles/colors';

type CustomDropdownProps = {
	children?: JSX.Element | string
}

export const CustomDropdown = ({ children }: CustomDropdownProps ) => {
	return (
		<ConfigProvider theme={{
			components: {
			  Dropdown: {
				colorBgElevated: colors.brand.dark,
				controlItemBgHover: colors.primaryNeutral[600],
				controlPaddingHorizontal: 0,
			  }
			}
		  }}>			
			{children}
		</ConfigProvider>
	)
};

export default CustomDropdown; 