# Publishing Wuthering Waves Themes to VS Code Marketplace

## Prerequisites

✅ You have a publisher account (publisher: `frostmoon-dev`)
✅ `vsce` is installed (just completed)
⚠️ You need a **Personal Access Token (PAT)** from Azure DevOps

## Step 1: Get Your Personal Access Token

If you don't have one yet:

1. Go to https://dev.azure.com/
2. Click your profile icon → **Security** → **Personal access tokens**
3. Click **+ New Token**
4. Name: `VS Code Publishing`
5. Organization: **All accessible organizations**
6. Scopes: Select **Custom defined** → **Marketplace** → Check **Manage**
7. Click **Create** and **COPY THE TOKEN** (you won't see it again!)

## Step 2: Package the Extension (Test First)

Run this command to create a `.vsix` file without publishing:

```powershell
vsce package
```

This will create `wuwa-themes-1.0.4.vsix` that you can test locally.

## Step 3: Publish to Marketplace

Once you have your PAT, run:

```powershell
vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN
```

Or, to avoid typing the token each time:

```powershell
vsce login frostmoon-dev
# Enter your PAT when prompted

vsce publish
```

## Alternative: Manual Upload

1. Package: `vsce package`
2. Go to https://marketplace.visualstudio.com/manage/publishers/frostmoon-dev
3. Click **New extension** → **Visual Studio Code**
4. Upload the `.vsix` file

## Quick Publish (if you already have PAT)

```powershell
# Login once
vsce login frostmoon-dev

# Publish current version
vsce publish

# Or bump version and publish in one command:
# vsce publish patch   (1.0.4 → 1.0.5)
# vsce publish minor   (1.0.4 → 1.1.0)
# vsce publish major   (1.0.4 → 2.0.0)
```

## Verification

After publishing, verify at:
https://marketplace.visualstudio.com/items?itemName=frostmoon-dev.wuwa-themes
