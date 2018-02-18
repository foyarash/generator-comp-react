export {{^withRedux}}default {{/withRedux}}class {{finalName}} extends {{#pure}}PureComponent{{/pure}}{{^pure}}Component{{/pure}} {
  {{#withPropTypes}}
  static propTypes = {};

  static defaultProps = {};

  {{/withPropTypes}}
  render() {
    return (
      {{#native}}
      <View style={styles.container}>
      </View>
      {{/native}}
      {{^native}}
      <div></div>
      {{/native}}
    )
  }
}
{{#native}}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

{{/native}}
{{#withRedux}}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)({{finalName}})
{{/withRedux}}