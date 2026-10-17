import type { Role } from "@prisma/client";
export const isManager = (role: Role) => role === "ADMIN" || role === "MANAGER";
export const canSeeFinance = (role: Role) => role === "ADMIN";
export function projectScope(user: { role: Role; organizationId: string | null; id: string }) {
  if (user.role === "ADMIN" || user.role === "MANAGER") return {};
  if (user.role === "CLIENT") return { organizationId: user.organizationId ?? "__none__" };
  return { tasks: { some: { assigneeId: user.id } } };
}
