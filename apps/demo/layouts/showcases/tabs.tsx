import { Box } from '@bleach/ui/components/box'
import { IconCaretRight, IconHome, IconMountain, IconSearch, IconSettings, IconVideo } from '@bleach/ui/components/icon'
import { Tabs } from '@bleach/ui/components/tabs'
import { Text } from '@bleach/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export const TabsShowcase = () => {
  const [basicTab, setBasicTab] = useState('tab1')
  const [iconTab, setIconTab] = useState('home')
  const [fullWidthTab, setFullWidthTab] = useState('tab1')
  const [stateTab, setStateTab] = useState('active')
  const [styledTab, setStyledTab] = useState('music')

  return (
    <Section>
      <Text variant="h5">Tabs</Text>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          Variants
        </Text>
        <Box style={{ gap: 12 }}>
          <Box>
            <Text variant="body2" color="text.secondary" gutterBottom>
              Standard
            </Text>
            <Tabs value={basicTab} onChange={setBasicTab} variant="standard">
              <Tabs.Tab label="Overview" value="tab1" />
              <Tabs.Tab label="Details" value="tab2" />
              <Tabs.Tab label="Settings" value="tab3" />
            </Tabs>
          </Box>
          <Box>
            <Text variant="body2" color="text.secondary" gutterBottom>
              Scrollable
            </Text>
            <Tabs value={fullWidthTab} onChange={setFullWidthTab} variant="scrollable">
              <Tabs.Tab label="Profile" value="tab1" />
              <Tabs.Tab label="Posts" value="tab2" />
              <Tabs.Tab label="Photos" value="tab3" />
              <Tabs.Tab label="Following" value="tab4" />
              <Tabs.Tab label="Followers" value="tab5" />
              <Tabs.Tab label="Likes" value="tab6" />
            </Tabs>
          </Box>
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          States
        </Text>
        <Box style={{ gap: 12 }}>
          <Tabs value={stateTab} onChange={setStateTab}>
            <Tabs.Tab label="Active" value="active" />
            <Tabs.Tab label="Disabled" value="disabled" disabled />
            <Tabs.Tab label="Long Tab Label" value="long" />
          </Tabs>
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="h6" color="text.secondary">
          Styles
        </Text>
        <Box style={{ gap: 12 }}>
          <Box>
            <Text variant="body2" color="text.secondary" gutterBottom>
              With Icons
            </Text>
            <Tabs value={iconTab} onChange={setIconTab}>
              <Tabs.Tab label="Home" value="home" icon={<IconHome size={20} />} />
              <Tabs.Tab label="Search" value="search" icon={<IconSearch size={20} />} />
              <Tabs.Tab label="Gear" value="settings" icon={<IconSettings size={20} />} />
            </Tabs>
          </Box>
          <Box>
            <Text variant="body2" color="text.secondary" gutterBottom>
              Custom Styled
            </Text>
            <Tabs
              value={styledTab}
              onChange={setStyledTab}
              viewProps={{
                tabsView: {
                  style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: 8,
                    padding: 4,
                    borderBottomWidth: 0,
                  },
                },
                tab: (state) => ({
                  style: {
                    borderRadius: 12,
                    minHeight: 40,
                    backgroundColor: state.isSelected ? '#FFFFFF' : 'transparent',
                    elevation: state.isSelected ? 1 : 0,
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: state.isSelected ? 1 : 0,
                    shadowRadius: 2,
                  },
                }),
                indicator: {
                  style: {
                    display: 'none',
                  },
                },
              }}
            >
              <Tabs.Tab label="Music" value="music" icon={<IconCaretRight size={20} />} />
              <Tabs.Tab label="Videos" value="videos" icon={<IconVideo size={20} />} />
              <Tabs.Tab label="Photos" value="photos" icon={<IconMountain size={20} />} />
            </Tabs>
          </Box>
        </Box>
      </SubSection>
    </Section>
  )
}
