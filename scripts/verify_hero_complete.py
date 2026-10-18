import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless=True,
            args=["--use-gl=angle", "--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"]
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://127.0.0.1:3000/")
        
        # 1. At 4s (intro fog animation): verify text is NOT appearing prematurely!
        print("Waiting 4s for mid-intro check (should be clean fog/landscape forming, NO text)...")
        await page.wait_for_timeout(4000)
        s1 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/verified_intro_clean_notext.png"
        await page.screenshot(path=s1)
        print("Captured mid-intro check:", s1)
        
        # 2. At 8.8s (landscape defined): verify Phase 1 appears in the middle!
        print("Waiting for landscape definition (t=8.8s) -> Phase 1 appearance...")
        await page.wait_for_timeout(4800)
        s2 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/verified_phase1_landscape_ready.png"
        await page.screenshot(path=s2)
        print("Captured Phase 1:", s2)
        
        # 3. At 14s: verify Phase 2 appears in the middle!
        print("Waiting for transition to Phase 2 (t=14s)...")
        await page.wait_for_timeout(5500)
        s3 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/verified_phase2_landscape_ready.png"
        await page.screenshot(path=s3)
        print("Captured Phase 2:", s3)
        
        await browser.close()
        print("All verification captures finished!")

if __name__ == "__main__":
    asyncio.run(verify())
