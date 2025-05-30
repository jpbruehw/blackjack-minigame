import { useEffect, useState } from 'react';

const MouseTrail = () => {
    const [enabled, setEnabled] = useState(false);

    const isMobileOrTablet = () => window.innerWidth <= 1024;

    useEffect(() => {
        const check = () => {
            const shouldDisable = isMobileOrTablet();
            setEnabled(!shouldDisable);
        };

        check();

        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const container = document.getElementById("game-container");
        if (!container) return;

        const dots = [];
        const mouse = { x: 0, y: 0 };
        let trailActive = false;
        class Dot {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.node = document.createElement('div');
                this.node.className = 'mouse-trail';
                this.node.style.display = 'none';
                container.appendChild(this.node);
            }

            draw() {
                this.node.style.left = (this.x + 10) + 'px';
                this.node.style.top = (this.y + 15) + 'px';
            }

            show() {
                this.node.style.display = 'block';
            }
        }

        for (let i = 0; i < 12; i++) {
            dots.push(new Dot());
        }

        function draw() {
            if (!trailActive) return;   
            let x = mouse.x;
            let y = mouse.y;

            dots.forEach((dot) => {
                dot.x += (x - dot.x) * 0.5;
                dot.y += (y - dot.y) * 0.5;
                dot.draw();
                x = dot.x;
                y = dot.y;
            });
        }

        const mouseMoveHandler = (event) => {
            const rect = container.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;

            if (!trailActive) {
                trailActive = true;
                dots.forEach(dot => dot.show());
            }
        };

        container.addEventListener('mousemove', mouseMoveHandler);

        function animate() {
            draw();
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            container.removeEventListener('mousemove', mouseMoveHandler);
            dots.forEach(dot => dot.node.remove());
        };
    }, [enabled]);
    // return null since we are not actually returning a dom element
    return null;
};

export default MouseTrail;
