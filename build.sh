set -e

echo "Linting..."
npm run-script lint

echo "Building..."
npm run-script build
