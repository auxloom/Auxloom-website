import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

// Define validators using zod
const BookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateTime: z.string().min(1, "Preferred date and time is required"),
  description: z.string().optional(),
});

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// Helper to save to a local JSON file
async function saveSubmissionLocally(type: "booking" | "contact", data: any) {
  try {
    const isDev = process.env.NODE_ENV !== "production";
    // In Vercel serverless environment, process.cwd() is read-only, except /tmp.
    // For local dev, we save in the workspace.
    const dir = isDev ? path.join(process.cwd(), "data") : "/tmp";
    const filePath = path.join(dir, "submissions.json");

    // Ensure directory exists
    await fs.mkdir(dir, { recursive: true });

    let currentSubmissions: any[] = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      currentSubmissions = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist or is empty
    }

    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      ...data,
      timestamp: new Date().toISOString(),
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

// Helper to send a Webhook notification if WEBHOOK_URL environment variable is set
async function sendWebhookNotification(type: "booking" | "contact", data: any) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: `New Website Submission: ${type === "booking" ? "Meeting Booking" : "Contact Message"}`,
            color: type === "booking" ? 0x3b6fff : 0x1d3bff,
            fields: Object.entries(data).map(([key, val]) => ({
              name: key.toUpperCase(),
              value: String(val) || "N/A",
              inline: false,
            })),
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
    if (!response.ok) {
      console.error(`[BACKEND] Webhook notification failed: ${response.statusText}`);
    } else {
      console.log(`[BACKEND] Webhook notification sent for ${type}`);
    }
  } catch (error) {
    console.error("[BACKEND] Webhook notification error:", error);
  }
}

export const submitBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => BookingSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("[BACKEND] Booking received:", data);
    
    // Save submission locally
    await saveSubmissionLocally("booking", data);

    // Send webhook if configured
    await sendWebhookNotification("booking", data);

    return {
      success: true,
      message: "Meeting request received! We will follow up via email shortly.",
    };
  });

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("[BACKEND] Contact received:", data);

    // Save submission locally
    await saveSubmissionLocally("contact", data);

    // Send webhook if configured
    await sendWebhookNotification("contact", data);

    return {
      success: true,
      message: "Message received! We will get in touch with you shortly.",
    };
  });
