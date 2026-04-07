const fs = require('fs');
const path = require('path');

class GitRemoteUrlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('RemoteUrlWebpackPlugin', (compilation, callback) => {
      const remoteUrl = this.getRemoteUrl();
      const outputPath = path.join(compilation.outputOptions.path, 'REMOTEURL');
      fs.writeFile(outputPath, remoteUrl, (err) => {
        if (err) {
          console.error('Error writing remoteurl file:', err);
        } else {
          console.log('remoteurl file created successfully.');
        }
        callback();
      });
    });
  }

  getRemoteUrl() {
    try {
      const originUrl = require('child_process')
        .execSync('git config --get remote.origin.url')
        .toString()
        .trim();
      return originUrl;
    } catch (error) {
      console.error('Error getting remote URL:', error);
      return '';
    }
  }
}

module.exports = GitRemoteUrlWebpackPlugin;
