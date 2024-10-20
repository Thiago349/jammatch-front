import React, { useState, Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store";

import { Modal, Flex, Form, Typography } from 'antd'
import type { FormProps } from 'antd'
import { CustomButton, Input, HTMLEditor } from 'src/components'

import { putProfile } from 'src/services/api/endpoints';
import { colors } from 'src/styles/colors';
import { languages } from "src/resources/languages";

const { Title } = Typography

type EditProfileModalProps = {
    setModalStatus: Dispatch<SetStateAction<boolean>>
    modalStatus: boolean
    profile: {
        id: string,
        name: string,
        description: string
    }
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    setModalStatus,
    modalStatus,
    profile
}) => {
    const queryClient = useQueryClient();

    const language = useAppSelector(state => state.language.name)
    const[name, setName] = useState<string | null>(profile.name)
	const[description, setDescription] = useState<string>(profile.description)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: putProfile
    })

    const onFinish: FormProps['onFinish'] = async () => {
        await mutateAsync({ body: { name, description }, profileId: profile.id })
        queryClient.invalidateQueries({ queryKey: ['getUserSelf'] })
        setDescription(profile.description)
        setModalStatus(false)
    };

    const onCancel = () => {
        setDescription(profile.description)
        setModalStatus(false)
    }

    return (
        <Modal
            open={modalStatus}
            footer={false}
            onCancel={onCancel}
            >
            <Form 
                onFinish={onFinish}
            >
                <Flex 
                    vertical 
                    justify='center' 
                    align='center'
                    gap='16px'
                >
                    <Title level={5} style={{ margin: 0, width: '100%' }}>
                        {languages[language]?.profile?.editModalTitle}
                    </Title>
                    <Form.Item name='name' valuePropName='name'
                        style={{
                            width: '100%',
                            margin: '0px'
                        }}
                    >
                        <Input 
                            width='100%'
                            title={languages[language].nameInput}
                            color={colors.brand.dark}
                            backgroundColor={colors.brand.light}
                            onChange={setName}
                            defaultValue={profile?.name}
                        />
                    </Form.Item>
                    <Form.Item name='description' valuePropName='description'
                        style={{
                            width: '100%',
                            margin: '0px'
                        }}
                    >
                        <HTMLEditor
                            width='100%'
                            text={description}
                            setText={setDescription}
                            title={languages[language].descriptionInput}
                            color={colors.brand.dark}
                            backgroundColor={colors.brand.light}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{
                            margin: '0px'
                        }}
                    >
                        <CustomButton
                            onForm={true}
                            defaultColor={colors.brand.light}
                            defaultBgColor={colors.brand.dark}
                            hoverColor={colors.brand.light}
                            hoverBgColor={colors.brand.jamPurple}
                            loading={isPending}
                        >
                            {languages[language].confirmBtn}
                        </CustomButton>
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    )
}

export default EditProfileModal