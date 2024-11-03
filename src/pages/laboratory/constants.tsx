import { languages } from 'src/resources/languages';
import { CalendarOutlined, QuestionOutlined, CustomerServiceOutlined, ControlOutlined } from '@ant-design/icons'

export function MethodOptions(language) { 
    return [
        { label: languages[language]?.laboratory?.randomMethod, value: 'random', icon: <QuestionOutlined /> },
        { label: languages[language]?.laboratory?.calendarMethod, value: 'calendar', icon: <CalendarOutlined /> },
        { label: languages[language]?.laboratory?.customMethod, value: 'custom', icon: <ControlOutlined /> }
    ]
}

export function PlaylistViewOptions(language) { 
    return [
        { label: languages[language]?.laboratory?.musicPlaylistView, value: 'musics', icon: <CustomerServiceOutlined /> },
        { label: languages[language]?.laboratory?.paramPlaylistView, value: 'params', icon: <ControlOutlined /> }
    ]
}

export const genreColors = {
    POP: "magenta",
    ROCK: "red",
    JAZZ: "purple",
    CLASSICAL: "gold",
    HIP_HOP: "volcano",
    COUNTRY: "orange",
    BLUES: "blue",
    REGGAE: "lime",
    ELECTRONIC: "cyan",
    FOLK: "green",
    SOUL: "geekblue",
    METAL: "red",
    DISCO: "magenta",
    FUNK: "orange",
    INDIE: "lime",
    PUNK: "volcano",
    BOSSANOVA: "purple",
    SAMBA: "green",
    SERTANEJO: "orange",
    FORRO: "gold",
    SALSA: "red",
    SKA: "blue", 
    GRUNGE: "red",
    MPB: "green",
    PAGODE: "geekblue"
}
