export type Candidate = { id:string; name:string; skills:string[]; availability:string; workload:number; quality:number|null; reliability:number|null; yearsExperience:number };
export function rankCandidates(candidates: Candidate[], requiredSkill: string) {
  return candidates.map(c => {
    const skillMatch = c.skills.some(s => s.toLowerCase().includes(requiredSkill.toLowerCase()) || requiredSkill.toLowerCase().includes(s.toLowerCase()));
    const score = Math.round(Math.min(100, (skillMatch?45:10) + Math.min(c.yearsExperience,8)*2 + (c.quality ?? 60)*0.18 + (c.reliability ?? 60)*0.12 + (c.availability==="AVAILABLE"?15: c.availability==="LIMITED"?5:0) - Math.min(c.workload,10)*2));
    return { ...c, score, explanation: `${skillMatch?"Relevant skill match":"Limited skill match"}; ${c.availability.toLowerCase()} availability; ${c.workload} active task(s).`, provisional: c.quality===null || c.reliability===null };
  }).sort((a,b)=>b.score-a.score);
}
