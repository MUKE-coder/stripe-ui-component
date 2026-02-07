Getting Started
Copy Page

Previous
Next
Learn how to get setup and run your own component registry.

This guide will walk you through the process of setting up your own component registry. It assumes you already have a project with components and would like to turn it into a registry.

If you're starting a new registry project, you can use the registry template as a starting point. We have already configured it for you.

Requirements
You are free to design and host your custom registry as you see fit. The only requirement is that your registry items must be valid JSON files that conform to the registry-item schema specification.

If you'd like to see an example of a registry, we have a template project for you to use as a starting point.

registry.json
The registry.json is the entry point for the registry. It contains the registry's name, homepage, and defines all the items present in the registry.

Your registry must have this file (or JSON payload) present at the root of the registry endpoint. The registry endpoint is the URL where your registry is hosted.

The shadcn CLI will automatically generate this file for you when you run the build command.

Add a registry.json file
Create a registry.json file in the root of your project. Your project can be a Next.js, Vite, Vue, Svelte, PHP or any other framework as long as it supports serving JSON over HTTP.

registry.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry.json",
"name": "acme",
"homepage": "https://acme.com",
"items": [
// ...
]
}
This registry.json file must conform to the registry schema specification.

Add a registry item
Create your component
Add your first component. Here's an example of a simple <HelloWorld /> component:

registry/new-york/hello-world/hello-world.tsx
Copy
import { Button } from "@/components/ui/button"

export function HelloWorld() {
return <Button>Hello World</Button>
}
Note: This example places the component in the registry/new-york directory. You can place it anywhere in your project as long as you set the correct path in the registry.json file and you follow the registry/[NAME] directory structure.

Copy
registry
└── new-york
└── hello-world
└── hello-world.tsx
Add your component to the registry
To add your component to the registry, you need to add your component definition to registry.json.

registry.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry.json",
"name": "acme",
"homepage": "https://acme.com",
"items": [
{
"name": "hello-world",
"type": "registry:block",
"title": "Hello World",
"description": "A simple hello world component.",
"files": [
{
"path": "registry/new-york/hello-world/hello-world.tsx",
"type": "registry:component"
}
]
}
]
}
You define your registry item by adding a name, type, title, description and files.

For every file you add, you must specify the path and type of the file. The path is the relative path to the file from the root of your project. The type is the type of the file.

You can read more about the registry item schema and file types in the registry item schema docs.

Build your registry
Install the shadcn CLI
pnpm
npm
yarn
bun
pnpm add shadcn@latest
Copy
Add a build script
Add a registry:build script to your package.json file.

package.json
Copy
{
"scripts": {
"registry:build": "shadcn build"
}
}
Run the build script
Run the build script to generate the registry JSON files.

pnpm
npm
yarn
bun
pnpm registry:build
Copy
Note: By default, the build script will generate the registry JSON files in public/r e.g public/r/hello-world.json.

You can change the output directory by passing the --output option. See the shadcn build command for more information.

Serve your registry
If you're running your registry on Next.js, you can now serve your registry by running the next server. The command might differ for other frameworks.

pnpm
npm
yarn
bun
pnpm dev
Copy
Your files will now be served at http://localhost:3000/r/[NAME].json eg. http://localhost:3000/r/hello-world.json.

Publish your registry
To make your registry available to other developers, you can publish it by deploying your project to a public URL.

Guidelines
Here are some guidelines to follow when building components for a registry.

Place your registry item in the registry/[STYLE]/[NAME] directory. I'm using new-york as an example. It can be anything you want as long as it's nested under the registry directory.
The following properties are required for the block definition: name, description, type and files.
It is recommended to add a proper name and description to your registry item. This helps LLMs understand the component and its purpose.
Make sure to list all registry dependencies in registryDependencies. A registry dependency is the name of the component in the registry eg. input, button, card, etc or a URL to a registry item eg. http://localhost:3000/r/editor.json.
Make sure to list all dependencies in dependencies. A dependency is the name of the package in the registry eg. zod, sonner, etc. To set a version, you can use the name@version format eg. zod@^3.20.0.
Imports should always use the @/registry path. eg. import { HelloWorld } from "@/registry/new-york/hello-world/hello-world"
Ideally, place your files within a registry item in components, hooks, lib directories.
Install using the CLI
To install a registry item using the shadcn CLI, use the add command followed by the URL of the registry item.

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add http://localhost:3000/r/hello-world.json
Copy
See the Namespaced Registries docs for more information on how to install registry items from a namespaced registry.

---

