<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const particles: Particle[] = [];
	let ctx: CanvasRenderingContext2D;
	let scrollY = 0;

	class Particle {
		x: number;
		y: number;
		size: number;
		speedY: number;
		alpha: number;

		constructor(x: number, y: number, size: number, speedY: number, alpha: number) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.speedY = speedY;
			this.alpha = alpha;
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';

			ctx.fill();
		}

		update() {
			this.y += this.speedY;
			if (this.y > canvas.height) {
				this.y = 0;
				this.x = Math.random() * canvas.width;
			}
		}
	}

	function createParticles() {
		for (let i = 0; i < 70; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			const size = Math.random() * 2 + 2;
			const speedY = Math.random() * 0.3 + 0.3;
			const alpha = Math.random() * 0.1 + 0.4;
			particles.push(new Particle(x, y, size, speedY, alpha));
		}
	}
	function animate() {
		if (!canvas) return;
		ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		particles.forEach((particle) => {
			particle.update();
			particle.draw();
		});

		requestAnimationFrame(animate);
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		createParticles();
		animate();

		const handleResize = () => {
			if (window.matchMedia('(min-width: 900px)').matches) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				particles.length = 0;
				createParticles();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<svelte:window bind:scrollY />

<canvas bind:this={canvas} id="particleCanvas"></canvas>
<div class="overlay"></div>

<style>
	.overlay {
		-webkit-user-drag: none;
		user-select: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.02) 10%,
			rgba(255, 255, 255, 0.05) 20%,
			rgba(255, 255, 255, 0.02) 30%,
			rgba(255, 255, 255, 0) 40%,
			rgba(255, 255, 255, 0.02) 50%,
			rgba(255, 255, 255, 0.05) 60%,
			rgba(255, 255, 255, 0.02) 70%,
			rgba(255, 255, 255, 0) 80%,
			rgba(255, 255, 255, 0.02) 90%,
			rgba(255, 255, 255, 0) 100%
		);
		mix-blend-mode: difference;
	}
	#particleCanvas {
		position: fixed;
		user-select: none;
		-webkit-user-drag: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
