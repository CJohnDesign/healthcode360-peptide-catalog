# Product Images

Each product has its own unique image at `/images/products/{slug}.png`.

## Generate Missing Images

Run the fal.ai script to generate product-specific images (each with explicit label prompt):

```bash
npm run generate:product-images-v2 [startIndex] [count]
```

Examples:
```bash
npm run generate:product-images-v2 0 20    # first 20 products
npm run generate:product-images-v2 20 20   # next 20
npm run generate:product-images-v2 40 30   # next 30
```

Requires `FAL_API_KEY` or `FAL_KEY` in `.env`.

## Image Mapping

- **Vial products** (injectables): Base = sema-glp-1.png, label updated per product
- **Supplement bottles** (capsules): Base = supplement-bottle.png
- **Liquid supplements**: Base = supplement-liquid.png
- **Supplies**: Bacteriostatic water, Insulin syringes (syringes ONLY in shot, no vial)

## Category Images (`public/images/categories/`)

| File | Used By |
|------|---------|
| `supplies.png` | Supplies category |
| `nutriments.png` | Nutriments category |
| `sleep-detox.png` | Sleep & Detox category |
| `cognitive-health.png` | Cognitive Health category |

Existing category images (already referenced):
- `weight-management.png`
- `growth-hormone-recomposition.png`
- `healing-tissue-recovery.png`
- `reproductive-hormonal-health.png`
- `longevity-anti-aging.png`
- `wellness-mood.png`
