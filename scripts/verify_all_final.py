import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless=True,
            args=["--use-gl=angle", "--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"]
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://127.0.0.1:3000/")

        # 1. Check t = 4.0s (mid intro, landscape still forming, text MUST be hidden)
        print("1. Checking t=4s (mid-intro)...")
        await page.wait_for_timeout(4000)
        p1 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_1_mid_intro_clean.png"
        await page.screenshot(path=p1)
        print("Captured:", p1)

        # 2. Check t = 8.5s (landscape defined, Phase 1 should appear in middle)
        print("2. Checking t=8.5s (landscape defined, Phase 1 in middle)...")
        await page.wait_for_timeout(4500)
        p2 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_2_phase1_landscape_ready.png"
        await page.screenshot(path=p2)
        print("Captured:", p2)

        # 3. Check t = 14s (Phase 2 in middle)
        print("3. Checking t=14s (Phase 2 in middle)...")
        await page.wait_for_timeout(5500)
        p3 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_3_phase2_landscape_ready.png"
        await page.screenshot(path=p3)
        print("Captured:", p3)

        # 4. Navigate to Aviation Aircraft particle room
        print("4. Navigating to Aviation Aircraft particle room...")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                const top2 = ctrl.scrollComposers[2].passes[0].scene.__top;
                ctrl.centerScroll(top2 + 0.35, 1.5);
            }
        }""")
        await page.wait_for_timeout(4500)
        p4 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_4_aviation_airplane_clear.png"
        await page.screenshot(path=p4)
        print("Captured:", p4)

        await browser.close()
        print("All four final verifications successfully completed!")

if __name__ == "__main__":
    asyncio.run(main())
