const TOTAL = 250_000_000;
const BASE = "https://25corejobsposting.pages.dev";

const JOB_TYPES = [
  {
    category: "Remote Customer Support",
    role: "Customer Support Representative",
    company: "Example Employer",
    location: "United States",
    remote: true,
    salaryMin: 20,
    salaryMax: 50,
    experience: "Entry-level to 2 years",
    education: "High school diploma or equivalent",
    hours: "Full-time, flexible shifts"
  },
  {
    category: "Remote Data Entry",
    role: "Data Entry Specialist",
    company: "CareerWorks Demo",
    location: "United States",
    remote: true,
    salaryMin: 18,
    salaryMax: 35,
    experience: "No experience to 2 years",
    education: "High school diploma or equivalent",
    hours: "Part-time or full-time"
  },
  {
    category: "Virtual Assistant",
    role: "Virtual Assistant",
    company: "Northstar Services",
    location: "United States",
    remote: true,
    salaryMin: 20,
    salaryMax: 40,
    experience: "Entry-level to 3 years",
    education: "High school diploma or equivalent",
    hours: "Flexible remote schedule"
  },
  {
    category: "Remote Technical Support",
    role: "Technical Support Specialist",
    company: "Acme Digital",
    location: "United States",
    remote: true,
    salaryMin: 25,
    salaryMax: 55,
    experience: "1+ years preferred",
    education: "High school diploma; technical training preferred",
    hours: "Full-time"
  },
  {
    category: "Government Clerk",
    role: "Government Clerk",
    company: "Public Service Recruitment",
    location: "India",
    remote: false,
    salaryMin: null,
    salaryMax: null,
    experience: "Varies by recruitment notification",
    education: "Varies by recruitment notification",
    hours: "As specified by the appointing authority"
  },
  {
    category: "Remote Content Moderator",
    role: "Content Moderator",
    company: "Digital Media Services",
    location: "United States",
    remote: true,
    salaryMin: 20,
    salaryMax: 42,
    experience: "Entry-level to 2 years",
    education: "High school diploma or equivalent",
    hours: "Full-time or part-time"
  },
  {
    category: "Remote Administrative",
    role: "Administrative Assistant",
    company: "Business Support Group",
    location: "United States",
    remote: true,
    salaryMin: 22,
    salaryMax: 40,
    experience: "Entry-level to 3 years",
    education: "High school diploma or equivalent",
    hours: "Full-time"
  },
  {
    category: "Remote Sales Support",
    role: "Sales Support Representative",
    company: "Customer Growth Services",
    location: "United States",
    remote: true,
    salaryMin: 22,
    salaryMax: 45,
    experience: "Entry-level to 2 years",
    education: "High school diploma or equivalent",
    hours: "Full-time"
  },
  {
    category: "Remote Bookkeeping",
    role: "Bookkeeping Assistant",
    company: "Finance Operations Demo",
    location: "United States",
    remote: true,
    salaryMin: 24,
    salaryMax: 45,
    experience: "1+ years preferred",
    education: "Accounting coursework or equivalent experience preferred",
    hours: "Part-time or full-time"
  },
  {
    category: "Remote Healthcare",
    role: "Healthcare Support Specialist",
    company: "Healthcare Services Demo",
    location: "United States",
    remote: true,
    salaryMin: 24,
    salaryMax: 48,
    experience: "Varies by role",
    education: "Relevant healthcare qualification where required",
    hours: "Full-time"
  }
];

const RESPONSIBILITIES = [
  "Respond to customer, client, or internal requests in a professional and timely manner.",
  "Maintain accurate records and update internal systems when required.",
  "Follow company procedures, quality standards, privacy requirements, and communication guidelines.",
  "Communicate clearly by email, chat, phone, or approved internal tools depending on the position.",
  "Work independently while meeting assigned productivity, quality, attendance, or deadline expectations.",
  "Escalate complex issues to the appropriate team when additional support is required.",
  "Protect confidential company and customer information and follow applicable security procedures."
];

