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

mix.riot('resources/riot/riot.js', 'public/js')
```

Example riot.js
```javascript
import { mount } from 'riot'
import { register } from 'riot'
import { basename } from 'path'

const globalComponentsContext = require.context('./components/', true, /[a-zA-Z0-9-]+\.riot/)

const registerGlobalComponents = () => {
  globalComponentsContext.keys().map(path => {
    const name = basename(path, '.riot')
    const component = globalComponentsContext(path)
    // Compile
    
    console.log(component.default.css)
    register(name, component.default)
    mount(name)
    return {
      name,
      component
    }
  })
}

registerGlobalComponents()
```
Example component /resources/riot/components/my-component.riot
```javascript
<my-component>
<p>Time elapsed: { state.time }</p>
<script>
export default {
    tick () {
        this.update({ time: ++this.state.time })
    },
    onBeforeMount (props) {
        this.state = {
            time: Number(props.start) || 0
        }

        this.timer = setInterval(this.tick, 1000)
    },
    onUnMounted () {
        clearInterval(this.timer)
    }
}
</script>
<style lang="scss">
p {
    color: red;
}
</style>
</my-component>
```
You can then use 
```html
<my-component></my-component>
```
Currently looking for a way to opt in for scss-preprocessing in components. Right now, you can add this to the loader in the package
```javascript
const compiler = require('@riotjs/compiler')
const sass = require('sass')

compiler.registerPreprocessor('css', 'scss', function(code, { options }) {
    const { file } = options;
  
    console.log('Compile the sass code in', file);
  
    const result = sass.renderSync({
        file,
        data: code
    });
  
    return {
        code: result.css.toString(),
        map: null
    };
});
```

Styling in components should be ```<style type="text/scss">...</style>```
It will render as inline styles
