# Deployment Guide

## Completed

- **GitHub**: [CJohnDesign/healthcode360-peptide-catalog](https://github.com/CJohnDesign/healthcode360-peptide-catalog)
- **Vercel**: Project linked and deployed via CLI
- **Production URL**: Check [Vercel Dashboard](https://vercel.com/cjohndesigns-projects/catalog-pep) for the live URL

## Connect GitHub for Auto-Deploys

To enable automatic deployments on every push to `main`:

1. Go to [vercel.com/cjohndesigns-projects/catalog-pep/settings/git](https://vercel.com/cjohndesigns-projects/catalog-pep/settings/git)
2. Click **Connect Git Repository**
3. Select **GitHub** and authorize if needed
4. Choose `CJohnDesign/healthcode360-peptide-catalog`
5. Production branch: `main`

After this, every push to `main` will deploy automatically.

## Rename Project (Optional)

To rename the Vercel project to `healthcode360-peptide-catalog`:

1. Go to Project Settings → General
2. Change **Project Name** to `healthcode360-peptide-catalog`
3. Save

## Deploy Commands

```bash
npm run deploy        # Deploy to production
npm run deploy:preview # Deploy preview
```
