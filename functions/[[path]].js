const TOTAL = 250_000_000;
const BASE = "https://25corejobsposting.pages.dev";

const TYPES = [
  ["Remote Customer Support", "Customer Support Specialist"],
  ["Remote Data Entry", "Data Entry Specialist"],
  ["Virtual Assistant", "Virtual Assistant"],
  ["Remote Technical Support", "Technical Support Specialist"],
  ["Government Clerk", "Government Clerk"],
  ["Remote Content Moderator", "Content Moderator"],
  ["Remote Administrative", "Administrative Assistant"],
  ["Remote Sales Support", "Sales Support Representative"],
  ["Remote Bookkeeping", "Bookkeeping Assistant"],
  ["Remote Healthcare", "Healthcare Support Specialist"]
];

const COMPANIES = [
  "Example Employer",
  "CareerWorks Demo",
  "Northstar Services",
  "Acme Digital",
  "Public Service Recruitment"
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jobFromId(id) {
  const [type, role] = TYPES[(id - 1) % TYPES.length];
  const company = COMPANIES[(id - 1) % COMPANIES.length];

  const remote = !type.startsWith("Government");
  const location = remote ? "United States" : "India";

  const hourlySalary = remote
    ? 20 + ((id - 1) % 31)
    : null;

  const salary = remote
    ? `$${hourlySalary}/Hour`
    : "See official recruitment notification";

  return {
    id,
    title: `${company} ${type} Work From Home Jobs (${role}) ${salary}`,
    company,
    role,
    type,
    location,
    remote,
    salary,
    hourlySalary,
    slug: `job-${String(id).padStart(9, "0")}`
  };
}

function page(job) {
  const title = job.title;

  const description =
    `This is a learning/demo job record. Before applying, verify the employer, vacancy, salary, qualification, dates and application process from an official source. Role: ${job.role}.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",

    // Use the actual job role in JobPosting.title.
    // The longer marketing-style title remains the HTML <title>/<h1>.
    "title": job.role,

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

    if (Number.isFinite(job.hourlySalary)) {
      schema.baseSalary = {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.hourlySalary,
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

  const json = JSON.stringify(schema);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${esc(title)}</title>

<meta
  name="description"
  content="${esc(title)} – qualification, age requirements, documents, exam, selection process and how to apply."
>

<link rel="canonical" href="${BASE}/jobs/${job.slug}">

<link rel="stylesheet" href="/assets/styles.css">

<script type="application/ld+json">${json}</script>
</head>

<body>

<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="/">HowTo Jobs</a>

    <nav>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
      <a href="/privacy-policy.html">Privacy</a>
    </nav>
  </div>
</header>

<main class="wrap section">

  <span class="eyebrow">${esc(job.type)}</span>

  <h1>${esc(title)}</h1>

  <p class="lead">
    ${esc(job.company)} ·
    ${esc(job.location)} ·
    ${esc(job.salary)}
  </p>

  <div class="content">

    <h2>Job Overview</h2>
    <p>${esc(description)}</p>

    <h2>Qualification</h2>
    <p>
      Qualification varies by role and employer.
      Check the official job notification before applying.
    </p>

    <h2>Age Requirement</h2>
    <p>
      Age limits and category relaxations vary by employer
      and recruitment notification.
    </p>

    <h2>Documents Required</h2>

    <ul>
      <li>Resume/CV</li>
      <li>Educational documents where required</li>
      <li>Identity/work authorization documents where required</li>
      <li>Any additional documents specified in the official notification</li>
    </ul>

    <h2>Exams &amp; Selection Process</h2>

    <p>
      Some jobs may include an assessment, interview, typing/skill test,
      document verification or other stages. Follow the official recruitment process.
    </p>

    <h2>Qualifying Marks</h2>

    <p>
      Do not assume a fixed passing mark. Any minimum qualifying marks
      or cutoff must come from the official notification or published result.
    </p>

    <h2>How to Apply</h2>

    <p>
      Use the employer or recruitment authority's official application page.
      Confirm the deadline, eligibility and supporting documents before submitting.
    </p>

    <p>
      <a class="btn" href="/apply.html?job=${encodeURIComponent(job.id)}">
        Apply Now
      </a>
    </p>

    <div class="notice">
      Learning/demo content: this page is generated from a deterministic
      demo dataset and does not represent a confirmed live vacancy.
    </div>

  </div>
</main>

<footer class="footer">
  <div class="wrap foot">
    <div>© 2026 HowTo Jobs</div>

    <div>
      <a href="/disclaimer.html">Disclaimer</a>
      <a href="/terms.html">Terms</a>
    </div>
  </div>
</footer>

</body>
</html>`;
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function onRequest({ request, next }) {
  const u = new URL(request.url);
  const p = u.pathname;

  if (p === "/sitemap.xml") {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${xmlEscape(BASE)}/sitemap-1.xml</loc></sitemap>
  <sitemap><loc>${xmlEscape(BASE)}/sitemap-2.xml</loc></sitemap>
  <sitemap><loc>${xmlEscape(BASE)}/sitemap-3.xml</loc></sitemap>
  <sitemap><loc>${xmlEscape(BASE)}/sitemap-4.xml</loc></sitemap>
  <sitemap><loc>${xmlEscape(BASE)}/sitemap-5.xml</loc></sitemap>
</sitemapindex>`;

    return new Response(xml, {
      headers: {
        "content-type": "application/xml; charset=UTF-8"
      }
    });
  }

  if (/^\/sitemap-[1-5]\.xml$/.test(p)) {
    const match = p.match(/\d+/);
    const shard = Number(match[0]);

    const per = 50_000;
    const start = (shard - 1) * per + 1;
    const end = Math.min(TOTAL, shard * per);

    let body =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    for (let i = start; i <= end; i++) {
      body +=
        `<url><loc>${xmlEscape(
          `${BASE}/jobs/job-${String(i).padStart(9, "0")}`
        )}</loc></url>`;
    }

    body += "</urlset>";

    return new Response(body, {
      headers: {
        "content-type": "application/xml; charset=UTF-8"
      }
    });
  }

  const m = p.match(/^\/jobs\/job-(\d{9})\/?$/);

  if (m) {
    const id = Number(m[1]);

    if (id < 1 || id > TOTAL) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(page(jobFromId(id)), {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }

  return next();
}
