# rileylahddotme

A repo for my personal website, rileylahd.me

## Stack

Built using React+Webpack, with ESLint for code cleanup and React Router for multi-page.

## Contributing

Clone repo, run `npm install` to get dependencies and then `npm run-script dev` to run an auto-compiling web server while changing react modules.

Use `npm run-script lint` to check the code, and `npm run-script build` to get the deployable folder.

## Hosting

Ensure all 404 requests hit the `index.html` for React Router to handle the requests correctly. Otherwise 