/**
 * CanvasDraw 在canvas上画图片，并一直居中。
 */
class CanvasDraw {
  /**
   * @param  {Object} ctx          canvas的context 对象
   * @param  {[type]} screenWidth  canvas的宽度
   * @param  {[type]} screenHeight canvas的高度
   * @return {void}
   */
  constructor (ctx, screenWidth = 0, screenHeight = 0) {
    this.sequenceCtx = ctx
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
  }
  /**
   * 画的函数
   * @param  {Image} image      new Image()对象
   * @param  {[type]} imgWidth  图片原始宽度
   * @param  {[type]} imgHeight 图片原始高度
   * @return {void}
   */
  handleDraw (image, imgWidth, imgHeight) {
    if (this.screenWidth) {
      this.screenWidth = window.innerWidth
    }
    if (this.screenHeight) {
      this.screenHeight = window.innerHeight
    }
    if (this.screenWidth * 9 === this.screenHeight * 16) {
      this.sequenceCtx.drawImage(image, 0, 0, this.screenWidth, this.screenHeight)
    } else {
      const dw = this.screenWidth / imgWidth
      const dh = this.screenHeight / imgHeight
      if (this.screenWidth <= imgWidth && this.screenHeight >= imgHeight) {
        // console.log(0)
        this.sequenceCtx.drawImage(
          image,
          (this.screenHeight * 16 / 9 - this.screenWidth) / 2 * imgHeight / this.screenHeight,
          0,
          imgWidth - ((this.screenHeight * 16 / 9 - this.screenWidth) * imgHeight / this.screenHeight),
          imgHeight,
          0,
          0,
          this.screenWidth,
          this.screenHeight
        )
      }
      if (this.screenWidth < imgWidth && this.screenHeight <= imgHeight && dw < dh) {
        // console.log(1)
        this.sequenceCtx.drawImage(
          image,
          (this.screenHeight * 16 / 9 - this.screenWidth) / 2 * imgHeight / this.screenHeight,
          0,
          // (this.screenHeight * 16 / 9 - this.screenWidth) / 2 + 40,
          // 0,
          imgWidth - ((this.screenHeight * 16 / 9 - this.screenWidth) * imgHeight / this.screenHeight),
          imgHeight,
          0,
          0,
          this.screenWidth,
          this.screenHeight
        )
      }
      if (this.screenWidth >= imgWidth && this.screenHeight <= imgHeight) {
        // console.log(2)
        this.sequenceCtx.drawImage(
          image,
          0,
          (this.screenWidth * 9 / 16 - this.screenHeight) / 2 * imgWidth / this.screenWidth,
          imgWidth,
          imgHeight - ((this.screenWidth * 9 / 16 - this.screenHeight) * imgWidth / this.screenWidth),
          0,
          0,
          this.screenWidth,
          this.screenHeight
        )
      }
      if (this.screenWidth < imgWidth && this.screenHeight < imgHeight && dw > dh) {
        // console.log(3)
        this.sequenceCtx.drawImage(
          image,
          0,
          (this.screenWidth * 9 / 16 - this.screenHeight) / 2 * imgWidth / this.screenWidth,
          // 0,
          // (this.screenWidth * 9 / 16 - this.screenHeight) / 2 + 40,
          imgWidth,
          imgHeight - ((this.screenWidth * 9 / 16 - this.screenHeight) * imgWidth / this.screenWidth),
          0,
          0,
          this.screenWidth,
          this.screenHeight
        )
      }
      if (this.screenWidth > imgWidth && this.screenHeight > imgHeight && dw < dh) {
        this.sequenceCtx.drawImage(
          image,
          (this.screenHeight * 16 / 9 - this.screenWidth) / 2 * imgHeight / this.screenHeight,
          0,
          imgWidth - ((this.screenHeight * 16 / 9 - this.screenWidth) * imgHeight / this.screenHeight),
          imgHeight,
          0,
          0,
          this.screenWidth,
          this.screenHeight
        )
      }
      if (this.screenWidth > imgWidth && this.screenHeight > imgHeight && dw > dh) {
        this.sequenceCtx.drawImage(
          image,
          0,
          (this.screenWidth * 9 / 16 - this.screenHeight) / 2 * imgWidth / this.screenWidth,
          imgWidth,
          imgHeight - ((this.screenWidth * 9 / 16 - this.screenHeight) * imgWidth / this.screenWidth),
          0,
          0,
          this.screenWidth,
          this.screenHeight
        )
      }
    }
  }
}

exports.module = CanvasDraw
