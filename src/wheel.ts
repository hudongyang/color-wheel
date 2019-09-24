(function() {
	const canvas = document.querySelector('canvas') as HTMLCanvasElement
	const ctx = canvas.getContext('2d')
	const image = ctx.createImageData(100, 100)

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

	function xy2polar(x, y) {
		let r = Math.sqrt(x * x + y * y);
		let phi = Math.atan2(y, x);
		return [r, phi];
	}

	function rad2deg(rad) {
		return (rad + Math.PI) / (2 * Math.PI) * 360;
	}

	const radius = image.width / 2
	for (let x = -radius; x < radius; x++) {
		for (let y = -radius; y < radius; y++) {
			const [r, phi] = xy2polar(x, y)

			if (r > radius) {
				continue
			}

			const index = ((x + radius) * image.width + (y + radius)) * 4

			const deg = rad2deg(phi)
			const rgb = hsv2rgb({hue: deg, saturation: r / radius, value: 1.0, alpha: 255})

			image.data[index] = rgb.red
			image.data[index + 1] = rgb.green
			image.data[index + 2] = rgb.blue
			image.data[index + 3] = rgb.alpha
		}
	}


	ctx.putImageData(image, 0, 0)

})()