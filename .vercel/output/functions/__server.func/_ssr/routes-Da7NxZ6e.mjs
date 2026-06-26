import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as Program, n as Mesh, r as Renderer, t as Triangle } from "../_libs/ogl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Da7NxZ6e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cursor({ enabled = true }) {
	const hostRef = (0, import_react.useRef)(null);
	const ringRef = (0, import_react.useRef)(null);
	const dotRef = (0, import_react.useRef)(null);
	const [state, setState] = (0, import_react.useState)("default");
	const [label, setLabel] = (0, import_react.useState)("");
	const [active, setActive] = (0, import_react.useState)(enabled);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(pointer: coarse)").matches) {
			setActive(false);
			return;
		}
		const host = hostRef.current;
		const ring = ringRef.current;
		const dot = dotRef.current;
		if (!host || !ring || !dot) return;
		const onEnter = () => host.setAttribute("data-hidden", "false");
		const onLeave = () => host.setAttribute("data-hidden", "true");
		const target = {
			x: 0,
			y: 0
		};
		const current = {
			x: 0,
			y: 0
		};
		const onMove = (e) => {
			target.x = e.clientX;
			target.y = e.clientY;
			let node = e.target;
			let next = "default";
			let nextLabel = "";
			let depth = 0;
			while (node && depth < 6) {
				const s = node.getAttribute("data-cursor");
				if (s) {
					next = s;
					nextLabel = node.getAttribute("data-cursor-label") ?? "";
					break;
				}
				node = node.parentElement;
				depth += 1;
			}
			if (next !== lastStateRef.current || nextLabel !== lastLabelRef.current) {
				lastStateRef.current = next;
				lastLabelRef.current = nextLabel;
				setState(next);
				setLabel(nextLabel);
			}
		};
		const lastStateRef = { current: state };
		const lastLabelRef = { current: label };
		window.addEventListener("mousemove", onMove);
		document.documentElement.addEventListener("mouseenter", onEnter);
		document.documentElement.addEventListener("mouseleave", onLeave);
		host.setAttribute("data-hidden", "true");
		let raf = 0;
		const tick = () => {
			current.x += (target.x - current.x) * .22;
			current.y += (target.y - current.y) * .22;
			ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
			dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("mousemove", onMove);
			document.documentElement.removeEventListener("mouseenter", onEnter);
			document.documentElement.removeEventListener("mouseleave", onLeave);
		};
	}, []);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: hostRef,
		className: "cursor-host",
		"data-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: ringRef,
			className: "cursor-ring",
			"data-state": state,
			"data-label": label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: dotRef,
			className: "cursor-dot"
		})]
	});
}
var links = [
	{
		label: "Services",
		href: "#eyebrow-services"
	},
	{
		label: "Projects",
		href: "#eyebrow-projects"
	},
	{
		label: "About Us",
		href: "#eyebrow-about"
	},
	{
		label: "Blogs",
		href: "#eyebrow-blogs"
	}
];
function Navbar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed top-4 left-1/2 z-50 w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-pill flex items-center justify-between gap-3 px-4 py-1.5 sm:px-6 shadow-[0_10px_40px_-20px_rgba(0,0,30,0.6)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					"aria-label": "Auxloom — back to top",
					className: "flex items-center text-foreground/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-7 w-[100px] overflow-hidden sm:h-8 sm:w-[110px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo-without-bg.png",
							alt: "Auxloom",
							className: "absolute left-1/2 top-1/2 h-[280%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2",
							width: 2146,
							height: 1304
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-7 text-[13px] text-foreground/80",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "relative transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full",
						children: l.label
					}, l.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
					href: "#contact",
					whileHover: { scale: 1.04 },
					whileTap: { scale: .97 },
					"data-cursor": "view",
					"data-cursor-label": "Book",
					className: "group glass-pill flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book a Meeting" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "inline-block",
						initial: {
							x: 0,
							y: 0
						},
						whileHover: {
							x: 2,
							y: -2
						},
						children: "↗"
					})]
				})
			]
		})
	});
}
var buildKeyframes = (from, steps) => {
	const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
	const out = {};
	keys.forEach((k) => {
		out[k] = [from[k], ...steps.map((s) => s[k])];
	});
	return out;
};
function BlurText({ text = "", delay = 120, className = "", animateBy = "words", direction = "top", threshold = .1, rootMargin = "0px", stepDuration = .35, onAnimationComplete }) {
	const elements = animateBy === "words" ? text.split(" ") : text.split("");
	const [inView, setInView] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		const node = ref.current;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				observer.unobserve(node);
			}
		}, {
			threshold,
			rootMargin
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);
	const fromSnap = (0, import_react.useMemo)(() => direction === "top" ? {
		filter: "blur(10px)",
		opacity: 0,
		y: -40
	} : {
		filter: "blur(10px)",
		opacity: 0,
		y: 40
	}, [direction]);
	const toSnaps = (0, import_react.useMemo)(() => [{
		filter: "blur(4px)",
		opacity: .6,
		y: direction === "top" ? 4 : -4
	}, {
		filter: "blur(0px)",
		opacity: 1,
		y: 0
	}], [direction]);
	const stepCount = toSnaps.length + 1;
	const totalDuration = stepDuration * (stepCount - 1);
	const times = Array.from({ length: stepCount }, (_, i) => stepCount === 1 ? 0 : i / (stepCount - 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		ref,
		className,
		style: {
			display: "flex",
			flexWrap: "wrap"
		},
		children: elements.map((segment, index) => {
			const keyframes = buildKeyframes(fromSnap, toSnaps);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
				initial: fromSnap,
				animate: inView ? keyframes : fromSnap,
				transition: {
					duration: totalDuration,
					times,
					delay: index * delay / 1e3,
					ease: "easeOut"
				},
				onAnimationComplete: index === elements.length - 1 ? onAnimationComplete : void 0,
				style: {
					display: "inline-block",
					willChange: "transform, filter, opacity"
				},
				children: [segment === " " ? "\xA0" : segment, animateBy === "words" && index < elements.length - 1 && "\xA0"]
			}, index);
		})
	});
}
function hexToVec3(hex) {
	const h = hex.replace("#", "");
	return [
		parseInt(h.slice(0, 2), 16) / 255,
		parseInt(h.slice(2, 4), 16) / 255,
		parseInt(h.slice(4, 6), 16) / 255
	];
}
var vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;
var fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;
function LineWaves({ speed = .3, innerLineCount = 32, outerLineCount = 36, warpIntensity = 1, rotation = -45, edgeFadeWidth = 0, colorCycleSpeed = 1, brightness = .2, color1 = "#ffffff", color2 = "#ffffff", color3 = "#ffffff", enableMouseInteraction = true, mouseInfluence = 2, className }) {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		const renderer = new Renderer({
			alpha: true,
			premultipliedAlpha: false
		});
		const gl = renderer.gl;
		gl.clearColor(0, 0, 0, 0);
		let program = null;
		const currentMouse = [.5, .5];
		let targetMouse = [.5, .5];
		const handleMouseMove = (e) => {
			const rect = gl.canvas.getBoundingClientRect();
			targetMouse = [(e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height];
		};
		const handleMouseLeave = () => {
			targetMouse = [.5, .5];
		};
		const resize = () => {
			renderer.setSize(container.offsetWidth, container.offsetHeight);
			if (program) program.uniforms.uResolution.value = [
				gl.canvas.width,
				gl.canvas.height,
				gl.canvas.width / gl.canvas.height
			];
		};
		window.addEventListener("resize", resize);
		resize();
		const geometry = new Triangle(gl);
		const rotationRad = rotation * Math.PI / 180;
		program = new Program(gl, {
			vertex: vertexShader,
			fragment: fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uResolution: { value: [
					gl.canvas.width,
					gl.canvas.height,
					gl.canvas.width / gl.canvas.height
				] },
				uSpeed: { value: speed },
				uInnerLines: { value: innerLineCount },
				uOuterLines: { value: outerLineCount },
				uWarpIntensity: { value: warpIntensity },
				uRotation: { value: rotationRad },
				uEdgeFadeWidth: { value: edgeFadeWidth },
				uColorCycleSpeed: { value: colorCycleSpeed },
				uBrightness: { value: brightness },
				uColor1: { value: hexToVec3(color1) },
				uColor2: { value: hexToVec3(color2) },
				uColor3: { value: hexToVec3(color3) },
				uMouse: { value: new Float32Array([.5, .5]) },
				uMouseInfluence: { value: mouseInfluence },
				uEnableMouse: { value: enableMouseInteraction }
			}
		});
		const mesh = new Mesh(gl, {
			geometry,
			program
		});
		container.appendChild(gl.canvas);
		if (enableMouseInteraction) {
			gl.canvas.addEventListener("mousemove", handleMouseMove);
			gl.canvas.addEventListener("mouseleave", handleMouseLeave);
		}
		let animationFrameId = 0;
		const update = (time) => {
			animationFrameId = requestAnimationFrame(update);
			if (!program) return;
			program.uniforms.uTime.value = time * .001;
			if (enableMouseInteraction) {
				currentMouse[0] += .05 * (targetMouse[0] - currentMouse[0]);
				currentMouse[1] += .05 * (targetMouse[1] - currentMouse[1]);
				program.uniforms.uMouse.value[0] = currentMouse[0];
				program.uniforms.uMouse.value[1] = currentMouse[1];
			} else {
				program.uniforms.uMouse.value[0] = .5;
				program.uniforms.uMouse.value[1] = .5;
			}
			renderer.render({ scene: mesh });
		};
		animationFrameId = requestAnimationFrame(update);
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", resize);
			if (enableMouseInteraction) {
				gl.canvas.removeEventListener("mousemove", handleMouseMove);
				gl.canvas.removeEventListener("mouseleave", handleMouseLeave);
			}
			if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, [
		speed,
		innerLineCount,
		outerLineCount,
		warpIntensity,
		rotation,
		edgeFadeWidth,
		colorCycleSpeed,
		brightness,
		color1,
		color2,
		color3,
		enableMouseInteraction,
		mouseInfluence
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: `line-waves-container ${className ?? ""}`
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative min-h-screen w-full overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineWaves, {
				speed: .25,
				innerLineCount: 26,
				outerLineCount: 32,
				warpIntensity: .7,
				rotation: -45,
				edgeFadeWidth: 0,
				colorCycleSpeed: .25,
				brightness: .28,
				color1: "#3b6fff",
				color2: "#1d3bff",
				color3: "#7aa2ff",
				enableMouseInteraction: true,
				mouseInfluence: 1.2
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-vignette absolute inset-0" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: .3,
						duration: .6
					},
					className: "mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-foreground/80 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-2 w-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-400" })]
					}), "Available for new projects"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlurText, {
					text: "Discover Innovation",
					animateBy: "letters",
					delay: 50,
					stepDuration: .4,
					className: "text-display justify-center text-center text-6xl font-light leading-[0.95] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: 1.2,
						duration: .7
					},
					className: "mt-8 max-w-xl text-sm sm:text-base text-foreground/70",
					children: "Auxloom delivers intelligent AI solutions — engineered, automated, and built to scale with your business."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
					href: "#contact",
					"data-cursor": "view",
					"data-cursor-label": "Talk",
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: 1.5,
						duration: .6
					},
					whileHover: {
						scale: 1.05,
						boxShadow: "var(--shadow-glow)"
					},
					whileTap: { scale: .97 },
					className: "group mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-shadow",
					children: ["Let's Talk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "inline-block",
						initial: { x: 0 },
						animate: { x: [
							0,
							4,
							0
						] },
						transition: {
							repeat: Infinity,
							duration: 1.6,
							ease: "easeInOut"
						},
						children: "→"
					})]
				})
			]
		})]
	});
}
function Intro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "bg-[#f5f3ee] px-6 pt-28 pb-28 text-[#0d0d0d]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "eyebrow-about",
					className: "mb-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-neutral-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-neutral-400" }),
						"About Us",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-neutral-400" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlurText, {
					text: "We are Auxloom an AI studio building intelligent systems, and our mission is to turn ambitious ideas into shipped, scalable AI products.",
					animateBy: "words",
					delay: 60,
					className: "text-display justify-center text-center text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .6,
						rotate: -45
					},
					whileInView: {
						opacity: 1,
						scale: 1,
						rotate: 0
					},
					viewport: {
						once: true,
						amount: .5
					},
					transition: {
						duration: .9,
						ease: "easeOut"
					},
					className: "mt-16 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "64",
						height: "64",
						viewBox: "0 0 64 64",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M32 0 L36 28 L64 32 L36 36 L32 64 L28 36 L0 32 L28 28 Z",
							fill: "#0d0d0d"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						delay: .3,
						duration: .6
					},
					className: "mt-8 flex flex-col items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-center text-sm text-neutral-600",
						children: "At Auxloom, we combine engineering and applied AI to build relevant, functional systems that ship."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#services",
						className: "rounded-full border border-neutral-900 px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-neutral-900 hover:text-white",
						children: "Learn More"
					})]
				})
			]
		})
	});
}
var services = [
	{
		title: "SEO & AI Screening",
		body: "SEO optimization and AI-driven screening tests for web applications and pages — fast audits, actionable fixes, measurable lift.",
		image: "/assets/service%201-BFMRBVUl.png"
	},
	{
		title: "AI Assistants & MCP",
		body: "Customized AI assistants and MCP server development tailored to your product, data, and team workflows.",
		image: "/assets/service%202-Bd-ADeEM.png"
	},
	{
		title: "SaaS Modernization",
		body: "Modernize SaaS with automation features for low-cost, efficient workflows that compound over time.",
		image: "/assets/service%203-D9jv3UiI.png"
	},
	{
		title: "Enterprise Knowledge Apps",
		body: "Company-wide internal web applications, enterprise knowledge bases and dynamic interfaces built for scale.",
		image: "/assets/service%204-DPkHuFgQ.png"
	},
	{
		title: "Multi-OS QA & Exploit Testing",
		body: "Multi-OS support with screen testing, exploit testing and slop breakdown — surface real issues before users do.",
		image: "/assets/service%205-ClwZAVSw.png"
	},
	{
		title: "Software Modification & Internal OS",
		body: "Software modification adding MCP support, plus internal organisational operation systems custom to your ops.",
		image: "/assets/service%206-DweuDbHW.png"
	}
];
function Services() {
	const [open, setOpen] = (0, import_react.useState)(0);
	const activeIdx = open ?? 0;
	const activeImage = services[activeIdx].image;
	const activeTitle = services[activeIdx].title;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "bg-[#f5f3ee] px-6 pt-28 pb-28 text-[#0d0d0d]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "eyebrow-services",
					className: "mb-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-neutral-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-neutral-400" }), "Our Services"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-display text-6xl font-light leading-none md:text-8xl",
						children: "our services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-sm text-neutral-600 md:text-right",
						children: "With expertise in shipping intelligent systems and effective AI workflows, we help teams find authentic leverage and lasting momentum."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 grid gap-10 md:grid-cols-[1fr_280px] md:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "border-t border-neutral-300",
						children: services.map((s, i) => {
							const isOpen = open === i;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-b border-neutral-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpen(isOpen ? null : i),
									"data-cursor": "view",
									"data-cursor-label": isOpen ? "Close" : "Open",
									className: "group grid w-full grid-cols-[60px_1fr_auto] items-center gap-6 py-7 text-left transition-colors hover:bg-neutral-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] uppercase tracking-[0.25em] text-neutral-500",
											children: ["S / 0", i + 1]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-display text-3xl font-light md:text-4xl",
											children: s.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-900",
											children: isOpen ? "Close" : "See More"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									initial: false,
									children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											height: 0,
											opacity: 0
										},
										animate: {
											height: "auto",
											opacity: 1
										},
										exit: {
											height: 0,
											opacity: 0
										},
										transition: {
											duration: .35,
											ease: "easeOut"
										},
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-6 pb-8 pl-[84px] pr-6 md:grid-cols-[1fr_auto] md:items-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "max-w-2xl text-sm text-neutral-600 md:text-base",
												children: s.body
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
												href: "#contact",
												whileHover: { scale: 1.05 },
												whileTap: { scale: .97 },
												className: "inline-flex items-center gap-2 self-start rounded-full bg-neutral-900 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white md:self-end",
												children: "Book Now →"
											})]
										})
									}, "body")
								})]
							}, i);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky top-28 hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-300 bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
									src: activeImage,
									alt: activeTitle,
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: { opacity: 0 },
									transition: {
										duration: .35,
										ease: "easeOut"
									},
									className: "absolute inset-0 h-full w-full object-contain p-6"
								}, activeIdx)
							})
						})
					})]
				})
			]
		})
	});
}
function Projects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "bg-background px-6 pt-28 pb-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "eyebrow-projects",
					className: "mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-foreground/30" }),
						"Projects",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-foreground/30" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					initial: {
						opacity: 0,
						filter: "blur(10px)"
					},
					whileInView: {
						opacity: 1,
						filter: "blur(0px)"
					},
					viewport: { once: true },
					transition: { duration: 1 },
					className: "text-display text-6xl font-light leading-none sm:text-7xl md:text-8xl bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent",
					children: "Coming Soon"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					whileInView: { opacity: 1 },
					viewport: { once: true },
					transition: {
						delay: .4,
						duration: .6
					},
					className: "mx-auto mt-8 max-w-md text-sm text-foreground/60",
					children: "A curated showcase of intelligent systems we've shipped is on the way."
				})
			]
		})
	});
}
var posts = [
	{
		eyebrow: "Engineering",
		title: "Designing MCP Servers for Production AI Workflows",
		excerpt: "A practical look at building Model Context Protocol servers that hold up under real load — schema versioning, tool-call retries, and graceful fallbacks when an upstream LLM misbehaves.",
		readTime: "7 min read",
		date: "May 2026"
	},
	{
		eyebrow: "AI",
		title: "When to Reach for an Agent — and When Not To",
		excerpt: "Agentic loops are tempting, but most production AI problems collapse into a well-scoped retrieval + structured-output pipeline. Here's the decision rubric we use at Auxloom before we commit.",
		readTime: "5 min read",
		date: "April 2026"
	},
	{
		eyebrow: "Automation",
		title: "SaaS Modernisation Without the Rewrite",
		excerpt: "You don't need to throw the legacy stack away to ship AI features. We walk through the strangler-fig pattern we used to layer an intelligent automation layer on top of a 9-year-old SaaS product.",
		readTime: "9 min read",
		date: "March 2026"
	}
];
function Blogs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "blogs",
		className: "bg-background px-6 pt-28 pb-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "eyebrow-blogs",
					className: "mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-foreground/30" }),
						"Blogs",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-foreground/30" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					className: "text-display text-center text-5xl font-light leading-none sm:text-6xl md:text-7xl",
					children: "Field notes from the studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					whileInView: { opacity: 1 },
					viewport: { once: true },
					transition: {
						delay: .2,
						duration: .6
					},
					className: "mx-auto mt-5 max-w-xl text-center text-sm text-foreground/60",
					children: "Writing on the systems we ship, the mistakes we make, and where applied AI actually moves the needle."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-6 md:grid-cols-3",
					children: posts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						"data-cursor": "hover",
						initial: {
							opacity: 0,
							y: 24
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							amount: .2
						},
						transition: {
							delay: i * .1,
							duration: .5
						},
						className: "group flex h-full flex-col rounded-2xl border border-white/10 bg-card/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[var(--shadow-glow)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.date })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-display mt-6 text-2xl font-light leading-snug",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 grow text-sm leading-relaxed text-foreground/65",
								children: p.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center justify-between border-t border-white/5 pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] uppercase tracking-[0.2em] text-foreground/45",
									children: p.readTime
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-foreground/80 transition-colors group-hover:text-foreground",
									children: ["Read More", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "inline-block transition-transform duration-300 group-hover:translate-x-1",
										children: "→"
									})]
								})]
							})
						]
					}, p.title))
				})
			]
		})
	});
}
var dist = (a, b) => {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	return Math.sqrt(dx * dx + dy * dy);
};
var getAttr = (distance, maxDist, minVal, maxVal) => {
	const val = maxVal - Math.abs(maxVal * distance / maxDist);
	return Math.max(minVal, val + minVal);
};
var debounce = (func, delay) => {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => func(...args), delay);
	};
};
function TextPressure({ text = "AUXLOOM", fontFamily = "Roboto Flex", width = true, weight = true, italic = true, alpha = false, flex = true, stroke = false, scale = false, textColor = "#ffffff", strokeColor = "#3b6fff", className = "", minFontSize = 48 }) {
	const containerRef = (0, import_react.useRef)(null);
	const titleRef = (0, import_react.useRef)(null);
	const spansRef = (0, import_react.useRef)([]);
	const mouseRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const cursorRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const [fontSize, setFontSize] = (0, import_react.useState)(minFontSize);
	const [scaleY, setScaleY] = (0, import_react.useState)(1);
	const [lineHeight, setLineHeight] = (0, import_react.useState)(1);
	const chars = text.split("");
	(0, import_react.useEffect)(() => {
		const handleMouseMove = (e) => {
			cursorRef.current.x = e.clientX;
			cursorRef.current.y = e.clientY;
		};
		const handleTouchMove = (e) => {
			const t = e.touches[0];
			cursorRef.current.x = t.clientX;
			cursorRef.current.y = t.clientY;
		};
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove, { passive: true });
		if (containerRef.current) {
			const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
			mouseRef.current.x = left + w / 2;
			mouseRef.current.y = top + h / 2;
			cursorRef.current.x = mouseRef.current.x;
			cursorRef.current.y = mouseRef.current.y;
		}
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, []);
	const setSize = (0, import_react.useCallback)(() => {
		if (!containerRef.current || !titleRef.current) return;
		const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
		let newFontSize = containerW / (chars.length / 1.5);
		newFontSize = Math.max(newFontSize, minFontSize);
		setFontSize(newFontSize);
		setScaleY(1);
		setLineHeight(1);
		requestAnimationFrame(() => {
			if (!titleRef.current) return;
			const r = titleRef.current.getBoundingClientRect();
			if (scale && r.height > 0) {
				const yRatio = containerH / r.height;
				setScaleY(yRatio);
				setLineHeight(yRatio);
			}
		});
	}, [
		chars.length,
		minFontSize,
		scale
	]);
	(0, import_react.useEffect)(() => {
		const d = debounce(setSize, 100);
		d();
		window.addEventListener("resize", d);
		return () => window.removeEventListener("resize", d);
	}, [setSize]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const animate = () => {
			mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
			mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
			if (titleRef.current) {
				const maxDist = titleRef.current.getBoundingClientRect().width / 2;
				spansRef.current.forEach((span) => {
					if (!span) return;
					const sr = span.getBoundingClientRect();
					const center = {
						x: sr.x + sr.width / 2,
						y: sr.y + sr.height / 2
					};
					const d = dist(mouseRef.current, center);
					const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
					const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
					const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
					const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : "1";
					const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
					if (span.style.fontVariationSettings !== fvs) span.style.fontVariationSettings = fvs;
					if (alpha && span.style.opacity !== alphaVal) span.style.opacity = alphaVal;
				});
			}
			raf = requestAnimationFrame(animate);
		};
		animate();
		return () => cancelAnimationFrame(raf);
	}, [
		width,
		weight,
		italic,
		alpha
	]);
	const dynamicClassName = [
		className,
		flex ? "flex" : "",
		stroke ? "stroke" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		style: {
			position: "relative",
			width: "100%",
			height: "100%"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .tp-flex { display: flex; justify-content: space-between; align-items: center; }
        .tp-stroke span { position: relative; color: ${textColor}; }
        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute; left: 0; top: 0;
          color: transparent; z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      ` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			ref: titleRef,
			className: `${dynamicClassName} ${flex ? "tp-flex" : ""} ${stroke ? "tp-stroke" : ""}`,
			style: {
				fontFamily,
				fontSize,
				lineHeight,
				transform: `scale(1, ${scaleY})`,
				transformOrigin: "center top",
				margin: 0,
				fontWeight: 100,
				color: stroke ? void 0 : textColor,
				width: "100%"
			},
			children: chars.map((char, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				ref: (el) => {
					spansRef.current[i] = el;
				},
				"data-char": char,
				style: {
					display: "inline-block",
					color: stroke ? void 0 : textColor
				},
				children: char
			}, i))
		})]
	});
}
function PressureBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background px-6 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[170px] sm:h-[210px] md:h-[260px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPressure, {
					text: "AUXLOOM",
					flex: true,
					width: true,
					weight: true,
					italic: false,
					alpha: false,
					stroke: false,
					minFontSize: 64,
					textColor: "#ffffff"
				})
			})
		})
	});
}
var cols = [
	{
		title: "Menu",
		items: [
			"Home",
			"Services",
			"Projects",
			"About Us",
			"Blogs"
		]
	},
	{
		title: "Services",
		items: [
			"AI Assistants",
			"MCP Servers",
			"SaaS Automation",
			"SEO & Screening",
			"Internal OS"
		]
	},
	{
		title: "Social Media",
		items: [
			"Instagram",
			"Twitter",
			"LinkedIn",
			"GitHub"
		]
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		id: "contact",
		className: "bg-background px-6 pb-10 pt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative overflow-hidden rounded-3xl border border-white/15 bg-background px-6 py-20 text-center transition-all duration-300 hover:border-white/30 hover:shadow-[var(--shadow-glow)] sm:py-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-display mx-auto max-w-3xl text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl",
							children: [
								"Let's Collaborate And Create ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
								" Something Amazing!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-md text-sm text-foreground/70",
							children: "Join us in transforming your project from concept to completion."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
							href: "mailto:hello@auxloom.ai",
							"data-cursor": "view",
							"data-cursor-label": "Talk",
							whileHover: { scale: 1.05 },
							whileTap: { scale: .97 },
							className: "mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-[0.25em] text-background",
							children: "✉ Let's Talk"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PressureBand, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-9 w-[130px] overflow-hidden sm:h-10 sm:w-[145px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo-without-bg.png",
							alt: "Auxloom",
							className: "absolute left-1/2 top-1/2 h-[280%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90",
							width: 2146,
							height: 1304
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-sm text-sm text-foreground/60",
						children: "We are an AI studio building intelligent systems — our job is to ship the ambitious ideas other teams only talk about."
					})] }), cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[11px] uppercase tracking-[0.25em] text-foreground/80",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3 text-sm text-foreground/60",
						children: c.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "transition-colors hover:text-foreground",
							children: i
						}) }, i))
					})] }, c.title))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-foreground/50 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Auxloom. All Rights Reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Terms & Conditions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Privacy Policy"
						})]
					})]
				})
			]
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blogs, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
