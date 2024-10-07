import { Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { CustomButton } from 'src/components'

import { colors } from 'src/styles/colors'

const { Title } = Typography

type MenuButtonProps = {
	icon?: any,
	onClick?: any,
    text?: string,
	disabled?: boolean,
	loading?: boolean
}

export const MenuButton = ({icon, onClick, text, disabled, loading}: MenuButtonProps) => {

	return (
        <CustomButton 
            onClick={onClick}
            defaultColor={colors.brand.light}
            disabled={disabled}
            loading={loading}
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start' }}
        >
		    <Flex justify="space-between" align='center' gap='8px'>
                <>
                    {icon}
                    <Title style={{ fontSize: '14px', margin: '0px', color: 'inherit'}}>
                        {text}
                    </Title>
                </>
		    </Flex>
        </CustomButton>
	)
}

export default MenuButton 