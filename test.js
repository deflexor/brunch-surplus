const expect = require('chai').expect;
const SurplusPlugin = require('.');

describe('SurplusPlugin', () => {
  let plugin;
  const path = 'file.js';

  beforeEach(() => {
    plugin = new SurplusPlugin({
      plugins: {},
    });
  });

  it('should be an object', () => {
    expect(plugin).to.be.an.instanceof(SurplusPlugin);
  });


  it('should have #compile method', () => {
    expect(plugin).to.respondTo('compile');
  });

  it('should compile and produce valid result', () => {
    const data = 'var x = 1;\nvar a = <div></div>';
    const expected = "var x = 1;\nvar a = Surplus.createElement('div', null, null)";

    return plugin.compile({data, path}).then(file => {
      expect(file.data).to.equal(expected);
    });
  });

  it('should produce source maps', () => {
    plugin = new SurplusPlugin({
      plugins: {},
      sourceMaps: true,
    });

    const data = 'a = <a class="v"></a>';
    const expected = 'a = Surplus.createElement("a", "v", null)';

    return plugin.compile({data, path}).then(file => {
      expect(file.data).to.equal(expected);
      expect(file.map).to.be.a('object');
    });
  });

  it('should produce inline source maps', () => {
    plugin = new SurplusPlugin({
      plugins: {},
      sourceMaps: 'inline',
    });

    const data = '<a></a>';

    return plugin.compile({data, path}).then(file => {
      expect(file.data).to
                       .include('//# sourceMappingURL=data:application/json,');
    });
  });

});
