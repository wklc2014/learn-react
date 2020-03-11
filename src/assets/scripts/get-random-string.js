/**
 * 生成随机字符串
 */

export default function getRandomString(size = 4) {

  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+';
  const arr = str.split('');
  const length = str.length;

  let randomString = '';
  for(let i = 0; i < size; i ++) {
    let temp = getRandom(0, length - 1);
    randomString += arr[temp];
  }

  return randomString;
}

// 获取随机数
function getRandom(min, max) {
  var space = max - min + 1;
  return Math.floor(Math.random() * space + min);
}