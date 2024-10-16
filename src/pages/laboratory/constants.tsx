import { languages } from 'src/resources/languages';
import { CalendarOutlined, QuestionOutlined } from '@ant-design/icons'

export function SegmentedOptions(language) { 
    return [
        { label: languages[language]?.laboratory?.randomMethod, value: 'random', icon: <QuestionOutlined /> },
        { label: languages[language]?.laboratory?.calendarMethod, value: 'calendar', icon: <CalendarOutlined /> }
    ]
}