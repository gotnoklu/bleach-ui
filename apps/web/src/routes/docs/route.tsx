/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { createFileRoute, useMatches } from '@tanstack/react-router'
import type { ReactNode } from 'react'
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

type DocsLayoutComponentProps = {
  children?: ReactNode
}

function DocsLayoutComponent({ children, ...p }: DocsLayoutComponentProps) {
  const matchedRoutes = useMatches()
  const currentRoute = matchedRoutes[matchedRoutes.length - 1]

  console.log(children, p)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {(currentRoute.context as { title: string }).title.split('/').map((part, index, self) => (
                <>
                  <BreadcrumbItem
                    key={`${part}-${index}`}
                    className={index < self.length - 1 ? 'hidden md:block' : undefined}
                  >
                    {index < self.length - 1 ? (
                      <BreadcrumbLink href="#">{part}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{part}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < self.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="max-w-xl bg-red-950">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
