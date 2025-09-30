# Contentful + Apollo Codegen Setup

This project is configured to work with Contentful using Apollo GraphQL code generation for type-safe queries.

## Setup

1. **Environment Variables**: Update the `.env.local` file with your actual Contentful credentials:
   ```bash
   # Edit .env.local and replace the placeholder values
   CONTENTFUL_SPACE_ID=your_actual_space_id
   CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_actual_preview_token
   ```

2. **Required Environment Variables**:
   - `CONTENTFUL_SPACE_ID`: Your Contentful space ID
   - `CONTENTFUL_ACCESS_TOKEN`: Your Contentful access token
   - `CONTENTFUL_PREVIEW_ACCESS_TOKEN`: Your Contentful preview access token (optional)

## Usage

### Generate Types
To generate TypeScript types from your Contentful GraphQL schema:

```bash
npm run codegen
```

To watch for changes and regenerate types automatically:

```bash
npm run codegen:watch
```

### Writing GraphQL Queries
1. Create `.graphql` files in the `src/graphql/` directory
2. Run `npm run codegen` to generate types
3. Import and use the generated types in your components

Example:
```typescript
import { GetEntriesQuery, GetEntriesDocument } from '@/contentful-types';

// Use the generated types in your component
```

### Code Formatting
Format your code using Prettier:

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

## File Structure

- `codegen.yml`: Apollo codegen configuration
- `.prettierrc`: Prettier configuration
- `.prettierignore`: Files to ignore during formatting
- `src/graphql/`: Directory for your GraphQL queries
- `src/contentful-types.ts`: Generated TypeScript types (auto-generated)

## Generated Files

The codegen will create `src/contentful-types.ts` with:
- TypeScript types for all your GraphQL queries
- Type-safe query documents
- Proper typing for Contentful's GraphQL schema
