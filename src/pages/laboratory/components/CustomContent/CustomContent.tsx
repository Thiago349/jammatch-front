import { useState, Dispatch, SetStateAction } from "react"
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAppSelector } from "src/redux/store"

import { Checkbox, List, Tag, Typography, Select, Slider, Flex, SelectProps } from "antd"
import { ThunderboltOutlined, FireOutlined, SoundOutlined, StarOutlined, AudioMutedOutlined, ApiOutlined, SmileOutlined, AppstoreOutlined } from '@ant-design/icons'

import { getRoles } from 'src/services/api/endpoints';
import { colors } from "src/styles/colors"
import { languages } from "src/resources/languages"

import { CustomButton } from "src/components";
import { genreColors } from "src/pages/laboratory/constants"

import { postLabServiceCustom } from "src/services/api/endpoints";

const { Title } = Typography

type ParamsModalProps = {
    setNewPlaylistModal: Dispatch<SetStateAction<boolean>>
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
    setPageNumber: Dispatch<SetStateAction<number>>
}

const Params: React.FC<ParamsModalProps> = ({
    setNewPlaylistModal,
    setNewPlaylists,
    playlists,
    setPageNumber,
}) => {
    const language = useAppSelector(state => state.language.name)
    const spotifyAuthorization = useAppSelector(state => state.spotifyAuthentication.status)
    
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedDanceability, setSelectedDanceability] = useState<number>(0)
    const [selectedEnergy, setSelectedEnergy] = useState<number>(0)
    const [selectedAcousticness, setSelectedAcousticness] = useState<number>(0)
    const [selectedPopularity, setSelectedPopularity] = useState<number>(0)
    const [selectedInstrumentalness, setSelectedInstrumentalness] = useState<number>(0)
    const [selectedHappiness, setSelectedHappiness] = useState<number>(0)
    const [enabledDanceability, setEnabledDanceability] = useState<boolean>(true)
    const [enabledEnergy, setEnabledEnergy] = useState<boolean>(true)
    const [enabledAcousticness, setEnabledAcousticness] = useState<boolean>(true)
    const [enabledPopularity, setEnabledPopularity] = useState<boolean>(true)
    const [enabledInstrumentalness, setEnabledInstrumentalness] = useState<boolean>(true)
    const [enabledHappiness, setEnabledHappiness] = useState<boolean>(true)


    const { mutate: mutateCustomPlaylist, isPending: isCustomPlaylistPending } = useMutation({
        mutationFn: postLabServiceCustom,
        onSuccess: (data) => {
            const newPlaylistInstance = [...playlists]
            newPlaylistInstance.push(data)
            setNewPlaylists(newPlaylistInstance)
            setPageNumber(playlists.length)
            setNewPlaylistModal(true)
        }
    })

    const { data: genres, isLoading: isLoadingGenres, isPending: isPendingGenres } = useQuery({
        queryKey: ['getGenres'],
        queryFn: () => getRoles("GENRE"),
    })

    const genreOptions: { label: string, value: string }[] = genres?.map(genre => {
        return { value: genre.label, label: languages[language].genres[genre.label] }
    })

    const musicParameters = [
        { 
            icon: <AppstoreOutlined style={{ fontSize: '16px', color: "#007BFF" }} />,
            color: "#007BFF",
            value: selectedGenres,
            onChange: setSelectedGenres,
            title: languages[language]?.laboratory?.params.genres
        },
        { 
            icon: <FireOutlined style={{ fontSize: '16px', color: "#FF5733" }} />,
            color: "#FF5733",
            value: selectedDanceability,
            onChange: setSelectedDanceability,
            enabled: enabledDanceability,
            onChangeEnabled: setEnabledDanceability,
            title: languages[language]?.laboratory?.params.danceability,
            min: 0,
            max: 1
        },
        { 
            icon: <ThunderboltOutlined style={{ fontSize: '16px', color: "#FFA500" }} />,
            color: "#FFA500",
            value: selectedEnergy,
            onChange: setSelectedEnergy,
            enabled: enabledEnergy,
            onChangeEnabled: setEnabledEnergy,
            title: languages[language]?.laboratory?.params.energy,
            min: 0,
            max: 1
        },
        { 
            icon: <ApiOutlined style={{ fontSize: '16px', color: "#28A745" }} />,
            color: "#28A745",
            value: selectedAcousticness,
            onChange: setSelectedAcousticness,
            enabled: enabledAcousticness,
            onChangeEnabled: setEnabledAcousticness,
            title: languages[language]?.laboratory?.params.acousticness,
            min: 0,
            max: 1
        },
        { 
            icon: <StarOutlined style={{ fontSize: '16px', color: "#FFD700" }} />,
            color: "#FFD700",
            value: selectedPopularity,
            onChange: setSelectedPopularity,
            enabled: enabledPopularity,
            onChangeEnabled: setEnabledPopularity,
            title: languages[language]?.laboratory?.params.popularity,
            min: 0,
            max: 100
        },
        { 
            icon: <AudioMutedOutlined style={{ fontSize: '16px', color: "#6C757D" }} />,
            color: "#6C757D",
            value: selectedInstrumentalness,
            onChange: setSelectedInstrumentalness,
            enabled: enabledInstrumentalness,
            onChangeEnabled: setEnabledInstrumentalness,
            title: languages[language]?.laboratory?.params.instrumentalness,
            min: 0,
            max: 1
        },
        { 
            icon: <SmileOutlined style={{ fontSize: '16px', color: "#FFD700" }} />,
            color: "#FFD700",
            value: selectedHappiness,
            onChange: setSelectedHappiness,
            enabled: enabledHappiness,
            onChangeEnabled: setEnabledHappiness,
            title: languages[language]?.laboratory?.params.happiness,
            min: 0,
            max: 1
        }
    ]

    type TagRender = SelectProps['tagRender']

    const tagRender: TagRender = (props) => {
        const { label, value } = props
        const color = genreColors[value] || 'default'

        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault()
            event.stopPropagation()
        }

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                style={{ marginInlineEnd: 4 }}
            >
                {label}
            </Tag>
        )
    }

    return (
        <Flex 
            vertical 
            justify="space-between" 
            align="center"
            style={{ 
                width: '100%'
            }}
        >
            <List
                dataSource={musicParameters}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            height: 50,
                            padding: '0px 16px'
                        }}
                    >
                        <Flex
                            align="center"
                            justify="space-between"
                            gap="16px"
                            style={{ 
                                width: '100%' 
                            }}
                        >
                            <Flex
                                align="center"
                                gap="16px"
                            >
                                {item.icon}
                                <Title
                                    style={{
                                        fontSize: '14px'
                                    }}
                                >
                                    {item.title}
                                </Title>
                            </Flex>
                            {
                                typeof item.value === 'number' ? 
                                <Flex
                                    style={{ 
                                        width: '60%', 
                                        margin: '0px'  
                                    }}
                                    align="center"
                                    gap={16}
                                >
                                    <Slider
                                        value={item.value}
                                        style={{ 
                                            width: '100%', 
                                            margin: '0px'  
                                        }}
                                        step={(item.max - item.min) / 100}
                                        min={item.min}
                                        max={item.max}
                                        onChange={(value: any) => item.onChange(value)}
                                        disabled={!item.enabled}
                                        styles={{
                                            track: {
                                                backgroundColor: item.color
                                            }
                                        }}
                                    />
                                    <Checkbox 
                                        checked={item.enabled} 
                                        onChange={() => item.onChangeEnabled(!item.enabled)}
                                    />
                                </Flex> : 
                                <Select
                                    mode="multiple"
                                    value={item.value}
                                    tagRender={(tagRender)}
                                    maxTagCount='responsive'
                                    loading={isLoadingGenres || isPendingGenres}
                                    disabled={isLoadingGenres || isPendingGenres}
                                    allowClear
                                    onChange={(value: any) => item.onChange(value)}
                                    style={{ 
                                        width: '60%' 
                                    }}
                                    options={genreOptions}
                                />
                            }
                        </Flex>
                    </List.Item>
                )}
                style={{
                    width: '100%',
					borderBottom: `solid ${colors.primaryNeutral[200]} 2px`
                }}
            />
            <CustomButton 
                onClick={() => {
                    const params = { 
                        "genres": selectedGenres,
                        "danceability": enabledDanceability ? selectedDanceability : undefined,
                        "energy": enabledEnergy ? selectedEnergy : undefined,
                        "acousticness": enabledAcousticness ? selectedAcousticness : undefined,
                        "popularity": enabledPopularity ? selectedPopularity : undefined,
                        "instrumentalness": enabledInstrumentalness ? selectedInstrumentalness : undefined,
                        "happiness": enabledHappiness ? selectedHappiness : undefined
                    }
                    mutateCustomPlaylist(params)
                }}
                loading={isCustomPlaylistPending}
                style={{ 
                    height: 32, 
                    fontSize: 16, 
                    justifySelf: 'flex-end',
                    marginBottom: '16px'
                }}
                defaultBgColor={colors.primaryNeutral[800]}
                defaultColor={colors.brand.light}
                hoverBgColor={colors.brand.jamPurple}
                hoverColor={ colors.brand.light}
                disabled={!spotifyAuthorization || !selectedGenres.length}
            >
                    { languages[language]?.generateBtn }
            </CustomButton>
        </Flex>
    )
}

export default Params
