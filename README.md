# Vercel Driver

This [Membrane](https://membrane.io) driver lets you interact with the [Vercel](https://vercel.com) API via your Membrane graph.

## Setup

$~~~~$ `mctl action 'vercel:configure(token:"<AccessToken>"'`

## Example Query

Get projects

$~~~~$ `mctl query 'vercel:projects.page.items' '{ id name framework }'`

```json
[
  {
    "id": "prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "name": "site-prod",
    "framework": "nextjs"
  },
  {
    "id": "prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "name": "bot-page",
    "framework": "nextjs"
  },
  {
    "id": "prj_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "name": "personal-site",
    "framework": "nextjs"
  },
  ...
]
```

## Example Action

Promote deployment to Production

`mctl action 'vercel:deployments.one(idOrUrl:"dpl_G2hcxx3mppABtomgwTB9ornkCUDs").promoteToProduction'`
