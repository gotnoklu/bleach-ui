import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { IconChevronRight } from '@tabler/icons-react'
import { GalleryVerticalEnd } from 'lucide-react'
import type * as React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Installation',
          url: '/docs/getting-started/installation',
        },
      ],
    },
    {
      title: 'Building Your App',
      items: [
        {
          title: 'Theming',
          url: '/docs/building-your-app/theming',
        },
        {
          title: 'Styling',
          url: '/docs/building-your-app/styling',
          isActive: true,
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Avatar',
          url: '/docs/components/avatar',
        },
        {
          title: 'Background View',
          url: '/docs/components/background-view',
        },
        {
          title: 'Badge',
          url: '/docs/components/badge',
        },
        {
          title: 'Box',
          url: '/docs/',
        },
        {
          title: 'Button',
          url: '/docs/',
        },
        {
          title: 'Card',
          url: '/docs/',
        },
        {
          title: 'Checkbox',
          url: '/docs/',
        },
        {
          title: 'Chip',
          url: '/docs/',
        },
        {
          title: 'Color',
          url: '/docs/',
        },
        {
          title: 'Date/Time Picker',
          url: '/docs/',
        },
        {
          title: 'Select',
          url: '/docs/',
        },
        {
          title: 'Icons',
          url: '/docs/',
        },
        {
          title: 'Input',
          url: '/docs/',
        },
        {
          title: 'List Item',
          url: '/docs/',
        },
        {
          title: 'List Item Button',
          url: '/docs/',
        },
        {
          title: 'Popup',
          url: '/docs/',
        },
        {
          title: 'Progress',
          url: '/docs/',
        },
        {
          title: 'Separator',
          url: '/docs/',
        },
        {
          title: 'Show',
          url: '/docs/',
        },
        {
          title: 'Slider',
          url: '/docs/',
        },
        {
          title: 'Switch',
          url: '/docs/',
        },
        {
          title: 'Tabs',
          url: '/docs/',
        },
        {
          title: 'Text',
          url: '/docs/',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/docs/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Bleeech Docs</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible key={item.title} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <p className="font-medium">{item.title}</p>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.items?.length ? (
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild isActive={item.isActive}>
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
