import { colors } from "src/styles/colors";
import { languages } from "src/resources/languages";
import { Card, Flex, Button, Typography } from "antd";
import { useAppSelector } from "src/redux/store";
const { Title } = Typography

type MainCardProps = {
	height: string,
	width: string
}

export const MainCard = ({height, width}: MainCardProps ) => {
	const language = useAppSelector(state => state.language.name)
	const userData = {
		"name": "Thiago Prezotte Reis",
		"role": ["DRUMMER"],
		"birthDate": "27/03/2002",
		"description": 
		<p>
			Thiago é um baterista que toca na cena de BH desde <b>2017</b>.<br/><br/>
			Em suas bandas ou como músico de apoio, se apresentou em casas como Major Lock, Layback, Distrital, Nightmarket, Trattoria 158, Mina Jazz Bar e muitas outras!<br/><br/>
			Com a banda <b>Freak!</b>, produziu 5 edições de sucesso do evento <b>Rock Session</b>.
		</p>
	}

	return (
		<Card 
			styles={{
				body: {
					padding: '24px'
				}
			}}
			style={{ 
				height: 'fit-content', 
				width: width, 
				maxWidth: '1128px',
				backgroundColor: colors.brand.light,
				cursor: 'default',
			}}
			bordered={false}
			cover={ <img src="src/styles/banner.png" /> }
		>
			<Card.Meta
				title={
					<Title 
						level={3}
					>
						{userData.name}
					</Title>
				}
				avatar={
					<img 
						style={{
							borderRadius: '50%',
							width: '160px',
							position: 'relative',
							top: '-104px',
							border: `${colors.brand.light} 3px solid`
						}} 
						src="src/styles/profile-pic.png" 
					/>
				}
				description={
					<Title 
						level={5}
						style={{
							fontWeight: 'normal'
						}}
					>
						{userData.description}
					</Title>
				}
			/>
		</Card>
	)
};

export default MainCard; 