Namespaces
Copy Page

Previous
Next
Configure and use multiple resource registries with namespace support.

Namespaced registries let you configure multiple resource sources in one project. This means you can install components, libraries, utilities, AI prompts, configuration files, and other resources from various registries, whether they're public, third-party, or your own custom private libraries.

Table of Contents
Overview
Decentralized Namespace System
Getting Started
Registry Naming Convention
Configuration
Authentication & Security
Versioning
Dependency Resolution
Built-in Registries
CLI Commands
Error Handling
Creating Your Own Registry
Example Configurations
Technical Details
Best Practices
Troubleshooting
Overview
Registry namespaces are prefixed with @ and provide a way to organize and reference resources from different sources. Resources can be any type of content: components, libraries, utilities, hooks, AI prompts, configuration files, themes, and more. For example:

@shadcn/button - UI component from the shadcn registry
@v0/dashboard - Dashboard component from the v0 registry
@ai-elements/input - AI prompt input from an AI elements registry
@acme/auth-utils - Authentication utilities from your company's private registry
@ai/chatbot-rules - AI prompt rules from an AI resources registry
@themes/dark-mode - Theme configuration from a themes registry
Decentralized Namespace System
We intentionally designed the namespace system to be decentralized. There is a central open source registry index for open source namespaces but you are free to create and use any namespace you want.

This decentralized approach gives you complete flexibility to organize your resources however makes sense for your organization.

You can create multiple registries for different purposes:

components.json
Copy
{
"registries": {
"@acme-ui": "https://registry.acme.com/ui/{name}.json",
"@acme-docs": "https://registry.acme.com/docs/{name}.json",
"@acme-ai": "https://registry.acme.com/ai/{name}.json",
"@acme-themes": "https://registry.acme.com/themes/{name}.json",
"@acme-internal": {
"url": "https://internal.acme.com/registry/{name}.json",
"headers": {
"Authorization": "Bearer ${INTERNAL_TOKEN}"
}
}
}
}
This allows you to:

Organize by type: Separate UI components, documentation, AI resources, etc.
Organize by team: Different teams can maintain their own registries
Organize by visibility: Public vs. private resources
Organize by version: Stable vs. experimental registries
No naming conflicts: Since there's no central authority, you don't need to worry about namespace collisions
Examples of Multi-Registry Setups
By Resource Type
components.json
Copy
{
"@components": "https://cdn.company.com/components/{name}.json",
"@hooks": "https://cdn.company.com/hooks/{name}.json",
"@utils": "https://cdn.company.com/utils/{name}.json",
"@prompts": "https://cdn.company.com/ai-prompts/{name}.json"
}
By Team or Department
components.json
Copy
{
"@design": "https://create.company.com/registry/{name}.json",
"@engineering": "https://eng.company.com/registry/{name}.json",
"@marketing": "https://marketing.company.com/registry/{name}.json"
}
By Stability
components.json
Copy
{
"@stable": "https://registry.company.com/stable/{name}.json",
"@latest": "https://registry.company.com/beta/{name}.json",
"@experimental": "https://registry.company.com/experimental/{name}.json"
}
Getting Started
Installing Resources
Once configured, you can install resources using the namespace syntax:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add @v0/dashboard
Copy
or multiple resources at once:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add @acme/header @lib/auth-utils @ai/chatbot-rules
Copy
Quick Configuration
Add registries to your components.json:

components.json
Copy
{
"registries": {
"@v0": "https://v0.dev/chat/b/{name}",
"@acme": "https://registry.acme.com/resources/{name}.json"
}
}
Then start installing:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add @acme/button
Copy
Registry Naming Convention
Registry names must follow these rules:

Start with @ symbol
Contain only alphanumeric characters, hyphens, and underscores
Examples of valid names: @v0, @acme-ui, @my_company
The pattern for referencing resources is: @namespace/resource-name

Configuration
Namespaced registries are configured in your components.json file under the registries field.

Basic Configuration
The simplest way to configure a registry is with a URL template string:

components.json
Copy
{
"registries": {
"@v0": "https://v0.dev/chat/b/{name}",
"@acme": "https://registry.acme.com/resources/{name}.json",
"@lib": "https://lib.company.com/utilities/{name}",
"@ai": "https://ai-resources.com/r/{name}.json"
}
}
Note: The {name} placeholder in the URL is automatically parsed and replaced with the resource name when you run npx shadcn@latest add @namespace/resource-name. For example, @acme/button becomes https://registry.acme.com/resources/button.json. See URL Pattern System for more details.

