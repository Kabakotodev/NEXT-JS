import { prisma } from "@/lib/prisma";

export async function logUserAction({
  action,
  performedById,
  targetUserId = null,
  description = null,
  req
}) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      "unknown";

    const userAgent =
      req.headers.get("user-agent") ||
      "unknown";

    await prisma.auditActionUser.create({
      data: {
        action,
        performedById,
        targetUserId,
        description,
        ipAddress: ip,
        userAgent
      }
    });

  } catch (error) {
    console.error("User Audit Error:", error);
  }
}