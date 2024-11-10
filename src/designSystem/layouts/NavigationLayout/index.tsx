import { Button, Flex, Layout } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Mobilebar } from './components/Mobilebar'
import { NavigationItem } from './types'

const { Header } = Layout

interface Props {
  children: ReactNode
}

const SIDEBAR_WIDTH = '280px'

const TopbarContainer = styled(Header)`
  background: white;
  height: 80px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E8E8E8;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`

const LogoContainer = styled(Flex)`
  gap: 12px;
  align-items: center;
`

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #305e89;
`

const LeftbarContainer = styled(Flex)`
  width: ${SIDEBAR_WIDTH};
  background: #305e89;
  padding: 24px 16px;
  flex-direction: column;
  gap: 12px;
  height: calc(100vh - 80px);
  margin-top: 80px;
  position: fixed;
  border-right: 1px solid #E8E8E8;
`

const NavButton = styled(Button)`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background: transparent;
  border: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin: 4px 0;
  text-align: center;

  &:hover {
    background: #dbd0c5;
    color: #654321;
  }

  &.selected {
    background: #dbd0c5;
    color: #000000;
  }
`

const MainContainer = styled(Flex)`
  margin-left: ${SIDEBAR_WIDTH};
  margin-top: 80px;
  width: calc(100% - ${SIDEBAR_WIDTH});
  height: calc(100vh - 80px);
  overflow-y: auto;
`

const CustomTopbar = styled(Flex)`
  height: 80px;
  padding: 0 24px;
  align-items: center;
  background: white;
  border-bottom: 1px solid #E8E8E8;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'leftbar',
      onClick: () => goTo('/home'),
    },
    {
      key: '/payments',
      label: 'Payments',
      position: 'leftbar',
      onClick: () => goTo('/payments'),
    },
    {
      key: '/budget',
      label: 'Budget Dashboard',
      position: 'leftbar',
      onClick: () => goTo('/budget'),
    },
    {
      key: '/events',
      label: 'Events',
      position: 'leftbar',
      onClick: () => goTo('/events'),
    },
    {
      key: '/fundraising',
      label: 'Fundraising',
      position: 'leftbar',
      onClick: () => goTo('/fundraising'),
    },
    {
      key: '/admin',
      label: 'Admin Dashboard',
      position: 'leftbar',
      onClick: () => goTo('/admin'),
    },
    {
      key: '/expenses',
      label: 'Expense Requests',
      position: 'leftbar',
      onClick: () => goTo('/expenses'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')
  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')
  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )
  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <CustomTopbar>
        <LogoContainer>
          <img src="/logo.png" alt="Logo" style={{objectFit: 'contain'}} width={45} height={45} />
          <LogoText>PsiFy</LogoText>
        </LogoContainer>
      </CustomTopbar>
      <Mobilebar keySelected={keySelected} items={itemsMobile} />
      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <LeftbarContainer>
          <Flex vertical gap={8} flex={1}>
            {itemsLeftbar.map((item) => (
              <NavButton
                key={item.key}
                className={keySelected === item.key ? 'selected' : ''}
                onClick={item.onClick}
              >
                {item.label}
              </NavButton>
            ))}
          </Flex>
          {itemsLeftbottom.length > 0 && (
            <Flex vertical gap={8}>
              {itemsLeftbottom.map((item) => (
                <NavButton
                  key={item.key}
                  className={keySelected === item.key ? 'selected' : ''}
                  onClick={item.onClick}
                >
                  {item.label}
                </NavButton>
              ))}
            </Flex>
          )}
        </LeftbarContainer>
        <MainContainer>
          {children}
        </MainContainer>
      </Flex>
    </>
  )
}
