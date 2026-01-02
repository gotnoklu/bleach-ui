// src/components/mdx-components.tsx
import { Button } from '@/components/ui/button'
import type { MDXComponents } from 'mdx/types'
import { CodeExample } from './code-example'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { cn } from '../lib/utils'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export const AppMdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold py-8" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold py-8" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold py-8" {...props} />,
  h4: (props) => <h4 className="text-xl font-bold py-8" {...props} />,
  h5: (props) => <h4 className="text-lg font-bold py-8" {...props} />,
  h6: (props) => <h4 className="text-md font-bold py-8" {...props} />,
  p: (props) => <p className="text-md font-medium" {...props} />,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  CodeExample: (props) => <CodeExample className="py-8" {...props} />,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  table: (props) => (
    <div className="table">
      <table className="border-collapse w-full" {...props} />
    </div>
  ),
  th: (props) => <th className="border-gray-200 border p-2" {...props} />,
  td: (props) => <td className="border-gray-200 border p-2" {...props} />,
  code: ({ className, ...props }) => (
    <code className={cn('text-sm font-medium rounded-sm border w-fit inline px-1 py-0.5', className)} {...props} />
  ),
}
