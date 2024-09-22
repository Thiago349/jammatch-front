import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Card, Flex } from "antd";

import { getUserSelf } from "src/services/api/endpoints";

import { Avatar, Cover, Description, EditBannerBtn, Name } from "./components";
import { EditProfileModal } from "./modals";

import { colors } from "src/styles/colors";
import { languages } from 'src/resources/languages';

export type TProfileView = {
}

export const ProfileView = ({
}: TProfileView) => {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
	const [bannerKey, setBannerKey] = useState<number>(Date.now())

  const { data: userSelf, isLoading: isLoadingUserSelf } = useQuery({
		queryKey: ['getUserSelf'],
		queryFn: getUserSelf
  })

  return (
    <Flex justify="center" style={{ padding: '24px', width: '100%', height: 'fit-content', gap: '24px'  }}>
      <Card 
        styles={{
          body: {
            padding: '16px'
          }
        }}
        style={{ 
          height: 'fit-content', 
          width: '100%', 
          maxWidth: '1128px',
          backgroundColor: colors.brand.light,
          cursor: 'default',
        }}
        bordered={false}
        cover={<Cover 
          profile={userSelf?.profile}
          isLoadingProfile={isLoadingUserSelf}
          bannerKey={bannerKey}
        />}
      >
        <Flex
          justify="flex-end"
          style={{
            position: 'absolute',
            top: '16px',
            width: 'calc(100% - 32px)',
          }}
        >
          <EditBannerBtn 
            profile={userSelf?.profile}
            setBannerKey={setBannerKey}
          />
        </Flex>
        <Card.Meta
          title={<Name 
            profile={userSelf?.profile}
            isLoadingProfile={isLoadingUserSelf}
            setEditProfileModal={setEditProfileModal}
          />}
          avatar={<Avatar 
            profile={userSelf?.profile}
            isLoadingProfile={isLoadingUserSelf}
          />}
          description={<Description 
            description={userSelf?.profile?.description}
            isLoadingProfile={isLoadingUserSelf}
          />}
        />
      </Card>
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
