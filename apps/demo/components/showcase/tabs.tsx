import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import Tabs from 'bleach/dist/components/Tabs'
import Icon from 'bleach/dist/components/Icon'
import { useState } from 'react'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const TabsShowcase = () => {
  const [basicTab, setBasicTab] = useState('tab1')
  const [iconTab, setIconTab] = useState('home')
  const [fullWidthTab, setFullWidthTab] = useState('tab1')
  const [stateTab, setStateTab] = useState('active')
  const [styledTab, setStyledTab] = useState('music')

  return (
    <Section>
      <Typography variant="h5">Tabs</Typography>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <Box sx={() => ({ gap: 12 })}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Standard
            </Typography>
            <Tabs value={basicTab} onChange={setBasicTab} variant="standard">
              <Tabs.Tab label="Overview" value="tab1" />
              <Tabs.Tab label="Details" value="tab2" />
              <Tabs.Tab label="Settings" value="tab3" />
            </Tabs>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Scrollable
            </Typography>
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
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <Box sx={() => ({ gap: 12 })}>
          <Tabs value={stateTab} onChange={setStateTab}>
            <Tabs.Tab label="Active" value="active" />
            <Tabs.Tab label="Disabled" value="disabled" disabled />
            <Tabs.Tab label="Long Tab Label" value="long" />
          </Tabs>
        </Box>
      </SubSection>

      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Styles
        </Typography>
        <Box sx={() => ({ gap: 12 })}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              With Icons
            </Typography>
            <Tabs value={iconTab} onChange={setIconTab}>
              <Tabs.Tab label="Home" value="home" icon={<Icon name="home" size={20} />} />
              <Tabs.Tab label="Search" value="search" icon={<Icon name="search" size={20} />} />
              <Tabs.Tab label="Gear" value="settings" icon={<Icon name="gear" size={20} />} />
            </Tabs>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Custom Styled
            </Typography>
            <Tabs
              value={styledTab}
              onChange={setStyledTab}
              slotProps={{
                tabsContainer: {
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
              <Tabs.Tab label="Music" value="music" icon={<Icon name="play" size={20} />} />
              <Tabs.Tab label="Videos" value="videos" icon={<Icon name="video" size={20} />} />
              <Tabs.Tab label="Photos" value="photos" icon={<Icon name="image" size={20} />} />
            </Tabs>
          </Box>
        </Box>
      </SubSection>
    </Section>
  )
}
