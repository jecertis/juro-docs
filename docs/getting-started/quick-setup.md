---
id: quick-setup
title: Quick Setup
sidebar_label: Quick Setup
description: 'Get Juro up and running in 5 minutes'
keywords: [quick setup, fast start, getting started, 5 minutes]
---

# Quick Setup

Get Juro up and running in just 5 minutes.

## 1. Build Juro

From the **juro** repository:

```bash
git clone <juro-repo-url>
cd juro
npm install
npm run build
```

## 2. Scan Your Project

From the juro repo root:

```bash
node packages/cli/dist/cli.js scan ./my-project
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o table
```

## 3. View Results

Open the generated report to see compliance violations and suggestions.

## That's It!

You're now ready to use Juro for compliance scanning.

## Next Steps

- [Configuration](/docs/getting-started/configuration) - Customize your setup
- [Features](/docs/features/compliance-scanning) - Explore all features
- [Tutorials](/docs/tutorials/basic-scanning) - Learn advanced techniques
