'use strict';
import { compiler } from 'surplus/compiler';

class BrunchSurplusPlugin {
  constructor(config) {
    this.config = config.plugins.plugin || {};
  }

  compile(file) {
    return new Promise((resolve, reject) => {
      try {
        let { out, map } = compiler.compile(file.data, { sourcemap: 'extract' });
        resolve({ data: out, map: JSON.stringify(map) });
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
