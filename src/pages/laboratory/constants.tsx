import { languages } from 'src/resources/languages';
import { CalendarOutlined, QuestionOutlined, CustomerServiceOutlined, ControlOutlined } from '@ant-design/icons'

export function MethodOptions(language) { 
    return [
        { label: languages[language]?.laboratory?.randomMethod, value: 'random', icon: <QuestionOutlined /> },
        { label: languages[language]?.laboratory?.calendarMethod, value: 'calendar', icon: <CalendarOutlined /> }
    ]
}

export function PlaylistViewOptions(language) { 
    return [
        { label: languages[language]?.laboratory?.musicPlaylistView, value: 'musics', icon: <CustomerServiceOutlined /> },
        { label: languages[language]?.laboratory?.paramPlaylistView, value: 'params', icon: <ControlOutlined /> }
    ]
}