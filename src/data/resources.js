export const resources = [
  {
    slug: "how-to-evaluate-scholarship-eligibility",
    title: "How to Evaluate Scholarship Eligibility",
    category: "Scholarship Guide",
    readMinutes: 6,
    excerpt:
      "A practical process for checking academic level, nationality, results and mandatory application requirements.",
    sections: [
      {
        title: "Start with non-negotiable rules",
        paragraphs: [
          "Review the education level, nationality, residence, age and academic requirements before spending time on essays or references.",
          "A strong personal profile cannot replace a mandatory eligibility condition stated by the funding provider.",
        ],
      },
      {
        title: "Separate eligibility from competitiveness",
        paragraphs: [
          "Eligibility means that you are allowed to apply. Competitiveness describes how strongly your profile compares with the expected applicant background.",
          "Treat these as separate decisions when evaluating an opportunity.",
        ],
      },
      {
        title: "Record missing information",
        paragraphs: [
          "Create a list of requirements that cannot yet be confirmed, such as language results, degree equivalency or graduation dates.",
          "Contact the official provider when the published guidance is unclear.",
        ],
      },
    ],
  },
  {
    slug: "statement-of-purpose-preparation",
    title: "Statement of Purpose Preparation Checklist",
    category: "SOP Writing",
    readMinutes: 7,
    excerpt:
      "Organize your academic motivation, relevant experience and future goals before writing the first draft.",
    sections: [
      {
        title: "Understand the prompt",
        paragraphs: [
          "Identify every question and instruction in the official application prompt.",
          "Note the word limit, required examples and formatting rules before drafting.",
        ],
      },
      {
        title: "Build an evidence list",
        paragraphs: [
          "List academic projects, work experience, research interests and achievements that support your intended field.",
          "Select examples that demonstrate preparation rather than listing every activity.",
        ],
      },
      {
        title: "Connect past, present and future",
        paragraphs: [
          "Explain how your previous experiences developed your current interests and how the program supports your next goal.",
          "Avoid unsupported claims and keep the program connection specific.",
        ],
      },
    ],
  },
  {
    slug: "academic-cv-for-funded-programs",
    title: "Building an Academic CV for Funded Programs",
    category: "CV Writing",
    readMinutes: 5,
    excerpt:
      "Structure education, projects, research, skills and achievements for scholarship and research applications.",
    sections: [
      {
        title: "Prioritize relevant sections",
        paragraphs: [
          "Place education, research, projects and relevant experience where reviewers can find them quickly.",
          "The strongest evidence should receive more space than unrelated activities.",
        ],
      },
      {
        title: "Describe contribution and outcome",
        paragraphs: [
          "Use clear action statements that explain your contribution, the tools or methods used and the result.",
          "Avoid adding skills that are not supported elsewhere in the application.",
        ],
      },
      {
        title: "Maintain consistent formatting",
        paragraphs: [
          "Use consistent dates, headings, spacing and punctuation throughout the document.",
          "Export the final document as a readable PDF unless the provider requests another format.",
        ],
      },
    ],
  },
  {
    slug: "recommendation-letter-planning",
    title: "Recommendation Letter Planning",
    category: "Application Tips",
    readMinutes: 5,
    excerpt:
      "Select suitable referees and provide them with enough context, evidence and preparation time.",
    sections: [
      {
        title: "Choose relevant referees",
        paragraphs: [
          "Select people who can describe your academic, research, professional or leadership work with specific examples.",
          "A detailed letter from a relevant referee is usually more useful than a generic letter based only on seniority.",
        ],
      },
      {
        title: "Prepare a referee package",
        paragraphs: [
          "Share the opportunity description, deadline, CV, academic goals and the work you completed with the referee.",
          "Clearly explain how and where the letter must be submitted.",
        ],
      },
      {
        title: "Request early",
        paragraphs: [
          "Give referees enough time to prepare and submit the letter before the official deadline.",
          "Send a polite reminder only when necessary and confirm submission through the application system.",
        ],
      },
    ],
  },
  {
    slug: "scholarship-document-checklist",
    title: "Scholarship Document Checklist",
    category: "Application Tips",
    readMinutes: 6,
    excerpt:
      "Create a reliable document workflow for transcripts, certificates, references and identity documents.",
    sections: [
      {
        title: "Create a master document list",
        paragraphs: [
          "Maintain a secure list of common documents and track their issue dates, validity and translation status.",
          "Do not assume that every program accepts the same document format.",
        ],
      },
      {
        title: "Check certification rules",
        paragraphs: [
          "Review whether scans, certified copies, official electronic transcripts or translations are required.",
          "Use the official application guidance as the source of truth.",
        ],
      },
      {
        title: "Use clear file names",
        paragraphs: [
          "Use consistent names that identify the applicant, document type and version.",
          "Confirm that every uploaded file opens correctly before final submission.",
        ],
      },
    ],
  },
  {
    slug: "application-deadline-planning",
    title: "Application Deadline Planning",
    category: "Application Tips",
    readMinutes: 4,
    excerpt:
      "Turn one final deadline into smaller preparation dates for essays, documents and references.",
    sections: [
      {
        title: "Work backward",
        paragraphs: [
          "Start from the official deadline and create earlier internal deadlines for documents, essays and referee requests.",
          "Keep time for final review and technical submission problems.",
        ],
      },
      {
        title: "Identify dependencies",
        paragraphs: [
          "Some tasks depend on external organizations, referees or test providers and should begin first.",
          "Separate tasks you control directly from tasks that require another person or institution.",
        ],
      },
      {
        title: "Submit before the final hour",
        paragraphs: [
          "Complete the application early enough to review confirmation messages and resolve upload or payment issues.",
          "Save evidence of successful submission where appropriate.",
        ],
      },
    ],
  },
];

export function getResourceBySlug(slug) {
  return resources.find((resource) => resource.slug === slug);
}