Advanced Configuration
For registries that require authentication or additional parameters, use the object format:

components.json
Copy
{
"registries": {
"@private": {
"url": "https://api.company.com/registry/{name}.json",
"headers": {
"Authorization": "Bearer ${REGISTRY_TOKEN}",
        "X-API-Key": "${API_KEY}"
},
"params": {
"version": "latest",
"format": "json"
}
}
}
}
Note: Environment variables in the format ${VAR_NAME} are automatically expanded from your environment (process.env). This works in URLs, headers, and params. For example, ${REGISTRY_TOKEN} will be replaced with the value of process.env.REGISTRY_TOKEN. See Authentication & Security for more details on using environment variables.

URL Pattern System
Registry URLs support the following placeholders:

{name} Placeholder (required)
The {name} placeholder is replaced with the resource name:

components.json
Copy
{
"@acme": "https://registry.acme.com/{name}.json"
}
When installing @acme/button, the URL becomes: https://registry.acme.com/button.json When installing @acme/auth-utils, the URL becomes: https://registry.acme.com/auth-utils.json

{style} Placeholder (optional)
The {style} placeholder is replaced with the current style configuration:

Copy
{
"@themes": "https://registry.example.com/{style}/{name}.json"
}
With style set to new-york, installing @themes/card resolves to: https://registry.example.com/new-york/card.json

The style placeholder is optional. Use this when you want to serve different versions of the same resource. For example, you can serve a different version of a component for each style.

Authentication & Security
Environment Variables
Use environment variables to securely store credentials:

components.json
Copy
{
"registries": {
"@private": {
"url": "https://api.company.com/registry/{name}.json",
"headers": {
"Authorization": "Bearer ${REGISTRY_TOKEN}"
}
}
}
}
Then set the environment variable:

.env.local
Copy
REGISTRY_TOKEN=your_secret_token_here
Authentication Methods
Bearer Token (OAuth 2.0)
Copy
{
"@github": {
"url": "https://api.github.com/repos/org/registry/contents/{name}.json",
"headers": {
"Authorization": "Bearer ${GITHUB_TOKEN}"
    }
  }
}
API Key in Headers
components.json
Copy
{
  "@private": {
    "url": "https://api.company.com/registry/{name}",
    "headers": {
      "X-API-Key": "${API_KEY}"
}
}
}
Basic Authentication
components.json
Copy
{
"@internal": {
"url": "https://registry.company.com/{name}.json",
"headers": {
"Authorization": "Basic ${BASE64_CREDENTIALS}"
    }
  }
}
Query Parameter Authentication
components.json
Copy
{
  "@secure": {
    "url": "https://registry.example.com/{name}.json",
    "params": {
      "api_key": "${API_KEY}",
"client_id": "${CLIENT_ID}",
      "signature": "${REQUEST_SIGNATURE}"
}
}
}
Multiple Authentication Methods
Some registries require multiple authentication methods:

components.json
Copy
{
"@enterprise": {
"url": "https://api.enterprise.com/v2/registry/{name}",
"headers": {
"Authorization": "Bearer ${ACCESS_TOKEN}",
      "X-API-Key": "${API_KEY}",
"X-Workspace-Id": "${WORKSPACE_ID}"
},
"params": {
"version": "latest"
}
}
}
Security Considerations
When working with namespaced registries, especially third-party or public ones, security is paramount. Here's how we handle security:

Resource Validation
All resources fetched from registries are validated against our registry item schema before installation. This ensures:

Structure validation: Resources must conform to the expected JSON schema
Type safety: Resource types are validated (registry:ui, registry:lib, etc.)
No arbitrary code execution: Resources are data files, not executable scripts
Environment Variable Security
Environment variables used for authentication are:

Never logged: The CLI never logs or displays environment variable values
Expanded at runtime: Variables are only expanded when needed, not stored
Isolated per registry: Each registry maintains its own authentication context
Example of secure configuration:

components.json
Copy
{
"registries": {
"@private": {
"url": "https://api.company.com/registry/{name}.json",
"headers": {
"Authorization": "Bearer ${PRIVATE_REGISTRY_TOKEN}"
}
}
}
}
Never commit actual tokens to version control. Use .env.local:

.env.local
Copy
PRIVATE_REGISTRY_TOKEN=actual_token_here
HTTPS Enforcement
We strongly recommend using HTTPS for all registry URLs:

