import React, { useState, Dispatch, SetStateAction } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store";

import { Modal, Flex, Select, List, Typography } from 'antd'
import type { FormProps } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'

import { CustomButton, Input, HTMLEditor } from 'src/components'

import { getRoles, postRoleAttachments, deleteRoleAttachments } from 'src/services/api/endpoints';
import { colors } from 'src/styles/colors';
import { languages } from "src/resources/languages";

const { Title } = Typography

type TagModalProps = {
    setModalStatus: Dispatch<SetStateAction<boolean>>
    modalStatus: boolean
    isLoadingProfile: boolean
    profileId: string
    profileRoles: any
    profileType: string
}

const TagModal: React.FC<TagModalProps> = ({
    setModalStatus,
    modalStatus,
    isLoadingProfile,
    profileId,
    profileRoles,
    profileType
}) => {
    const queryClient = useQueryClient()
    const language = useAppSelector(state => state.language.name)
    const [selectedTagId, setSelectedTagId] = useState<string>(null)

    const { data: roles, isLoading: isLoadingRoles } = useQuery({
        queryKey: ['getRoles'],
        queryFn: () => getRoles(profileType),
        enabled: !!profileType
    })

    const handleChange = (value: string) => {
        setSelectedTagId(value)
      }

    const onFinish: FormProps['onFinish'] = async () => {
        setModalStatus(false)
    }

    const onCancel = () => {
        setModalStatus(false)
    }

    const onSuccess = () => {
        setSelectedTagId(null)
        queryClient.invalidateQueries({ queryKey: ['getUserSelf'] })
	}
    
    const { mutate: newRoleAttachment, isPending: isNewRoleAttachmentPending } = useMutation({
		mutationFn: postRoleAttachments,
		onSuccess: onSuccess
	})

    const { mutate: eraseRoleAttachment, isPending: isDeleteRoleAttachmentPending } = useMutation({
		mutationFn: deleteRoleAttachments,
		onSuccess: onSuccess
	})

    const onAdd = (roleId: string) => {
        newRoleAttachment({ profileId: profileId, roleId: roleId })
    }

    const roleSelectedOptions = {}
    if (!!profileRoles) {
        for (const role of profileRoles) {
            roleSelectedOptions[role.id] = role
        }
    }

    return (
        <Modal
            open={modalStatus}
            footer={false}
            onCancel={onCancel}
        >
            <Flex 
                vertical 
                justify='center' 
                align='start'
                gap='16px'
                style={{
                    padding: '0px 24px'
                }}
            >
                <Title level={5} style={{ margin: 0 }}>
                    {languages[language]?.profile?.editRoleTitle}
                </Title>
                <Flex 
                    gap='8px' 
                    align='space-between'
                    style={{ width: '100%' }}
                >
                    <Select
                        showSearch
                        optionFilterProp="label"
                        disabled={isLoadingRoles || isLoadingProfile || isDeleteRoleAttachmentPending || isNewRoleAttachmentPending}
                        loading={isLoadingRoles || isLoadingProfile || isDeleteRoleAttachmentPending || isNewRoleAttachmentPending}
                        style={{ width: '100%' }}
                        value={selectedTagId}
                        onChange={handleChange}
                        options={
                            roles?.filter(role => !Object.keys(roleSelectedOptions)?.includes(role.id))?.map(role => {
                                return { 
                                    label: languages[language]?.roles?.[role.label],
                                    value: role.id
                                }
                            })
                        }
                    />
                    <CustomButton
                        loading={isLoadingRoles || isLoadingProfile || isDeleteRoleAttachmentPending || isNewRoleAttachmentPending}
                        onClick={() => newRoleAttachment({profileId: profileId, roleId: selectedTagId})}
                        icon={<PlusOutlined />}
                        defaultColor={colors.brand.light}
                        defaultBgColor={colors.brand.dark}
                        hoverColor={colors.brand.light}
                        hoverBgColor={colors.brand.jamPurple}
                        style={{
                            padding: '12px'
                        }}
                    />
                </Flex>
                <List
                    size="small"
                    bordered
                    dataSource={profileRoles}
                    renderItem={(role: any) => (
                        <List.Item>
                            <Flex justify='space-between' style={{
                                width: '100%'
                            }}>
                                <Title level={5} style={{ margin: 0 }}>
                                    {languages[language]?.roles?.[role.label]}
                                </Title>
                                <CustomButton
                                    loading={isLoadingRoles || isLoadingProfile || isDeleteRoleAttachmentPending || isNewRoleAttachmentPending}
                                    onClick={() => eraseRoleAttachment(role.roleAttachmentId)}
                                    icon={<CloseOutlined />}
                                    defaultColor={colors.brand.dark}
                                    hoverColor={colors.error[800]}
                                />
                            </Flex>
                        </List.Item>
                    )}
                    style={{
                        width: '100%'
                    }}
                />
            </Flex>
        </Modal>
    )
}

export default TagModal