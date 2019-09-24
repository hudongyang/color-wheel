$(function () {
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    var image = ctx.createImageData(100, 100);
    var len = 100;
    var radius = len / 2;
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
    var currentHSV = {
        hue: 180,
        saturation: 1.0,
        value: 1.0,
        alpha: 255
    };
    function displayRGB(hsv) {
        var rgb = hsv2rgb(hsv);
        $('#rgb').text("rgb(" + rgb.red.toFixed(0) + ", " + rgb.green.toFixed(0) + ", " + rgb.blue.toFixed(0) + ")");
    }
    function drawHSV(hsv) {
        var rgb = hsv2rgb(hsv);
        for (var i = 0; i < 100 * 100 * 4; i++) {
            var type = i % 4;
            switch (type) {
                case ColorType.RED:
                    image.data[i] = rgb.red;
                    break;
                case ColorType.GREEN:
                    image.data[i] = rgb.green;
                    break;
                case ColorType.BLUE:
                    image.data[i] = rgb.blue;
                    break;
                case ColorType.ALPHA:
                    image.data[i] = rgb.alpha;
                    break;
            }
        }
        ctx.putImageData(image, 0, 0);
    }
    displayRGB(currentHSV);
    drawHSV(currentHSV);
    $('#hue, #saturation, #value, #alpha').on('input', function (e) {
        var target = $(e.target);
        target.prev().find('span').text(target.val());
        var name = target.attr('id');
        currentHSV[name] = target.val();
        requestAnimationFrame(function () {
            displayRGB(currentHSV);
            drawHSV(currentHSV);
        });
    });
});
//# sourceMappingURL=hsv.js.map