const SKILLS = [
  "Clear written and verbal communication",
  "Basic computer and internet skills",
  "Ability to learn new software and online tools",
  "Good attention to detail",
  "Time-management and organizational skills",
  "Ability to work independently in a remote environment",
  "Professional and reliable communication"
];

const BENEFITS = [
  "Remote or flexible work arrangements where offered",
  "Training or onboarding may be provided depending on the employer",
  "Opportunity to develop transferable professional skills",
  "Flexible scheduling may be available for eligible positions",
  "Potential career growth depending on employer and position"
];

const APPLICATION_STEPS = [
  "Review the complete job description and eligibility requirements.",
  "Prepare an updated resume and any required supporting documents.",
  "Complete the employer's official application form.",
  "Submit the application before the stated deadline.",
  "Complete any assessment, interview, skills test, background check, or verification required by the employer."
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function slugFromId(id) {
  return `job-${String(id).padStart(9, "0")}`;
}

function jobFromId(id) {
  const template = JOB_TYPES[(id - 1) % JOB_TYPES.length];

  const salary =
    template.salaryMin !== null && template.salaryMax !== null
      ? `$${template.salaryMin}–$${template.salaryMax}/Hour`
      : "See official recruitment notification";

  const longTitle =
    `${template.company} ${template.category} Work From Home Jobs ` +
    `(${template.role}) ${salary}`;

  return {
    id,
    slug: slugFromId(id),
    ...template,
    longTitle,
    salary
  };
}

function fullJobText(job) {
  const salaryText =
    job.salaryMin !== null
      ? `${job.salaryMin} to ${job.salaryMax} US dollars per hour, where offered`
      : "Salary is determined by the applicable recruitment notification or employer";

  const remoteText = job.remote
    ? "This role is described as a remote position for applicants located in the United States."
    : "This example position is not presented as a fully remote role.";

  return [
    `${job.longTitle}.`,
    "",
    `About this position`,
    `${job.role} is a ${job.category.toLowerCase()} opportunity with ${job.company}. ${remoteText}`,
    `The position may involve handling day-to-day responsibilities related to the role while maintaining professional communication, accurate records, quality standards, and applicable company procedures.`,
    "",
    `Job location`,
    `${job.location}.`,
    job.remote
      ? "Remote work may be performed from an eligible applicant location subject to the employer's policies and geographic restrictions."
      : "Work location, schedule, and reporting requirements should be confirmed from the official recruitment notice.",
    "",
    `Salary and compensation`,
    `The example compensation range is ${salaryText}. Actual compensation must be confirmed from the employer or official recruitment source before applying.`,
    "",
    `Employment type`,
    `${job.hours}.`,
    "",
    `Experience requirements`,
    `${job.experience}. Actual experience requirements may vary by employer and vacancy.`,
    "",
    `Education and qualification`,
    `${job.education}. Applicants should confirm the exact education, certification, licensing, or credential requirements in the official job posting.`,
    "",
    `Key responsibilities`,
    RESPONSIBILITIES.join(" "),
    "",
    `Skills that may be useful`,
    SKILLS.join(" "),
    "",
    `Potential benefits`,
    BENEFITS.join(" "),
    "",
    `Documents that may be required`,
    "Applicants may need a current resume, educational records, identification or work-authorization documents, professional certifications where applicable, and any additional information requested by the employer.",
    "",
    `Selection process`,
    "Depending on the employer, applicants may be asked to complete an online assessment, screening call, technical or skills test, interview, reference check, background check, or document verification. The exact process depends on the vacancy.",
    "",
    `How to apply`,
    "Review the complete official job announcement before submitting an application. Use the employer's official careers page or the official recruitment authority wherever possible. Confirm salary, eligibility, location, closing date, and application requirements before submitting personal information.",
    "",
    `Typical application steps`,
    APPLICATION_STEPS.join(" "),
    "",
    `Important notice`,
    "This page is part of a learning and demonstration website. It is not confirmation that the named company is currently hiring for this exact position. Verify every vacancy, employer, salary, location, qualification, and application deadline from an official source before applying."
  ].join("\n");
}

function htmlDescription(job) {
  const description = fullJobText(job);

  return `
    <p>${escapeHtml(description).replace(/\n\n/g, "</p><p>").replace(/\n/g, " ")}</p>
  `;
}

function schemaFor(job) {
  const description = fullJobText(job);

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",

    "title": job.longTitle,

    "description": description,

    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },

    "employmentType": "FULL_TIME",

    "datePosted": "2026-09-11",

    "validThrough": "2026-10-11T23:59:59Z"
  };

  if (job.remote) {
    schema.jobLocationType = "TELECOMMUTE";

    schema.applicantLocationRequirements = {
      "@type": "Country",
      "name": "United States"
    };

    if (job.salaryMin !== null && job.salaryMax !== null) {
      schema.baseSalary = {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": job.salaryMin,
          "maxValue": job.salaryMax,
          "unitText": "HOUR"
        }
      };
    }
  } else {
    schema.jobLocation = {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
      }
    };
  }

  return schema;
}

