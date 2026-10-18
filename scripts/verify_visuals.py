import asyncio, time
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless=True,
            args=["--use-gl=angle", "--use-angle=metal", "--enable-webgl"]
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        
        print("Navigating to http://127.0.0.1:3000/...")
        await page.goto("http://127.0.0.1:3000/")
        
        # Wait for loader to disappear and WebGL intro to finish
        print("Waiting for page load and 3D engine intro...")
        await page.wait_for_timeout(6000)
        
        # Hero scene screenshot 1: Phrase 1
        path1 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/hero_scene_no_igloo_phase1.png"
        await page.screenshot(path=path1)
        print(f"Captured Hero Scene Phase 1: {path1}")
        
        # Wait for the loop transition to Phase 2 (approx 5.5s)
        print("Waiting for loop transition to Phase 2 (Building Artificial Collective Intelligence)...")
        await page.wait_for_timeout(6000)
        
        path2 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/hero_scene_no_igloo_phase2.png"
        await page.screenshot(path=path2)
        print(f"Captured Hero Scene Phase 2: {path2}")
        
        # Test Iceberg Click Readability
        print("Triggering iceberg project view...")
        await page.evaluate("() => { if (window.Q) window.Q.emit('webgl_project_show', 0); }")
        await page.wait_for_timeout(2000)
        path3 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/iceberg_readability_verified.png"
        await page.screenshot(path=path3)
        print(f"Captured Iceberg Readability: {path3}")
        
        # Close project view
        await page.evaluate("() => { if (window.Q) window.Q.emit('webgl_switch_scene', ''); }")
        await page.wait_for_timeout(1500)
        
        # Scroll to Aviation Particle Room
        print("Scrolling down to Aviation Aircraft room...")
        await page.evaluate("""() => {
            const ev = new WheelEvent('wheel', { deltaY: 3800 });
            window.dispatchEvent(ev);
        }""")
        await page.wait_for_timeout(3500)
        path4 = "/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/aircraft_particle_verified.png"
        await page.screenshot(path=path4)
        print(f"Captured Aircraft Particle Room: {path4}")
        
        await browser.close()
        print("All visual verifications captured successfully!")

if __name__ == "__main__":
    asyncio.run(run())
