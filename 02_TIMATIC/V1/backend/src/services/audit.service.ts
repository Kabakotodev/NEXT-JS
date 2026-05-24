import { prisma } from "../services/prisma.service";

interface AuditLogInput {
  userId?: number;
  action: string;
  method: string;
  route: string;
  status: "SUCCESS" | "FAILED";
  ipAddress?: string;
  userAgent?: string;
  details?: string;
}

export const logAction = async (data: AuditLogInput) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId ?? null,
        action: data.action,
        method: data.method,
        route: data.route,
        status: data.status,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        details: data.details,
      },
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
};