ng new ws-laolol --create-application=false --strict
cd ws-laolol/
ng g app laolol-spa
ng g lib laolol-storybook
ng g lib laolol-components
ng build laolol-components
cp ./angular.json ./projects/laolol-storybook
# modify angular.json (default project and path)
cd projects/laolol-storybook
npm i -g @storybook/cli
sb init --type angular
touch ./src/stories/2-Custom.stories.ts
# modify 2-Custom.stories.ts
npm run storybook


