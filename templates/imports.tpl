import React{{^functional}}, {{#pure}}{ PureComponent }{{/pure}}{{^pure}}{ Component }{{/pure}}{{/functional}} from 'react';
{{#withPropTypes}}
import PropTypes from 'prop-types';
{{/withPropTypes}}
{{#native}}
import { View, StyleSheet } from 'react-native';
{{/native}}
{{#withRedux}}
import { connect } from 'react-redux'
{{/withRedux}}

