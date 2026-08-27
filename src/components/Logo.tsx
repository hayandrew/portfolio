"use client";

import React, { useEffect, useRef } from "react";

interface Letter {
  id: string;
  w: number;
  h: number;
  xOff: number;
  yOff: number;
  svg: string;
}

interface AnimatedHTMLElement extends HTMLElement {
  _activeAnimId?: number;
}

interface LogoPosition {
  node: HTMLLIElement;
  shadow: HTMLLIElement | null;
  svg: SVGSVGElement;
  svgShadow?: SVGSVGElement | null;
  state?: number;
  orig?: number;
  anim?: boolean;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

interface TouchObj {
  touch: Touch;
}

const SVG_PATHS = {
  a: `m39.08 44.83-9.2 1.39c-.65-2.06-1.29-4.1-1.94-6.14s-1.27-4.08-1.88-6.14l-14.88.54-1.88 8.05H0c.56-6.86 1.15-13.67 1.75-20.45S2.94 8.51 3.51 1.69c2.9-.48 5.8-.89 8.68-1.21S17.99 0 20.93 0q5.385 0 10.77.18c.65 4.2 1.28 8.38 1.91 12.55.62 4.17 1.28 8.36 1.97 12.55.48 3.31 1.02 6.57 1.6 9.8s1.22 6.47 1.91 9.74ZM23.96 25.71c-.04-.36-.14-1.04-.3-2.03q-.24-1.485-.54-3.15c-.2-1.11-.43-2.12-.7-3.02-.26-.91-.51-1.44-.76-1.6q-.12-.06-.57-.12c-.3-.04-.63-.08-.97-.12s-.68-.06-1-.06h-1.48c-.34 0-.71 0-1.09.03-.38.02-.75.07-1.09.15s-.57.18-.7.3c-.08.04-.18.3-.3.79-.12.48-.27 1.08-.45 1.78-.18.71-.36 1.46-.54 2.27s-.35 1.57-.51 2.3-.29 1.35-.39 1.88-.17.83-.21.91l11.62-.3Z`,
  n: `M46.82,27.46c0,3.55-.01,7.05-.03,10.5-.02,3.45-.05,6.95-.09,10.5-2.5-.12-4.98-.18-7.44-.18-1.21,0-2.43.06-3.66.18-1.23.12-2.45.28-3.66.48-1.53-3.35-3.07-6.66-4.6-9.95-1.53-3.29-3.07-6.6-4.6-9.95-1.13-2.46-2.2-4.92-3.21-7.38-1.01-2.46-2.02-4.94-3.02-7.44-.36,5.45-.74,10.86-1.12,16.24-.38,5.38-.7,10.8-.94,16.24l-13.07-.36c-.2-7.74-.38-15.45-.54-23.11C.69,15.57.4,7.86,0,.12l23.65-.12c.81,2.02,1.56,4.04,2.27,6.08.71,2.04,1.38,4.1,2.03,6.2.93,3.19,1.98,6.34,3.15,9.47,1.17,3.13,2.34,6.26,3.51,9.41-.04-5.04-.13-10.06-.27-15.06-.14-5-.25-10.04-.33-15.12l12.22,1.45c.16,4.19.3,8.37.42,12.52.12,4.15.18,8.33.18,12.52Z`,
  d: `M43.01,22.32v3.69c0,1.29-.14,2.52-.42,3.69-.2.89-.42,1.66-.67,2.33-.24.67-.54,1.27-.91,1.81-.36.54-.81,1.05-1.33,1.51-.52.46-1.17.92-1.94,1.36-.24.16-.89.37-1.94.63-1.05.26-2.35.58-3.9.94-1.55.36-3.29.75-5.2,1.15-1.92.4-3.87.8-5.87,1.18-2,.38-3.97.77-5.93,1.15-1.96.38-3.73.73-5.32,1.03-1.59.3-2.94.57-4.05.79-1.11.22-1.84.35-2.21.39-.69-7.38-1.33-14.7-1.94-21.96C.79,14.76.32,7.42,0,0c3.39.12,6.75.25,10.1.39,3.35.14,6.73.33,10.16.57.89.08,2.19.18,3.9.3,1.71.12,3.5.29,5.35.51,1.85.22,3.6.49,5.23.82,1.63.32,2.81.73,3.54,1.21.93.69,1.75,1.61,2.48,2.78.73,1.17,1.25,2.32,1.57,3.45.16.52.28,1.34.36,2.45.08,1.11.14,2.29.18,3.54.04,1.25.07,2.46.09,3.63.02,1.17.03,2.06.03,2.66ZM27.95,23.11c0-.44-.01-.92-.03-1.42-.02-.5-.05-.98-.09-1.42-.08-.64-.19-1.32-.33-2.03-.14-.71-.33-1.39-.57-2.06-.24-.67-.54-1.29-.91-1.88-.36-.58-.81-1.1-1.33-1.54-.28-.24-.97-.43-2.06-.57-1.09-.14-2.28-.24-3.57-.3-1.29-.06-2.5-.1-3.63-.12-1.13-.02-1.86-.03-2.18-.03h-2.48c.32,3.15.61,6.24.88,9.29.26,3.05.49,6.14.7,9.29.77-.04,1.86-.15,3.3-.33,1.43-.18,2.89-.42,4.39-.73,1.49-.3,2.88-.69,4.17-1.15,1.29-.46,2.22-1.02,2.78-1.66.44-.48.72-1,.82-1.54.1-.54.15-1.14.15-1.79Z`,
  y: `M41.5,32.24c0,1.45-.22,2.97-.67,4.57-.44,1.59-1.09,3.09-1.94,4.48-.85,1.39-1.89,2.6-3.12,3.63-1.23,1.03-2.61,1.7-4.14,2.03-.6.12-1.32.22-2.15.3-.83.08-1.68.14-2.57.18-.89.04-1.76.08-2.63.12-.87.04-1.6.06-2.21.06-3.47.16-6.94.25-10.41.27-3.47.02-6.96.03-10.47.03-.16-1.65-.31-3.29-.45-4.9-.14-1.61-.33-3.27-.57-4.96,2.78-.12,5.56-.25,8.32-.39,2.76-.14,5.54-.31,8.32-.51.6-.04,1.28-.06,2.03-.06s1.51-.02,2.3-.06c.79-.04,1.55-.09,2.3-.15.75-.06,1.4-.15,1.97-.27.24-.04.53-.11.88-.21.34-.1.66-.24.94-.42.28-.18.52-.39.73-.63.2-.24.3-.54.3-.91,0-.85-.09-1.78-.27-2.81s-.31-1.95-.39-2.75c-3.02.28-6.06.55-9.1.82-3.05.26-6.1.39-9.17.39-2.1,0-3.77-.59-5.02-1.78-1.25-1.19-2.16-2.75-2.72-4.69-.12-.44-.23-.98-.33-1.6-.1-.62-.18-1.27-.24-1.94-.06-.67-.11-1.32-.15-1.97-.04-.64-.08-1.19-.12-1.63-.2-2.66-.35-5.28-.45-7.86C.17,6.01.08,3.39,0,.73c1.94.2,3.88.38,5.84.54,1.96.16,3.9.3,5.84.42,0,1.9.05,3.9.15,6.02.1,2.12.35,4.08.76,5.9.2.97.58,1.81,1.15,2.51.56.71,1.24,1.29,2.03,1.75.79.46,1.63.81,2.54,1.03.91.22,1.82.33,2.75.33,1.09,0,2.18-.11,3.27-.33,1.09-.22,2.14-.49,3.15-.82-.16-3.02-.29-6.01-.39-8.95-.1-2.94-.29-5.91-.57-8.89,1.21-.04,2.42-.09,3.63-.15,1.21-.06,2.42-.09,3.63-.09,1.9,0,3.81.18,5.75.54,0,1.73.03,3.47.09,5.2.06,1.73.13,3.47.21,5.2.08.81.15,1.62.21,2.45.06.83.11,1.64.15,2.45.16,2.74.42,5.48.79,8.2.36,2.72.54,5.46.54,8.2Z`,
  h: `M37.39,44.77l-12.04.3c-.08-2.62-.14-5.22-.18-7.8-.04-2.58-.1-5.18-.18-7.8l-11.37.54c-.04.4-.06.8-.06,1.18v1.12c0,2.26.09,4.51.27,6.75s.37,4.47.57,6.69c-.81.04-1.62.07-2.45.09-.83.02-1.64.03-2.45.03-1.57,0-3.16-.03-4.75-.09-1.59-.06-3.18-.09-4.75-.09.08-3.75.18-7.46.3-11.13.12-3.67.22-7.38.3-11.13.08-3.67.13-7.3.15-10.89.02-3.59.05-7.2.09-10.83h10.1c.32,3.02.54,6.04.67,9.04.12,3,.3,6.02.54,9.04,1.94-.04,3.85-.06,5.75-.06s3.83-.02,5.81-.06L24.32.06c.56-.04,1.12-.06,1.66-.06h1.66c1.61,0,3.2.04,4.75.12,1.55.08,3.12.26,4.69.54.2,7.38.28,14.73.24,22.05-.04,7.32-.02,14.67.06,22.05Z`,
  underscore: `M38.29 46.92a542.091 542.091 0 0 1-16.22.24c-3.11 0-6.21.09-9.32.27s-6.21.39-9.32.63l-.24-7.86 9.59-.24c3.21-.08 6.4-.12 9.59-.12q3.93 0 7.77.06l7.71.12.42 6.9Z`,
};

const LETTERS: Letter[] = [
  {
    id: "a1",
    w: 42,
    h: 47,
    xOff: 0,
    yOff: 2.5,
    svg: SVG_PATHS.a,
  },
  {
    id: "n",
    w: 52,
    h: 49,
    xOff: 0,
    yOff: 1,
    svg: SVG_PATHS.n,
  },
  {
    id: "d",
    w: 46,
    h: 44,
    xOff: 0,
    yOff: 3,
    svg: SVG_PATHS.d,
  },
  {
    id: "y1",
    w: 60,
    h: 48,
    xOff: 0,
    yOff: 0.5,
    svg: SVG_PATHS.y,
  },
  {
    id: "h",
    w: 42,
    h: 48,
    xOff: 0,
    yOff: 0,
    svg: SVG_PATHS.h,
  },
  {
    id: "a2",
    w: 41,
    h: 42,
    xOff: 0,
    yOff: 0,
    svg: SVG_PATHS.a,
  },
  {
    id: "y2",
    w: 42,
    h: 48,
    xOff: 0,
    yOff: 0,
    svg: SVG_PATHS.y,
  },
  {
    id: "underscore",
    w: 37,
    h: 50,
    xOff: 0,
    yOff: 0,
    svg: SVG_PATHS.underscore,
  },
];

// Easing functions
function easeOutBounce(t: number): number {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
}

function easeOutElastic(t: number): number {
  if (t === 0) return 0;
  if (t === 1) return 1;
  const p = 0.3;
  const s = p / 4;
  return Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1;
}

// Animation helper
// Animation helper using translateY
function animateElementTranslateY(
  element: HTMLElement | null,
  targetY: number,
  duration: number,
  easingFn: (t: number) => number,
  callback?: () => void,
): void {
  if (!element) return;

  const htmlElement = element;
  const el = element as AnimatedHTMLElement;
  if (el._activeAnimId) {
    cancelAnimationFrame(el._activeAnimId);
  }

  let startY = 0;
  const transform = htmlElement.style.transform;
  if (transform) {
    const match = transform.match(/translateY\(([^)]+)px\)/);
    if (match) {
      startY = parseFloat(match[1]) || 0;
    }
  }

  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number): void {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);
    const currentY = startY + distance * easedProgress;
    htmlElement.style.transform = `translateY(${currentY}px)`;

    if (progress < 1) {
      el._activeAnimId = requestAnimationFrame(step);
    } else {
      htmlElement.style.transform = `translateY(${targetY}px)`;
      delete el._activeAnimId;
      if (callback) callback();
    }
  }
  el._activeAnimId = requestAnimationFrame(step);
}

