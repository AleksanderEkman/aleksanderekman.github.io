<script lang="ts">
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;
    const particles: Particle[] = [];
    let ctx: CanvasRenderingContext2D;

    class Particle {
        x: number;
        y: number;
        size: number;
        speedY: number;

        constructor(x: number, y: number, size: number, speedY: number) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedY = speedY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            
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
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2 + 2;
            const speedY = Math.random() * 0.3 + 0.3;
            particles.push(new Particle(x, y, size, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (window.matchMedia('(min-width: 1024px)').matches) {
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


<canvas bind:this={canvas} id="particleCanvas"></canvas>
<div class="overlay"></div>

<style>
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
background: linear-gradient(45deg, 
    rgba(255, 255, 255, 0.02) 0%, 
    rgba(255, 255, 255, 0.03) 20%, 
    rgba(255, 255, 255, 0.01) 40%,
    rgba(255, 255, 255, 0.02) 60%,
    rgba(255, 255, 255, 0.03) 80%,
    rgba(255, 255, 255, 0.01) 100%)
    }
    #particleCanvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; 
        z-index: 0; 
    }
</style>