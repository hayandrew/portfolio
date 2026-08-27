/* Copyright Andy Hay 2012 */
if (!window.ah) window.ah = {};

document.addEventListener("DOMContentLoaded", function () {
  // Easing functions
  function easeOutBounce(t) {
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

  function easeOutElastic(t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    var p = 0.3;
    var s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1;
  }

  // Animation helper
  function animateElementTop(element, targetTop, duration, easingFn, callback) {
    if (!element) return;

    if (element._activeAnimId) {
      cancelAnimationFrame(element._activeAnimId);
    }

    var startTop = parseFloat(element.style.top) || 0;
    var distance = targetTop - startTop;
    var startTime = performance.now();

    function step(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easingFn(progress);
      element.style.top = startTop + distance * easedProgress + "px";

      if (progress < 1) {
        element._activeAnimId = requestAnimationFrame(step);
      } else {
        element.style.top = targetTop + "px";
        delete element._activeAnimId;
        if (callback) callback();
      }
    }
    element._activeAnimId = requestAnimationFrame(step);
  }

  var letters = [
      {
        id: "a1",
        w: 50,
        h: 47,
        xOff: 0,
        yOff: 0,
        svg: "M28.35 0.35 L50 42.65 33.2 47 29.65 39.35 18.85 38.5 15.9 46 0.95 39.3 28.35 0.35 M22.4 30.65 L28.6 30.25 26.8 22.95 22.4 30.65",
      },
      {
        id: "n",
        w: 33,
        h: 40,
        xOff: 8,
        yOff: 8,
        svg: "M0 2.5 L17.5 2.95 23.25 16.65 23.5 16.6 Q23.4 11.4 22.2 0.3 L30.85 0 32.05 21.9 34.8 35 21.85 36.9 11.05 15.75 12.1 38.55 0.1 39.6 Q0.95 32.7 1.2 26.45 1.5 20.15 1.3 12.55 L0 2.5",
      },
      {
        id: "d",
        w: 36.5,
        h: 40,
        xOff: 4,
        yOff: 6,
        svg: "M10.1 0.75 L21.25 3.15 Q30.9 5.2 34.75 9.55 38.8 14.2 36.7 22.75 34.75 30.25 29.15 35.2 22.6 41.15 14.7 39.75 L0 37.15 Q3.15 27.9 10.05 0.85 L10.1 0.75 M16.1 13 L11.55 29.55 12.8 29.9 Q19.1 31.35 23.15 27 24.8 25.05 25.85 22.3 26.25 20.3 25.8 18.6 24.7 14.6 19.5 13.4 L16.1 13",
      },
      {
        id: "y1",
        w: 31.5,
        h: 41,
        xOff: 5,
        yOff: 16,
        svg: "M22.45 0.35 L32.6 0 32.95 0.25 28.3 14.4 Q24.4 25.7 20.95 31.9 16.05 40.45 11.05 40.6 6.55 40.6 4.15 36.45 2.3 33.1 2.2 28.5 L2.05 24.8 11 25.7 10.65 28.05 Q10.4 29.35 10.45 30.4 10.45 32 11.35 32.65 13.4 31.9 13.35 29.6 13.3 28.3 10.95 23.35 L0 1.6 12.8 1.8 18.2 16.05 22.45 0.35",
      },
      {
        id: "h",
        w: 40,
        h: 48,
        xOff: 5,
        yOff: 1,
        svg: "M21.8 3.5 L36.65 0 40.5 38.65 28.55 42.3 26.95 31.4 21.55 33.15 23.45 44.5 10.4 47.2 0 8.6 15.15 4.4 17.15 22.7 24.8 20.7 21.8 3.5",
      },
      {
        id: "a2",
        w: 39,
        h: 42,
        xOff: 12,
        yOff: 1.5,
        svg: "M25.25 0 L41.5 37.1 27 39.9 24.35 33.25 15.2 31.95 12.35 38.15 0 31.7 25.25 0 M23.95 25.4 L22.8 19.15 18.65 25.45 23.95 25.4",
      },
      {
        id: "y2",
        w: 37,
        h: 39,
        xOff: 7,
        yOff: 6,
        svg: "M16.75 2.75 L19.8 17.1 27.35 3.3 38.3 5.05 38.6 5.35 30.9 17.5 Q24.65 27.2 19.75 32.3 12.85 39.35 7.45 38.45 2.65 37.65 0.85 33.25 -0.5 29.8 0.3 25.45 L0.9 22.05 Q3.35 22.5 10.25 24.6 L9.4 26.7 Q8.95 27.75 8.75 28.9 8.5 30.35 9.3 31.15 11.6 30.95 12 28.7 12.25 27.35 10.65 22.35 L3.1 0 16.75 2.75",
      },
    ],
    positions = [],
    touches = [],
    currentNode,
    winWidth,
    logoWidth,
    leftSpace,
    winHeight,
    touchy,
    topPos = 105,
    container = document.querySelector(".logo"),
    shadows = document.querySelector(".shadows"),
    logoOutline = document.querySelector(".logo-outline"),
    scale = 0;

  ah.logo = {
    init: function () {
      if (!container) return;

      var count = 0,
        width = 0,
        glow = 10;

      scale = ah.mobile ? 3.5 : 2.2;

      for (var i = 0, l = letters.length; i < l; i++) {
        count =
          i == 0
            ? 0
            : count + scale * letters[i - 1].w - scale * letters[i].xOff;
        width += scale * letters[i].w - scale * letters[i].xOff;

        var li = document.createElement("li");
        li.className = "letters " + letters[i].id;
        li.style.left = count + "px";
        li.style.top = topPos + scale * letters[i].yOff + "px";

        var j = Raphael(
          li,
          scale * letters[i].w + letters[i].xOff,
          scale * letters[i].h + letters[i].yOff,
        )
          .path(letters[i].svg)
          .attr({ stroke: "none", fill: "#fff" })
          .transform("S" + scale + "," + scale + ",0,0");
        container.appendChild(li);

        var shadowli = null;
        var k = null;

        if (!ah.mobile && shadows) {
          shadowli = document.createElement("li");
          shadowli.className = "letters " + letters[i].id;
          shadowli.style.left = count - glow - 2 + "px";
          shadowli.style.top =
            topPos + scale * letters[i].yOff - glow - 5 + "px";

          k = Raphael(
            shadowli,
            scale * (letters[i].w + glow) + letters[i].xOff,
            scale * (letters[i].h + glow) + letters[i].yOff,
          )
            .path(letters[i].svg)
            .attr({ stroke: "none", fill: "none" })
            .glow({ opacity: 0.7, color: "#5b0009", width: 10 })
            .transform("S" + scale + "," + scale + ",-" + glow + ",-" + glow);
          shadows.appendChild(shadowli);
        }

        if (!ah.mobile) {
          positions.push({ node: li, shadow: shadowli, svg: j, svgShadow: k });
        } else {
          positions.push({ node: li, svg: j });
        }
      }

      container.style.width = width + "px";
      container.style.opacity = "1";

      if (!ah.mobile && shadows) {
        shadows.style.width = width + "px";
        shadows.style.opacity = "1";
      }

      if (logoOutline) {
        logoOutline.style.top = topPos + "px";
      }

      this.bindEvents();
      this.initPositions();
    },

    bindResize: function () {
      var resizeBg = function () {
        var winWidth = window.innerWidth;

        if (winWidth < 600 && !ah.mobileSize) {
          ah.mobileSize = true;
          for (var i = 0, l = positions.length; i < l; i++) {
            positions[i].svg.scale(0.5, 0.5);
            if (positions[i].svgShadow) {
              positions[i].svgShadow.scale(0.5, 0.5);
            }
          }
        } else if (winWidth > 600 && ah.mobileSize) {
          ah.mobileSize = false;
          for (var i = 0, l = positions.length; i < l; i++) {
            positions[i].svg.scale(2, 2);
            if (positions[i].svgShadow) {
              positions[i].svgShadow.scale(2, 2);
            }
          }
        }
      };

      window.addEventListener("resize", resizeBg);
      resizeBg();
    },

    registerPositions: function (li) {
      var node = li.node;
      if (!node) return;
      var rect = node.getBoundingClientRect();
      var scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      li.left = rect.left + scrollLeft;
      li.top = rect.top + scrollTop;
      li.right = li.left + node.offsetWidth;
      li.bottom = li.top + node.offsetHeight;
    },

    initPositions: function () {
      winWidth = window.innerWidth;
      logoWidth = container.offsetWidth;
      leftSpace = (winWidth - logoWidth) / 2;
      rightSpace = leftSpace + logoWidth;

      for (var i = 0, l = positions.length; i < l; i++) {
        var node = positions[i].node;
        var rect = node.getBoundingClientRect();
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        var orig = rect.top + scrollTop;

        positions[i].state = 0;
        positions[i].orig = orig;
        positions[i].anim = false;
        this.registerPositions(positions[i]);
      }
    },

    animateLetter: function (li, reset, drop) {
      if (reset) li.anim = false;

      if (li.anim == false) {
        var duration = 1200;

        if (drop) {
          var animHeight = window.innerHeight - parseFloat(li.node.style.top);
        } else {
          var animHeight = window.innerHeight - 275;
        }

        li.anim = true;

        if (li.state == 0 || drop) {
          var startNodeTop = parseFloat(li.node.style.top) || 0;
          var targetNodeTop = startNodeTop + animHeight;

          animateElementTop(
            li.node,
            targetNodeTop,
            duration,
            easeOutBounce,
            () => {
              this.registerPositions(li);
              li.anim = false;
              li.state = 1;
            },
          );

          if (!ah.mobile && li.shadow) {
            var startShadowTop = parseFloat(li.shadow.style.top) || 0;
            var targetShadowTop = startShadowTop + animHeight + 5;
            animateElementTop(
              li.shadow,
              targetShadowTop,
              duration,
              easeOutBounce,
            );
          }
        } else if (li.state == 1) {
          animateElementTop(li.node, li.orig, duration, easeOutElastic, () => {
            this.registerPositions(li);
            li.anim = false;
            li.state = 0;
          });

          if (!ah.mobile && li.shadow) {
            animateElementTop(
              li.shadow,
              li.orig - 15,
              duration,
              easeOutElastic,
            );
          }
        }
      }
    },

    bindEvents: function () {
      if (ah.mobile) {
        document.body.addEventListener(
          "touchstart",
          (event) => {
            event.preventDefault();

            var allTouches = event.touches;

            for (var i = 0; i < allTouches.length; i++) {
              this.recordTouch(allTouches[i]);
            }
          },
          { passive: false },
        );

        document.body.addEventListener(
          "touchmove",
          (event) => {
            event.preventDefault();
            var allTouches = event.touches;
            for (var i = 0; i < allTouches.length; i++) {
              this.moveTouch(allTouches[i]);
            }
          },
          { passive: false },
        );

        document.body.addEventListener(
          "touchend",
          (event) => {
            event.preventDefault();
            touches = [];
          },
          { passive: false },
        );

        window.addEventListener(
          "orientationchange",
          () => {
            for (var i = 0; i < positions.length; i++) {
              if (positions[i].state == 1) {
                this.animateLetter(positions[i], true);
              }
            }
          },
          false,
        );
      } else {
        var timer = false;
        winHeight = window.innerHeight;

        document.querySelectorAll(".letters").forEach((el) => {
          el.addEventListener("mouseenter", () => {
            for (var i = 0; i < positions.length; i++) {
              var node = positions[i].node;
              if (node === el) {
                this.animateLetter(positions[i]);
                return;
              }
            }
          });
        });

        window.addEventListener("resize", function () {
          var _winHeight = winHeight;

          if (timer !== false) {
            clearTimeout(timer);
          }
          timer = setTimeout(function () {
            winHeight = window.innerHeight;

            var easing =
              _winHeight > winHeight ? "easeOutElastic" : "easeOutBounce";
            var easingFn =
              easing === "easeOutElastic" ? easeOutElastic : easeOutBounce;
            var reset = winHeight - _winHeight;
            for (var i = 0; i < positions.length; i++) {
              if (positions[i].state == 1) {
                var startNodeTop = parseFloat(positions[i].node.style.top) || 0;
                animateElementTop(
                  positions[i].node,
                  startNodeTop + reset,
                  1200,
                  easingFn,
                );

                if (!ah.mobile && positions[i].shadow) {
                  var startShadowTop =
                    parseFloat(positions[i].shadow.style.top) || 0;
                  animateElementTop(
                    positions[i].shadow,
                    startShadowTop + reset,
                    1200,
                    easingFn,
                  );
                }
              }
            }
          }, 300);
        });
      }
    },

    recordTouch: function (touch) {
      if (this.newTouch(touch)) {
        var touchx = touch.pageX;
        touchy = touch.pageY;
        startTouch = [touchx, touchy];
        touchLength = 0;

        var t = { touch: touch };
        touches.push(t);

        this.comparePositions(touchx, touchy);
      }
    },

    moveTouch: function (touch) {
      for (var i = 0; i < touches.length; i++) {
        if (touches[i].touch.identifier == touch.identifier) {
          var touchx = touch.pageX;
          touchy = touch.pageY;

          this.comparePositions(touchx, touchy);
        }
      }
    },

    comparePositions: function (touchx, touchy) {
      var limitLeft = 0;

      for (var j = 0, l = positions.length; j < l; j++) {
        limitLeft = j == l - 1 ? positions[j].right : positions[j + 1].left;

        if (
          touchx >= positions[j].left &&
          touchx <= limitLeft &&
          touchy >= positions[j].top &&
          touchy <= positions[j].bottom
        ) {
          if (currentNode != positions[j].node && !positions[j].anim) {
            currentNode = positions[j].node;
            this.animateLetter(positions[j]);
            return;
          }
        } else {
          currentNode = 0;
        }
      }
    },

    newTouch: function (touch) {
      for (var i = 0; i < touches.length; i++) {
        if (touches[i].touch.identifier == touch.identifier) {
          return false;
        }
      }
      return true;
    },

    animateLine: function (canvas, colorNumber, pathString) {
      var line = canvas.path(pathString).attr({
        stroke: colorNumber,
      });

      var length = line.getTotalLength();
      var startTime = performance.now();
      var duration = 5000;

      function step(now) {
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var offset = length * progress;
        var subpath = line.getSubpath(0, offset);

        canvas.clear();
        canvas.path(subpath).attr({
          stroke: colorNumber,
          "stroke-dasharray": "--",
          "stroke-width": "1.5",
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    },
  };
  ah.logo.init();
});
