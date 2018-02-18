React generator is a simple command line tool to generate React and React Native components, including stateless components and redux connected components, and redux containers.

## Install

`npm install -g react-generator`

or

`yarn global add react-generator`

## Usage

`react-generate [options...]`

## Options

* `--componentPath` : defaults to `./src/components`. Root folder of the components location.
* `--containerPath` : defaults to `./src/containers`. Root folder of the containers location.
* `--functional=true|false` : defaults to `false`. If true, creates a functional component.
* `--pure=true|false` : defaults to `true`. If true, extends PureComponent instead of Component.
* `--container=true|false` : defaults to `false`. If true, creates a redux connected component. The `functional` option won't be used in that case. Creates the associated component in the `componentPath` location.
* `--withRedux=true|false` : defaults to `false`. If true, connect the component with redux. Defaults to `true` when `container` is `true`
* `--native=true|false` : defaults to `false`. If true, imports the basic stuff from react-native (View, StyleSheet), renders a View instead of a div, and creates a basic StyleSheet. When native is false, a separate css file is created.
* `--name=ComponentName` : defaults to `MyComponent`. Sets the component name. When `container` is set to true, will automatically suffix the name with `Container`, so for example `MyAwesomeComponent` will transform into `MyAwesomeComponentContainer`.
* `--withPropTypes=true|false` : defaults to `true`. If set to true, imports the prop-types package and add the `propTypes` and `defaultProps` fields to the component.
* `--separateDir=true|false` : defaults to `true`. If set to true, will create a folder with the component's name, with an index.js, the component's file and its css (if not native). If set to false, will just create the component's file and its css into the `componentPath` folder.

Note: passing an option without any value will be considered as a `true` value if it can evaluate to true, for example `--withPropTypes` is the same as `--withPropTypes=true` but `--componentPath` wont update the `componentPath` value.
