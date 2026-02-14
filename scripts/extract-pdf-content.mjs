#!/usr/bin/env node
/**
 * Extract text from PDFs in docs/downloads/ and update markdown files.
 * Run after download-pdfs (or after manually placing PDFs in docs/downloads/).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "pdf-sources.json"), "utf8")
);

const downloadDir = path.join(rootDir, config.downloadDir);

function textToMarkdown(text) {
  if (!text || !text.trim()) return "";
  return text
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => {
      const t = line.trim();
      if (!t) return "";
      if (t.match(/^#{1,6}\s/)) return t;
      if (t.match(/^[-*]\s/)) return t;
      if (t.match(/^\d+\.\s/)) return t;
      return t;
    })
    .filter(Boolean)
    .join("\n\n");
}

function buildMarkdownContent(source, extractedText, existingContent) {
  const body = textToMarkdown(extractedText);

  if (source.appendToExisting && existingContent.trim()) {
    const section = source.sectionHeader
      ? `\n\n${source.sectionHeader}\n\n${body}`
      : `\n\n## Extracted Content\n\n${body}`;
    return existingContent.trimEnd() + section + "\n";
  }

  const title = path.basename(source.markdown, ".md").replace(/_/g, " ");
  const driveUrl = `https://drive.google.com/file/d/${source.id}/view?usp=sharing`;

  const header = `# ${title}

> **Source:** [${source.filename}](${driveUrl})
> **Extracted:** ${new Date().toISOString().split("T")[0]}

---

`;

  return header + body + "\n";
}

async function extractFromPdf(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: dataBuffer });
  try {
    const result = await parser.getText();
    return { text: result.text };
  } finally {
    await parser.destroy();
  }
}

async function main() {
  if (!fs.existsSync(downloadDir)) {
    console.error(`Download directory not found: ${downloadDir}`);
    console.error("Run 'npm run download:pdfs' first, or manually place PDFs in docs/downloads/");
    process.exit(1);
  }

  const pdfFiles = fs.readdirSync(downloadDir).filter((f) => f.endsWith(".pdf"));
  if (pdfFiles.length === 0) {
    console.error(`No PDFs found in ${downloadDir}`);
    console.error("Run 'npm run download:pdfs' first, or manually place PDFs in docs/downloads/");
    process.exit(1);
  }

  const filenameToCanonical = config.filenameMatches || {};
  function resolvePdfPath(source) {
    const canonical = path.join(downloadDir, source.filename);
    if (fs.existsSync(canonical)) return canonical;
    const match = Object.entries(filenameToCanonical).find(([, can]) => can === source.filename);
    if (match) {
      const altPath = path.join(downloadDir, match[0]);
      if (fs.existsSync(altPath)) return altPath;
    }
    return null;
  }

  let processed = 0;
  let failed = 0;

  for (const source of config.sources) {
    const pdfPath = resolvePdfPath(source);
    if (!pdfPath) continue;
    const markdownPath = path.join(rootDir, source.markdown);

    process.stdout.write(`Extracting ${source.filename}... `);

    try {
      const { text } = await extractFromPdf(pdfPath);
      let existingContent = "";
      if (source.appendToExisting && fs.existsSync(markdownPath)) {
        existingContent = fs.readFileSync(markdownPath, "utf8");
      }
      const content = buildMarkdownContent(source, text, existingContent);
      fs.mkdirSync(path.dirname(markdownPath), { recursive: true });
      fs.writeFileSync(markdownPath, content, "utf8");
      console.log("OK");
      processed++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nProcessed ${processed} PDFs. Failed: ${failed}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
