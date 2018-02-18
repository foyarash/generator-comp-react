#! /usr/bin/env node

const paramsParser = require('./parser');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

require.extensions['.tpl'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

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
