import { createFileRoute } from '@tanstack/react-router'
import { CodeExample } from '../../../components/code-example'

export const Route = createFileRoute('/docs/components/avatar')({
  component: AvatarComponentPage,
  context: () => ({ title: 'Components/Avatar' }),
})

const codes = [
  {
    id: 'javascript',
    label: 'JavaScript',
    language: 'javascript',
    filename: 'database-query.js',
    code: `// Node.js database query using Prisma ORM
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user
const user = await prisma.user.create({
  data: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28,
    profile: {
      create: {
        bio: 'Software developer passionate about clean code'
      }
    }
  }
});

console.log('Created user:', user);

// Alternative using raw SQL with mysql2
const mysql = require('mysql2/promise');
const connection = await mysql.createConnection(config);
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE age > ? AND active = ?',
  [25, true]
);`,
  },
  {
    id: 'typescript',
    label: 'Typescript',
    language: 'typescript',
    filename: 'database-query.js',
    code: `// Node.js database query using Prisma ORM
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user
const user = await prisma.user.create({
  data: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28,
    profile: {
      create: {
        bio: 'Software developer passionate about clean code'
      }
    }
  }
});

console.log('Created user:', user);

// Alternative using raw SQL with mysql2
const mysql = require('mysql2/promise');
const connection = await mysql.createConnection(config);
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE age > ? AND active = ?',
  [25, true]
);`,
  },
]

function AvatarComponentPage() {
  return <CodeExample codes={codes} />
}
