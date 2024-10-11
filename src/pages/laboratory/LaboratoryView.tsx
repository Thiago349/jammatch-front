import { useState } from "react"

import { Card, Flex } from "antd"
import { Body } from "./components"

import { useUserData } from "src/hooks"

import { colors } from "src/styles/colors"

export type TLaboratoryView = {
}

export const LaboratoryView = ({
}: TLaboratoryView) => {
  const { userSelf, isLoadingUserSelf } = useUserData()

  return (
    <Flex justify="center" style={{ padding: '24px', width: '100%', gap: '24px'  }}>
      <Card 
        styles={{
          body: {
            height: '100%',
            width: '100%',
            padding: '16px'
          }
        }}
        style={{ 
          height: '100%', 
          width: '100%',
          maxWidth: '1128px',
          backgroundColor: colors.brand.light,
          cursor: 'default',
        }}
        bordered={false}
      >
        <Body
          profile={userSelf?.profile}
          isLoadingProfile={isLoadingUserSelf}
        />
      </Card>
    </ Flex>
  )
}
