import { useAppSelector } from "src/redux/store";

import { Layout } from "antd"

import { colors } from 'src/styles/colors';

import { MenuHeader, MenuSider } from '.';

const { Content } = Layout;

type MenuLayoutProps = {
	children?: JSX.Element | string,
}

export const MenuLayout = ({children}: MenuLayoutProps) => {
  const contentStyle: React.CSSProperties = {
    minHeight: `calc( 100vh - 48px )`,
    display: 'flex',
    backgroundColor: colors.primaryNeutral[200],
    overflowX: 'hidden',
    overflowY: 'scroll',
    scrollbarWidth: 'none'
  };

  const layoutStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  };

  return (
    <Layout style={layoutStyle}>
      <MenuHeader />
      <Layout>
        <MenuSider />
        <Content style={contentStyle}>
			    {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MenuLayout