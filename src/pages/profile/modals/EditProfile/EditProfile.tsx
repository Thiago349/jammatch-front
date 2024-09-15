import React, { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store";

import { Modal, Flex, Form } from 'antd'
import type { FormProps } from 'antd'
import { CustomButton } from 'src/components'


import { putProfile } from 'src/services/api/endpoints';
import { colors } from 'src/styles/colors';
import { languages } from "src/resources/languages";

type EditProfileModalProps = {
    setModalStatus: Dispatch<SetStateAction<boolean>>
    modalStatus: boolean
    profileId: string
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    setModalStatus,
    modalStatus,
    profileId
}) => {
    const language = useAppSelector(state => state.language.name)
    const { mutateAsync, isPending } = useMutation({
        mutationFn: putProfile
      })

    const onFinish: FormProps['onFinish'] = async () => {
        const formData = new FormData()
        await mutateAsync({ formData, profileId })
        setModalStatus(false)
    };

    const onCancel = () => {
        setModalStatus(false)
    }

    return (
        <Modal
            open={modalStatus}
            footer={false}
            onCancel={onCancel}
            >
            <Form onFinish={onFinish}>
                <Flex vertical justify='center' align='center'>
                    <Form.Item name='profileImage' valuePropName="profileImage">
                    </Form.Item>
                    <Form.Item>
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