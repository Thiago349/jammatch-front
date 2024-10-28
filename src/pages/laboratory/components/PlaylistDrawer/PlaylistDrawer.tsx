import React, { Dispatch, SetStateAction } from 'react'
import { useAppSelector } from "src/redux/store"

import { Drawer, Flex, Table, Typography } from 'antd';
import type { TableProps } from 'antd'
import { DeleteOutlined, ExpandOutlined } from '@ant-design/icons'

import { colors } from 'src/styles/colors'
import { languages } from "src/resources/languages"

import { CustomButton } from 'src/components'

const { Title } = Typography

interface PlaylistType {
    parameters: { [key: string]: number },
    tracks: {
        id: string
        name: string
        artists: string[]
        album: string
        durationMs: number
    }[],
    name: string | null,
    type: string
}

type PlaylistDrawerProps = {
    setDrawer: Dispatch<SetStateAction<boolean>>
    drawerStatus: boolean
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
    setNewPlaylistModal: Dispatch<SetStateAction<boolean>>
    setPageNumber: Dispatch<SetStateAction<number>>
    pageNumber: number
}

const NewPlaylistModal: React.FC<PlaylistDrawerProps> = ({
    setDrawer,
    drawerStatus,
    setNewPlaylists,
    playlists,
    setNewPlaylistModal,
    setPageNumber,
    pageNumber
}) => {
    const handleDelete = (index: number) => {
        if (playlists.length == 1) {
            setDrawer(false)
        }
        const newPlaylistInstance = [...playlists]
        newPlaylistInstance.slice(0, index).concat(newPlaylistInstance.slice(index + 1))
        console.log(newPlaylistInstance.slice(0, index).concat(newPlaylistInstance.slice(index + 1)))
        setNewPlaylists(newPlaylistInstance.slice(0, index).concat(newPlaylistInstance.slice(index + 1)));
    };

    const columns: TableProps<any>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (value: string, record) =>
            (
            <Flex style={{
                width: '320px'
            }}
            vertical
            >
                <Title
                    style={{
                        margin: 0,
                        fontSize: '16px',
                        color: colors.brand.dark
                    }}
                    ellipsis
                >
                    {value}
                </Title>
                <Title
                    style={{
                        margin: 0,
                        fontSize: '14px',
                        color: colors.primaryNeutral[500]
                    }}
                >
                    {`${record.tracks.length} ${(record.tracks.length > 1 ? languages[language].musicsLabel : languages[language].musicLabel).toLowerCase()}`}
                </Title>
            </Flex>
            ),
          width: '320px'
        },
        {
            render: (_: string, record: PlaylistType, index: number) =>
              (
                <CustomButton
                    style={{ 
                        height: '32px',
                        width: '32px',
                        padding: 0
                    }}
                    onClick={() => {
                        setNewPlaylistModal(true)
                        setPageNumber(index)}
                    }
                    defaultBgColor="transparent"
                    defaultColor={colors.brand.dark}
                    hoverColor={colors.brand.jamPurple}
                >
                    <ExpandOutlined 
                        style={{ fontSize: '20px' }}
                    />
                </CustomButton>
              ),
            width: '25px'
        },
        {
            render: (_: string, record: PlaylistType, index: number) =>
              (
                <CustomButton
                    style={{ 
                        height: '32px',
                        width: '32px',
                        padding: 0
                    }}
                    onClick={() => handleDelete(index)
                    }
                    defaultBgColor="transparent"
                    defaultColor={colors.brand.dark}
                    hoverColor={colors.error[800]}
                >
                    <DeleteOutlined 
                        style={{ fontSize: '20px' }}
                    />
                </CustomButton>
              ),
            width: '25px'
        }
    ];

    
    const language = useAppSelector(state => state.language.name)

    return (
        <Drawer
            onClose={() => setDrawer(false)} 
            open={drawerStatus}
            width='480px'
            styles={{
                body: {
                    padding: '0px'
                }
            }}
            zIndex={500}
        >
            <Table
              showHeader={false}
              rowKey="id"
              columns={columns}
              dataSource={playlists}
              style={{
                  width: '100%',
                  height: '400px'
              }}
              pagination={false}
              locale={{
                emptyText: languages[language]?.laboratory?.emptyPlaylistTitle
              }}
          />
        </Drawer>
    )
}

export default NewPlaylistModal