import { expect, test } from "@playwright/test";

test("renders Victor's supplied profile, location and stats in a labelled card", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Profile card | Royer Adames");
  const card = page.getByRole("article", { name: /Victor Crest/ });
  await expect(card).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Victor Crest\s*, age 26/);
  await expect(page.getByText("London", { exact: true })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toContainText("Frontend Mentor");
  const terms = await page.locator(".stats dt").allTextContents();
  const values = await page.locator(".stats dd").allTextContents();
  expect(terms).toEqual(["Followers", "Likes", "Photos"]);
  expect(values).toEqual(["80K", "803K", "1.4K"]);
  const avatar = page.getByRole("img", { name: "Portrait of Victor Crest" });
  expect(await avatar.evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)).toBe(true);
});

test("declares one site name in the footer, og:site_name and WebSite JSON-LD", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-name")).toHaveText("Profile card");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Profile card");
  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}");
  expect(jsonLd).toEqual({ "@context": "https://schema.org", "@type": "WebSite", name: "Profile card", url: "https://profile-card-component-fm.royeradames.com/" });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/profile-card-component-fm\.royeradames\.com\/?$/);
});

test("matches the design's card geometry and type at desktop and mobile frames", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 720 });
  await page.goto("/");
  const card = page.locator(".profile-card");
  const box = await card.boundingBox();
  expect(box?.width).toBe(350);
  await expect(card).toHaveCSS("border-radius", "15px");
  await expect(page.locator(".profile-header")).toHaveCSS("height", "144px");
  const avatar = await page.locator(".avatar").boundingBox();
  expect(avatar?.width).toBe(96);
  expect(Math.round((avatar!.y + 48) - box!.y)).toBe(144);
  expect(Math.round(avatar!.x + 48)).toBe(Math.round(box!.x + 175));
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-size", "18px");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", "rgb(46, 51, 73)");
  await expect(page.locator(".age")).toHaveCSS("color", "rgb(107, 112, 130)");
  expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toContain("Kumbh");
  await page.setViewportSize({ width: 375, height: 667 });
  expect((await card.boundingBox())?.width).toBe(326);
});

test("stays inside 400, 768 and 1440 viewports with the family text and target floors", async ({ page }) => {
  for (const width of [375, 400, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const smallText = await page.locator("h1, p, dt, dd, footer, footer a").evaluateAll(elements =>
      elements.filter(element => element.getClientRects().length > 0 && parseFloat(getComputedStyle(element).fontSize) < 16).map(element => element.textContent));
    expect(smallText).toEqual([]);
    const cardBox = await page.locator(".profile-card").boundingBox();
    expect(cardBox!.x).toBeGreaterThanOrEqual(16);
    for (const link of await page.locator("a").all()) {
      const box = await link.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.setViewportSize({ width: 400, height: 900 });
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("keyboard reaches the attribution links with a visible focus ring", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const first = page.getByRole("link", { name: "Frontend Mentor", exact: true });
  await expect(first).toBeFocused();
  await expect(first).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Royer Adames", exact: true })).toBeFocused();
});

test("renders fully without JavaScript and makes no writes", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  const writes: string[] = [];
  page.on("request", request => { if (request.method() !== "GET") writes.push(request.url()); });
  try {
    await page.goto("http://127.0.0.1:4526/");
    await expect(page.getByRole("heading", { name: /Victor Crest/ })).toBeVisible();
    await expect(page.locator(".stats dd")).toHaveText(["80K", "803K", "1.4K"]);
    expect(writes).toEqual([]);
  } finally {
    await context.close();
  }
});
