$(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    const len = 100
    const radius = len / 2
    const image = ctx.createImageData(len, len)
    const data = image.data

    enum ColorType {
        RED,
        GREEN,
        BLUE,
        ALPHA
    }

    interface Color {
        red: number
        green: number
        blue: number
        alpha: number
    }

    interface Point {
        x: number
        y: number
    }

    function setDataUnit(value: number, type: ColorType) {
        for (var i = 0; i < data.length; ++i) {
            if (i % 4 == type) {
                data[i] = value
            }
        }

        ctx.putImageData(image, 0, 0)
    }

    const color: Color = {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 255
    }

    function distance(p1: Point, p2: Point) {
        const x = p2.x - p1.x
        const y = p2.y - p1.y

        return Math.sqrt(x * x + y * y)
    }

    function drawCircle(color: Color) {
        const origin: Point = { x: radius, y: radius }

        for (let x = 0; x < len; x++) {
            for (let y = 0; y < len; y++) {
                const index = (x * len + y) * 4

                if (distance(origin, { x, y }) > radius) {
                    continue
                }

                data[index] = color.red
                data[index + 1] = color.green
                data[index + 2] = color.blue
                data[index + 3] = color.alpha
            }
        }

        ctx.putImageData(image, 0, 0)
    }

    drawCircle(color)

    $('#red, #green, #blue, #alpha').on('input', e => {
        const ele = $(e.target)
        const name = ele.attr('id')
        color[name] = ele.val()
        requestAnimationFrame(() => drawCircle(color))
    })
})