import { z } from "zod";
export const projectSchema = z.object({
  title:z.string().trim().min(3).max(120),
  type:z.string().trim().min(2).max(80),
  brief:z.string().trim().min(10).max(10000),
  priority:z.enum(["LOW","NORMAL","HIGH","URGENT"]).default("NORMAL"),
  deadline:z.string().optional().nullable(),
  clientPrice:z.coerce.number().min(0).optional().nullable()
});
export const taskSchema = z.object({
  title:z.string().trim().min(3).max(120),
  description:z.string().max(5000).optional().default(""),
  projectId:z.string().min(1),
  requiredSkill:z.string().max(80).optional().default(""),
  priority:z.enum(["LOW","NORMAL","HIGH","URGENT"]).default("NORMAL"),
  dueDate:z.string().optional().nullable(),
  estimatedHours:z.coerce.number().min(0.25).max(1000).default(4),
  assigneeId:z.string().optional().nullable()
});
