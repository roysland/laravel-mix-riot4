# Laravel mix for riot4
Laravel mix plugin for Riot 4

## Usage
Installation
```bash
npm install laravel-mix-riot4 --save-dev
```

In `webpack.mix.js`:
```javascript
const mix = require('laravel-mix')
mix.riot = require('laravel-mix-riot4')

mix-riot('resources/riot/riot.js', 'public/js')
```