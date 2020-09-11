/**
 * 波浪
 */

export default function WaterWave(canvas, options) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.init(options);
    this.drawWave();
}

WaterWave.prototype.init = function(options) {
    this.options = Object.assign({}, {
        canvasWidth: 100, // 画布宽度
        canvasHeight: 100, // 画布高度
        waveWidth: 0.055, // 波浪宽度, 数越小越宽
        waveHeight: 4, // 波浪高度, 数越大越高
        waveColor: ['#1890ff', '#035bac'], // 波浪颜色
        waveSpeed: 0.02, // 波浪移动速度
        targetValue: 50, // 进度值, 0 ~ 100 之间
        startValue: 0, // 初始进度值, 0 ~ 100 之间
        xStart: 0,
        xOffset: 0,
        lineWidth: 4, // 边线宽度
        lineColor: '#1890ff', // 边线颜色
        textColor: '#1d078e', // 文字颜色
        textSize: 20, // 文字大小
    }, options);
    this.canvas.width = this.options.canvasWidth;
    this.canvas.height = this.options.canvasHeight;
    this.value = this.options.startValue;
    this.xOffset = this.options.xOffset;
    this.drawContainer = true;
    if (this.timer) {
        window.cancelAnimationFrame(this.timer);
    }
}

WaterWave.prototype.getWavePoints = function() {
    const xStart = this.options.xStart;
    const xOffset = this.xOffset;
    const canvasWidth = this.options.canvasWidth;
    const canvasHeight = this.options.canvasHeight;
    const waveWidth = this.options.waveWidth;
    const waveHeight = this.options.waveHeight;
    const value = this.value;
    const points = [];
    for (let x = xStart; x < xStart + canvasWidth; x += Math.PI / 12) {
        const y = waveHeight * Math.sin((xStart + x) * waveWidth + xOffset);
        const dY = canvasHeight * (1 - (value / 100));
        points.push([x, y + dY]);
    }
    return points;
}

WaterWave.prototype.getWaveColor = function() {
    const ctx = this.ctx;
    const waveColor = this.options.waveColor;
    if (waveColor.constructor.toString().indexOf("Array") !== -1) {
        const canvasHeight = this.options.canvasHeight;
        const radius = this.options.canvasWidth / 2;
        const grd = ctx.createLinearGradient(radius, radius, radius, canvasHeight);
        const size = waveColor.length;
        for (let i = 0; i < size; i++) {
            grd.addColorStop(i / size, waveColor[i]);
        }
        return grd;
    }
    if (typeof waveColor === 'string') {
        return waveColor;
    }
    return '#DBB77A';
}

WaterWave.prototype.drawWave = function() {
    const ctx = this.ctx;
    const points = this.getWavePoints();
    const color = this.getWaveColor();
    const canvasWidth = this.options.canvasWidth;
    const canvasHeight = this.options.canvasHeight;
    const xStart = this.options.xStart;
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        ctx.lineTo(point[0], point[1]);
    }
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(xStart, canvasHeight);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

WaterWave.prototype.drawCircle = function(space = 0, color) {
    const ctx = this.ctx;
    const lineWidth = this.options.lineWidth;
    const lineColor = color || this.options.lineColor;
    const r = this.options.canvasWidth / 2;
    const cR = r - lineWidth - space;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    ctx.clip();
}

WaterWave.prototype.update = function() {
    const canvasWidth = this.options.canvasWidth;
    const canvasHeight = this.options.canvasHeight;
    const targetValue = this.options.targetValue;
    const waveSpeed = this.options.waveSpeed;
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (this.value <= targetValue) {
        this.value += 1;
    }
    if (this.value > targetValue) {
        this.value -= 1;
    }
    this.xOffset += waveSpeed;
    if (this.drawContainer) {
        this.drawCircle();
        this.drawCircle(2, '#fff');
        this.drawContainer = false;
    }
    this.drawWave();
    const _this = this;
    this.timer = window.requestAnimationFrame(function() {
        _this.update();
    });
};
