import { expect, test } from '@playwright/test';

test('Visit page and see 3 posts', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('input[type=range]')).toHaveValue('3');
	await expect(page.locator('.posts-list')).toBeVisible();
	await expect(page.locator('.post')).toHaveCount(3);
});

test('Fetch comments', async ({ page }) => {
	const btn = page.locator('button');

	await page.goto('/');
	await btn.click();
	await expect(page.locator('h3')).toHaveCount(3);
	await expect(btn).toBeDisabled();
});

test('See 6 posts and fetch comments', async ({ page }) => {
	const input = page.locator('input[type=range]');
	const btn = page.locator('button');

	await page.goto('/');
	await input.fill('6');
	await expect(page.locator('.post')).toHaveCount(6);
	await btn.click();
	await expect(page.locator('h3')).toHaveCount(6);
	await expect(btn).toBeDisabled();
});
