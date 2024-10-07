import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch, authorize } from "src/redux/store";

import { Card, Flex } from "antd";
import { CustomButton, LogoLight } from "src/components";

import { postAuth, getUserSelf } from "src/services/api/endpoints";

import { handleSpotifyLogin } from "src/utils"
import { colors } from "src/styles/colors";
import { languages } from "src/resources/languages";

import { Input } from "..";

type LoginCardProps = {
	height: string,
	maxHeight: string,
	width: string
}

export const LoginCard = ({height, maxHeight, width}: LoginCardProps ) => {
	const language = useAppSelector(state => state.language.name)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const[username, setUsername] = useState<string | null>(null)
	const[password, setPassword] = useState<string | null>(null)
	const[token, setToken] = useState<string | null>(null)

	const onSuccess = (data: { 
		token: string 
		refreshToken: string
	}) => {
		dispatch(authorize({...data, username: username}))
		setToken(data.token)
	};
	
	const { mutateAsync: authenticate, isPending: isPending } = useMutation({
		mutationFn: postAuth,
		onSuccess: onSuccess
	});
	
	const { data: userSelf } = useQuery({
		queryKey: ['getUserSelfSpotifyVerification'],
		queryFn: getUserSelf,
		enabled: !!token
	})

	useEffect(() => {
		if (userSelf) {
			if (!userSelf?.spotify) navigate('/home', { replace: true })
			else handleSpotifyLogin()
		}
	}, [userSelf])

	const login = async () => {
		authenticate({'username': username, 'password': password})
	};

	return (
		<Card 
			cover={<LogoLight height="160px" margin="16px 0px 16px 0px" />}
			hoverable 
			style={{ 
				height: height, 
				width: width, 
				maxHeight: maxHeight, 
				backgroundColor: colors.base[1000], 
				borderColor: colors.brand.jamPurple, 
				cursor: 'default' 
			}}
		>
			<Flex 
				vertical 
				justify='space-between' 
				align='center' 
				style={{ 
					height: '100%', 
					width: '100%', 
					gap: '16px' 
				}}>
				<Input
					width="100%"
					title={languages[language].usernameInput}
					color={colors.brand.light}
					onChange={setUsername}
				/>
				<Input
					width="100%"
					title={languages[language].passwordInput}
					color={colors.brand.light}
					password={true}
					onChange={setPassword}
				/>
				<CustomButton
					onClick={login}
					style={{ 
						width: "100%",
						height: 42, 
						fontSize: 16, 
						padding: 8,
						justifySelf: 'flex-end',
					}}
					loading={isPending || !!token}
					defaultBgColor={colors.primaryNeutral[800]}
					defaultColor={colors.brand.light}
					hoverBgColor={colors.brand.jamPurple}
					hoverColor={ colors.brand.light}
				>
					{languages[language].confirmBtn}
				</CustomButton>
			</Flex>
		</Card>
	)
};

export default LoginCard; 