const TOTAL = 250_000_000;
const TYPES = [
  ['Remote Customer Support','Customer Support Specialist'],
  ['Remote Data Entry','Data Entry Specialist'],
  ['Virtual Assistant','Virtual Assistant'],
  ['Remote Technical Support','Technical Support Specialist'],
  ['Government Clerk','Government Clerk'],
  ['Remote Content Moderator','Content Moderator'],
  ['Remote Administrative','Administrative Assistant'],
  ['Remote Sales Support','Sales Support Representative'],
  ['Remote Bookkeeping','Bookkeeping Assistant'],
  ['Remote Healthcare','Healthcare Support Specialist']
];
const COMPANIES = ['Example Employer','CareerWorks Demo','Northstar Services','Acme Digital','Public Service Recruitment'];
function pageCount(limit){return Math.ceil(TOTAL/limit)}
function slug(i){return `job-${String(i).padStart(9,'0')}`}
function makeJob(i){
  const [type,role]=TYPES[i % TYPES.length];
  const company=COMPANIES[i % COMPANIES.length];
  const remote = !type.startsWith('Government');
  const location=remote?'United States':'India';
  const salary = remote ? `$${20 + (i % 31)}/Hour` : 'See official recruitment notification';
  const title = `${company} ${type} Work From Home Jobs (${role}) ${salary}`;
  return {id:i+1,slug:slug(i+1),title,company,location,type:remote?'Remote':'Government',salary,summary:`Learning/demo job record for ${role}. Verify all real-world requirements, dates and application information from the official employer or recruitment authority before applying.`,url:`/jobs/${slug(i+1)}`,role,remote};
}
export async function onRequestGet({request}){
  const u=new URL(request.url); const page=Math.max(1,Number(u.searchParams.get('page')||1));
  const limit=Math.min(100,Math.max(1,Number(u.searchParams.get('limit')||20))); const q=(u.searchParams.get('q')||'').trim().toLowerCase();
  const pages=pageCount(limit);
  if(page>pages) return Response.json({error:'Page out of range'}, {status:400});
  const start=(page-1)*limit+1; const items=[];
  if(q){
    // Deterministic sample search across the generated namespace; intended for learning/demo use.
    let checked=0, i=start-1;
    while(items.length<limit && checked<5000 && i<TOTAL){const j=makeJob(i); if(`${j.title} ${j.company} ${j.role} ${j.location}`.toLowerCase().includes(q)) items.push(j); i++; checked++;}
  }else{for(let i=start-1;i<Math.min(TOTAL,start-1+limit);i++) items.push(makeJob(i));}
  return Response.json({page,limit,total:q?null:TOTAL,pages:q?null:pages,start:start,end:q?null:start+items.length-1,items,query:q});
}
