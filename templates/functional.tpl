{{#container}}
import {{name}} from '../components/{{name}}';

{{/container}}
const {{finalName}} = ({ ...props }) => (
  {{^container}}
  {{#native}}
  <View style={styles.container}>
  </View>
  {{/native}}
  {{^native}}
  <div></div>
  {{/native}}
  {{/container}}
  {{#container}}
  <{{name}} {...props} />
  {{/container}}
);

{{#native}}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

{{/native}}
{{#withPropTypes}}
{{finalName}}.propTypes = {};

{{finalName}}.defaultProps = {};

{{/withPropTypes}}
{{#withRedux}}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

{{/withRedux}}
export default {{#withRedux}}connect(mapStateToProps, mapDispatchToProps)({{finalName}}){{/withRedux}}{{^withRedux}}{{finalName}}{{/withRedux}}