Encrypted transport: Prevents man-in-the-middle attacks
Certificate validation: Ensures you're connecting to the legitimate registry
Credential protection: Headers and tokens are encrypted in transit
components.json
Copy
{
"registries": {
"@secure": "https://registry.example.com/{name}.json", // ✅ Good
"@insecure": "http://registry.example.com/{name}.json" // ❌ Avoid
}
}
Content Security
Resources from registries are treated as data, not code:

JSON parsing only: Resources must be valid JSON
Schema validation: Must match the registry item schema
File path restrictions: Files can only be written to configured paths
No script execution: The CLI doesn't execute any code from registry resources
Registry Trust Model
The namespace system operates on a trust model:

You trust what you install: Only add registries you trust to your configuration
Explicit configuration: Registries must be explicitly configured in components.json
No automatic registry discovery: The CLI never automatically adds registries
Dependency transparency: All dependencies are clearly listed in registry items
Best Practices for Registry Operators
If you're running your own registry:

Use HTTPS always: Never serve registry content over HTTP
Implement authentication: Require API keys or tokens for private registries
Rate limiting: Protect your registry from abuse
Content validation: Validate resources before serving them
Example secure registry setup:

components.json
Copy
{
"@company": {
"url": "https://registry.company.com/v1/{name}.json",
"headers": {
"Authorization": "Bearer ${COMPANY_TOKEN}",
"X-Registry-Version": "1.0"
}
}
}
Inspecting Resources Before Installation
The CLI provides transparency about what's being installed. You can see the payload of a registry item using the following command:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest view @acme/button
Copy
This will output the payload of the registry item to the console.

Dependency Resolution
Basic Dependency Resolution
Resources can have dependencies across different registries:

registry-item.json
Copy
{
"name": "dashboard",
"type": "registry:block",
"registryDependencies": [
"@shadcn/card", // From default registry
"@v0/chart", // From v0 registry
"@acme/data-table", // From acme registry
"@lib/data-fetcher", // Utility library
"@ai/analytics-prompt" // AI prompt resource
]
}
The CLI automatically resolves and installs all dependencies from their respective registries.

Advanced Dependency Resolution
Understanding how dependencies are resolved internally is important if you're developing registries or need to customize third-party resources.

How Resolution Works
When you run npx shadcn@latest add @namespace/resource, the CLI does the following:

Clears registry context to start fresh
Fetches the main resource from the specified registry
Recursively resolves dependencies from their respective registries
Applies topological sorting to ensure proper installation order
Deduplicates files based on target paths (last one wins)
Deep merges configurations (tailwind, cssVars, css, envVars)
This means that if you run the following command:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add @acme/auth @custom/login-form
Copy
The login-form.ts from @custom/login-form will override the login-form.ts from @acme/auth because it's resolved last.

Overriding Third-Party Resources
You can leverage the dependency resolution process to override any third-party resource by adding them to your custom resource under registryDependencies and overriding with your own custom values.

Example: Customizing a Third-Party Button
Let's say you want to customize a button from a vendor registry:

1. Original vendor button (@vendor/button):

button.json
Copy
{
"name": "button",
"type": "registry:ui",
"files": [
{
"path": "components/ui/button.tsx",
"type": "registry:ui",
"content": "// Vendor's button implementation\nexport function Button() { ... }"
}
],
"cssVars": {
"light": {
"--button-bg": "blue"
}
}
} 2. Create your custom override (@my-company/custom-button):

custom-button.json
Copy
{
"name": "custom-button",
"type": "registry:ui",
"registryDependencies": [
"@vendor/button" // Import original first
],
"cssVars": {
"light": {
"--button-bg": "purple" // Override the color
}
}
} 3. Install your custom version:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add @my-company/custom-button
Copy
This installs the original button from @vendor/button and then overrides the cssVars with your own custom values.

Advanced Override Patterns
Extending Without Replacing
Keep the original and add extensions:

extended-table.json
Copy
{
"name": "extended-table",
"registryDependencies": ["@vendor/table"],
"files": [
{
"path": "components/ui/table-extended.tsx",
"content": "import { Table } from '@vendor/table'\n// Add your extensions\nexport function ExtendedTable() { ... }"
}
]
}
This will install the original table from @vendor/table and then add your extensions to components/ui/table-extended.tsx.

Partial Override (Multi-file Resources)
Override only specific files from a complex component:

custom-auth.json
Copy
{
"name": "custom-auth",
"registryDependencies": [
"@vendor/auth" // Has multiple files
],
"files": [
{
"path": "lib/auth-server.ts",
"type": "registry:lib",
"content": "// Your custom auth server"
}
]
}
Resolution Order Example
When you install @custom/dashboard that depends on multiple resources:

