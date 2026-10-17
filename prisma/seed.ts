import { PrismaClient } from "@prisma/client";import bcrypt from "bcryptjs";
const db=new PrismaClient();
async function main(){const pw=async(s:string)=>bcrypt.hash(s,12);const org1=await db.organization.upsert({where:{id:"org-northstar"},update:{},create:{id:"org-northstar",name:"Northstar Media",industry:"Entertainment"}});const org2=await db.organization.upsert({where:{id:"org-orbit"},update:{},create:{id:"org-orbit",name:"Orbit Learning",industry:"Education"}});
const users=[
{id:"u-admin",name:"Alex Morgan",email:"admin@creativeops.local",role:"ADMIN" as const,password:"DemoAdmin!2026"},
{id:"u-manager",name:"Maya Hassan",email:"manager@creativeops.local",role:"MANAGER" as const,password:"DemoManager!2026"},
{id:"u-client",name:"Jordan Lee",email:"client@creativeops.local",role:"CLIENT" as const,password:"DemoClient!2026",organizationId:org1.id},
{id:"u-talent",name:"Nour Adel",email:"talent@creativeops.local",role:"TALENT" as const,password:"DemoTalent!2026"},
{id:"u-talent2",name:"Omar Samir",email:"artist2@creativeops.local",role:"TALENT" as const,password:"DemoTalent!2026"},
{id:"u-client2",name:"Sam Taylor",email:"client2@creativeops.local",role:"CLIENT" as const,password:"DemoClient!2026",organizationId:org2.id}
];
for(const u of users){await db.user.upsert({where:{email:u.email},update: {
  name: u.name,
  role: u.role,
  active: true,
  passwordHash: await pw(u.password),
},create:{id:u.id,name:u.name,email:u.email,role:u.role,passwordHash:await pw(u.password),organizationId:"organizationId" in u?u.organizationId:null}});}
for(const t of [{userId:"u-talent",skills:"2D Animation, Anime Style, In-between",specialization:"2D Animation",availability:"AVAILABLE",yearsExperience:4,qualityScore:92,reliabilityScore:95},{userId:"u-talent2",skills:"Illustration, Background Art, Digital Painting",specialization:"Illustration",availability:"LIMITED",yearsExperience:6,qualityScore:88,reliabilityScore:90}])await db.talentProfile.upsert({where:{userId:t.userId},update:t,create:t});
const projects=[
{id:"p-001",code:"CP-240101",title:"Starlight Opening Sequence",type:"2D Animation",brief:"Create a 45-second anime-inspired opening sequence with a bold color script, character motion, and final compositing.",status:"IN_PRODUCTION" as const,priority:"HIGH" as const,organizationId:org1.id,managerId:"u-manager",deadline:new Date(Date.now()+8*86400000),clientPrice:8200,internalCost:5100},
{id:"p-002",code:"CP-240102",title:"Learning Worlds — Episode 03",type:"Illustration",brief:"Produce background art and illustrated transitions for an educational episode.",status:"CLIENT_REVIEW" as const,priority:"NORMAL" as const,organizationId:org2.id,managerId:"u-manager",deadline:new Date(Date.now()+3*86400000),clientPrice:3600,internalCost:2200},
{id:"p-003",code:"CP-240103",title:"Orbit Character Pack",type:"Character Design",brief:"Design six consistent character poses with expression sheets and production-ready source files.",status:"REVISION" as const,priority:"URGENT" as const,organizationId:org2.id,managerId:"u-manager",deadline:new Date(Date.now()-2*86400000),clientPrice:4400,internalCost:2800},
{id:"p-004",code:"CP-240104",title:"Northstar Brand Motion Kit",type:"Motion Graphics",brief:"Deliver a reusable motion graphics package for brand social channels.",status:"DELIVERED" as const,priority:"NORMAL" as const,organizationId:org1.id,managerId:"u-manager",deadline:new Date(Date.now()-12*86400000),clientPrice:2900,internalCost:1700},
{id:"p-005",code:"CP-240105",title:"Seasonal Environment Concepts",type:"Background Art",brief:"Develop environment concepts and color keys for an upcoming animated series.",status:"PLANNING" as const,priority:"NORMAL" as const,organizationId:org1.id,managerId:"u-manager",deadline:new Date(Date.now()+21*86400000),clientPrice:null,internalCost:null}
];
for(const p of projects){await db.project.upsert({where:{code:p.code},update:{},create:p});}
const taskData=[
{code:"TK-100101",title:"Rough key animation",description:"Block the primary action beats and timing.",projectId:"p-001",requiredSkill:"2D Animation",status:"IN_PROGRESS" as const,priority:"HIGH" as const,dueDate:new Date(Date.now()+2*86400000),estimatedHours:12,assigneeId:"u-talent",creatorId:"u-manager"},
{code:"TK-100102",title:"Color script and lighting",description:"Establish key lighting and scene palette.",projectId:"p-001",requiredSkill:"Digital Painting",status:"ASSIGNED" as const,priority:"NORMAL" as const,dueDate:new Date(Date.now()+4*86400000),estimatedHours:8,assigneeId:"u-talent2",creatorId:"u-manager"},
{code:"TK-100103",title:"Client review package",description:"Assemble client-facing review export.",projectId:"p-002",requiredSkill:"Compositing",status:"SUBMITTED" as const,priority:"NORMAL" as const,dueDate:new Date(Date.now()+86400000),estimatedHours:3,assigneeId:"u-talent",creatorId:"u-manager"},
{code:"TK-100104",title:"Revise character expressions",description:"Address reviewer notes on expression consistency.",projectId:"p-003",requiredSkill:"Illustration",status:"REVISION" as const,priority:"URGENT" as const,dueDate:new Date(Date.now()-86400000),estimatedHours:6,assigneeId:"u-talent2",creatorId:"u-manager"},
{code:"TK-100105",title:"Final delivery archive",description:"Package approved master files and source assets.",projectId:"p-004",requiredSkill:"Video Editing",status:"DELIVERED" as const,priority:"LOW" as const,dueDate:new Date(Date.now()-10*86400000),estimatedHours:2,assigneeId:"u-talent",creatorId:"u-manager"},
{code:"TK-100106",title:"Environment thumbnail set",description:"Produce first-pass composition thumbnails.",projectId:"p-005",requiredSkill:"Background Art",status:"PENDING" as const,priority:"NORMAL" as const,dueDate:new Date(Date.now()+10*86400000),estimatedHours:10,assigneeId:null,creatorId:"u-manager"},
{code:"TK-100107",title:"Storyboard cleanup",description:"Clean rough panels for internal review.",projectId:"p-001",requiredSkill:"2D Animation",status:"QA" as const,priority:"HIGH" as const,dueDate:new Date(Date.now()-86400000),estimatedHours:5,assigneeId:"u-talent",creatorId:"u-manager"}
];
for(const t of taskData)await db.task.upsert({where:{code:t.code},update:{},create:t});
for(const p of projects){await db.milestone.upsert({where:{id:`m-${p.id}-1`},update:{},create:{id:`m-${p.id}-1`,title:"Creative brief approved",projectId:p.id,completed: p.status !== "PLANNING"}});}
for(const u of users){const user=await db.user.findUnique({where:{email:u.email}});if(user)await db.notification.upsert({where:{id:`n-${user.id}-welcome`},update:{},create:{id:`n-${user.id}-welcome`,userId:user.id,title:"Welcome to Creative Ops",body:"Your workspace is ready. Review assigned work and upcoming deadlines.",href:"/dashboard"}});}
await db.invoice.upsert({where:{reference:"INV-DEMO-001"},update:{},create:{reference:"INV-DEMO-001",projectId:"p-001",clientName:"Northstar Media",currency:"USD",total:8200,paid:4100,status:"PARTIALLY_PAID",dueDate:new Date(Date.now()+14*86400000)}});
console.log("Seed complete. Demo users created/updated.");}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
