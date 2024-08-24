import { useNavigate } from "react-router-dom";

import { CustomButton } from "src/components"

import { colors } from 'src/styles/colors';
import { fonts } from 'src/styles/fonts';


type SideButtonProps = {
	label: string,
	icon,
	siderExpanded: boolean,
	route: string
}

export const SideButton = ({ label, icon, siderExpanded, route }: SideButtonProps ) => {
	const navigate = useNavigate()
	return (
		<CustomButton
			onClick={() => navigate(route)}
			style={{
				display: 'flex',
				justifyContent: 'start',
				width: '100%',
				padding: 0,
				fontStyle: fonts.family.primary
			}}
			defaultColor={colors.brand.light}
			defaultBgColor='transparent'
			hoverColor={colors.brand.light}
			hoverBgColor={colors.primaryNeutral[600]}
		>
			<>
				{ icon }
				{siderExpanded ? label : null}
			</>
		</CustomButton>
	)
};

export default SideButton; 