dashboard.json
Copy
{
"name": "dashboard",
"registryDependencies": [
"@shadcn/card", // 1. Resolved first
"@vendor/chart", // 2. Resolved second
"@custom/card" // 3. Resolved last (overrides @shadcn/card)
]
}
Resolution order:

@shadcn/card - installs to components/ui/card.tsx
@vendor/chart - installs to components/ui/chart.tsx
@custom/card - overwrites components/ui/card.tsx (if same target)
Key Resolution Features
Source Tracking: Each resource knows which registry it came from, avoiding naming conflicts
Circular Dependency Prevention: Automatically detects and prevents circular dependencies
Smart Installation Order: Dependencies are installed first, then the resources that use them
Versioning
You can implement versioning for your registry resources using query parameters. This allows users to pin specific versions or use different release channels.

Basic Version Parameter
components.json
Copy
{
"@versioned": {
"url": "https://registry.example.com/{name}",
"params": {
"version": "v2"
}
}
}
This resolves @versioned/button to: https://registry.example.com/button?version=v2

Dynamic Version Selection
Use environment variables to control versions across your project:

components.json
Copy
{
"@stable": {
"url": "https://registry.company.com/{name}",
"params": {
"version": "${REGISTRY_VERSION}"
}
}
}
This allows you to:

Set REGISTRY_VERSION=v1.2.3 in production
Override per environment (dev, staging, prod)
Semantic Versioning
Implement semantic versioning with range support:

components.json
Copy
{
"@npm-style": {
"url": "https://registry.example.com/{name}",
"params": {
"semver": "^2.0.0",
"prerelease": "${ALLOW_PRERELEASE}"
}
}
}
Version Resolution Best Practices
Use environment variables for version control across environments
Provide sensible defaults using the ${VAR:-default} syntax
Document version schemes clearly for registry users
Support version pinning for reproducible builds
Implement version discovery endpoints (e.g., /versions/{name})
Cache versioned resources appropriately with proper cache headers
CLI Commands
The shadcn CLI provides several commands for working with namespaced registries:

Adding Resources
Install resources from any configured registry:

Copy

# Install from a specific registry

npx shadcn@latest add @v0/dashboard

# Install multiple resources

npx shadcn@latest add @acme/button @lib/utils @ai/prompt

# Install from URL directly

npx shadcn@latest add https://registry.example.com/button.json

# Install from local file

npx shadcn@latest add ./local-registry/button.json
Viewing Resources
Inspect registry items before installation:

Copy

# View a resource from a registry

npx shadcn@latest view @acme/button

# View multiple resources

npx shadcn@latest view @v0/dashboard @shadcn/card

# View from URL

npx shadcn@latest view https://registry.example.com/button.json
The view command displays:

Resource metadata (name, type, description)
Dependencies and registry dependencies
File contents that will be installed
CSS variables and Tailwind configuration
Required environment variables
Searching Registries
Search for available resources in registries:

Copy

# Search a specific registry

npx shadcn@latest search @v0

# Search with query

npx shadcn@latest search @acme --query "auth"

# Search multiple registries

npx shadcn@latest search @v0 @acme @lib

# Limit results

npx shadcn@latest search @v0 --limit 10 --offset 20

# List all items (alias for search)

npx shadcn@latest list @acme
Search results include:

Resource name and type
Description
Registry source
Error Handling
Registry Not Configured
If you reference a registry that isn't configured:

pnpm
npm
yarn
bun
pnpm dlx shadcn@latest add @non-existent/component
Copy
Error:

Copy
Unknown registry "@non-existent". Make sure it is defined in components.json as follows:
{
"registries": {
"@non-existent": "[URL_TO_REGISTRY]"
}
}
Missing Environment Variables
If required environment variables are not set:

Copy
Registry "@private" requires the following environment variables:

• REGISTRY_TOKEN

Set the required environment variables to your .env or .env.local file.
Resource Not Found
404 Not Found:

Copy
The item at https://registry.company.com/button.json was not found. It may not exist at the registry.
This usually means:

The resource name is misspelled
The resource doesn't exist in the registry
The registry URL pattern is incorrect
Authentication Failures
401 Unauthorized:

Copy
You are not authorized to access the item at https://api.company.com/button.json
Check your authentication credentials and environment variables.
403 Forbidden:

Copy
Access forbidden for https://api.company.com/button.json
Verify your API key has the necessary permissions.
Creating Your Own Registry
To make your registry compatible with the namespace system, you can serve any type of resource - components, libraries, utilities, AI prompts, themes, configurations, or any other shareable code/content:

