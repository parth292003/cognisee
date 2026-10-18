import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless=True,
            args=["--use-gl=angle", "--use-angle=metal", "--enable-webgl", "--ignore-gpu-blocklist"]
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://127.0.0.1:3000/")
        
        # 1. Wait for page load and intro to show Phase 1 (Frontier AI Lab) in the center
        print("Waiting 5s for Hero Scene Phase 1...")
        await page.wait_for_timeout(5500)
        p1 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/hero_middle_phrase1.png"
        await page.screenshot(path=p1)
        print("Captured Hero Middle Phase 1:", p1)
        
        # 2. Wait 5.5s for loop to transition to Phase 2 (Building Artificial Collective Intelligence) in the center
        print("Waiting 5.5s for Hero Scene Phase 2...")
        await page.wait_for_timeout(5500)
        p2 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/hero_middle_phrase2.png"
        await page.screenshot(path=p2)
        print("Captured Hero Middle Phase 2:", p2)
        
        # 3. Scroll to Aviation Particle Room
        print("Navigating to Aviation Aircraft room...")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                // Scene 2 is the portal / particles room
                const top2 = ctrl.scrollComposers[2].passes[0].scene.__top;
                ctrl.centerScroll(top2 + 0.35, 1.5);
            }
        }""")
        await page.wait_for_timeout(3500)
        p3 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/aviation_b787_particle_verified.png"
        await page.screenshot(path=p3)
        print("Captured Aviation B787 Aircraft:", p3)
        
        # 4. Scroll to Iceberg scene and click an iceberg
        print("Navigating to Iceberg Scene...")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                const top1 = ctrl.scrollComposers[1].passes[0].scene.__top;
                ctrl.centerScroll(top1 + 0.25, 1.5);
            }
        }""")
        await page.wait_for_timeout(3000)
        await page.evaluate("""() => {
            if (window.Q) window.Q.emit('webgl_project_show', 0);
        }""")
        await page.wait_for_timeout(2000)
        p4 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/iceberg_scholarly_reader.png"
        await page.screenshot(path=p4)
        print("Captured Iceberg Scholarly Reader:", p4)
        
        await browser.close()
        print("All four captures complete!")

if __name__ == "__main__":
    asyncio.run(run())
