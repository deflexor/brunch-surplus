const compiler = require('surplus/compiler');

class BrunchSurplusPlugin {
  constructor(config) {
    this.sourceMaps = config.sourceMaps;
  }

  compile(file) {
    const options = {};
    if (this.sourceMaps === 'inline') {
      options.sourcemap = 'append';
    } else if (this.sourceMaps) {
      options.sourcemap = 'extract';
    }
    return new Promise((resolve, reject) => {
      try {
        const compiled = compiler.compile(file.data, options);
        const result = typeof compiled === 'string' ?
                       {data: compiled} : {data: compiled.src, map: compiled.map};
        resolve(result);
      } catch (error) {
        reject(error);
        return;
      }
    });
  }
}

// Tell Brunch we are indeed a plugin for it
BrunchSurplusPlugin.prototype.brunchPlugin = true;
BrunchSurplusPlugin.prototype.type = 'javascript';
BrunchSurplusPlugin.prototype.pattern = /\.jsx?$/;

// The plugin has to be the module’s default export
module.exports = BrunchSurplusPlugin;
