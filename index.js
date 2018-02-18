#! /usr/bin/env node

const paramsParser = require('./parser');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

require.extensions['.tpl'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

if (process.argv.includes('-H') || process.argv.includes('--help')) {
  console.log('Usage: generator-comp-react [options...]');
  console.log('Options:');
  console.log(
    '--componentPath=<path> : defaults to ./src/components. Root folder of the components location'
  );
  console.log(
    '--containerPath=<path> : defaults to ./src/containers. Root folder of the containers location.'
  );
  console.log(
    '--functional=true|false : defaults to false. If true, creates a functional component.'
  );
  console.log(
    '--pure=true|false : defaults to true. If true, extends PureComponent instead of Component.'
  );
  console.log(
    "--container=true|false : defaults to false. If true, creates a redux connected component. The functional option won't be used in that case. Creates the associated component in the componentPath location."
  );
  console.log(
    '--withRedux=true|false : defaults to false. If true, connect the component with redux. Defaults to true when container is true'
  );
  console.log(
    '--native=true|false : defaults to false. If true, imports the basic stuff from react-native (View, StyleSheet), renders a View instead of a div, and creates a basic StyleSheet. When native is false, a separate css file is created.'
  );
  console.log(
    '--name=ComponentName : defaults to MyComponent. Sets the component name. When container is set to true, will automatically suffix the name with Container, so for example MyAwesomeComponent will transform into MyAwesomeComponentContainer'
  );
  console.log(
    '--withPropTypes=true|false : defaults to true. If set to true, imports the prop-types package and add the propTypes and defaultProps fields to the component.'
  );
  console.log(
    "--separateDir=true|false : defaults to true. If set to true, will create a folder with the component's name, with an index.js, the component's file and its css (if not native). If set to false, will just create the component's file and its css into the componentPath folder."
  );

  return;
}

const pathCreate = p => {
  const dirname = path.dirname(p);
  if (fs.existsSync(dirname)) {
    return true;
  }
  pathCreate(dirname);
  fs.mkdirSync(dirname);
};

const params = paramsParser(process.argv);
if (params.container) {
  params.withRedux = true;
  params.pure = false;
  if (!params.name.endsWith('Container')) {
    params.finalName = `${params.name}Container`;
  } else {
    params.finalName = params.name;
    params.name = params.name.replace('Container', '');
  }
} else {
  params.finalName = params.name;
}

let importsTpl = require('./templates/imports.tpl');
let template = null;

if (!params.container && !params.functional) {
  template = require('./templates/component.tpl');
} else if (params.functional) {
  template = require('./templates/functional.tpl');
}

const tpl = mustache.render(`${importsTpl}${template}`, params);

const baseComponentSeparatedPath = `${params.componentPath}/${params.name}`;
const baseComponentPath = `${params.componentPath}`;
const baseContainerPath = `${params.containerPath}`;

const createComponent = (template = tpl) => {
  const finalComponentPath = params.separateDir
    ? baseComponentSeparatedPath
    : baseComponentPath;
  pathCreate(`${finalComponentPath}/${params.name}.js`);
  fs.writeFileSync(`${finalComponentPath}/${params.name}.js`, template);
  if (params.separateDir) {
    fs.writeFileSync(
      `${finalComponentPath}/index.js`,
      `export { default } from './${params.name}';\n`
    );
  }
  if (!params.native) {
    fs.writeFileSync(`${finalComponentPath}/${params.name}.css`, '');
  }
};

const createContainer = () => {
  pathCreate(`${baseContainerPath}/${params.finalName}.js`);
  fs.writeFileSync(`${baseContainerPath}/${params.finalName}.js`, tpl);
  params.withRedux = false;
  params.functional = false;
  params.finalName = params.name;
  params.separateDir = true;
  createComponent(
    mustache.render(
      `${importsTpl}${require('./templates/component.tpl')}`,
      params
    )
  );
};

if (!params.container) createComponent();
else createContainer();
