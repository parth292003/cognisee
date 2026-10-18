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
        await page.wait_for_timeout(6000)

        # -------------------------------------------------------------
        # 1. VERIFY CRYSTAL DETAIL VIEW (IGLOO STYLE)
        # -------------------------------------------------------------
        print("Testing Crystal Detail View for Foundation 01...")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                ctrl.navigateToSection("project", "/portfolio/who-we-are", { project: "who-we-are" });
            }
        }""")
        await page.wait_for_timeout(4000)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/crystal_detail_who_we_are_clean.png")
        print("Saved crystal_detail_who_we_are_clean.png")

        # Test Foundation 02 Detail View
        print("Testing Crystal Detail View for Foundation 02...")
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                ctrl.navigateToSection("home");
            }
        }""")
        await page.wait_for_timeout(1500)
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                ctrl.navigateToSection("project", "/portfolio/what-we-are-solving", { project: "what-we-are-solving" });
            }
        }""")
        await page.wait_for_timeout(3500)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/crystal_detail_what_we_are_solving.png")
        print("Saved crystal_detail_what_we_are_solving.png")

        # Return to home
        await page.evaluate("""() => {
            const ctrl = window.__mainController;
            if (ctrl) {
                ctrl.navigateToSection("home");
            }
        }""")
        await page.wait_for_timeout(1500)

        # -------------------------------------------------------------
        # 2. STEP SMOOTHLY TO PARTICLE ROOM (9.8)
        # -------------------------------------------------------------
        print("Stepping scroll smoothly to 9.8...")
        await page.evaluate("""() => {
            return new Promise(resolve => {
                const step = () => {
                    const ctrl = window.__mainController;
                    if (ctrl.scroll.y < 9.8) {
                        ctrl.scroll.targetY2 = ctrl.scroll.y + 0.5;
                        requestAnimationFrame(step);
                    } else {
                        ctrl.scroll.targetY2 = 9.8;
                        resolve();
                    }
                };
                step();
            });
        }""")
        await page.wait_for_timeout(4000)

        st = await page.evaluate("""() => {
            const ctrl = window.__mainController;
            const uf = ctrl ? ctrl.scrollComposers[2].passes[0].scene : null;
            const pr = window.__particleRoom;
            return {
                scroll_y: ctrl ? ctrl.scroll.y : 0,
                uf_progress: uf ? uf.progress : 0,
                ui_enabled: pr && pr.UI ? pr.UI.enabled : false,
                currentLink: pr ? pr.currentLink : 0,
                videoCardVis: pr && pr.videoCard ? pr.videoCard.visible : false
            };
        }""")
        print("Reached particle room:", st)

        # Panel 0: Commercial Airplane
        await page.wait_for_timeout(3000)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_panel0_airplane_perfect.png")
        print("Saved final_panel0_airplane_perfect.png")

        # Panel 1: DNA
        await page.evaluate("""() => { window.__particleRoom.UI.changeLink(1); }""")
        await page.wait_for_timeout(3000)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_panel1_dna_perfect.png")
        print("Saved final_panel1_dna_perfect.png")

        # Panel 2: Building
        await page.evaluate("""() => { window.__particleRoom.UI.changeLink(1); }""")
        await page.wait_for_timeout(3000)
        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_panel2_building_perfect.png")
        print("Saved final_panel2_building_perfect.png")

        # Panel 3: YouTube
        await page.evaluate("""() => { window.__particleRoom.UI.changeLink(1); }""")
        await page.wait_for_timeout(3000)
        
        yt_state = await page.evaluate("""() => {
            const pr = window.__particleRoom;
            const overlay = document.getElementById("youtube-card-overlay");
            return {
                currentLink: pr?.currentLink,
                videoVisible: pr?.videoCard?.visible,
                videoAlpha: pr?.videoCardMat?.uniforms?.uAlpha?.value,
                overlayDisplay: overlay ? overlay.style.display : "not found",
                overlayHref: overlay ? overlay.href : ""
            };
        }""")
        print("YouTube Panel state:", yt_state)

        await page.screenshot(path="/Users/parthpaliwal/.gemini/antigravity/brain/2388fd2b-82f0-4e36-aca8-c3e5cf24c276/final_panel3_youtube_uninverted.png")
        print("Saved final_panel3_youtube_uninverted.png")

        await browser.close()
        print("All verifications completed successfully!")

if __name__ == "__main__":
    asyncio.run(main())
