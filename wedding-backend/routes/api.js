const express = require("express");
const { body, param, validationResult } = require("express-validator");
const {
  accommodationQueries,
  rsvpQueries,
  messageQueries,
} = require("../models/database");

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
};

// Validation rules for accommodation
const accommodationValidation = [
  body("guestName")
    .isString()
    .isLength({ min: 1, max: 100 })
    .trim()
    .withMessage("Guest name is required and must be between 1-100 characters"),
  body("selectedEvents")
    .isArray({ min: 1 })
    .withMessage("At least one event must be selected"),
  body("selectedEvents.*")
    .isString()
    .isIn(["haldi", "sangeet", "wedding", "reception"])
    .withMessage("Invalid event selected"),
  body("timestamp").isISO8601().withMessage("Valid timestamp is required"),
];

// Validation rules for RSVP
const rsvpValidation = [
  body("guestName")
    .isString()
    .isLength({ min: 1, max: 100 })
    .trim()
    .withMessage("Guest name is required and must be between 1-100 characters"),
  body("status")
    .isIn(["attending", "not-attending"])
    .withMessage('Status must be either "attending" or "not-attending"'),
  body("selectedEvents")
    .optional()
    .isArray()
    .withMessage("Selected events must be an array"),
  body("selectedEvents.*")
    .optional()
    .isString()
    .isIn(["haldi", "sangeet", "wedding", "reception"])
    .withMessage("Invalid event selected"),
  body("timestamp").isISO8601().withMessage("Valid timestamp is required"),
];

// Validation rules for contact messages
const messageValidation = [
  body("guestName")
    .isString()
    .isLength({ min: 1, max: 100 })
    .trim()
    .withMessage("Guest name is required and must be between 1-100 characters"),
  body("message")
    .isString()
    .isLength({ min: 1, max: 1000 })
    .trim()
    .withMessage("Message is required and must be between 1-1000 characters"),
  body("timestamp").isISO8601().withMessage("Valid timestamp is required"),
];

// POST /api/accommodation - Submit accommodation request
router.post(
  "/accommodation",
  accommodationValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { guestName, selectedEvents, timestamp } = req.body;

      console.log(
        `📩 Accommodation request from ${guestName} for events: ${selectedEvents.join(
          ", ",
        )}`,
      );

      const result = await accommodationQueries.create(
        guestName,
        selectedEvents,
        timestamp,
      );

      res.status(201).json({
        success: true,
        message: "Accommodation request submitted successfully",
        data: {
          id: result.id,
          guestName: result.guestName,
          selectedEvents: result.selectedEvents,
          timestamp: result.timestamp,
        },
      });

      console.log(`✅ Accommodation request saved with ID: ${result.id}`);
    } catch (error) {
      console.error("❌ Error saving accommodation request:", error);
      res.status(500).json({
        error: "Failed to submit accommodation request",
        message: "Please try again later",
      });
    }
  },
);

// POST /api/rsvp - Submit RSVP
router.post(
  "/rsvp",
  rsvpValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { guestName, status, selectedEvents, timestamp } = req.body;

      console.log(`📩 RSVP from ${guestName}: ${status}`);

      const result = await rsvpQueries.createOrUpdate(
        guestName,
        status,
        selectedEvents,
        timestamp,
      );

      res.status(201).json({
        success: true,
        message: "RSVP submitted successfully",
        data: {
          id: result.id,
          guestName: result.guestName,
          status: result.status,
          selectedEvents: result.selectedEvents,
          timestamp: result.timestamp,
        },
      });

      console.log(`✅ RSVP saved for ${guestName}: ${status}`);
    } catch (error) {
      console.error("❌ Error saving RSVP:", error);
      res.status(500).json({
        error: "Failed to submit RSVP",
        message: "Please try again later",
      });
    }
  },
);

// POST /api/contact - Submit contact message
router.post(
  "/contact",
  messageValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { guestName, message, timestamp } = req.body;

      console.log(
        `📩 Message from ${guestName}: ${message.substring(0, 50)}${
          message.length > 50 ? "..." : ""
        }`,
      );

      const result = await messageQueries.create(guestName, message, timestamp);

      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: {
          id: result.id,
          guestName: result.guestName,
          message: result.message,
          timestamp: result.timestamp,
        },
      });

      console.log(`✅ Message saved with ID: ${result.id}`);
    } catch (error) {
      console.error("❌ Error saving message:", error);
      res.status(500).json({
        error: "Failed to send message",
        message: "Please try again later",
      });
    }
  },
);

