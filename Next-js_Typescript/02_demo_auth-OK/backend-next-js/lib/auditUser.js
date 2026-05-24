import { prisma } from "@/lib/prisma";

export async function logUserAction({
  action,
  performedById = null,
  targetUserId = null,
  description = "",
  req = null
}) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        performedById,
        targetUserId,
        description,
        ipAddress:
          req?.headers.get("x-forwarded-for") || "LOCAL",
        userAgent:
          req?.headers.get("user-agent") || "UNKNOWN"
      }
    });
  } catch (error) {
    console.error("AUDIT ERROR:", error);
  }
}