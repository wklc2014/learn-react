/**
 * 通过 canvas 将文字转换成图像数据 base64
 */
function getWaterMarkImageByCanvas(params = {}) {
  const settings = Object.assign({}, {
    url: '',              // 背景图片
    text: '',       // 水印文本-内容
    textAlign: 'middle',  // 水印文本-对其方式
    textRotate: -20,      // 水印文本-旋转角度
    fontColor: '#000',    // 水印文本-颜色
    fontFamily: 'Arial',  // 水印文本-字体
    fontSize: 20,         // 水印文本-大小
    fontShadowColor: 'rgba(0, 0, 0, 0.5)',  // 文本阴影颜色
    fontShadowOffsetX: 3,                   // 文本阴影 x 偏移
    fontShadowOffsetY: 3,                   // 文本阴影 y 偏移
    fontShadowBlur: 3,                      // 轻微模糊阴影
    maskWidth: 200,                 // 生成图像宽度
    maskHeight: 100,                // 生成图像高度
    maskOpacity: 1,                 // 生成图像透明度
  }, params);

  // 创建 canvas 标签
  const canvas = document.createElement('canvas');

  // 设置 canvas 宽度和高度
  canvas.width = settings.maskWidth;
  canvas.height = settings.maskHeight;

  // canvas 绘制对象
  const context = canvas.getContext('2d');

  // 设置透明度
  context.globalAlpha = settings.maskOpacity;

  // 绘制矩形作为背景颜色
  if (!settings.url) {
    throw Error('function getWaterMarkImageByCanvas url is must!');
  }

  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      const width = Math.min(img.width, settings.maskWidth);
      const height = Math.min(img.height, settings.maskHeight);
      context.drawImage(img, 0, 0, width, height);

      if (settings.text) {
        // 移动 canvas 中心
        context.translate(settings.maskWidth / 2, settings.maskHeight / 2);
        context.rotate(settings.textRotate * Math.PI / 180);

        // 绘制文本
        context.fillStyle = settings.fontColor;
        if (settings.fontShadowColor) {
          context.shadowColor = settings.fontShadowColor;
        }
        if (settings.fontShadowOffsetX) {
          context.shadowOffsetX = settings.fontShadowOffsetX;
        }
        if (settings.fontShadowOffsetY) {
          context.shadowOffsetY = settings.fontShadowOffsetY;
        }
        if (settings.fontShadowBlur) {
          context.shadowBlur = settings.fontShadowBlur;
        }
        context.font = `${settings.fontSize}px ${settings.fontFamily}`;
        const textWidth = context.measureText(settings.text).width;
        context.fillText(settings.text, - textWidth / 2, 0);
        context.textBaseline = settings.textAlign;
      }

      //注意这里背景透明的话，需要使用png
      const dataUrl = canvas.toDataURL('image/png');

      resolve(dataUrl);
    };
    img.onerror = function(err) {
      reject(err);
    };
    img.src = settings.url;
  });
}

export default getWaterMarkImageByCanvas;
