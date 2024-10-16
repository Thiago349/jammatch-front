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

type NewPlaylistModalProps = {
    setModalStatus: Dispatch<SetStateAction<boolean>>
    modalStatus: boolean
    profile: {
        id: string
    }
    playlist: any
}

const NewPlaylistModal: React.FC<NewPlaylistModalProps> = ({
    setModalStatus,
    modalStatus,
    profile,
    playlist
}) => {
    const language = useAppSelector(state => state.language.name)

    const onFinish: FormProps['onFinish'] = async () => {
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
            <Form 
                onFinish={onFinish}
            >
                <Flex 
                    vertical 
                    justify='center' 
                    align='center'
                    style={{
                        padding: '0px 24px'
                    }}
                >
                    <Title level={3}>
                        {String(playlist?.message)}
                    </Title>
                </Flex>
            </Form>
        </Modal>
    )
}

export default NewPlaylistModal