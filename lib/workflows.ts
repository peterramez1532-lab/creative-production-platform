import type { TaskStatus, ProjectStatus } from "@prisma/client";
const taskTransitions: Record<TaskStatus, TaskStatus[]> = {
  PENDING:["ASSIGNED"], ASSIGNED:["IN_PROGRESS","PENDING"], IN_PROGRESS:["SUBMITTED"],
  SUBMITTED:["QA"], QA:["APPROVED","REVISION"], REVISION:["SUBMITTED","IN_PROGRESS"],
  APPROVED:["DELIVERED"], DELIVERED:[]
};
export function canTransitionTask(from: TaskStatus, to: TaskStatus) { return taskTransitions[from].includes(to); }
const projectTransitions: Record<ProjectStatus, ProjectStatus[]> = {
  DRAFT:["AWAITING_PROPOSAL","PLANNING","CANCELLED"], AWAITING_PROPOSAL:["PROPOSAL_SENT","CANCELLED"],
  PROPOSAL_SENT:["APPROVED","AWAITING_PROPOSAL","CANCELLED"], APPROVED:["PLANNING","ON_HOLD"],
  PLANNING:["IN_PRODUCTION","ON_HOLD","CANCELLED"], IN_PRODUCTION:["INTERNAL_QA","ON_HOLD"],
  INTERNAL_QA:["REVISION","CLIENT_REVIEW"], CLIENT_REVIEW:["REVISION","READY_FOR_DELIVERY"],
  REVISION:["IN_PRODUCTION","INTERNAL_QA"], READY_FOR_DELIVERY:["DELIVERED","CLIENT_REVIEW"],
  DELIVERED:[], ON_HOLD:["PLANNING","IN_PRODUCTION","CANCELLED"], CANCELLED:[]
};
export function canTransitionProject(from: ProjectStatus, to: ProjectStatus) { return projectTransitions[from].includes(to); }
