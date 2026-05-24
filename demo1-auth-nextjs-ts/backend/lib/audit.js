import { prisma } from "@/lib/prisma";

export async function logAudit({
  action,
  performedBy,
  targetUser = null,
  description = null,
  req
}) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("host") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    await prisma.auditLog.create({
      data: {
        action,
        performedBy,
        targetUser,
        description,
        ipAddress: ip,
        userAgent
      }
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}