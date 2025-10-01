#!/usr/bin/env node

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';

// Check if required environment variables are present
const spaceId = process.env.NUXT_PUBLIC_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.NUXT_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  console.error('❌ Missing required environment variables:');
  if (!spaceId) console.error('   - NUXT_PUBLIC_SPACE_ID or CONTENTFUL_SPACE_ID');
  if (!accessToken) console.error('   - NUXT_ACCESS_TOKEN or CONTENTFUL_ACCESS_TOKEN');
  console.error('\nPlease ensure your .env file contains the required Contentful credentials.');
  process.exit(1);
}

console.log('✅ Environment variables loaded successfully');
console.log(`📡 Using Contentful Space ID: ${spaceId}`);

// Generate dynamic codegen config
const codegenConfig = {
  overwrite: true,
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${spaceId}`]: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/contentful-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations"
      ],
      config: {
        skipTypename: false,
        withHooks: false,
        withComponent: false,
        withHOC: false,
        scalars: {
          DateTime: "string",
          JSON: "any"
        }
      }
    }
  }
};

// Write temporary config file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tempConfigPath = path.join(__dirname, '..', 'codegen.temp.yml');
fs.writeFileSync(tempConfigPath, yaml.dump(codegenConfig));

try {
  console.log('🔄 Generating types...');
  execSync(`graphql-codegen --config ${tempConfigPath}`, { stdio: 'inherit' });
  console.log('✅ Types generated successfully!');
} catch (error) {
  console.error('❌ Codegen failed:', error.message);
  process.exit(1);
} finally {
  // Clean up temporary config file
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
  }
}
