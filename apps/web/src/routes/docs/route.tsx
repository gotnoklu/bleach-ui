import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router'
import { Fragment } from 'react'
import { AppSidebar } from '../../components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/breadcrumb'
import { Separator } from '../../components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'

export const Route = createFileRoute('/docs')({
  component: DocsLayoutComponent,
  context: () => ({ title: 'Docs' }),
})

function DocsLayoutComponent() {
  const matchedRoutes = useMatches()
  const currentRoute = matchedRoutes[matchedRoutes.length - 1]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {(currentRoute.context as { title: string }).title.split('/').map((part, index, self) => {
                return (
                  <Fragment
                    key={`${part}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: it's static
                      index
                    }`}
                  >
                    <BreadcrumbItem className={index < self.length - 1 ? 'hidden md:block' : undefined}>
                      {index < self.length - 1 ? (
                        <BreadcrumbLink href="#">{part}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{part}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < self.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="max-w-xl">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