function renderList(items) {
  return items.map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderJobPage(job) {
  const schema = schemaFor(job);
  const schemaJson = JSON.stringify(schema);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHtml(job.longTitle)}</title>

<meta
  name="description"
  content="${escapeHtml(
    `${job.longTitle}. Learn about qualification, experience, salary, responsibilities, documents, selection process and how to apply.`
  )}"
>

<meta name="robots" content="index,follow,max-image-preview:large">

<link rel="canonical" href="${BASE}/jobs/${job.slug}">

<script type="application/ld+json">${schemaJson}</script>

<style>
:root{
  --bg:#f7f8fa;
  --text:#17202a;
  --muted:#657080;
  --card:#ffffff;
  --border:#e5e7eb;
  --primary:#175cd3;
  --primary-dark:#124cae;
}
*{box-sizing:border-box}
body{
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:Arial,Helvetica,sans-serif;
  line-height:1.7;
}
.wrap{
  width:min(1100px,92%);
  margin:auto;
}
.site-header{
  background:#fff;
  border-bottom:1px solid var(--border);
}
.nav{
  min-height:68px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
}
.brand{
  color:var(--text);
  text-decoration:none;
  font-size:22px;
  font-weight:700;
}
.nav nav{
  display:flex;
  gap:18px;
}
.nav nav a{
  color:var(--muted);
  text-decoration:none;
}
.section{
  padding:44px 0 70px;
}
.eyebrow{
  display:inline-block;
  font-size:13px;
  font-weight:700;
  color:var(--primary);
  background:#eaf2ff;
  padding:6px 10px;
  border-radius:999px;
}
h1{
  font-size:clamp(30px,5vw,48px);
  line-height:1.18;
  margin:18px 0 12px;
}
h2{
  font-size:28px;
  line-height:1.25;
  margin-top:38px;
}
h3{
  font-size:20px;
}
.lead{
  color:var(--muted);
  font-size:18px;
}
.grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:18px;
  margin:28px 0;
}
.card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:14px;
  padding:20px;
}
.card strong{
  display:block;
  margin-bottom:4px;
}
.article{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:16px;
  padding:28px;
}
.article p{
  margin:0 0 18px;
}
.article ul,.article ol{
  padding-left:24px;
}
.btn{
  display:inline-block;
  background:var(--primary);
  color:#fff;
  padding:13px 20px;
  border-radius:9px;
  text-decoration:none;
  font-weight:700;
}
.btn:hover{
  background:var(--primary-dark);
}
.notice{
  margin-top:30px;
  padding:18px;
  border-left:4px solid var(--primary);
  background:#f4f7fb;
  border-radius:8px;
}
.footer{
  background:#fff;
  border-top:1px solid var(--border);
  padding:28px 0;
}
.foot{
  display:flex;
  justify-content:space-between;
  gap:20px;
  flex-wrap:wrap;
}
.foot a{
  margin-left:16px;
  color:var(--muted);
  text-decoration:none;
}
@media(max-width:700px){
  .nav{
    align-items:flex-start;
    flex-direction:column;
    justify-content:center;
    padding:14px 0;
  }
  .grid{
    grid-template-columns:1fr;
  }
  .article{
    padding:20px;
  }
}
</style>
</head>

