import { LoginView } from './LoginView'
import { Layout } from "antd"
const { Content } = Layout;

export const Login = () => {
  const contentStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  };
  
  const layoutStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    background: "linear-gradient(90deg, rgba(50,0,71,1) 0%, rgba(11,17,26,1) 75%)"
  };

  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <LoginView/>
      </Content>
    </Layout>
  )
}

export default Login