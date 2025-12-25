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
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CodeExampleProps {
  codes: Array<{ language: string; filename: string; code: string }>
  className?: string
}

const CodeExample = ({ codes, className }: CodeExampleProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')

  return (
    <section className={cn('py-32', className)}>
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <Tabs defaultValue="javascript" onValueChange={setSelectedLanguage}>
          <TabsList className="h-10 w-full">
            <TabsTrigger value="javascript">Javascript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="go">Go</TabsTrigger>
            <TabsTrigger value="ruby">Ruby</TabsTrigger>
          </TabsList>
        </Tabs>
        <CodeBlock data={codes} value={selectedLanguage} className="w-full">
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <CodeBlockFilename key={item.language} value={item.language}>
                  {item.filename}
                </CodeBlockFilename>
              )}
            </CodeBlockFiles>
            <CodeBlockCopyButton
              onCopy={() => console.log('Copied code to clipboard')}
              onError={() => console.error('Failed to copy code to clipboard')}
            />
          </CodeBlockHeader>
          <ScrollArea className="w-full">
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem key={item.language} value={item.language} className="max-h-96 w-full">
                  <CodeBlockContent language={item.language as BundledLanguage}>{item.code}</CodeBlockContent>
                </CodeBlockItem>
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
