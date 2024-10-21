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

export function PlaylistGenresViewOptions(language) { 
    return [
        { color: "magenta", label: languages[language]?.genres.pop, value: 'pop' },
        { color: "red", label: languages[language]?.genres.rock, value: 'rock' },
        { color: "purple", label: languages[language]?.genres.jazz, value: 'jazz' },
        { color: "gold", label: languages[language]?.genres.classical, value: 'classical' },
        { color: "volcano", label: languages[language]?.genres.hipHop, value: 'hip-hop' },
        { color: "orange", label: languages[language]?.genres.country, value: 'country' },
        { color: "blue", label: languages[language]?.genres.blues, value: 'blues' },
        { color: "lime", label: languages[language]?.genres.reggae, value: 'reggae' },
        { color: "cyan", label: languages[language]?.genres.electronic, value: 'electronic' },
        { color: "green", label: languages[language]?.genres.folk, value: 'folk' },
        { color: "geekblue", label: languages[language]?.genres.soul, value: 'soul' },
        { color: "red", label: languages[language]?.genres.metal, value: 'metal' },
        { color: "magenta", label: languages[language]?.genres.disco, value: 'disco' },
        { color: "orange", label: languages[language]?.genres.funk, value: 'funk' },
        { color: "lime", label: languages[language]?.genres.indie, value: 'indie' },
        { color: "volcano", label: languages[language]?.genres.punk, value: 'punk' },
        { color: "purple", label: languages[language]?.genres.bossanova, value: 'bossanova' },
        { color: "green", label: languages[language]?.genres.samba, value: 'samba' },
        { color: "orange", label: languages[language]?.genres.sertanejo, value: 'sertanejo' },
        { color: "gold", label: languages[language]?.genres.forro, value: 'forro' },
        { color: "red", label: languages[language]?.genres.salsa, value: 'salsa' },
        { color: "blue", label: languages[language]?.genres.ska, value: 'ska' },   
        { color: "red", label: languages[language]?.genres.grunge, value: 'grunge' },
        { color: "green", label: languages[language]?.genres.mpb, value: 'mpb' },  
        { color: "geekblue", label: languages[language]?.genres.pagode, value: 'pagode' }
    ];
}