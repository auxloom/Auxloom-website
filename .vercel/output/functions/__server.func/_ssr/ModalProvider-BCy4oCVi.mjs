import { s as __toESM, t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CG54XWCZ.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ModalProvider-BCy4oCVi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var BookingSchema = objectType({
	name: stringType().min(2, "Name must be at least 2 characters"),
	email: stringType().email("Invalid email address"),
	dateTime: stringType().min(1, "Preferred date and time is required"),
	description: stringType().optional()
});
var ContactSchema = objectType({
	name: stringType().min(2, "Name must be at least 2 characters"),
	email: stringType().email("Invalid email address"),
	phone: stringType().min(8, "Phone number must be at least 8 characters"),
	message: stringType().min(5, "Message must be at least 5 characters")
});
var submitBooking = createServerFn({ method: "POST" }).validator((data) => BookingSchema.parse(data)).handler(createSsrRpc("2549a9d5ed6caac5d94fb85db20d00a18ea21e77f6008ca0252dff3f576515ec"));
createServerFn({ method: "POST" }).validator((data) => ContactSchema.parse(data)).handler(createSsrRpc("b0c967a5ebb6736a12b624eab55be4b330a815064be6adb4bd3f1ad8fa372a0a"));
function BookMeetingModal() {
	const { isBookingOpen, closeBooking, selectedService } = useModals();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [dateTime, setDateTime] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (selectedService) setDescription(`I am interested in booking a meeting regarding: ${selectedService}`);
		else setDescription("");
	}, [selectedService, isBookingOpen]);
	(0, import_react.useEffect)(() => {
		if (isBookingOpen) {
			setName("");
			setEmail("");
			setDateTime("");
			setErrorMsg("");
			setSuccessMsg("");
		}
	}, [isBookingOpen]);
	if (!isBookingOpen) return null;
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrorMsg("");
		setSuccessMsg("");
		try {
			const response = await submitBooking({ data: {
				name,
				email,
				dateTime,
				description
			} });
			if (response.success) {
				setSuccessMsg(response.message);
				setName("");
				setEmail("");
				setDateTime("");
				setDescription("");
				setTimeout(() => {
					closeBooking();
				}, 3e3);
			} else setErrorMsg("Failed to book meeting. Please try again.");
		} catch (error) {
			console.error("Booking error:", error);
			setErrorMsg(error?.message || "Something went wrong. Please check your inputs.");
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: closeBooking,
			className: "absolute inset-0 bg-background/80 backdrop-blur-md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 20
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: 20
			},
			transition: {
				type: "spring",
				duration: .5
			},
			className: "relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card p-6 shadow-2xl sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-white/5 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-display text-2xl font-light tracking-wide text-foreground",
					children: "Book a Meeting"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-foreground/50",
					children: "Let's set up a calendar invitation for your session."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: closeBooking,
					className: "rounded-full bg-white/5 p-2 text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground",
					"aria-label": "Close",
					children: "✕"
				})]
			}), successMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "my-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400",
						children: "✓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mt-4 text-lg font-medium text-foreground",
						children: "Booking Successful!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-foreground/70",
						children: successMsg
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-6 space-y-4",
				children: [
					errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400",
						children: errorMsg
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-foreground/60",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						required: true,
						placeholder: "Enter your name",
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-foreground/60",
						children: "Gmail / Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						required: true,
						placeholder: "name@gmail.com",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-foreground/60",
						children: "Preferred Date & Time"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "datetime-local",
						required: true,
						value: dateTime,
						onChange: (e) => setDateTime(e.target.value),
						className: "mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground [color-scheme:dark] transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs uppercase tracking-wider text-foreground/60",
						children: "Additional Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						placeholder: "Tell us a little bit about what you want to build...",
						value: description,
						onChange: (e) => setDescription(e.target.value),
						rows: 3,
						className: "mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						whileHover: {
							scale: 1.02,
							boxShadow: "var(--shadow-glow)"
						},
						whileTap: { scale: .98 },
						disabled: isSubmitting,
						type: "submit",
						className: "mt-6 flex w-full items-center justify-center rounded-xl bg-foreground py-3.5 text-sm font-medium text-background transition-shadow disabled:opacity-55",
						children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" }), "Booking meeting..."]
						}) : "Confirm Meeting Booking"
					})
				]
			})]
		})]
	}) });
}
function ContactModal() {
	const { isContactOpen, closeContact } = useModals();
	const [copiedEmail, setCopiedEmail] = (0, import_react.useState)(false);
	const CONTACT_INFO = {
		email: "auxloom@gmail.com",
		phone1: {
			display: "+91 73001 70942",
			waLink: "https://wa.me/917300170942",
			callLink: "tel:+917300170942"
		},
		phone2: {
			display: "+91 63764 62837",
			waLink: "https://wa.me/916376462837",
			callLink: "tel:+916376462837"
		}
	};
	if (!isContactOpen) return null;
	const handleCopyEmail = () => {
		navigator.clipboard.writeText(CONTACT_INFO.email);
		setCopiedEmail(true);
		setTimeout(() => setCopiedEmail(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: closeContact,
			className: "absolute inset-0 bg-background/80 backdrop-blur-md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 20
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: 20
			},
			transition: {
				type: "spring",
				duration: .5
			},
			className: "relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card p-6 shadow-2xl sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between border-b border-white/5 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-display text-2xl font-light tracking-wide text-foreground",
						children: "Let's Talk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-foreground/50",
						children: "Choose your preferred channel to connect with us directly."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: closeContact,
						className: "rounded-full bg-white/5 p-2 text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground",
						"aria-label": "Close",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-widest text-foreground/50",
									children: "Email Us"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleCopyEmail,
									className: "text-[10px] font-medium text-primary hover:underline",
									children: copiedEmail ? "Copied!" : "Copy Email"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-lg font-light text-foreground",
								children: CONTACT_INFO.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${CONTACT_INFO.email}`,
									className: "flex-1 rounded-xl bg-foreground py-2.5 text-center text-xs font-semibold text-background transition-opacity hover:opacity-90",
									children: "✉ Send an Email"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-widest text-foreground/50 block mb-3",
								children: "Message or Call Us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 pb-4 border-b border-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-foreground",
									children: CONTACT_INFO.phone1.display
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: CONTACT_INFO.phone1.waLink,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90",
										children: "💬 WhatsApp DM"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: CONTACT_INFO.phone1.callLink,
										className: "inline-flex items-center justify-center px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-foreground/80 hover:bg-white/10 transition-colors",
										children: "📞 Call"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-foreground",
									children: CONTACT_INFO.phone2.display
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: CONTACT_INFO.phone2.waLink,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90",
										children: "💬 WhatsApp DM"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: CONTACT_INFO.phone2.callLink,
										className: "inline-flex items-center justify-center px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-foreground/80 hover:bg-white/10 transition-colors",
										children: "📞 Call"
									})]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 text-center text-[10px] text-foreground/40",
					children: "We typically respond within a few hours."
				})
			]
		})]
	}) });
}
var ModalContext = (0, import_react.createContext)(void 0);
var ModalProvider = ({ children }) => {
	const [isBookingOpen, setIsBookingOpen] = (0, import_react.useState)(false);
	const [isContactOpen, setIsContactOpen] = (0, import_react.useState)(false);
	const [selectedService, setSelectedService] = (0, import_react.useState)("");
	const openBooking = (serviceName) => {
		setSelectedService(serviceName || "");
		setIsBookingOpen(true);
	};
	const closeBooking = () => {
		setIsBookingOpen(false);
		setSelectedService("");
	};
	const openContact = () => {
		setIsContactOpen(true);
	};
	const closeContact = () => {
		setIsContactOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalContext.Provider, {
		value: {
			isBookingOpen,
			isContactOpen,
			selectedService,
			openBooking,
			closeBooking,
			openContact,
			closeContact
		},
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMeetingModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactModal, {})
		]
	});
};
var useModals = () => {
	const context = (0, import_react.useContext)(ModalContext);
	if (!context) throw new Error("useModals must be used within a ModalProvider");
	return context;
};
//#endregion
export { useModals as n, ModalProvider as t };