// Animation helper using scale
function animateElementScale(
  element: HTMLElement | null,
  startScale: number,
  targetScale: number,
  duration: number,
  easingFn: (t: number) => number,
  callback?: () => void,
): void {
  if (!element) return;

  const htmlElement = element;
  const el = element as AnimatedHTMLElement;
  if (el._activeAnimId) {
    cancelAnimationFrame(el._activeAnimId);
  }

  const distance = targetScale - startScale;
  const startTime = performance.now();

  function step(now: number): void {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);
    const currentScale = startScale + distance * easedProgress;
    htmlElement.style.transform = `scale(${currentScale})`;

    if (progress < 1) {
      el._activeAnimId = requestAnimationFrame(step);
    } else {
      htmlElement.style.transform = `scale(${targetScale})`;
      delete el._activeAnimId;
      if (callback) callback();
    }
  }
  el._activeAnimId = requestAnimationFrame(step);
}

export default function Logo({ onReady }: { onReady?: () => void } = {}) {
  const containerRef = useRef<HTMLUListElement>(null);
  const shadowsRef = useRef<HTMLUListElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const container = containerRef.current;
      const shadows = shadowsRef.current;
      const logoOutline: HTMLDivElement | null = outlineRef.current;

      if (!container) return;

      // Clear existing inner HTML to avoid duplicate rendering on hot reloads
      container.innerHTML = "";
      if (shadows) shadows.innerHTML = "";

      const mobile =
        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      const positions: LogoPosition[] = [];
      const touches: TouchObj[] = [];
      let currentNode: HTMLLIElement | number | null = null;
      let winHeight = window.innerHeight;
      let touchy = 0;
      const topPos = 0;
      let scale = 2;

      // Event listener declarations for safe cleanup
      let handleTouchStart: ((event: TouchEvent) => void) | null = null;
      let handleTouchMove: ((event: TouchEvent) => void) | null = null;
      let handleTouchEnd: ((event: TouchEvent) => void) | null = null;
      let handleOrientationChange: (() => void) | null = null;
      let handleResize: (() => void) | null = null;
      const handleMouseEnters: Array<{ el: Element; listener: () => void }> =
        [];

      const logoObj = {
        init: function (): void {
          let count = 0;
          let width = 0;
          const glow = 10;

          // Calculate the base width of the logo (with scale = 1)
          let baseWidth = 0;
          for (let i = 0, l = LETTERS.length; i < l; i++) {
            baseWidth += LETTERS[i].w - LETTERS[i].xOff;
          }

          // Dynamically compute scale so that the logo width is 75% of the screen width
          const screenWidth = window.innerWidth || 375;
          const targetScale = (0.75 * screenWidth) / baseWidth;

          // Apply bounds to keep the scale reasonable (min 0.4, max 1.3 for max height of 65px)
          scale = Math.max(0.4, Math.min(1.3, targetScale));

          for (let i = 0, l = LETTERS.length; i < l; i++) {
            count =
              i === 0
                ? 0
                : count + scale * LETTERS[i - 1].w - scale * LETTERS[i].xOff;
            width += scale * LETTERS[i].w - scale * LETTERS[i].xOff;

            const li = document.createElement("li");
            li.className = "letters " + LETTERS[i].id;
            li.style.left = count + "px";
            li.style.top = topPos + scale * LETTERS[i].yOff + "px";

            // Create main SVG element and path dynamically
            const svgEl = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            const svgW = scale * LETTERS[i].w + LETTERS[i].xOff;
            const svgH = scale * LETTERS[i].h + LETTERS[i].yOff;
            svgEl.setAttribute("width", String(svgW));
            svgEl.setAttribute("height", String(svgH));
            svgEl.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);

            const pathEl = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            pathEl.setAttribute("d", LETTERS[i].svg);
            pathEl.setAttribute("fill", "#fff");
            pathEl.setAttribute("stroke", "none");
            pathEl.setAttribute("transform", "scale(" + scale + ")");

            svgEl.appendChild(pathEl);
            li.appendChild(svgEl);
            container.appendChild(li);

            let shadowli: HTMLLIElement | null = null;
            let shadowSvgEl: SVGSVGElement | null = null;

            if (shadows) {
              shadowli = document.createElement("li");
              shadowli.className = "letters " + LETTERS[i].id;
              shadowli.style.left = count + "px";
              shadowli.style.top = topPos + scale * LETTERS[i].yOff + "px";

              // Create shadow SVG element and path dynamically
              shadowSvgEl = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg",
              );
              shadowSvgEl.setAttribute("width", String(svgW));
              shadowSvgEl.setAttribute("height", String(svgH));
              shadowSvgEl.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);

              const shadowPathEl = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path",
              );
              shadowPathEl.setAttribute("d", LETTERS[i].svg);
              shadowPathEl.setAttribute("fill", "rgba(0, 240, 255, 0.15)");
              shadowPathEl.setAttribute("stroke", "none");
              shadowPathEl.setAttribute("transform", "scale(" + scale + ")");

              shadowSvgEl.appendChild(shadowPathEl);
              shadowli.appendChild(shadowSvgEl);
              shadows.appendChild(shadowli);
            }

            positions.push({
              node: li,
              shadow: null, // Keep the shadow placeholder static (don't animate it)
              svg: svgEl,
              svgShadow: null,
            });
          }

          container.style.width = width + "px";
          container.style.transform = "translateX(-50%) scale(1)";
          container.style.opacity = "1";

          if (container.parentElement) {
            container.parentElement.style.height = scale * 50 + "px";
          }

          if (shadows) {
            shadows.style.width = width + "px";
            shadows.style.transform = "translateX(-50%) scale(1)";
            shadows.style.opacity = "1";
          }

          if (logoOutline) {
            logoOutline.style.top = topPos + "px";
          }

          this.bindEvents();
          this.initPositions();

          setTimeout(() => {
            if (onReady) onReady();
          }, 1200);
        },

        registerPositions: function (li: LogoPosition): void {
          const node = li.node;
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          li.left = rect.left + scrollLeft;
          li.top = rect.top + scrollTop;
          li.right = li.left + node.offsetWidth;
          li.bottom = li.top + node.offsetHeight;
        },

        initPositions: function (): void {
          for (let i = 0, l = positions.length; i < l; i++) {
            const node = positions[i].node;
            const orig = parseFloat(node.style.top) || 0;

            positions[i].state = 0;
            positions[i].orig = orig;
            positions[i].anim = false;
            this.registerPositions(positions[i]);
          }
        },

        resizeLogo: function (): void {
          let count = 0;
          let width = 0;

          // Calculate the base width of the logo (with scale = 1)
          let baseWidth = 0;
          for (let i = 0, l = LETTERS.length; i < l; i++) {
            baseWidth += LETTERS[i].w - LETTERS[i].xOff;
          }

          // Dynamically compute scale so that the logo width is 75% of the screen width
          const screenWidth = window.innerWidth || 375;
          const targetScale = (0.75 * screenWidth) / baseWidth;

          // Apply bounds to keep the scale reasonable (min 0.4, max 1.3 for max height of 65px)
          scale = Math.max(0.4, Math.min(1.3, targetScale));

          const lettersElements = container.querySelectorAll(".letters");
          const shadowElements = shadows ? shadows.querySelectorAll(".letters") : null;

          for (let i = 0, l = LETTERS.length; i < l; i++) {
            count =
              i === 0
                ? 0
                : count + scale * LETTERS[i - 1].w - scale * LETTERS[i].xOff;
            width += scale * LETTERS[i].w - scale * LETTERS[i].xOff;

            const li = lettersElements[i] as HTMLLIElement;
            if (li) {
              li.style.left = count + "px";
              li.style.top = topPos + scale * LETTERS[i].yOff + "px";

              const svgEl = li.querySelector("svg");
              if (svgEl) {
                const svgW = scale * LETTERS[i].w + LETTERS[i].xOff;
                const svgH = scale * LETTERS[i].h + LETTERS[i].yOff;
                svgEl.setAttribute("width", String(svgW));
                svgEl.setAttribute("height", String(svgH));
                svgEl.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);

                const pathEl = svgEl.querySelector("path");
                if (pathEl) {
                  pathEl.setAttribute("transform", "scale(" + scale + ")");
                }
              }
            }

            const shadowli = shadowElements ? (shadowElements[i] as HTMLLIElement) : null;
            if (shadowli) {
              shadowli.style.left = count + "px";
              shadowli.style.top = topPos + scale * LETTERS[i].yOff + "px";

              const shadowSvgEl = shadowli.querySelector("svg");
              if (shadowSvgEl) {
                const svgW = scale * LETTERS[i].w + LETTERS[i].xOff;
                const svgH = scale * LETTERS[i].h + LETTERS[i].yOff;
                shadowSvgEl.setAttribute("width", String(svgW));
                shadowSvgEl.setAttribute("height", String(svgH));
                shadowSvgEl.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);

                const shadowPathEl = shadowSvgEl.querySelector("path");
                if (shadowPathEl) {
                  shadowPathEl.setAttribute("transform", "scale(" + scale + ")");
                }
              }
            }
          }

          container.style.width = width + "px";
          if (shadows) {
            shadows.style.width = width + "px";
          }
          if (container.parentElement) {
            container.parentElement.style.height = scale * 50 + "px";
          }

          // Re-initialize calculated letter coordinates so interaction boundary checks remain accurate!
          this.initPositions();
        },

        animateLetter: function (
          li: LogoPosition,
          reset?: boolean,
          drop?: boolean,
        ): void {
          if (reset) li.anim = false;

          if (li.anim === false) {
            li.anim = true;
            const rect = li.node.getBoundingClientRect();
            const bottomY = window.innerHeight - rect.top + 50;
            const topY = -(rect.top + rect.height + 50);

            const dropDuration = 350;
            const returnDuration = 850;

            // Phase 1: Drop off the bottom of the screen
            animateElementTranslateY(
              li.node,
              bottomY,
              dropDuration,
              (t) => t * t, // easeInQuad
              () => {
                // Phase 2 (instant): Teleport to above the top of the viewport
                li.node.style.transform = `translateY(${topY}px)`;
                if (li.shadow) {
                  li.shadow.style.transform = `translateY(${topY}px)`;
                }

                // Phase 3: Return from the top of the screen to original place (0) with bounce
                animateElementTranslateY(
                  li.node,
                  0,
                  returnDuration,
                  easeOutBounce,
                  () => {
                    this.registerPositions(li);
                    li.anim = false;
                  },
                );

                if (li.shadow) {
                  animateElementTranslateY(
                    li.shadow,
                    0,
                    returnDuration,
                    easeOutBounce,
                  );
                }
              },
            );

            if (li.shadow) {
              animateElementTranslateY(
                li.shadow,
                bottomY + 5,
                dropDuration,
                (t) => t * t,
              );
            }
          }
        },

        bindEvents: function (): void {
          if (mobile) {
            handleTouchStart = (event: TouchEvent) => {
              event.preventDefault();
              const allTouches = event.touches;
              for (let i = 0; i < allTouches.length; i++) {
                this.recordTouch(allTouches[i]);
              }
            };

            handleTouchMove = (event: TouchEvent) => {
              event.preventDefault();
              const allTouches = event.touches;
              for (let i = 0; i < allTouches.length; i++) {
                this.moveTouch(allTouches[i]);
              }
            };

            handleTouchEnd = (event: TouchEvent) => {
              event.preventDefault();
              touches.length = 0;
            };

            container.addEventListener("touchstart", handleTouchStart, {
              passive: false,
            });
            container.addEventListener("touchmove", handleTouchMove, {
              passive: false,
            });
            container.addEventListener("touchend", handleTouchEnd, {
              passive: false,
            });

            handleOrientationChange = () => {
              this.resizeLogo();
              for (let i = 0; i < positions.length; i++) {
                if (positions[i].state === 1) {
                  this.animateLetter(positions[i], true);
                }
              }
            };
            window.addEventListener(
              "orientationchange",
              handleOrientationChange,
              false,
            );

            handleResize = () => {
              this.resizeLogo();
            };
            window.addEventListener("resize", handleResize);
          } else {
            let timer: ReturnType<typeof setTimeout> | null = null;
            winHeight = window.innerHeight;

            const lettersElements = container.querySelectorAll(".letters");
            lettersElements.forEach((el) => {
              const listener = () => {
                for (let i = 0; i < positions.length; i++) {
                  const node = positions[i].node;
                  if (node === el) {
                    this.animateLetter(positions[i]);
                    return;
                  }
                }
              };
              el.addEventListener("mouseenter", listener);
              handleMouseEnters.push({ el, listener });
            });

            handleResize = () => {
              const _winHeight = winHeight;

              if (timer !== null) {
                clearTimeout(timer);
              }
              timer = setTimeout(() => {
                winHeight = window.innerHeight;

                // Recalculate dynamic logo scale and width on resize
                this.resizeLogo();

                const easing =
                  _winHeight > winHeight ? "easeOutElastic" : "easeOutBounce";
                const easingFn =
                  easing === "easeOutElastic" ? easeOutElastic : easeOutBounce;
                const reset = winHeight - _winHeight;
                for (let i = 0; i < positions.length; i++) {
                  if (positions[i].state === 1) {
                    let currentY = 0;
                    const transform = positions[i].node.style.transform;
                    if (transform) {
                      const match = transform.match(/translateY\(([^)]+)px\)/);
                      if (match) currentY = parseFloat(match[1]) || 0;
                    }
                    animateElementTranslateY(
                      positions[i].node,
                      currentY + reset,
                      1200,
                      easingFn,
                    );

                    if (!mobile && positions[i].shadow) {
                      let currentShadowY = 0;
                      const shadowTransform =
                        positions[i].shadow!.style.transform;
                      if (shadowTransform) {
                        const match = shadowTransform.match(
                          /translateY\(([^)]+)px\)/,
                        );
                        if (match) currentShadowY = parseFloat(match[1]) || 0;
                      }
                      animateElementTranslateY(
                        positions[i].shadow,
                        currentShadowY + reset,
                        1200,
                        easingFn,
                      );
                    }
                  }
                }
              }, 300);
            };

            window.addEventListener("resize", handleResize);
          }
        },

        recordTouch: function (touch: Touch): void {
          this.initPositions();

          if (this.newTouch(touch)) {
            const touchx = touch.pageX;
            touchy = touch.pageY;
            const t = { touch: touch };
            touches.push(t);

            this.comparePositions(touchx, touchy);
          }
        },

        moveTouch: function (touch: Touch): void {
          for (let i = 0; i < touches.length; i++) {
            if (touches[i].touch.identifier === touch.identifier) {
              const touchx = touch.pageX;
              touchy = touch.pageY;

              this.comparePositions(touchx, touchy);
            }
          }
        },

        comparePositions: function (touchx: number, touchy: number): void {
          let limitLeft = 0;

          for (let j = 0, l = positions.length; j < l; j++) {
            limitLeft =
              j === l - 1
                ? positions[j].right || 0
                : positions[j + 1].left || 0;

            if (
              touchx >= (positions[j].left || 0) &&
              touchx <= limitLeft &&
              touchy >= (positions[j].top || 0) &&
              touchy <= (positions[j].bottom || 0)
            ) {
              if (currentNode !== positions[j].node && !positions[j].anim) {
                currentNode = positions[j].node;
                this.animateLetter(positions[j]);
                return;
              }
            } else {
              currentNode = 0;
            }
          }
        },

        newTouch: function (touch: Touch): boolean {
          for (let i = 0; i < touches.length; i++) {
            if (touches[i].touch.identifier === touch.identifier) {
              return false;
            }
          }
          return true;
        },
      };

      const logo = logoObj;
      logo.init();

      // Clean up event listeners on unmount to avoid memory leaks
      return () => {
        if (handleTouchStart && container) {
          container.removeEventListener("touchstart", handleTouchStart);
        }
        if (handleTouchMove && container) {
          container.removeEventListener("touchmove", handleTouchMove);
        }
        if (handleTouchEnd && container) {
          container.removeEventListener("touchend", handleTouchEnd);
        }
        if (handleOrientationChange) {
          window.removeEventListener(
            "orientationchange",
            handleOrientationChange,
          );
        }
        if (handleResize) {
          window.removeEventListener("resize", handleResize);
        }
        handleMouseEnters.forEach(({ el, listener }) => {
          el.removeEventListener("mouseenter", listener);
        });
      };
    } catch (err: any) {
      console.error(err);
      if (typeof window !== "undefined") {
        alert(
          "Error in Logo useEffect: " + err.message + "\nStack: " + err.stack,
        );
      }
      return () => {};
    }
  }, []);

  return (
    <div className="logoContainer">
      {/* <div className="logo-outline" ref={outlineRef}></div> */}
      <ul className="logo" ref={containerRef}></ul>
      <ul className="shadows" ref={shadowsRef}></ul>
    </div>
  );
}
