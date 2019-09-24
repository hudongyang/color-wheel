$(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var len = 100;
    var radius = len / 2;
    var image = ctx.createImageData(len, len);
    var data = image.data;
    var ColorType;
    (function (ColorType) {
        ColorType[ColorType["RED"] = 0] = "RED";
        ColorType[ColorType["GREEN"] = 1] = "GREEN";
        ColorType[ColorType["BLUE"] = 2] = "BLUE";
        ColorType[ColorType["ALPHA"] = 3] = "ALPHA";
    })(ColorType || (ColorType = {}));
    function setDataUnit(value, type) {
        for (var i = 0; i < data.length; ++i) {
            if (i % 4 == type) {
                data[i] = value;
            }
        }
        ctx.putImageData(image, 0, 0);
    }
    var color = {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 255
    };
    function distance(p1, p2) {
        var x = p2.x - p1.x;
        var y = p2.y - p1.y;
        return Math.sqrt(x * x + y * y);
    }
    function drawCircle(color) {
        var origin = { x: radius, y: radius };
        for (var x = 0; x < len; x++) {
            for (var y = 0; y < len; y++) {
                var index = (x * len + y) * 4;
                if (distance(origin, { x: x, y: y }) > radius) {
                    continue;
                }
                data[index] = color.red;
                data[index + 1] = color.green;
                data[index + 2] = color.blue;
                data[index + 3] = color.alpha;
            }
        }
        ctx.putImageData(image, 0, 0);
    }
    drawCircle(color);
    $('#red, #green, #blue, #alpha').on('input', function (e) {
        var ele = $(e.target);
        var name = ele.attr('id');
        color[name] = ele.val();
        requestAnimationFrame(function () { return drawCircle(color); });
    });
});
//# sourceMappingURL=index.js.map