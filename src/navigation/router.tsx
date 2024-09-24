import { useEffect } from 'react';

import { Navigate, BrowserRouter, Route, Routes, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useAppSelector, } from "src/redux/store";

import { Login } from 'src/pages';
import { MenuLayout } from 'src/components/MenuLayout/MenuLayout';

import { paths, PathProps } from './paths';

export const Router = () => {
    const status = useAppSelector(state => state?.authentication?.status)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                {   
                    status ?
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
                    }) :
                    <Route path="/*" element={<Navigate to={"login"} replace />} />
                }
            </Routes>
        </BrowserRouter>
    )
}
