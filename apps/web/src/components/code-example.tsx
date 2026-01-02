'use client'

import type { BundledLanguage } from '@/components/kibo-ui/code-block'
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from '@/components/kibo-ui/code-block'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type ReactNode, useMemo, useState } from 'react'
import { Show } from './show'

export interface CodeExampleProps {
  codes: Array<{
    language: BundledLanguage
    filename: string
    code: string
    label: string
    id: string
    icon?: ReactNode
  }>
  className?: string
}

const CodeExample = ({ codes, className }: CodeExampleProps) => {
  const [selectedCode, setSelectedCode] = useState({ tab: codes[0].id, language: codes[0].language })

  const codesIndex = useMemo(
    () =>
      codes.reduce(
        (result, code, index) => {
          result[code.id] = index
          return result
        },
        {} as { [key: string]: number }
      ),
    []
  )

  return (
    <section className={className}>
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <Tabs
          defaultValue={selectedCode.tab}
          onValueChange={(tab) =>
            setSelectedCode((prev) => ({ ...prev, tab, language: codes[codesIndex[tab]].language }))
          }
        >
          <TabsList className="h-10">
            {codes.map((code) => (
              <TabsTrigger key={code.id} value={code.id} className="px-8">
                {code.icon}
                {code.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <CodeBlock data={codes} value={selectedCode.language} className="w-full">
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <Show key={item.id} when={item.id === selectedCode.tab}>
                  <CodeBlockFilename key={item.id} value={item.language}>
                    {item.filename}
                  </CodeBlockFilename>
                </Show>
              )}
            </CodeBlockFiles>
            <CodeBlockCopyButton />
          </CodeBlockHeader>
          <ScrollArea className="w-full">
            <CodeBlockBody>
              {(item) => (
                <Show key={item.id} when={item.id === selectedCode.tab}>
                  <CodeBlockItem value={item.language} className="max-h-96 w-full">
                    <CodeBlockContent language={item.language as BundledLanguage}>{item.code}</CodeBlockContent>
                  </CodeBlockItem>
                </Show>
              )}
            </CodeBlockBody>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CodeBlock>
      </div>
    </section>
  )
}

export { CodeExample }
