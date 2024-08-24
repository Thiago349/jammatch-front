import { colors } from "src/styles/colors";
import { MainCard } from "./components";
import { Flex } from "antd";

export type TProfileView = {
}

export const ProfileView = ({
}: TProfileView) => {
  

  return (
    <Flex justify="center" style={{ padding: '24px', width: '100%', height: 'fit-content', gap: '24px'  }}>
      <MainCard width="100%" height="100%"/>
    </ Flex>
  )
}
