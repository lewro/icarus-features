import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const pages = [
  { name: 'drafting-board', url: 'http://localhost:3200/features/drafting-board/', title: 'Drafting Board' },
  { name: 'workflow-view',  url: 'http://localhost:3200/features/workflow-view/',  title: 'Workflow View' },
  { name: 'dashboard',      url: 'http://localhost:3200/features/dashboard/',      title: 'Summary Dashboard' },
];

mkdirSync('./screenshots', { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

for (const p of pages) {
  const page = await context.newPage();
  await page.goto(p.url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `./screenshots/${p.name}.png`, fullPage: false });
  console.log(`captured ${p.name}`);
  await page.close();
}

await browser.close();
console.log('done');