// GET /api/guest/:name - Get guest information (optional endpoint)
router.get(
  "/guest/:name",
  [
    param("name")
      .isString()
      .isLength({ min: 1, max: 100 })
      .trim()
      .withMessage("Valid guest name is required"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const guestName = decodeURIComponent(req.params.name)
        .replace(/[-_]/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      console.log(`📋 Fetching information for guest: ${guestName}`);

      const [accommodations, rsvp, messages] = await Promise.all([
        accommodationQueries.getByGuest(guestName),
        rsvpQueries.getByGuest(guestName),
        messageQueries.getByGuest(guestName),
      ]);

      res.json({
        success: true,
        data: {
          guestName,
          accommodations,
          rsvp,
          messages: messages.map((msg) => ({
            id: msg.id,
            message: msg.message,
            timestamp: msg.timestamp,
            status: msg.status,
            created_at: msg.created_at,
          })),
        },
      });
    } catch (error) {
      console.error("❌ Error fetching guest information:", error);
      res.status(500).json({
        error: "Failed to fetch guest information",
        message: "Please try again later",
      });
    }
  },
);

// Admin authentication middleware
const ADMIN_API_KEY = "wedding-admin-2025-secure-ag_srujana"; // Change this to your own secret key

const authenticateAdmin = (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({
      error: "API key required",
      message: "Please provide x-api-key header or apiKey query parameter",
    });
  }

  if (apiKey !== ADMIN_API_KEY) {
    console.log(`🚫 Invalid API key attempt: ${apiKey}`);
    return res.status(403).json({
      error: "Invalid API key",
      message: "Access denied",
    });
  }

  console.log("✅ Admin API access granted");
  next();
};

// Admin endpoints with authentication

// GET /api/admin/accommodations - Get all accommodation requests
router.get("/admin/accommodations", authenticateAdmin, async (req, res) => {
  try {
    const accommodations = await accommodationQueries.getAll();
    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    console.error("❌ Error fetching accommodations:", error);
    res.status(500).json({
      error: "Failed to fetch accommodations",
    });
  }
});

// GET /api/admin/rsvps - Get all RSVPs
router.get("/admin/rsvps", authenticateAdmin, async (req, res) => {
  try {
    const rsvps = await rsvpQueries.getAll();
    res.json({
      success: true,
      count: rsvps.length,
      data: rsvps,
    });
  } catch (error) {
    console.error("❌ Error fetching RSVPs:", error);
    res.status(500).json({
      error: "Failed to fetch RSVPs",
    });
  }
});

// GET /api/admin/messages - Get all messages
router.get("/admin/messages", authenticateAdmin, async (req, res) => {
  try {
    const messages = await messageQueries.getAll();
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({
      error: "Failed to fetch messages",
    });
  }
});

// GET /api/admin/all-data - Get all data in one response
router.get("/admin/all-data", authenticateAdmin, async (req, res) => {
  try {
    const [accommodations, rsvps, messages] = await Promise.all([
      accommodationQueries.getAll(),
      rsvpQueries.getAll(),
      messageQueries.getAll(),
    ]);

    const stats = {
      totalAccommodationRequests: accommodations.length,
      totalRSVPs: rsvps.length,
      attendingGuests: rsvps.filter((rsvp) => rsvp.status === "attending")
        .length,
      notAttendingGuests: rsvps.filter(
        (rsvp) => rsvp.status === "not-attending",
      ).length,
      totalMessages: messages.length,
      unreadMessages: messages.filter((msg) => msg.status === "unread").length,
    };

    res.json({
      success: true,
      stats,
      data: {
        accommodations,
        rsvps,
        messages,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching all data:", error);
    res.status(500).json({
      error: "Failed to fetch data",
    });
  }
});

// PUT /api/admin/message/:id/read - Mark message as read
router.put(
  "/admin/message/:id/read",
  [param("id").isInt({ min: 1 }).withMessage("Valid message ID is required")],
  authenticateAdmin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const result = await messageQueries.markAsRead(messageId);

      if (result.changes === 0) {
        return res.status(404).json({
          error: "Message not found",
        });
      }

      res.json({
        success: true,
        message: "Message marked as read",
      });
    } catch (error) {
      console.error("❌ Error marking message as read:", error);
      res.status(500).json({
        error: "Failed to update message",
      });
    }
  },
);

// GET /api/admin/stats - Get basic statistics (protected)
router.get("/admin/stats", authenticateAdmin, async (req, res) => {
  try {
    const [accommodations, rsvps, messages] = await Promise.all([
      accommodationQueries.getAll(),
      rsvpQueries.getAll(),
      messageQueries.getAll(),
    ]);

    const stats = {
      totalAccommodationRequests: accommodations.length,
      totalRSVPs: rsvps.length,
      attendingGuests: rsvps.filter((rsvp) => rsvp.status === "attending")
        .length,
      notAttendingGuests: rsvps.filter(
        (rsvp) => rsvp.status === "not-attending",
      ).length,
      totalMessages: messages.length,
      unreadMessages: messages.filter((msg) => msg.status === "unread").length,
      eventBreakdown: {
        "reception-wedding": {
          accommodations: accommodations.filter((acc) =>
            acc.selected_events.includes("reception-wedding"),
          ).length,
          rsvps: rsvps.filter((rsvp) =>
            rsvp.selected_events.includes("reception-wedding"),
          ).length,
        },
        sangeet: {
          accommodations: accommodations.filter((acc) =>
            acc.selected_events.includes("sangeet"),
          ).length,
          rsvps: rsvps.filter((rsvp) =>
            rsvp.selected_events.includes("sangeet"),
          ).length,
        },
        "reception-vizag": {
          accommodations: accommodations.filter((acc) =>
            acc.selected_events.includes("reception-vizag"),
          ).length,
          rsvps: rsvps.filter((rsvp) =>
            rsvp.selected_events.includes("reception-vizag"),
          ).length,
        },
      },
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
    res.status(500).json({
      error: "Failed to fetch statistics",
    });
  }
});

module.exports = router;
