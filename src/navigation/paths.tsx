import { Login, Home, Profile } from "src/pages";

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
		path: "/profile",
		element: <Profile />
	}
];
