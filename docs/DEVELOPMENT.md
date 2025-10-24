# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)
- Backend API access

### Initial Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/ideaholiday/37.git
   cd 37
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── flights/           # Flight booking flow
│   ├── hotels/            # Hotel booking flow
│   ├── b2b/               # B2B portal
│   │   ├── admin/         # Admin dashboard
│   │   ├── agent/         # Agent portal
│   │   └── staff/         # Staff portal
│   └── my-bookings/       # User bookings
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── features/         # Feature-specific components
│   └── layout/           # Layout components
├── services/             # API service layer
│   ├── api-client.ts     # Base HTTP client
│   ├── flight-service.ts # Flight APIs
│   └── hotel-service.ts  # Hotel APIs
├── store/                # Zustand state stores
│   ├── auth-store.ts     # Authentication state
│   └── flight-store.ts   # Flight search state
├── types/                # TypeScript definitions
│   ├── flight.ts         # Flight types
│   ├── hotel.ts          # Hotel types
│   └── user.ts           # User & auth types
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── config/               # App configuration
│   └── index.ts          # Environment config
└── hooks/                # Custom React hooks
```

## Key Technologies

### Core
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: Accessible component library

### State & Data
- **Zustand**: Global state management
- **TanStack Query**: Server state & caching
- **React Hook Form**: Form management
- **Zod**: Schema validation

### UI & Animation
- **Radix UI**: Headless components
- **Framer Motion**: Animations
- **Lucide React**: Icons

## Development Workflow

### 1. Create a New Feature

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Test locally
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### 2. Component Development

Create a new UI component:

```typescript
// src/components/ui/my-component.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
  children: React.ReactNode
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  )
}
```

Create a feature component:

```typescript
// src/components/features/flight-card.tsx
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Flight } from '@/types/flight'

interface FlightCardProps {
  flight: Flight
  onSelect: (flight: Flight) => void
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <Card>
      <h3>{flight.airline.name}</h3>
      <Button onClick={() => onSelect(flight)}>
        Select Flight
      </Button>
    </Card>
  )
}
```

### 3. API Integration

Create a new service:

```typescript
// src/services/my-service.ts
import { apiClient } from './api-client'

export const myService = {
  async getData(): Promise<MyData> {
    return apiClient.get('/my-endpoint')
  },
  
  async postData(data: MyInput): Promise<MyOutput> {
    return apiClient.post('/my-endpoint', data, { requiresAuth: true })
  }
}
```

Use in component with TanStack Query:

```typescript
'use client'

import { useQuery } from '@tanstack/react-query'
import { myService } from '@/services/my-service'

export function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-data'],
    queryFn: () => myService.getData()
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{JSON.stringify(data)}</div>
}
```

### 4. State Management

Create a Zustand store:

```typescript
// src/store/my-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MyStore {
  items: string[]
  addItem: (item: string) => void
  removeItem: (item: string) => void
}

export const useMyStore = create<MyStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      removeItem: (item) => set((state) => ({ 
        items: state.items.filter(i => i !== item) 
      })),
    }),
    { name: 'my-storage' }
  )
)
```

Use in component:

```typescript
'use client'

import { useMyStore } from '@/store/my-store'

export function MyComponent() {
  const { items, addItem } = useMyStore()
  
  return (
    <div>
      <button onClick={() => addItem('new item')}>Add</button>
      {items.map(item => <div key={item}>{item}</div>)}
    </div>
  )
}
```

### 5. Form Handling

Create a form with validation:

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      
      <Button type="submit">Login</Button>
    </form>
  )
}
```

## Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Styling Guidelines

### Tailwind CSS

Use Tailwind utility classes:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold">Title</h2>
  <Button className="bg-primary hover:bg-primary/90">Action</Button>
</div>
```

### Custom Styles

Use the `cn` utility for conditional classes:

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className
)}>
  Content
</div>
```

## Common Patterns

### Loading State

```tsx
{isLoading && <LoadingSpinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}
```

### Error Boundary

```tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Suspense

```tsx
import { Suspense } from 'react'

<Suspense fallback={<LoadingSkeleton />}>
  <DataComponent />
</Suspense>
```

## Debugging

### Enable Debug Mode

```env
NEXT_PUBLIC_DEBUG=true
```

### Chrome DevTools

- Use React DevTools for component inspection
- Use Network tab for API debugging
- Use Console for logs

### VS Code Configuration

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs/)
