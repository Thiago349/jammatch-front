import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface LanguageState {
    name: string
}

const languageInitialState: LanguageState = {
    name: 'portuguese',
}

const LanguageSlice = createSlice({
    name: "language",
    initialState: languageInitialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<{ name: string }>) => {
            return { name: action.payload.name }
        }
    }
})

interface AuthenticationState {
    status: boolean
    token: string | null, 
    refreshToken: string | null
}

const authenticationInitialState: AuthenticationState = {
    status: false,
    token: null,
    refreshToken: null
}

const AuthenticationSlice = createSlice({
    name: "authentication",
    initialState: authenticationInitialState,
    reducers: {
        authorize: (state, action: PayloadAction<{ token: string, refreshToken: string }>) => {
            return { status: true, token: action.payload.token, refreshToken: action.payload.refreshToken }
        },
        unauthorize: (state) => {
            return { status: false, token: null, refreshToken: null }
        }
    }
})

interface SiderState {
    expanded: boolean
}

const siderInitialState: SiderState = {
    expanded: false
}

const SiderSlice = createSlice({
    name: "sider",
    initialState: siderInitialState,
    reducers: {
        expand: (state) => {
            return { expanded: true }
        },
        retract: (state) => {
            return { expanded: false }
        }
    }
})

const authenticationPersistConfig = {
    key: 'authentication',
    storage,
}
  
const persistedAuthenticationReducer = persistReducer(authenticationPersistConfig, AuthenticationSlice.reducer)
const persistedLanguageReducer = persistReducer(authenticationPersistConfig, LanguageSlice.reducer)
const persistedSiderReducer = persistReducer(authenticationPersistConfig, SiderSlice.reducer)

export const store = configureStore({
    reducer: {
        authentication: persistedAuthenticationReducer,
        language: persistedLanguageReducer,
        sider: persistedSiderReducer
    },
})

export const persistor = persistStore(store)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export const { authorize, unauthorize } = AuthenticationSlice.actions
export const { changeLanguage } = LanguageSlice.actions
export const { expand, retract } = SiderSlice.actions