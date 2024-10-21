import { useState, Dispatch, SetStateAction } from "react"
import { useAppSelector } from "src/redux/store"

import { ThunderboltOutlined, FireOutlined, SoundOutlined, AudioMutedOutlined, HeartOutlined, MessageOutlined, ApiOutlined, SmileOutlined, AppstoreOutlined } from '@ant-design/icons'
import { List, Tag, Typography, Select, Slider, Flex, SelectProps } from "antd"

import { PlaylistGenresViewOptions } from "src/pages/laboratory/constants"

import { colors } from "src/styles/colors"
import { languages } from "src/resources/languages"

const { Title } = Typography

type ParamsModalProps = {
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
    pageNumber: number
}

const Params: React.FC<ParamsModalProps> = ({
    setNewPlaylists,
    playlists,
    pageNumber
}) => {
    const language = useAppSelector(state => state.language.name)
    const parameters = playlists[pageNumber].parameters

    const musicParametersColors = {
        genres: "#007BFF",
        danceability: "#FF5733",
        energy: "#FFC300",
        acousticness: "#28A745",
        instrumentalness: "#6C757D",
        loudness: "#FFA500",
        happiness: "#FFD700"
    }

    const musicParametersIcons = {
        genres: <AppstoreOutlined style={{ fontSize: '16px', color: musicParametersColors.genres }} />,
        danceability: <FireOutlined style={{ fontSize: '16px', color: musicParametersColors.danceability }} />,
        energy: <ThunderboltOutlined style={{ fontSize: '16px', color: musicParametersColors.energy }} />,
        acousticness: <ApiOutlined style={{ fontSize: '16px', color: musicParametersColors.acousticness }} />,
        instrumentalness: <AudioMutedOutlined style={{ fontSize: '16px', color: musicParametersColors.instrumentalness }} />,
        loudness: <SoundOutlined style={{ fontSize: '16px', color: musicParametersColors.loudness }} />,
        happiness: <SmileOutlined style={{ fontSize: '16px', color: musicParametersColors.happiness }} />
    }

    const data = Object.keys(parameters).map((key) => ({
        title: languages[language]?.laboratory?.params[key],
        icon: musicParametersIcons[key as keyof typeof musicParametersIcons],
        value: key == 'loudness' ? ((parameters[key as keyof typeof parameters] + 60) / 60) : parameters[key as keyof typeof parameters],
        color: musicParametersColors[key as keyof typeof musicParametersColors]
    }))

    type TagRender = SelectProps['tagRender'];

    const tagRender: TagRender = (props) => {
        const { label, value } = props;
        const option = PlaylistGenresViewOptions(language).find(opt => opt.value === value);
        const color = option?.color || 'default';

        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                style={{ marginInlineEnd: 4 }}
            >
                {label}
            </Tag>
        );
    };

    return (
        <List
            dataSource={data}
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
                                value={item.value * 100}
                                style={{ 
                                    width: '60%', 
                                    margin: '0px'  
                                }}
                                styles={{
                                    track: {
                                        backgroundColor: item.color
                                    }
                                }}
                            /> : 
                            <Select
                                value={item.value.split([','])}
                                mode="multiple"
                                tagRender={(tagRender)}
                                maxTagCount='responsive'
                                allowClear
                                style={{ 
                                    width: '60%' 
                                }}
                                options={PlaylistGenresViewOptions(language)}
                            />
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
