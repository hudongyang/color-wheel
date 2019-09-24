$(() => {
    const canvas = $('#canvas')[0] as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    const image = ctx.createImageData(100, 100)
    const len = 100
    const radius = len / 2

    interface RGB {
        red: number
        green: number
        blue: number
        alpha: number
    }

    interface HSV {
        hue: number
        saturation: number
        value: number
        alpha: number
    }

    enum ColorType {
        RED,
        GREEN,
        BLUE,
        ALPHA
    }

    // hue in range [0, 360]
    // saturation, value in range [0,1]
    // return [r,g,b] each in range [0,255]
    // See: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
    function hsv2rgb(hsv: HSV): RGB {
        let chroma = hsv.value * hsv.saturation;
        let hue1 = hsv.hue / 60;
        let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
        let r1, g1, b1;

        if (hue1 >= 0 && hue1 <= 1) {
            ([r1, g1, b1] = [chroma, x, 0]);
        } else if (hue1 >= 1 && hue1 <= 2) {
            ([r1, g1, b1] = [x, chroma, 0]);
        } else if (hue1 >= 2 && hue1 <= 3) {
            ([r1, g1, b1] = [0, chroma, x]);
        } else if (hue1 >= 3 && hue1 <= 4) {
            ([r1, g1, b1] = [0, x, chroma]);
        } else if (hue1 >= 4 && hue1 <= 5) {
            ([r1, g1, b1] = [x, 0, chroma]);
        } else if (hue1 >= 5 && hue1 <= 6) {
            ([r1, g1, b1] = [chroma, 0, x]);
        }

        let m = hsv.value - chroma;
        let [r, g, b] = [r1 + m, g1 + m, b1 + m];

        return {
            red: 255 * r,
            green: 255 * g,
            blue: 255 * b,
            alpha: hsv.alpha
        }
    }

    const currentHSV: HSV = {
        hue: 180,
        saturation: 1.0,
        value: 1.0,
        alpha: 255
    }

    function displayRGB(hsv: HSV) {
        const rgb = hsv2rgb(hsv)

        $('#rgb').text(`rgb(${rgb.red.toFixed(0)}, ${rgb.green.toFixed(0)}, ${rgb.blue.toFixed(0)})`)
    }

    function drawHSV(hsv: HSV) {
        const rgb = hsv2rgb(hsv)

        for(let i=0; i<100 * 100 * 4; i++) {
            const type: ColorType = i % 4

            switch (type) {
                case ColorType.RED:
                    image.data[i] = rgb.red
                    break
                case ColorType.GREEN:
                    image.data[i] = rgb.green
                    break
                case ColorType.BLUE:
                    image.data[i] = rgb.blue
                    break
                case ColorType.ALPHA:
                    image.data[i] = rgb.alpha
                    break
            }
        }

        ctx.putImageData(image, 0, 0)
    }

    displayRGB(currentHSV)

    drawHSV(currentHSV)

    $('#hue, #saturation, #value, #alpha').on('input', e => {
        const target = $(e.target)
        target.prev().find('span').text(target.val() as string)

        const name = target.attr('id')
        currentHSV[name] = target.val()

        requestAnimationFrame(() => {
            displayRGB(currentHSV)
            drawHSV(currentHSV)
        })
    })

})


