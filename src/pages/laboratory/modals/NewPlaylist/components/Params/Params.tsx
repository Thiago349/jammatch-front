import { useState, Dispatch, SetStateAction } from "react"
import { useAppSelector } from "src/redux/store"

import { List, Tag, Typography, Slider, Flex } from "antd"
import { ThunderboltOutlined, FireOutlined, SoundOutlined, AudioMutedOutlined, StarOutlined, ApiOutlined, SmileOutlined, AppstoreOutlined } from '@ant-design/icons'

import { colors } from "src/styles/colors"
import { languages } from "src/resources/languages"

import { genreColors } from "src/pages/laboratory/constants"

const { Title } = Typography

type ParamsModalProps = {
    playlists: any
    pageNumber: number
}

const Params: React.FC<ParamsModalProps> = ({
    playlists,
    pageNumber
}) => {
    const language = useAppSelector(state => state.language.name)
    const parameters = playlists[pageNumber].parameters

    const musicParameters = [
        { 
            icon: <AppstoreOutlined style={{ fontSize: '16px', color: "#007BFF" }} />,
            color: "#007BFF",
            value: parameters.genres,
            title: languages[language]?.laboratory?.params.genres
        },
        { 
            icon: <FireOutlined style={{ fontSize: '16px', color: "#FF5733" }} />,
            color: "#FF5733",
            value: parameters.danceability,
            title: languages[language]?.laboratory?.params.danceability,
            min: 0,
            max: 1
        },
        { 
            icon: <ThunderboltOutlined style={{ fontSize: '16px', color: "#FFA500" }} />,
            color: "#FFA500",
            value: parameters.energy,
            title: languages[language]?.laboratory?.params.energy,
            min: 0,
            max: 1
        },
        { 
            icon: <ApiOutlined style={{ fontSize: '16px', color: "#28A745" }} />,
            color: "#28A745",
            value: parameters.acousticness,
            title: languages[language]?.laboratory?.params.acousticness,
            min: 0,
            max: 1
        },
        { 
            icon: <StarOutlined style={{ fontSize: '16px', color: "#FFD700" }} />,
            color: "#FFD700",
            value: parameters?.popularity,
            title: languages[language]?.laboratory?.params?.popularity,
            min: 0,
            max: 100
        },
        { 
            icon: <AudioMutedOutlined style={{ fontSize: '16px', color: "#6C757D" }} />,
            color: "#6C757D",
            value: parameters.instrumentalness,
            title: languages[language]?.laboratory?.params.instrumentalness,
            min: 0,
            max: 1
        },
        { 
            icon: <SmileOutlined style={{ fontSize: '16px', color: "#FFD700" }} />,
            color: "#FFD700",
            value: parameters.happiness,
            title: languages[language]?.laboratory?.params.happiness,
            min: 0,
            max: 1
        }
    ]

    return (
        <List
            dataSource={musicParameters}
            renderItem={(item) => (
                <List.Item
                    style={{
                        height: 396 / 7,
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
                            <Slider
                                value={item.value}
                                style={{ 
                                    width: '60%', 
                                    margin: '0px'  
                                }}
                                step={(item.max - item.min) / 100}
                                min={item.min}
                                max={item.max}
                                styles={{
                                    track: {
                                        backgroundColor: item.color
                                    }
                                }}
                            /> :
                            <Flex
                                style={{ 
                                    width: '60%', 
                                    margin: '0px'  
                                }}
                            >
                            {
                                item.value?.map(genre => 
                                    <Tag
                                        color={genreColors[genre]}
                                    >
                                        {languages[language].genres[genre]}
                                    </Tag>
                                )
                            } 
                            </Flex>                           
                        }
                    </Flex>
                </List.Item>
            )}
            style={{
                width: '100%',
                height: '400px',
                border: `2px solid ${colors.primaryNeutral[200]}`,
                borderRadius: '8px'
            }}
        />
    )
}

export default Params
