import { Card, Flex } from "antd"

import { colors } from "src/styles/colors"

import { Body } from "./components"

export type TLaboratoryView = {
}

export const LaboratoryView = ({
}: TLaboratoryView) => {

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
        <Body />
      </Card>
    </ Flex>
  )
}

export default LaboratoryView
