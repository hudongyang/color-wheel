(function () {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var image = ctx.createImageData(100, 100);
    var ColorType;
    (function (ColorType) {
        ColorType[ColorType["RED"] = 0] = "RED";
        ColorType[ColorType["GREEN"] = 1] = "GREEN";
        ColorType[ColorType["BLUE"] = 2] = "BLUE";
        ColorType[ColorType["ALPHA"] = 3] = "ALPHA";
    })(ColorType || (ColorType = {}));
    // hue in range [0, 360]
    // saturation, value in range [0,1]
    // return [r,g,b] each in range [0,255]
    // See: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
    function hsv2rgb(hsv) {
        var _a, _b, _c, _d, _e, _f;
        var chroma = hsv.value * hsv.saturation;
        var hue1 = hsv.hue / 60;
        var x = chroma * (1 - Math.abs((hue1 % 2) - 1));
        var r1, g1, b1;
        if (hue1 >= 0 && hue1 <= 1) {
            (_a = [chroma, x, 0], r1 = _a[0], g1 = _a[1], b1 = _a[2]);
        }
        else if (hue1 >= 1 && hue1 <= 2) {
            (_b = [x, chroma, 0], r1 = _b[0], g1 = _b[1], b1 = _b[2]);
        }
        else if (hue1 >= 2 && hue1 <= 3) {
            (_c = [0, chroma, x], r1 = _c[0], g1 = _c[1], b1 = _c[2]);
        }
        else if (hue1 >= 3 && hue1 <= 4) {
            (_d = [0, x, chroma], r1 = _d[0], g1 = _d[1], b1 = _d[2]);
        }
        else if (hue1 >= 4 && hue1 <= 5) {
            (_e = [x, 0, chroma], r1 = _e[0], g1 = _e[1], b1 = _e[2]);
        }
        else if (hue1 >= 5 && hue1 <= 6) {
            (_f = [chroma, 0, x], r1 = _f[0], g1 = _f[1], b1 = _f[2]);
        }
        var m = hsv.value - chroma;
        var _g = [r1 + m, g1 + m, b1 + m], r = _g[0], g = _g[1], b = _g[2];
        return {
            red: 255 * r,
            green: 255 * g,
            blue: 255 * b,
            alpha: hsv.alpha
        };
    }
    function xy2polar(x, y) {
        var r = Math.sqrt(x * x + y * y);
        var phi = Math.atan2(y, x);
        return [r, phi];
    }
    function rad2deg(rad) {
        return (rad + Math.PI) / (2 * Math.PI) * 360;
    }
    var radius = image.width / 2;
    for (var x = -radius; x < radius; x++) {
        for (var y = -radius; y < radius; y++) {
            var _a = xy2polar(x, y), r = _a[0], phi = _a[1];
            if (r > radius) {
                continue;
            }
            var index = ((x + radius) * image.width + (y + radius)) * 4;
            var deg = rad2deg(phi);
            var rgb = hsv2rgb({ hue: deg, saturation: r / radius, value: 1.0, alpha: 255 });
            image.data[index] = rgb.red;
            image.data[index + 1] = rgb.green;
            image.data[index + 2] = rgb.blue;
            image.data[index + 3] = rgb.alpha;
        }
    }
    ctx.putImageData(image, 0, 0);
})();
//# sourceMappingURL=wheel.js.map