import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Flex } from "antd";

import { getUserSelf } from "src/services/api/endpoints";

import { MainCard } from "./components";
import { EditProfileModal } from "./modals";


export type TProfileView = {
}

export const ProfileView = ({
}: TProfileView) => {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)

  const { data: userSelf, isLoading: isLoadingUserSelf } = useQuery({
		queryKey: ['getUserSelf'],
		queryFn: getUserSelf
  })

  return (
    <Flex justify="center" style={{ padding: '24px', width: '100%', height: 'fit-content', gap: '24px'  }}>
      <MainCard 
        width="100%" 
        setEditProfileModal={setEditProfileModal}
        profile={userSelf?.profile}
        isLoadingProfile={isLoadingUserSelf}
      />
      {
        userSelf?.profile ?
        <EditProfileModal 
          setModalStatus={setEditProfileModal}
          modalStatus={editProfileModal}
          profile={userSelf?.profile}
        /> :
        null
      }
    </ Flex>
  )
}