Implement the registry item schema: Your registry must return JSON that conforms to the registry item schema.

Support the URL pattern: Include {name} in your URL template where the resource name will be inserted.

Define resource types: Use appropriate type fields to identify your resources (e.g., registry:ui, registry:lib, registry:ai, registry:theme, etc.).

Handle authentication (if needed): Accept authentication via headers or query parameters.

Document your namespace: Provide clear instructions for users to configure your registry:

components.json
Copy
{
"registries": {
"@your-registry": "https://your-domain.com/r/{name}.json"
}
}
Technical Details
Parser Pattern
The namespace parser uses the following regex pattern:

namespace-parser.js
Copy
/^(@[a-zA-Z0-9](?:[a-zA-Z0-9-_]*[a-zA-Z0-9])?)\/(.+)$/
This ensures valid namespace formatting and proper component name extraction.

Resolution Process
Parse: Extract namespace and component name from @namespace/component
Lookup: Find registry configuration for @namespace
Build URL: Replace placeholders with actual values
Set Headers: Apply authentication headers if configured
Fetch: Retrieve component from the resolved URL
Validate: Ensure response matches registry item schema
Resolve Dependencies: Recursively fetch any registry dependencies
Cross-Registry Dependencies
When a component has dependencies from different registries, the resolver:

Maintains separate authentication contexts for each registry
Resolves each dependency from its respective source
Deduplicates files based on target paths
Merges configurations (tailwind, cssVars, etc.) from all sources
Best Practices
Use environment variables for sensitive data like API keys and tokens
Namespace your registry with a unique, descriptive name
Document authentication requirements clearly for users
Implement proper error responses with helpful messages
Cache registry responses when possible to improve performance
Support style variants if your components have multiple themes
Troubleshooting
Resources not found
Verify the registry URL is correct and accessible
Check that the {name} placeholder is included in the URL
Ensure the resource exists in the registry
Confirm the resource type matches what the registry provides
Authentication issues
Confirm environment variables are set correctly
Verify API keys/tokens are valid and not expired
Check that headers are being sent in the correct format
Dependency conflicts
Review resources with the same name from different registries
Use fully qualified names (@namespace/resource) to avoid ambiguity
Check for circular dependencies between registries
Ensure resource types are compatible when mixing registries

---

Examples
Copy Page

Previous
Next
Examples of registry items: styles, components, css vars, etc.

registry:style
Custom style that extends shadcn/ui
The following registry item is a custom style that extends shadcn/ui. On npx shadcn init, it will:

Install @tabler/icons-react as a dependency.
Add the login-01 block and calendar component to the project.
Add the editor from a remote registry.
Set the font-sans variable to Inter, sans-serif.
Install a brand color in light and dark mode.
example-style.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "example-style",
"type": "registry:style",
"dependencies": ["@tabler/icons-react"],
"registryDependencies": [
"login-01",
"calendar",
"https://example.com/r/editor.json"
],
"cssVars": {
"theme": {
"font-sans": "Inter, sans-serif"
},
"light": {
"brand": "20 14.3% 4.1%"
},
"dark": {
"brand": "20 14.3% 4.1%"
}
}
}
Custom style from scratch
The following registry item is a custom style that doesn't extend shadcn/ui. See the extends: none field.

It can be used to create a new style from scratch i.e custom components, css vars, dependencies, etc.

On npx shadcn add, the following will:

Install tailwind-merge and clsx as dependencies.
Add the utils registry item from the shadcn/ui registry.
Add the button, input, label, and select components from a remote registry.
Install new css vars: main, bg, border, text, ring.
example-style.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "extends": "none",
  "name": "new-style",
  "type": "registry:style",
  "dependencies": ["tailwind-merge", "clsx"],
  "registryDependencies": [
    "utils",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json",
    "https://example.com/r/select.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif",
    }
    "light": {
      "main": "#88aaee",
      "bg": "#dfe5f2",
      "border": "#000",
      "text": "#000",
      "ring": "#000",
    },
    "dark": {
      "main": "#88aaee",
      "bg": "#272933",
      "border": "#000",
      "text": "#e6e6e6",
      "ring": "#fff",
    }
  }
}
registry:theme
Custom theme
example-theme.json
Copy
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-theme",
"type": "registry:theme",
"cssVars": {
"light": {
"background": "oklch(1 0 0)",
"foreground": "oklch(0.141 0.005 285.823)",
"primary": "oklch(0.546 0.245 262.881)",
"primary-foreground": "oklch(0.97 0.014 254.604)",
"ring": "oklch(0.746 0.16 232.661)",
"sidebar-primary": "oklch(0.546 0.245 262.881)",
"sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
"sidebar-ring": "oklch(0.746 0.16 232.661)"
},
"dark": {
"background": "oklch(1 0 0)",
"foreground": "oklch(0.141 0.005 285.823)",
"primary": "oklch(0.707 0.165 254.624)",
"primary-foreground": "oklch(0.97 0.014 254.604)",
"ring": "oklch(0.707 0.165 254.624)",
"sidebar-primary": "oklch(0.707 0.165 254.624)",
"sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
"sidebar-ring": "oklch(0.707 0.165 254.624)"
}
}
}
Custom colors
The following style will init using shadcn/ui defaults and then add a custom brand color.

