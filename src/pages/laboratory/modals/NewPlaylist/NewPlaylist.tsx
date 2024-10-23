import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store"

import { ExportOutlined } from '@ant-design/icons'

import { Modal, Flex, Form, Input, Segmented, Button } from 'antd'
import type { FormProps } from 'antd'

import { Params, Playlist } from './components'

import { useUserData } from 'src/hooks'
import { SpotifyFrame, CustomButton, EditableCell } from 'src/components'

import { colors } from 'src/styles/colors'
import { languages } from "src/resources/languages"
import { PlaylistViewOptions } from '../../constants'

import { postSpotifyPlaylist } from "src/services/api/endpoints";


type NewPlaylistModalProps = {
    setModalStatus: Dispatch<SetStateAction<boolean>>
    modalStatus: boolean
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
}

const NewPlaylistModal: React.FC<NewPlaylistModalProps> = ({
    setModalStatus,
    modalStatus,
    setNewPlaylists,
    playlists,
}) => {
    const language = useAppSelector(state => state.language.name)
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [selectedTrackId, setSelectedTrackId] = useState<string>(null)
    const [segmentedValue, setSegmentedValue] = useState<string | number>('musics')
    const { spotifySelf, isLoadingSpotifySelf } = useUserData()

    const onFinish: FormProps['onFinish'] = async () => {
        setSelectedTrackId(null)
        setPageNumber(0)
        setModalStatus(false)
    }

    const onCancel = () => {
        setSelectedTrackId(null)
        setPageNumber(0)
        setModalStatus(false)
    }

    const setName = (name: string) => {
        const newPlaylistInstance = [...playlists]
        newPlaylistInstance[pageNumber] = {...newPlaylistInstance[pageNumber], name: name }
        setNewPlaylists(newPlaylistInstance)
    }

    const { mutate: mutateNewSpotifyPlaylist, isPending: isNewSpotifyPlaylistPending } = useMutation({
        mutationFn: postSpotifyPlaylist
        // onSuccess: (data) => {
        //     setNewPlaylists([data])
        // }
    })

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
                    align='start'
                    gap='12px'
                >
                    <EditableCell 
                        handleValue={setName}
                        value={playlists?.[pageNumber]?.name}
                        placeholder={languages[language].laboratory.playlistNamePlaceholder}
                    />
                    <Segmented 
                        style={{
                            width: '100%',
                        }}
                        options={PlaylistViewOptions(language)}
                        value={segmentedValue} 
                        onChange={setSegmentedValue}
                        block
                    />
                    <Flex 
                        style={{
                            width: '100%',
                            height: 'fit-content'
                        }}
                    >
                        { 
                            segmentedValue == 'musics' ? 
                            <Playlist
                                setSelectedTrackId={setSelectedTrackId}
                                selectedTrackId={selectedTrackId}
                                setNewPlaylists={setNewPlaylists}
                                playlists={playlists}
                                pageNumber={pageNumber}
                            /> :
                            <Params 
                                setNewPlaylists={setNewPlaylists}
                                playlists={playlists}
                                pageNumber={pageNumber}
                            />
                    }
                    </Flex>
                    <CustomButton
                        style={{
                            alignSelf: 'end'
                        }}
                        onClick={() => mutateNewSpotifyPlaylist({
                            spotifyUserId: spotifySelf?.id,
                            name: playlists?.[pageNumber]?.name,
                            tracks: playlists?.[pageNumber]?.tracks.map(track => track?.id)
                        })}
                        disabled={!playlists?.[pageNumber]?.name}
                        loading={!!isNewSpotifyPlaylistPending}
                        defaultBgColor={colors.brand.dark}
                        defaultColor={colors.brand.light}
                        hoverBgColor={colors.brand.jamPurple}
                    >
                        <Flex
                            gap='8px'
                        >
                            {languages[language]?.laboratory?.exportToSpotifyBtn}
                            <ExportOutlined 
                                style={{
                                    fontSize: '16px'
                                }}
                            />
                        </Flex>
                    </CustomButton>
                    <SpotifyFrame 
                        trackId={selectedTrackId}
                        visible={!!selectedTrackId}
                    />
                </Flex>
            </Form>
        </Modal>
    )
}

export default NewPlaylistModal