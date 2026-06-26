import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import * as fs from "fs/promises";
import * as path from "path";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-_eSO8gAL.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
async function saveSubmissionLocally(type, data) {
	try {
		const dir = "/tmp";
		const filePath = path.join(dir, "submissions.json");
		await fs.mkdir(dir, { recursive: true });
		let currentSubmissions = [];
		try {
			const fileContent = await fs.readFile(filePath, "utf-8");
			currentSubmissions = JSON.parse(fileContent);
		} catch (e) {}
		const newEntry = {
			id: Math.random().toString(36).substring(2, 9),
			type,
			...data,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		currentSubmissions.push(newEntry);
		await fs.writeFile(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");
		console.log(`[BACKEND] Saved ${type} submission locally to ${filePath}`);
		return newEntry;
	} catch (error) {
		console.error("[BACKEND] Failed to save submission locally:", error);
		return null;
	}
}
async function sendWebhookNotification(type, data) {
	const webhookUrl = process.env.WEBHOOK_URL;
	if (!webhookUrl) return;
	try {
		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ embeds: [{
				title: `New Website Submission: ${type === "booking" ? "Meeting Booking" : "Contact Message"}`,
				color: type === "booking" ? 3895295 : 1915903,
				fields: Object.entries(data).map(([key, val]) => ({
					name: key.toUpperCase(),
					value: String(val) || "N/A",
					inline: false
				})),
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			}] })
		});
		if (!response.ok) console.error(`[BACKEND] Webhook notification failed: ${response.statusText}`);
		else console.log(`[BACKEND] Webhook notification sent for ${type}`);
	} catch (error) {
		console.error("[BACKEND] Webhook notification error:", error);
	}
}
var submitBooking_createServerFn_handler = createServerRpc({
	id: "2549a9d5ed6caac5d94fb85db20d00a18ea21e77f6008ca0252dff3f576515ec",
	name: "submitBooking",
	filename: "src/lib/actions.ts"
}, (opts) => submitBooking.__executeServer(opts));
var submitBooking = createServerFn({ method: "POST" }).validator((data) => BookingSchema.parse(data)).handler(submitBooking_createServerFn_handler, async ({ data }) => {
	console.log("[BACKEND] Booking received:", data);
	await saveSubmissionLocally("booking", data);
	await sendWebhookNotification("booking", data);
	return {
		success: true,
		message: "Meeting request received! We will follow up via email shortly."
	};
});
var submitContact_createServerFn_handler = createServerRpc({
	id: "b0c967a5ebb6736a12b624eab55be4b330a815064be6adb4bd3f1ad8fa372a0a",
	name: "submitContact",
	filename: "src/lib/actions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator((data) => ContactSchema.parse(data)).handler(submitContact_createServerFn_handler, async ({ data }) => {
	console.log("[BACKEND] Contact received:", data);
	await saveSubmissionLocally("contact", data);
	await sendWebhookNotification("contact", data);
	return {
		success: true,
		message: "Message received! We will get in touch with you shortly."
	};
});
//#endregion
export { submitBooking_createServerFn_handler, submitContact_createServerFn_handler };
