import { ConfigProvider } from 'antd';

import { colors } from 'src/styles/colors';

type CustomComponentsProps = {
	children?: JSX.Element | string
}

export const CustomComponents = ({ children }: CustomComponentsProps ) => {
	return (
		<ConfigProvider theme={{
			components: {
			  Dropdown: {
				colorBgElevated: colors.brand.dark,
				controlItemBgHover: colors.primaryNeutral[600],
				controlPaddingHorizontal: 0,
			  },
			  Segmented: {
				itemSelectedBg: colors.brand.light,
				itemSelectedColor: colors.brand.dark,
				itemColor: colors.brand.dark,
				trackBg: colors.primaryNeutral[200]
			  }
			}
		  }}>			
			{children}
		</ConfigProvider>
	)
};

export default CustomComponents; 