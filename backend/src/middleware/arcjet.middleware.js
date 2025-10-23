import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, rest, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return rest
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        return rest.status(403).json({ message: "Bot access denied." });
      } else {
        return rest
          .status(403)
          .json({ message: "Access denied by security policy." });
      }
    }

    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return rest.status(403).json({
        error: "Sppofed bot detected",
        message: "Spoofed bot access denied.",
      });
    }

    next();
  } catch (error) {
    console.log("Arcjet protection error:", error);
    next();
  }
};
