import { LoginCard } from "./components"

export type TLoginView = {
}

export const LoginView = ({
}: TLoginView) => {
  

  return (
    <LoginCard
      height='750px'
      maxHeight="calc( 100vh - 32px )"
      width='400px'
    />
  )
}
