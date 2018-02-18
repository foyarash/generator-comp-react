const params = {
  componentPath: './src/components',
  containerPath: './src/containers',
  functional: false,
  pure: false,
  container: false,
  withRedux: false,
  native: false,
  name: 'MyComponent',
  withPropTypes: true,
  separateDir: true
};

const booleanKeys = [
  'functional',
  'pure',
  'container',
  'withRedux',
  'native',
  'withPropTypes',
  'separateDir'
];

const stringKeys = ['componentPath', 'containerPath', 'name'];

const parser = args => {
  console.log(args);
  args.map(arg => {
    if (arg[0] === '-' && arg[1] === '-') {
      arg = arg.substring(2, arg.length);
      console.log('arg', arg);
      if (/[a-zA-Z]+={1}(\W|(true|false)|[a-zA-Z])+/.test(arg)) {
        const [key, value] = arg.split('=');
        console.log('key, value', key, value);

        if (
          booleanKeys.includes(key) &&
          (value === 'true' || value === 'false')
        ) {
          params[key] = JSON.parse(value);
        } else if (stringKeys.includes(key)) {
          params[key] = value;
        } else {
          console.log(`Incorrect flag ${key}`);
        }
      } else if (/[a-zA-Z]+/.test(arg)) {
        params[arg] = true;
      }
    }
  });

  return params;
};

module.exports = parser;
