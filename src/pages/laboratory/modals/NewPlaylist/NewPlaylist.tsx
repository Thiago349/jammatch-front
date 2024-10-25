import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store"

import { Modal, Flex, Form, Segmented } from 'antd'
import type { FormProps } from 'antd'
import { CheckOutlined, ExportOutlined } from '@ant-design/icons'

import { colors } from 'src/styles/colors'
import { languages } from "src/resources/languages"

import { useUserData } from 'src/hooks'
import { SpotifyFrame, CustomButton, EditableCell } from 'src/components'

import { PlaylistViewOptions } from '../../constants'
import { postSpotifyPlaylist } from "src/services/api/endpoints";
import { Params, Playlist } from './components'

type NewPlaylistModalProps = {
    setModalStatus: Dispatch<SetStateAction<boolean>>
    modalStatus: boolean
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
    setPageNumber: Dispatch<SetStateAction<number>>
    pageNumber: number
}

const NewPlaylistModal: React.FC<NewPlaylistModalProps> = ({
    setModalStatus,
    modalStatus,
    setNewPlaylists,
    playlists,
    setPageNumber,
    pageNumber
}) => {
    const language = useAppSelector(state => state.language.name)
    const [selectedTrackId, setSelectedTrackId] = useState<string>(null)
    const [segmentedValue, setSegmentedValue] = useState<string | number>('musics')
    const {spotifySelf, isLoadingSpotifySelf} = useUserData()

    const onCancel = () => {
        setSelectedTrackId(null)
        setModalStatus(false)
    }

    const setName = (name: string) => {
        const newPlaylistInstance = [...playlists]
        newPlaylistInstance[pageNumber] = {...newPlaylistInstance[pageNumber], name: name }
        setNewPlaylists(newPlaylistInstance)
    }

    const { mutate: mutateNewSpotifyPlaylist, isPending: isNewSpotifyPlaylistPending } = useMutation({
        mutationFn: postSpotifyPlaylist,
        onSuccess: () => {
            const newPlaylistInstance = [...playlists]
            newPlaylistInstance[pageNumber] = {...newPlaylistInstance[pageNumber], saved: true }
            setNewPlaylists(newPlaylistInstance)
        }
    })

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
                gap='12px'
            >
                <EditableCell 
                    handleValue={setName}
                    value={playlists[pageNumber]?.name}
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
                        name: playlists[pageNumber]?.name,
                        tracks: playlists[pageNumber]?.tracks.map(track => track?.id)
                    })}
                    disabled={!playlists[pageNumber]?.name || !!playlists[pageNumber]?.saved}
                    loading={!!isNewSpotifyPlaylistPending}
                    defaultBgColor={colors.brand.dark}
                    defaultColor={colors.brand.light}
                    hoverBgColor={colors.brand.jamPurple}
                    disabledBgColor={!playlists[pageNumber]?.saved ? null : 'transparent'}
                >
                    
                    {
                        !playlists[pageNumber]?.saved ? 
                            <Flex
                                gap='8px'
                            >
                                { languages[language]?.laboratory?.exportToSpotifyBtn }
                                <ExportOutlined
                                    style={{
                                        fontSize: '16px'
                                    }}
                                />
                            </Flex>
                            : 
                            <Flex
                                gap='8px'
                            >
                                { languages[language]?.laboratory?.savedOnSpotifyBtn  }
                                <CheckOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: colors.success[800]
                                    }}
                                />
                            </Flex>
                    }
                    
                </CustomButton>
                <SpotifyFrame 
                    trackId={selectedTrackId}
                    visible={!!selectedTrackId}
                />
                <Flex
                    justify='center'
                    gap='6px'
                    style={{
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        padding: '4px 12px',
                        borderRadius: '4px'
                    }}
                >
                    { playlists.map((_: any, index: number) => {
                        return (
                            <CustomButton
                                key={index}
                                defaultBgColor={ index == pageNumber ? colors.brand.dark : colors.brand.darkGrey }
                                hoverBgColor={colors.brand.dark}
                                onClick={() => setPageNumber(index)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    margin: '0px',
                                    padding: '0px',
                                    borderRadius: '50%',
                                }}
                            />
                        )
                    })}
                </Flex>
            </Flex>
        </Modal>
    )
}

export default NewPlaylistModal