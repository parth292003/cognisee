import math

# 1. Build the JS code for createAviationAircraftModel
def generate_aircraft_js():
    verts = []
    indices = []
    lines = []
    
    def add_quad(p1, p2, p3, p4, add_line=True):
        indices.extend([p1, p2, p3, p1, p3, p4])
        if add_line:
            lines.extend([p1, p2, p2, p3, p3, p4, p4, p1])

    # 1. Fuselage
    z_coords = [0.75, 0.70, 0.60, 0.45, 0.25, 0.05, -0.15, -0.35, -0.48, -0.60, -0.70, -0.76]
    ring_segs = 16
    rings = []
    for z in z_coords:
        if z >= 0.45:
            r = 0.125 * math.sqrt(max(0.0, 1.0 - ((z - 0.45) / 0.30)**2))
        elif z >= -0.35:
            r = 0.125
        else:
            r = 0.125 * (1.0 - ((-0.35 - z) / 0.41))
        ring = []
        for s in range(ring_segs):
            ang = s * (2.0 * math.pi / ring_segs)
            x = r * math.cos(ang)
            y = r * math.sin(ang)
            ring.append(len(verts) // 3)
            verts.extend([round(x, 4), round(y, 4), round(z, 4)])
        rings.append(ring)
        for s in range(ring_segs):
            lines.extend([ring[s], ring[(s + 1) % ring_segs]])
            
    for r in range(len(rings) - 1):
        for s in range(ring_segs):
            s_next = (s + 1) % ring_segs
            p00, p01 = rings[r][s], rings[r][s_next]
            p10, p11 = rings[r+1][s], rings[r+1][s_next]
            indices.extend([p00, p10, p01, p01, p10, p11])
            lines.extend([p00, p10])

    # 2. Left & Right Swept Wings
    for side in [1, -1]:
        x0, y0 = side * 0.11, -0.01
        x1, y1 = side * 0.38, 0.02
        x2, y2 = side * 0.85, 0.06
        x3, y3 = side * 0.88, 0.16
        
        stations = [
            (x0, y0,  0.25, -0.22, 0.045),
            (x1, y1,  0.02, -0.28, 0.035),
            (x2, y2, -0.24, -0.38, 0.022),
            (x3, y3, -0.28, -0.40, 0.012)
        ]
        
        station_pts = []
        for sx, sy, zl, zt, th in stations:
            idx_start = len(verts) // 3
            verts.extend([
                round(sx, 4), round(sy + th * 0.6, 4), round(zl, 4),
                round(sx, 4), round(sy + th * 0.2, 4), round(zt, 4),
                round(sx, 4), round(sy - th * 0.4, 4), round(zt, 4),
                round(sx, 4), round(sy - th * 0.4, 4), round(zl, 4)
            ])
            station_pts.append(list(range(idx_start, idx_start + 4)))
            lines.extend([
                idx_start, idx_start + 1,
                idx_start + 1, idx_start + 2,
                idx_start + 2, idx_start + 3,
                idx_start + 3, idx_start
            ])
            
        for st in range(len(station_pts) - 1):
            sA = station_pts[st]
            sB = station_pts[st + 1]
            add_quad(sA[0], sB[0], sB[1], sA[1])
            add_quad(sA[3], sA[2], sB[2], sB[3])
            add_quad(sA[0], sA[3], sB[3], sB[0])
            add_quad(sA[1], sB[1], sB[2], sA[2])

    # 3. Two Jet Engines under wings
    for side in [1, -1]:
        ex, ey = side * 0.36, -0.11
        er = 0.055
        for ez in [0.12, 0.04, -0.06, -0.16]:
            for es in range(8):
                e_ang = es * (2.0 * math.pi / 8)
                verts.extend([
                    round(ex + er * math.cos(e_ang), 4),
                    round(ey + er * math.sin(e_ang), 4),
                    round(ez, 4)
                ])
        eng_start = len(verts) // 3 - 32
        for er_idx in range(3):
            r1 = eng_start + er_idx * 8
            r2 = r1 + 8
            for es in range(8):
                es_next = (es + 1) % 8
                p00, p01 = r1 + es, r1 + es_next
                p10, p11 = r2 + es, r2 + es_next
                indices.extend([p00, p10, p01, p01, p10, p11])
                lines.extend([p00, p01, p00, p10])

    # 4. Swept Vertical Tail Fin
    fin_root = len(verts) // 3
    verts.extend([
        0.0, 0.12, -0.32,
        0.0, 0.12, -0.72,
        0.0, 0.52, -0.66,
        0.0, 0.52, -0.52
    ])
    indices.extend([fin_root, fin_root+1, fin_root+2, fin_root, fin_root+2, fin_root+3])
    lines.extend([
        fin_root, fin_root+1,
        fin_root+1, fin_root+2,
        fin_root+2, fin_root+3,
        fin_root+3, fin_root
    ])

    # 5. Horizontal Stabilizers
    for side in [1, -1]:
        h_root = len(verts) // 3
        verts.extend([
            round(side * 0.05, 4), 0.04, -0.52,
            round(side * 0.05, 4), 0.04, -0.72,
            round(side * 0.40, 4), 0.07, -0.76,
            round(side * 0.38, 4), 0.07, -0.64
        ])
        indices.extend([h_root, h_root+1, h_root+2, h_root, h_root+2, h_root+3])
        lines.extend([
            h_root, h_root+1,
            h_root+1, h_root+2,
            h_root+2, h_root+3,
            h_root+3, h_root
        ])

    js = f"""
function createAviationAircraftModel(scale = 0.45) {{
  const group = new Gi();
  group.name = "aviation_aircraft_model";

  const rawVerts = {verts};
  const rawIndices = {indices};
  const rawLines = {lines};

  const pos = new Float32Array(rawVerts.length);
  for (let i = 0; i < rawVerts.length; i++) {{
    pos[i] = rawVerts[i] * scale;
  }}

  // 1. Mesh Surface (Holographic translucent matte skin)
  const meshGeo = new ot();
  meshGeo.setAttribute("position", new We(pos, 3));
  meshGeo.setIndex(rawIndices);
  meshGeo.computeVertexNormals();

  const meshMat = new or({{
    color: new Z("#253549"),
    transparent: true,
    opacity: 0.72,
    wireframe: false,
    side: 2
  }});
  const planeMesh = new Ce(meshGeo, meshMat);
  planeMesh.renderOrder = 8;
  group.add(planeMesh);

  // 2. Airframe Wireframe Structural Lines (Luminescent high-contrast glow)
  const linePos = new Float32Array(rawLines.length * 3);
  for (let i = 0; i < rawLines.length; i++) {{
    const vi = rawLines[i];
    linePos[i * 3 + 0] = pos[vi * 3 + 0];
    linePos[i * 3 + 1] = pos[vi * 3 + 1];
    linePos[i * 3 + 2] = pos[vi * 3 + 2];
  }}

  const lineGeo = new ot();
  lineGeo.setAttribute("position", new We(linePos, 3));
  const lineMat = new ga({{
    color: new Z("#d8efff"),
    transparent: true,
    opacity: 0.92,
    linewidth: 1.5
  }});
  const planeLines = new yr(lineGeo, lineMat);
  planeLines.renderOrder = 9;
  group.add(planeLines);

  group._mesh = planeMesh;
  group._lines = planeLines;
  return group;
}}
"""
    return js

def patch_file(filepath):
    with open(filepath, 'r') as f:
        code = f.read()

    # 1. Inject createAviationAircraftModel before class wF
    aircraft_fn = generate_aircraft_js()
    target_wf = "class wF{"
    if "function createAviationAircraftModel" not in code:
        code = code.replace(target_wf, aircraft_fn + "\n" + target_wf)
        print(f"{filepath}: Injected createAviationAircraftModel")

    # 2. Add plane to wF.init() and update in wF.update()
    old_wf_add = 'this.scene.add(this.mesh),this.initializeShape()'
    new_wf_add = 'this.scene.add(this.mesh);this.plane=createAviationAircraftModel(0.44);this.plane.position.set(0,-9.785,0);this.scene.add(this.plane);this.initializeShape()'
    if old_wf_add in code:
        code = code.replace(old_wf_add, new_wf_add)
        print(f"{filepath}: Added 3D airplane model to wF scene at (0, -9.785, 0)")

    old_wf_rot = 'this.mesh.computationMaterial.uniforms.uRotation.value-=Fe.delta*75e-5'
    new_wf_rot = 'this.mesh.computationMaterial.uniforms.uRotation.value-=Fe.delta*75e-5,(this.plane&&(this.plane.rotation.y=-this.mesh.computationMaterial.uniforms.uRotation.value))'
    if old_wf_rot in code and 'this.plane.rotation.y' not in code:
        code = code.replace(old_wf_rot, new_wf_rot)
        print(f"{filepath}: Synchronized airplane rotation with particle vortex")

    # 3. Update L3: Clean text, smaller font, no black header, delayed appearance after landscape is defined
    s1 = '${Nt}${Ue}attribute vec3 textWeights;uniform float uShow1;uniform float uShow2;varying vec2 vUv;varying float vAlpha;void main(){float tr1=falloff(textWeights.x,0.0,1.0,0.1,clamp(uShow1,0.0,1.0));float tr2=falloff(textWeights.x,0.0,1.0,1.0,clamp(uShow2,0.0,1.0));vUv=uv;vUv.x=mod(uv.x+0.125*mod(floor((1.0-tr2)*5.753),8.0),1.0);vAlpha=tr1;gl_Position=projectionMatrix*viewMatrix*billboardModelMatrix()*vec4(position,1.0);}'
    s2 = '${ii}${Ht}${Ue}uniform sampler2D tMap;uniform vec3 uColor;uniform float uBlink;varying vec2 vUv;varying float vAlpha;void main(){vec2 uv=vUv;float alpha=vAlpha;if(uBlink<1.0)alpha*=0.6+0.4*mod(floor(uBlink*5.0),2.0);alpha*=msdf(tMap,uv);gl_FragColor=vec4(uColor,alpha);}'

    new_l3 = (
        'class L3{constructor(e){this.scene=e;window.__manifesto=this;this.ready=new Promise(t=>{this.isReady=t});'
        'this.options={manifestoWidth:2.2,copyrightWidth:.9,align:"center",lineHeight:1.15,size:.125};'
        'this.landscapeReady=!1;this.canBeShown=!1;this.visible=!1;this.hasBeenShownOnce=!1;this.isLooping=!1;this.loopTimeout=null;this.init()}'
        'async init(){'
        'const createShader=(color)=>({uniforms:{tMap:{value:le.load("../fonts/IBMPlexMono-Medium-datatexture.ktx2","data")},uColor:{value:new Z(color)},uShow1:{value:0},uShow2:{value:0},uBlink:{value:1}},'
        'vertexShader:`' + s1 + '`,fragmentShader:`' + s2 + '`,depthWrite:!1,depthTest:!1});'
        'this.text=new Ui({font:"IBMPlexMono-Medium",text:"Cognisee is a frontier AI lab",width:this.options.manifestoWidth,align:"center",lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorText));'
        'this.text.name="text1";this.text.frustumCulled=!1;this.text.renderOrder=999;this.text.visible=!1;this.scene.add(this.text);'
        'this.text2=new Ui({font:"IBMPlexMono-Medium",text:"Building Artificial Collective Intelligence for humanity",width:this.options.manifestoWidth,align:"center",lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorText));'
        'this.text2.name="text2";this.text2.frustumCulled=!1;this.text2.renderOrder=999;this.text2.visible=!1;this.scene.add(this.text2);'
        'this.copyright=new Ui({font:"IBMPlexMono-Medium",text:Be.copyright,width:this.options.copyrightWidth,align:"left",lineHeight:this.options.lineHeight,size:.085},createShader(Be.colorTitle));'
        'this.copyright.name="copyright";this.copyright.frustumCulled=!1;this.copyright.renderOrder=999;this.scene.add(this.copyright);'
        'this.rights=new Ui({font:"IBMPlexMono-Medium",text:Be.rights,width:this.options.copyrightWidth,align:"left",lineHeight:this.options.lineHeight+.15,size:.085},createShader(Be.colorText));'
        'this.rights.name="rights";this.rights.frustumCulled=!1;this.rights.renderOrder=999;this.scene.add(this.rights);'
        'await Promise.all([this.text.ready,this.text2.ready,this.copyright.ready,this.rights.ready]);'
        'Q.on("webgl_hover_logo",this.blinkAnimation,this);'
        'Q.once("webgl_show_ui_intro",()=>{setTimeout(()=>{this.startAfterLandscape()},2400)});'
        'setTimeout(()=>{if(!this.landscapeReady)this.startAfterLandscape()},7500);'
        'this.scene.beforeRenderCbs.push(this.render.bind(this));this.isReady()}'
        'render(){const screenW=q.screen.width,screenH=q.screen.height,isMobile=screenW<Be.breakPointMobile||screenH<Be.breakPointMobile,isSmall=screenW<Be.breakpointW||screenH<Be.breakpointH,s=isMobile?340:isSmall?540:740,n=s,centerX=screenW*.5,centerY=screenH*.40;'
        'Si.positionUI({camera:this.scene.camera,mesh:this.text,x:centerX,y:centerY,width:s,height:n});'
        'if(this.text2)Si.positionUI({camera:this.scene.camera,mesh:this.text2,x:centerX,y:centerY,width:s,height:n});'
        'const r=isMobile?Be.gridSizeMobile:isSmall?Be.gridSizeLow:Be.gridSize,a=isMobile?Be.topMarginMobile:isSmall?Be.topMarginLow:Be.topMargin,l=(isSmall?160:200)*.21,c=a+l+this.copyright.size.y*1.25*200;'
        'Si.positionUI({camera:this.scene.camera,mesh:this.copyright,x:r,y:c,width:200,height:200});'
        'Si.positionUI({camera:this.scene.camera,mesh:this.rights,x:r,y:c+this.copyright.size.y*1.5*200,width:200,height:200})}'
        'startAfterLandscape(){this.landscapeReady=!0;this.canBeShown=!0;this.show()}'
        'hide(){if(this.visible){this.visible=!1;if(this.loopTimeout)clearTimeout(this.loopTimeout);this.isLooping=!1;'
        '[this.text,this.text2,this.copyright,this.rights].forEach(e=>{if(e){re.set(e.material.uniforms.uShow1,{value:0,overwrite:!0});re.set(e.material.uniforms.uShow2,{value:0,overwrite:!0});e.visible=!1}})}}'
        'show(){if(!this.landscapeReady||this.visible)return;this.visible=!0;'
        '[this.copyright,this.rights].forEach((e,t)=>{e.visible=!0;let s=this.hasBeenShownOnce?t*.15:.75+t*.2;'
        're.fromTo(e.material.uniforms.uShow1,{value:0},{delay:s,value:1,duration:.6,ease:"sine.out",overwrite:!0});'
        're.fromTo(e.material.uniforms.uShow2,{value:0},{delay:s,value:1,duration:.9,ease:"sine.out",overwrite:!0})});'
        'this.hasBeenShownOnce=!0;this.startManifestoLoop()}'
        'startManifestoLoop(){if(this.isLooping)return;this.isLooping=!0;'
        'const runPhase=(phase)=>{if(!this.visible){this.isLooping=!1;return}'
        'const curText=phase===0?this.text:this.text2,oldText=phase===0?this.text2:this.text;'
        'if(oldText){oldText.visible=!1;re.set(oldText.material.uniforms.uShow1,{value:0});re.set(oldText.material.uniforms.uShow2,{value:0})}'
        'curText.visible=!0;Q.emit("webgl_play_audio","manifesto");'
        're.fromTo(curText.material.uniforms.uShow1,{value:0},{value:1,duration:.55,ease:"sine.out",overwrite:!0});'
        're.fromTo(curText.material.uniforms.uShow2,{value:0},{value:1,duration:.85,ease:"sine.out",overwrite:!0});'
        'this.loopTimeout=setTimeout(()=>{if(!this.visible){this.isLooping=!1;return}'
        'Q.emit("webgl_play_audio","ui-short");'
        're.fromTo(curText.material.uniforms.uShow2,{value:1},{value:0,duration:.45,ease:"sine.in",overwrite:!0});'
        're.fromTo(curText.material.uniforms.uShow1,{value:1},{value:0,duration:.4,ease:"sine.in",overwrite:!0,onComplete:()=>{curText.visible=!1}});'
        'this.loopTimeout=setTimeout(()=>{if(!this.visible){this.isLooping=!1;return}runPhase(phase===0?1:0)},2300)},3400)};'
        'runPhase(0)}'
        'blinkAnimation(){[this.copyright,this.rights].forEach((e,t)=>{re.fromTo(e.material.uniforms.uBlink,{value:0},{value:1,delay:t*.1,duration:.1,ease:"none",overwrite:!0})})}'
        'update(e,t){(t||e<.15||e>.85)&&this.hide();if(this.landscapeReady&&e>=.15&&e<=.85){this.show()}}}'
    )

    l3_start = code.find('class L3{')
    l3_end = code.find('class ', l3_start + 10)
    if l3_start != -1 and l3_end != -1:
        code = code[:l3_start] + new_l3 + code[l3_end:]
        print(f"{filepath}: Updated L3 manifesto class")

    # 4. Hide igloobase / remove black podium completely
    old_igloobase = 'this.mesh=new Ce(e,t),this.mesh.name="igloobase"'
    new_igloobase = 'this.mesh=new Ce(e,t),this.mesh.name="igloobase",this.mesh.visible=!1,this.mesh.position.set(0,-9999,0)'
    if old_igloobase in code:
        code = code.replace(old_igloobase, new_igloobase)
        print(f"{filepath}: Banished igloobase (black podium) completely")

    with open(filepath, 'w') as f:
        f.write(code)

patch_file('public/App3D-d68cb154.js')
patch_file('public/assets/App3D-d68cb154.js')
print("Complete patch applied successfully!")
