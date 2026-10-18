import asyncio
import os
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

        print("Waiting 8.5s for intro animation...")
        await page.wait_for_timeout(8500)

        # --- 1. TEST CRYSTALS SECTION ---
        print("\n--- 1. Testing Crystals Section ---")
        # In mainController, cubes scene is scrollComposers[1]
        # Let's inspect scene progress and positions
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                // Scroll to cubes section
                const cubesScene = ctrl.scrollComposers[1].passes[0].scene;
                ctrl.centerScroll(cubesScene.__top + 0.1, 1.0);
            }
        }""")
        await page.wait_for_timeout(2500)

        # Capture Crystal 0: Foundation 01
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/crystal_0_who_we_are.png")
        print("Captured crystal_0_who_we_are.png")

        # Scroll to Crystal 1: Foundation 02
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            const cubesScene = ctrl.scrollComposers[1].passes[0].scene;
            ctrl.centerScroll(cubesScene.__top + 1.0, 1.0);
        }""")
        await page.wait_for_timeout(2500)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/crystal_1_what_we_are_solving.png")
        print("Captured crystal_1_what_we_are_solving.png")

        # Click into Crystal 1 to test detail view
        print("Opening detail view for Foundation 01...")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                ctrl.navigateToSection("project", "/portfolio/who-we-are", { project: "who-we-are" });
            }
        }""")
        await page.wait_for_timeout(3500)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/crystal_detail_who_we_are.png")
        print("Captured crystal_detail_who_we_are.png")

        # Close detail view
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                ctrl.navigateToSection("home");
            }
        }""")
        await page.wait_for_timeout(2000)

        # --- 2. TEST YOUTUBE VIDEO ON PANEL 3 ---
        print("\n--- 2. Testing YouTube Showcase on Panel 3 ---")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                const entryScene = ctrl.scrollComposers[2].passes[0].scene;
                ctrl.centerScroll(entryScene.__top + 0.35, 1.5);
            }
        }""")
        await page.wait_for_timeout(4000)

        # Switch to Panel 3 (YouTube)
        await page.evaluate("""() => {
            const pr = window.__particleRoom;
            if (pr && pr.UI) {
                // switch to 3
                pr.UI.changeLink(1);
                pr.UI.changeLink(1);
                pr.UI.changeLink(1);
            }
        }""")
        await page.wait_for_timeout(2500)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/panel3_youtube_uninverted.png")
        print("Captured panel3_youtube_uninverted.png")

        # Check if overlay exists and is positioned
        overlay_info = await page.evaluate("""() => {
            const el = document.getElementById("youtube-card-overlay");
            if (!el) return { exists: false };
            const rect = el.getBoundingClientRect();
            return {
                exists: true,
                display: el.style.display,
                href: el.href,
                target: el.target,
                rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
            };
        }""")
        print("Overlay Info:", overlay_info)

        # --- 3. TEST AIRPLANE ON PANEL 0 ---
        print("\n--- 3. Testing Aviation Airplane on Panel 0 ---")
        await page.evaluate("""() => {
            const pr = window.__particleRoom;
            if (pr && pr.UI) {
                pr.UI.changeLink(1); // wraps to 0
            }
        }""")
        await page.wait_for_timeout(4000)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/panel0_airplane_settled.png")
        print("Captured panel0_airplane_settled.png")

        await browser.close()
        print("\nAll verifications finished!")

if __name__ == "__main__":
    asyncio.run(main())
