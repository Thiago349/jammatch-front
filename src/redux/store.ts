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
    refreshToken: string | null,
    username: string | null
}

const authenticationInitialState: AuthenticationState = {
    status: false,
    token: null,
    refreshToken: null,
    username: null
}

const AuthenticationSlice = createSlice({
    name: "authentication",
    initialState: authenticationInitialState,
    reducers: {
        authorize: (_, action: PayloadAction<{ token: string, refreshToken: string, username: string }>) => {
            return { status: true, token: action.payload.token, refreshToken: action.payload.refreshToken, username: action.payload.username }
        },
        unauthorize: (_) => {
            return { status: false, token: null, refreshToken: null, username: null }
        }
    }
})

interface SpotifyAuthenticationState {
    status: boolean
    token: string | null, 
    refreshToken: string | null
}

const spotifyAuthenticationInitialState: SpotifyAuthenticationState = {
    status: false,
    token: null,
    refreshToken: null,
}

const SpotifyAuthenticationSlice = createSlice({
    name: "spotifyAuthentication",
    initialState: spotifyAuthenticationInitialState,
    reducers: {
        spotifyAuthorize: (_, action: PayloadAction<{ token: string, refreshToken: string }>) => {
            return { status: true, token: action.payload.token, refreshToken: action.payload.refreshToken }
        },
        spotifyUnauthorize: (_) => {
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
        expand: () => {
            return { expanded: true }
        },
        retract: () => {
            return { expanded: false }
        }
    }
})

const authenticationPersistConfig = {
    key: 'authentication',
    storage,
}

const spotifyAuthenticationPersistConfig = {
    key: 'spotifyAuthentication',
    storage,
}

const languagePersistConfig = {
    key: 'language',
    storage,
}

const siderPersistConfig = {
    key: 'sider',
    storage,
}
const persistedAuthenticationReducer = persistReducer(authenticationPersistConfig, AuthenticationSlice.reducer)
const persistedSpotifyAuthenticationReducer = persistReducer(spotifyAuthenticationPersistConfig, SpotifyAuthenticationSlice.reducer)
const persistedLanguageReducer = persistReducer(languagePersistConfig, LanguageSlice.reducer)
const persistedSiderReducer = persistReducer(siderPersistConfig, SiderSlice.reducer)

export const store = configureStore({
    reducer: {
        authentication: persistedAuthenticationReducer,
        spotifyAuthentication: persistedSpotifyAuthenticationReducer,
        language: persistedLanguageReducer,
        sider: persistedSiderReducer
    },
})

export const persistor = persistStore(store)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export const { authorize, unauthorize } = AuthenticationSlice.actions
export const { spotifyAuthorize, spotifyUnauthorize } = SpotifyAuthenticationSlice.actions
export const { changeLanguage } = LanguageSlice.actions
export const { expand, retract } = SiderSlice.actions