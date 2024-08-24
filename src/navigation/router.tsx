import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from "src/redux/store";

import { Login } from 'src/pages';
import { MenuLayout } from 'src/components/MenuLayout/MenuLayout';

import { paths, PathProps } from './paths';

export const Router = () => {
    const isAuthenticated = useAppSelector(state => state.authentication.status)
    return (
        <BrowserRouter>
            <Routes>
                {
                    !isAuthenticated ? 
                    <>
                        <Route path="/*" element={<Navigate to="login" replace />} />
                        <Route path="/login" element={<Login/>}/>
                    </> :
                    <>  
                        <Route path="/*" element={<Navigate to="home" replace />} />
                        <Route path="/login" element={<Login/>}/>
                        {
                            paths.map((p: PathProps) => {
                                const {
                                    path,
                                    element
                                } = p;
                                return (
                                    <Route path={path} key={path} element={
                                        <MenuLayout>
                                            {element}
                                        </MenuLayout>
                                    }/>
                                )
                            })
                        }
                    </>
                }
            </Routes>
        </BrowserRouter>
    )
}
