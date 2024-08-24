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
            state.name = action.payload.name
        }
    }
})

interface AuthenticationState {
    status: boolean
    email: string | null
}

const authenticationInitialState: AuthenticationState = {
    status: false,
    email: null
}

const AuthenticationSlice = createSlice({
    name: "authentication",
    initialState: authenticationInitialState,
    reducers: {
        authorize: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email
            state.status = true
        },
        unauthorize: (state) => {
            state.email = null
            state.status = false
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
        changeExpanded: (state, action: PayloadAction<{ email: string }>) => {
            state.expanded = !state.expanded
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
export const { changeExpanded } = SiderSlice.actions