example-style.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-style",
"type": "registry:style",
"cssVars": {
"light": {
"brand": "oklch(0.99 0.00 0)"
},
"dark": {
"brand": "oklch(0.14 0.00 286)"
}
}
}
registry:block
Custom block
This blocks installs the login-01 block from the shadcn/ui registry.

login-01.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "login-01",
"type": "registry:block",
"description": "A simple login form.",
"registryDependencies": ["button", "card", "input", "label"],
"files": [
{
"path": "blocks/login-01/page.tsx",
"content": "import { LoginForm } ...",
"type": "registry:page",
"target": "app/login/page.tsx"
},
{
"path": "blocks/login-01/components/login-form.tsx",
"content": "...",
"type": "registry:component"
}
]
}
Install a block and override primitives
You can install a block fromt the shadcn/ui registry and override the primitives using your custom ones.

On npx shadcn add, the following will:

Add the login-01 block from the shadcn/ui registry.
Override the button, input, and label primitives with the ones from the remote registry.
example-style.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-login",
"type": "registry:block",
"registryDependencies": [
"login-01",
"https://example.com/r/button.json",
"https://example.com/r/input.json",
"https://example.com/r/label.json"
]
}
CSS Variables
Custom Theme Variables
Add custom theme variables to the theme object.

example-theme.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "font-heading": "Inter, sans-serif",
      "shadow-card": "0 0 0 1px rgba(0, 0, 0, 0.1)"
    }
  }
}
Override Tailwind CSS variables
example-theme.json
Copy
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-theme",
"type": "registry:theme",
"cssVars": {
"theme": {
"spacing": "0.2rem",
"breakpoint-sm": "640px",
"breakpoint-md": "768px",
"breakpoint-lg": "1024px",
"breakpoint-xl": "1280px",
"breakpoint-2xl": "1536px"
}
}
}
Add custom CSS
Base styles
example-base.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "css": {
    "@layer base": {
      "h1": {
        "font-size": "var(--text-2xl)"
      },
      "h2": {
        "font-size": "var(--text-xl)"
      }
    }
  }
}
Components
example-card.json
Copy
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-card",
"type": "registry:component",
"css": {
"@layer components": {
"card": {
"background-color": "var(--color-white)",
"border-radius": "var(--rounded-lg)",
"padding": "var(--spacing-6)",
"box-shadow": "var(--shadow-xl)"
}
}
}
}
Add custom utilities
Simple utility
example-component.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility content-auto": {
      "content-visibility": "auto"
    }
  }
}
Complex utility
example-utility.json
Copy
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-component",
"type": "registry:component",
"css": {
"@utility scrollbar-hidden": {
"scrollbar-hidden": {
"&::-webkit-scrollbar": {
"display": "none"
}
}
}
}
}
Functional utilities
example-functional.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-component",
"type": "registry:component",
"css": {
"@utility tab-_": {
"tab-size": "var(--tab-size-_)"
}
}
}
Add CSS imports
Use @import to add CSS imports to your registry item. The imports will be placed at the top of the CSS file.

Basic import
example-import.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-import",
  "type": "registry:component",
  "css": {
    "@import \"tailwindcss\"": {},
    "@import \"./styles/base.css\"": {}
  }
}
Import with url() syntax
example-url-import.json
Copy
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "font-import",
"type": "registry:item",
"css": {
"@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\")": {},
"@import url('./local-styles.css')": {}
}
}
Import with media queries
example-media-import.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "responsive-import",
"type": "registry:item",
"css": {
"@import \"print-styles.css\" print": {},
"@import url(\"mobile.css\") screen and (max-width: 768px)": {}
}
}
Add custom plugins
Use @plugin to add Tailwind plugins to your registry item. Plugins will be automatically placed after imports and before other content.

