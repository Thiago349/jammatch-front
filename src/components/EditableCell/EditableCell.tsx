import React, { useRef, useState, Dispatch, SetStateAction } from 'react'
import type { GetRef, InputRef } from 'antd'
import { Flex, Form, Input, Typography } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { colors } from 'src/styles/colors'

const { Title, Paragraph } = Typography

type EditableCellProps = {
  handleValue: Dispatch<SetStateAction<any>>
  value: any
  placeholder: string
}

const EditableCell: React.FC<EditableCellProps> = ({
    handleValue,
    value,
    placeholder
}) => {
    const [editing, setEditing] = useState<boolean>(true)

    const inputRef = useRef<InputRef>(null)

    const changeProp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        event.stopPropagation()
        toggleEdit(false)
    }

    const toggleEdit = (status: boolean) => {
        setEditing(status)
    }


  return (editing || !value) ? (
        <Input
            value={value}
            placeholder={placeholder}
            ref={inputRef}
            onPressEnter={changeProp}
            onBlur={() => toggleEdit(false) }
            onChange={(e) => {
                if (!value) toggleEdit(true)
                handleValue(e.target.value)}
            }
            style={{
                width: 'calc(100% - 32px)',
                color: colors.brand.dark,
                height: '32px',
                padding: '0px 12px',
                fontSize: '16px'
            }}
        />
    ) : (
        <Flex
            align='center'
            style={{
                width: 'calc(100% - 32px)',
                color: colors.brand.dark,
                height: '32px',
                padding: '0px 12px'
            }}
            onClick={() => toggleEdit(true)}
        >
            <Title style={{
                fontSize: '16px'
            }}>
                {value}
            </Title>
        </Flex>
    )
}

export default EditableCell