import { useState, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "src/redux/store";
import { ThunderboltOutlined, FireOutlined, SoundOutlined, AudioMutedOutlined, HeartOutlined, MessageOutlined, ApiOutlined, SmileOutlined } from '@ant-design/icons';
import { List, Typography, Slider } from "antd";
import { colors } from "src/styles/colors";

const { Title } = Typography;

type ParamsModalProps = {
    setNewPlaylists: Dispatch<SetStateAction<any>>;
    playlists: any;
    pageNumber: number;
};

const Params: React.FC<ParamsModalProps> = ({
    setNewPlaylists,
    playlists,
    pageNumber
}) => {
    const language = useAppSelector(state => state.language.name);
    const parameters = playlists[pageNumber].parameters;

    const musicParametersIcons = {
        danceability: <FireOutlined style={{ color: "#FF5733" }} />,
        energy: <ThunderboltOutlined style={{ color: "#FFC300" }} />,
        acousticness: <ApiOutlined style={{ color: "#28A745" }} />,
        instrumentalness: <AudioMutedOutlined style={{ color: "#6C757D" }} />,
        liveness: <HeartOutlined style={{ color: "#FF69B4" }} />,
        speechiness: <MessageOutlined style={{ color: "#007BFF" }} />,
        loudness: <SoundOutlined style={{ color: "#FFA500" }} />,
        happiness: <SmileOutlined style={{ color: "#FFD700" }} />
    };

    const musicParametersColors = {
        danceability: "#FF5733",
        energy: "#FFC300",
        acousticness: "#28A745",
        instrumentalness: "#6C757D",
        liveness: "#FF69B4",
        speechiness: "#007BFF",
        loudness: "#FFA500",
        happiness: "#FFD700"
    };

    const data = Object.keys(parameters).map((key) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        icon: musicParametersIcons[key as keyof typeof musicParametersIcons],
        value: parameters[key as keyof typeof parameters],
        color: musicParametersColors[key as keyof typeof musicParametersColors]
    }));

    return (
        <List
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    style={{
                        height: 396 / 9,
                        padding: '0px 16px'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {item.icon}
                        <span style={{ marginLeft: 8, flex: 1 }}>{item.title}:</span>
                        <Slider
                            value={item.value * 100}
                            style={{ width: '100px', marginLeft: 8 }}
                            styles={{
                                track: {
                                    backgroundColor: item.color
                                }
                            }}
                        />
                    </div>
                </List.Item>
            )}
            style={{
                width: '100%',
                height: '400px',
                border: `2px solid ${colors.primaryNeutral[200]}`,
                borderRadius: '8px'
            }}
        />
    );
};

export default Params;