Important: When using plugins from npm packages, you must also add them to the dependencies array.

Basic plugin usage
example-plugin.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-plugin",
"type": "registry:item",
"css": {
"@plugin \"@tailwindcss/typography\"": {},
"@plugin \"foo\"": {}
}
}
Plugin with npm dependency
When using plugins from npm packages like @tailwindcss/typography, include them in the dependencies.

example-typography.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "typography-component",
  "type": "registry:item",
  "dependencies": ["@tailwindcss/typography"],
  "css": {
    "@plugin \"@tailwindcss/typography\"": {},
    "@layer components": {
      ".prose": {
        "max-width": "65ch"
      }
    }
  }
}
Scoped and file-based plugins
example-scoped-plugin.json
Copy
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "scoped-plugins",
"type": "registry:component",
"css": {
"@plugin \"@headlessui/tailwindcss\"": {},
"@plugin \"tailwindcss/plugin\"": {},
"@plugin \"./custom-plugin.js\"": {}
}
}
Multiple plugins with automatic ordering
When you add multiple plugins, they are automatically grouped together and deduplicated.

example-multiple-plugins.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "multiple-plugins",
"type": "registry:item",
"dependencies": [
"@tailwindcss/typography",
"@tailwindcss/forms",
"tw-animate-css"
],
"css": {
"@plugin \"@tailwindcss/typography\"": {},
"@plugin \"@tailwindcss/forms\"": {},
"@plugin \"tw-animate-css\"": {}
}
}
Combined imports and plugins
When using both @import and @plugin directives, imports are placed first, followed by plugins, then other CSS content.

example-combined.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "combined-example",
"type": "registry:item",
"dependencies": ["@tailwindcss/typography", "tw-animate-css"],
"css": {
"@import \"tailwindcss\"": {},
"@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\")": {},
"@plugin \"@tailwindcss/typography\"": {},
"@plugin \"tw-animate-css\"": {},
"@layer base": {
"body": {
"font-family": "Inter, sans-serif"
}
},
"@utility content-auto": {
"content-visibility": "auto"
}
}
}
Add custom animations
Note: you need to define both @keyframes in css and theme in cssVars to use animations.

example-component.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-component",
"type": "registry:component",
"cssVars": {
"theme": {
"--animate-wiggle": "wiggle 1s ease-in-out infinite"
}
},
"css": {
"@keyframes wiggle": {
"0%, 100%": {
"transform": "rotate(-3deg)"
},
"50%": {
"transform": "rotate(3deg)"
}
}
}
}
Add environment variables
You can add environment variables using the envVars field.

example-item.json
Copy
{»
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "custom-item",
"type": "registry:item",
"envVars": {
"NEXT_PUBLIC_APP_URL": "http://localhost:4000",
"DATABASE_URL": "postgresql://postgres:postgres@localhost:5432/postgres",
"OPENAI_API_KEY": ""
}
}
Environment variables are added to the .env.local or .env file. Existing variables are not overwritten.

IMPORTANT: Use envVars to add development or example variables. Do NOT use it to add production variables.

Universal Items
As of 2.9.0, you can create universal items that can be installed without framework detection or components.json.

To make an item universal i.e framework agnostic, all the files in the item must have an explicit target.

Here's an example of a registry item that installs custom Cursor rules for python:

.cursor/rules/custom-python.mdc
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "python-rules",
"type": "registry:item",
"files": [
{
"path": "/path/to/your/registry/default/custom-python.mdc",
"type": "registry:file",
"target": "~/.cursor/rules/custom-python.mdc",
"content": "..."
}
]
}
Here's another example for installation custom ESLint config:

.eslintrc.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "my-eslint-config",
"type": "registry:item",
"files": [
{
"path": "/path/to/your/registry/default/custom-eslint.json",
"type": "registry:file",
"target": "~/.eslintrc.json",
"content": "..."
}
]
}
You can also have a universal item that installs multiple files:

my-custom-starter-template.json
Copy
{
"$schema": "https://ui.shadcn.com/schema/registry-item.json",
"name": "my-custom-start-template",
"type": "registry:item",
"dependencies": ["better-auth"],
"files": [
{
"path": "/path/to/file-01.json",
"type": "registry:file",
"target": "~/file-01.json",
"content": "..."
},
{
"path": "/path/to/file-02.vue",
"type": "registry:file",
"target": "~/pages/file-02.vue",
"content": "..."
}
]
}
