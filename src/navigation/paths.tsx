import { Navigate } from 'react-router-dom'

import { Home, Laboratory, Profile, SpotifyCallback } from "src/pages";

export type PathProps = {
	path: string;
	element: JSX.Element;
};

export const paths: PathProps[] = [
	{
		path: "/home",
		element: <Home />
	},
	{
		path: "/*",
		element: <Navigate to={"home"} replace />
	},
	{
		path: "/profile",
		element: <Profile />
	},
	{
		path: "/laboratory",
		element: <Laboratory />
	},
	{
		path: "/spotify-callback",
		element: <SpotifyCallback />
	}
];
