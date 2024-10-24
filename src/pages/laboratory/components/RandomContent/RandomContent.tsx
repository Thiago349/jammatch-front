import { useState, Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "src/redux/store";

import { Flex, Typography } from "antd";

import { CustomButton } from "src/components";
import { languages } from 'src/resources/languages';
import { colors } from "src/styles/colors";

import { postLabServiceRandom } from "src/services/api/endpoints";

const { Title } = Typography

export type TRandomContent = {
    setNewPlaylistModal: Dispatch<SetStateAction<boolean>>
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
}

export const RandomContent = ({ setNewPlaylistModal, setNewPlaylists, playlists }: TRandomContent) => {
	const language = useAppSelector(state => state.language.name)
    const spotifyAuthorization = useAppSelector(state => state.spotifyAuthentication.status)

    const { mutate: mutateRandomPlaylist, isPending: isRandomPlaylistPending } = useMutation({
        mutationFn: postLabServiceRandom,
        onSuccess: (data) => {
            const newPlaylistInstance = [...playlists]
            newPlaylistInstance.push(data)
            setNewPlaylists(newPlaylistInstance)
            setNewPlaylistModal(true)
        }
    })

	return (
		<Flex 
            vertical 
            justify="center" 
            align="center"
            style={{ 
                width: '100%'
            }}>
			<Title
				style={{ margin: '10px 0px' }}
				level={5}
			>
				{ languages[language]?.laboratory?.randomMethodTitle }
			</Title>
            <CustomButton 
                onClick={mutateRandomPlaylist}
                loading={isRandomPlaylistPending}
                style={{ 
                    height: 32, 
                    fontSize: 16, 
                    justifySelf: 'flex-end',
                }}
                defaultBgColor={colors.primaryNeutral[800]}
                defaultColor={colors.brand.light}
                hoverBgColor={colors.brand.jamPurple}
                hoverColor={ colors.brand.light}
                disabled={!spotifyAuthorization}
            >
                    { languages[language]?.generateBtn }
            </CustomButton>
		</Flex>
	)
};

export default RandomContent; 