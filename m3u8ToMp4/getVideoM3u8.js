// const axios = require("axios");
const arr = require('./tcgsl')
const fs = require("fs");
const path = require("path");
const m3u8ToMp4 = require("./m3u8ToMp4.js"); // 引入核心模块，注意路径

async function downloadMedia (opt, callback) {
  return new Promise((resolve, reject) => {
    const converter = new m3u8ToMp4();
    // 测试视频，如果链接失效的话就自己找一个
    let url = opt.url;
    let output = opt.output || 'video';
    let filename =   opt.filename || 'video.mp4' || 'video.mp4';
    let title = opt.title || '测试视频';

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output, {
        recursive: true,
      });
    }

    console.log(filename, "准备下载...");

    converter
      .setInputFile(url)
      .setOutputFile(path.join(output, filename))
      .start()
      .then(() => {
        console.log(filename, "下载完成!");
        resolve();
      })
      .catch(err => {
        reject(err);
      });


  })
}

async function getVideo(isOneByOne) {
  if (arr.length > 0) {
    const urlList = arr;
    for (let i = 0; i < urlList.length; i++) {
      const itemArr = urlList[i].split('$');
      if (itemArr.length > 1) {
        const url = itemArr[1];
        const filename = itemArr[0] + '.mp4';
        if (isOneByOne) {
          await downloadMedia({
            url: url,
            filename: filename,
            output: 'video',
          });
        } else {
          downloadMedia({
            url: url,
            filename: filename,
            output: 'video',
          });
        }
      }
    }
  }
}

getVideo(true);


