import fg from 'fast-glob';

const ext = '*.{png,jpg,jpeg}';

const defaultOptions = {
  dir: 'src/assets/images',
  rel: 'preload',
};
export default function preloadImages(options = defaultOptions) {
  return {
    name: 'preload-images-plugin',
    transformIndexHtml(html, ctx) {
      const { dir, rel } = { ...defaultOptions, ...options };
      if (ctx.bundle) {
        const imgaeFileList = Object.keys(ctx.bundle).filter(
          (key) => key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg'),
        );
        return imgaeFileList.map((item) => {
          return {
            tag: 'link',
            attrs: {
              rel: rel,
              as: 'image',
              href: item,
            },
          };
        });
      } else {
        // console.log(ctx.server.config);
        let images = [];
        if (Array.isArray(dir)) {
          for (let i = 0; i < dir.length; i++) {
            const directory = dir[i];
            let str = directory;
            if (directory.charAt(directory.length - 1) !== '/') {
              str = str + '/';
            }
            str = str + ext;
            const arr = fg.sync(str);
            images = images.concat(arr);
          }
        } else {
          let str = dir;
          if (dir.charAt(dir.length - 1) !== '/') {
            str = str + '/';
          }
          str = str + ext;
          images = fg.sync(str);
        }
        // console.log(ctx.server.config.base);
        return images.map((item) => {
          return {
            tag: 'link',
            attrs: {
              rel: rel,
              as: 'image',
              href: ctx.server.config.base + item,
            },
          };
        });
      }
    },
  };
}
