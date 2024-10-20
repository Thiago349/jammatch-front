import { useState, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "src/redux/store";

import { Skeleton } from "@mui/material";
import { Checkbox, Dropdown, Flex, Tag, Typography } from "antd";
import type { MenuProps } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import { CustomButton, TagSelector } from "src/components";

import { colors } from "src/styles/colors";
import { languages } from 'src/resources/languages';

const { Title } = Typography

type NameProps = {
	profile: any,
	isLoadingProfile: boolean,
	setEditProfileModal: Dispatch<SetStateAction<boolean>>
}

export const Name = ({
	profile, 
	isLoadingProfile,
	setEditProfileModal
}: NameProps ) => {
	const language = useAppSelector(state => state.language.name)
	const [tagSelectorModal, setTagSelectorModal] = useState<boolean>(false)

	return (
		<Flex justify='space-between' align='flex-end'>
			{
				isLoadingProfile ?
				<Skeleton variant="rounded" height={32} width="30%" style={{ margin: '16px 16px 0px 0px'}} /> :
				<Flex 
					style={{
						height: '100%',
						overflow: 'hidden'
					}}
					gap='8px'
					align='flex-end'
				>
					<Title level={3} style={{
						margin: '16px 0px 0px 0px',
					}}>
						{profile?.name}
					</Title>
					<Flex 
						style={{
							overflow: 'hidden'
						}}
						gap='8px'
					>
						{
							profile?.roles.map(role => 
								<Tag key={role?.label} color="gold" 
									style={{ 
										fontWeight: 'bold', 
										height: 'fit-content', 
										marginRight: '0px',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									}}
								>
									{languages[language]?.roles?.[role?.label]?.toUpperCase()}
								</Tag>
							)
						}
					</Flex>
					<Tag 
						key='add' 
						color='gold'
						style={{
							fontWeight: 'bold', 
							height: 'fit-content', 
							marginRight: '8px', 
							fontSize: '16px',
							cursor: 'pointer'
						}}
						onClick={() => setTagSelectorModal(true)}
					>
						+
					</Tag>
				</Flex>
			}
			<CustomButton
				style={{ 
					height: '32px',
					width: '32px',
					marginRight: '16px',
					padding: 0
				}}
				disabled={isLoadingProfile}
				onClick={() => setEditProfileModal(true)}
				defaultBgColor="transparent"
				defaultColor={colors.brand.dark}
				hoverBgColor={colors.brand.dark}
				hoverColor={colors.brand.light}
			>
				<EditOutlined style={{
					fontSize: '20px'
				}}/>
			</CustomButton>
			<TagSelector 
				setModalStatus={setTagSelectorModal}
				modalStatus={tagSelectorModal}
				isLoadingProfile={isLoadingProfile}
				profileId={profile?.id}
				profileRoles={profile?.roles}
				profileType={profile?.type}
			/>
		</Flex>
	)
};

export default Name; 