<body>

<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="/">25 Crore Jobs</a>

    <nav>
      <a href="/">Home</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
      <a href="/privacy-policy.html">Privacy</a>
    </nav>
  </div>
</header>

<main class="wrap section">

  <span class="eyebrow">${escapeHtml(job.category)}</span>

  <h1>${escapeHtml(job.longTitle)}</h1>

  <p class="lead">
    ${escapeHtml(job.company)}
    · ${escapeHtml(job.location)}
    · ${escapeHtml(job.salary)}
  </p>

  <div class="grid">

    <div class="card">
      <strong>Job Role</strong>
      ${escapeHtml(job.role)}
    </div>

    <div class="card">
      <strong>Company</strong>
      ${escapeHtml(job.company)}
    </div>

    <div class="card">
      <strong>Location</strong>
      ${escapeHtml(job.location)}
    </div>

    <div class="card">
      <strong>Work Type</strong>
      ${job.remote ? "Remote / Work From Home" : "On-site / Official Location"}
    </div>

    <div class="card">
      <strong>Salary</strong>
      ${escapeHtml(job.salary)}
    </div>

    <div class="card">
      <strong>Experience</strong>
      ${escapeHtml(job.experience)}
    </div>

    <div class="card">
      <strong>Education</strong>
      ${escapeHtml(job.education)}
    </div>

    <div class="card">
      <strong>Schedule</strong>
      ${escapeHtml(job.hours)}
    </div>

  </div>

  <article class="article">

    <h2>About This Job</h2>

    <p>
      ${escapeHtml(
        `${job.role} is a ${job.category.toLowerCase()} opportunity with ${job.company}. This page explains the type of work, common qualifications, expected responsibilities, application process, documents, and selection stages associated with this kind of position.`
      )}
    </p>

    <h2>Job Description</h2>

    ${htmlDescription(job)}

    <h2>Responsibilities</h2>

    <ul>
      ${renderList(RESPONSIBILITIES)}
    </ul>

    <h2>Qualification and Education</h2>

    <p>
      ${escapeHtml(job.education)}
      Applicants should always verify the exact education requirements,
      required certifications, professional licenses, and other eligibility
      conditions from the official vacancy notice.
    </p>

    <h2>Experience Requirements</h2>

    <p>
      ${escapeHtml(job.experience)}.
      Experience requirements can differ between employers and vacancies.
    </p>

    <h2>Skills Required</h2>

    <ul>
      ${renderList(SKILLS)}
    </ul>

    <h2>Documents You May Need</h2>

    <ul>
      <li>Updated resume or CV</li>
      <li>Educational certificates or transcripts when requested</li>
      <li>Government-issued identification or work authorization where required</li>
      <li>Professional certificates or licenses where applicable</li>
      <li>Any additional documents listed in the official job announcement</li>
    </ul>

    <h2>Salary and Benefits</h2>

    <p>
      The example salary information shown above is for learning/demo purposes.
      Actual compensation, bonuses, benefits, overtime, paid leave, insurance,
      retirement benefits, and other terms depend on the employer and must be
      verified from the official vacancy.
    </p>

    <ul>
      ${renderList(BENEFITS)}
    </ul>

    <h2>Selection Process</h2>

    <ol>
      <li>Application submission</li>
      <li>Initial screening</li>
      <li>Assessment or skills test where applicable</li>
      <li>Interview or interview rounds</li>
      <li>Document verification or background checks where applicable</li>
      <li>Final hiring decision</li>
    </ol>

    <h2>How to Apply</h2>

    <p>
      Carefully review the employer's official job posting before applying.
      Confirm the employer name, job title, location, salary, qualification,
      closing date, and required documents. Use the official employer careers
      page or official recruitment authority whenever available.
    </p>

    <ol>
      ${APPLICATION_STEPS.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
    </ol>

    <h2>Important Information Before Applying</h2>

    <p>
      Never pay an individual or an unofficial website to obtain a job unless
      a legitimate recruitment process clearly requires a stated fee.
      Be careful with requests for passwords, banking PINs, one-time passwords,
      gift cards, cryptocurrency, or unusual payment methods. Confirm the
      vacancy through the employer's official website.
    </p>

    <p>
      For remote positions, geographic eligibility can still apply even when
      a role is described as work from home. Some employers limit remote hiring
      to particular states, countries, time zones, or work-authorized locations.
    </p>

    <h2>Apply Now</h2>

    <p>
      Complete the application form to continue to the next step.
      This demo form is for learning purposes and does not represent an
      employer's official hiring system.
    </p>

    <p>
      <a
        class="btn"
        href="/apply.html?job=${encodeURIComponent(job.id)}"
      >
        Apply Now
      </a>
    </p>

    <div class="notice">
      <strong>Learning / Demo Notice:</strong>
      This page is dynamically generated for testing a large-scale job website.
      It does not confirm that the named employer is hiring for this exact
      position. Verify every vacancy and application detail from an official source.
    </div>

  </article>

</main>

<footer class="footer">
  <div class="wrap foot">
    <div>© 2026 25 Crore Jobs</div>

    <div>
      <a href="/disclaimer.html">Disclaimer</a>
      <a href="/editorial-policy.html">Editorial Policy</a>
      <a href="/terms.html">Terms</a>
    </div>
  </div>
</footer>

</body>
</html>`;
}

function renderSitemapShard(shard) {
  const perShard = 50_000;
  const start = (shard - 1) * perShard + 1;
  const end = Math.min(TOTAL, shard * perShard);

  let xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  for (let i = start; i <= end; i++) {
    xml +=
      `<url><loc>${escapeXml(
        `${BASE}/jobs/${slugFromId(i)}`
      )}</loc></url>`;
  }

  xml += "</urlset>";

  return xml;
}

function renderSitemapIndex() {
  const perShard = 50_000;
  const shardCount = Math.ceil(TOTAL / perShard);

  let xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  for (let shard = 1; shard <= shardCount; shard++) {
    xml +=
      `<sitemap><loc>${escapeXml(
        `${BASE}/sitemap-${shard}.xml`
      )}</loc></sitemap>`;
  }

  xml += "</sitemapindex>";

  return xml;
}

function response(body, contentType = "text/html; charset=UTF-8", status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=3600"
    }
  });
}

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (path === "/robots.txt") {
    return response(
      `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`,
      "text/plain; charset=UTF-8"
    );
  }

  if (path === "/sitemap.xml") {
    return response(
      renderSitemapIndex(),
      "application/xml; charset=UTF-8"
    );
  }

  const sitemapMatch = path.match(/^\/sitemap-(\d+)\.xml$/);

  if (sitemapMatch) {
    const shard = Number(sitemapMatch[1]);

    const maxShards = Math.ceil(TOTAL / 50_000);

    if (!Number.isInteger(shard) || shard < 1 || shard > maxShards) {
      return response("Not Found", "text/plain; charset=UTF-8", 404);
    }

    return response(
      renderSitemapShard(shard),
      "application/xml; charset=UTF-8"
    );
  }

  const jobMatch = path.match(/^\/jobs\/job-(\d{9})$/);

  if (jobMatch) {
    const id = Number(jobMatch[1]);

    if (!Number.isInteger(id) || id < 1 || id > TOTAL) {
      return response("Job Not Found", "text/plain; charset=UTF-8", 404);
    }

    const job = jobFromId(id);

    return response(renderJobPage(job));
  }

  return next();
}
