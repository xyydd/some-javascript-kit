const Fontmin = require("fontmin");
const fs = require("fs");
try {
  //指定读取文件夹fontFile
  const fontFilePath = "./fontFile";
  const fontFileDir = fs.readdirSync(fontFilePath);
  // 填写需要提取的字符，字符不要重复
  const text="水产绿色健康养殖技术云课堂法律法规与政策文件重点品种质量安全管控技术水产快速检验检测水产绿色健康养殖小知识";
  // 只拿取ttf文件
  const fonts = fontFileDir.filter((fd) => {
    let fileType = fd.split(".");
    fileType = fileType[fileType.length - 1];
    return fileType == "ttf";
  });
  if (fonts.length < 1) throw "无可用.ttf字体文件";

  const fontmin = new Fontmin()
    .src(fontFilePath + "/" + fonts[0]) // 指定要处理的字体文件，只拿取fontFile文件夹中的第一个字体文件
    .use(
      Fontmin.glyph({
        text,
      })
    )
    .dest("./output"); // 指定输出目录

  fontmin.run(function (err, files) {
    if (err) {
      throw err;
    } else {
      console.log("已生成新的字体文件，可前往 https://gero3.github.io/facetype.js 转成JSON格式");
    }
  });
} catch (err) {
  console.error(err);
}
