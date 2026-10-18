import os

with open('public/App3D-d68cb154.js', 'r') as f:
    text = f.read()

print('Original length:', len(text))

# 1. Update loadVDB for aircraft.bin
old_loadVDB_alt = 'if (name === "aircraft") return createAircraftVolume(40);'
old_loadVDB = 'if(name==="aircraft")return createAircraftVolume(40);'

new_loadVDB = '''if (name === "aircraft") {
    try {
      const res = await fetch("/volumes/aircraft.bin");
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const data = new Uint8Array(buf);
        const tex = new DA(data, 48, 48, 48);
        tex.format = 1023;
        tex.type = 1009;
        tex.needsUpdate = true;
        return tex;
      }
    } catch (e) {
      console.warn("Aircraft fetch error:", e);
    }
    return createAircraftVolume(48);
  }'''

if old_loadVDB_alt in text:
    text = text.replace(old_loadVDB_alt, new_loadVDB, 1)
    print('1. loadVDB replaced (alt)')
elif old_loadVDB in text:
    text = text.replace(old_loadVDB, new_loadVDB, 1)
    print('1. loadVDB replaced (standard)')
else:
    print('1. ERROR: loadVDB not found!')

# 2. Expand cylinder clamp in particle simulation
old_clamp = 'currentPos.xz = normalize(currentPos.xz) * clamp(length(currentPos.xz), 0.0, 0.275);'
new_clamp = 'currentPos.xz = normalize(currentPos.xz) * clamp(length(currentPos.xz), 0.0, 0.38);'
if old_clamp in text:
    text = text.replace(old_clamp, new_clamp, 1)
    print('2. Cylinder clamp replaced')
else:
    print('2. ERROR: clamp not found!')

# 3. Fix Yh shader fade margins so text is never clipped
old_fade = '''alpha *= smoothstep(-uFadeMargin, -uFadeMargin * 3.0, wPosY);
                        alpha *= smoothstep(-resolutionUI.y + uFadeMargin, -resolutionUI.y + uFadeMargin * 3.0, wPosY);'''
new_fade = '''alpha *= smoothstep(20.0, -20.0, wPosY);
                        alpha *= smoothstep(-resolutionUI.y - 10.0, -resolutionUI.y + 20.0, wPosY);'''
if old_fade in text:
    text = text.replace(old_fade, new_fade)
    print('3. Yh fade margins replaced')
else:
    print('3. ERROR: Yh fade not found!')

# 4. Hide igloo in U3, w3, C3, and F3
old_igloo_tl = 'this.introTL.set(this.igloo.mesh,{visible:!0},1.1)'
new_igloo_tl = 'this.introTL.set(this.igloo.mesh,{visible:!1},1.1)'
if old_igloo_tl in text:
    text = text.replace(old_igloo_tl, new_igloo_tl, 1)
    print('4. Igloo introTL set to false')
else:
    print('4. ERROR: old_igloo_tl not found!')

old_f3_update = '(e=this.manifesto)==null||e.update(this.progress,this._needsReset)'
new_f3_update = ';if(this.igloo&&this.igloo.mesh)this.igloo.mesh.visible=!1;if(this.igloocage&&this.igloocage.mesh)this.igloocage.mesh.visible=!1;if(this.igloooutline&&this.igloooutline.mesh)this.igloooutline.mesh.visible=!1;(e=this.manifesto)==null||e.update(this.progress,this._needsReset)'
if old_f3_update in text:
    text = text.replace(old_f3_update, new_f3_update, 1)
    print('4. F3 update hide igloo added')
else:
    print('4. ERROR: old_f3_update not found!')

# 5. Replace class zF with enhanced readable version with dark backdrop
pos_zF = text.find('class zF{')
pos_QF = text.find('class QF{', pos_zF)

if pos_zF != -1 and pos_QF != -1:
    new_zF = '''class zF{constructor({parent:e,index:t}={}){this.parent=e,this.scene=this.parent.scene,this.index=t,this.group=new Gi,this.group.name=`project-${this.index}`,this.group.visible=!1,this.parent.group.add(this.group),this.elements=[],this.width=560,this.scrollMargin=65,this.scrollMax=0,this.scrollY=0,this.scrollTargetY=0,this.ready=new Promise(s=>{this.isReady=s}),this.init()}async init(){const e=Be.cubes[this.index].interior,t={font:"IBMPlexMono-Medium",color:"#ffffff",width:560,align:"left",lineHeight:1.4,size:16,baseOffset:-.65};const bGeom=new kt(1,1);const bMat=new or({color:0x030708,transparent:!0,opacity:.92,depthTest:!1,depthWrite:!1});this.backdrop=new Ce(bGeom,bMat);this.backdrop.renderOrder=850;this.backdrop.visible=!1;this.group.add(this.backdrop);this.elements.push(new Yh({parent:this,text:e.title,options:{...t,color:Be.colorProjectTitle}}),new Yh({parent:this,text:e.content,options:{...t,color:Be.colorProjectText}}),new Yh({parent:this,text:e.socialTitle,options:{...t,color:Be.colorProjectTitle}}),new ey({parent:this,links:e.social,options:{...t,color:Be.colorProjectText}}),new Yh({parent:this,text:e.linkTitle,options:{...t,color:Be.colorProjectTitle}}),new ey({parent:this,links:e.links,options:{...t,color:Be.colorProjectText}}));this.group.add(...this.elements.map(s=>s.mesh));await Promise.all(this.elements.map(s=>s.ready));this.resize();this.isReady()}show(){this.group.visible=!0;if(this.backdrop)this.backdrop.visible=!0;this.scrollY=0;this.scrollTargetY=0;let e=0;this.elements.forEach((t,s)=>{var a;const n=!!t.text,r=n?t.text.length>100?.75:.25:.3;t.show(r,e);e+=n&&t.text.length>100?.3:.1;(a=t.interaction)==null||a.enable()})}hide(){if(this.backdrop)this.backdrop.visible=!1;Promise.all(this.elements.map((e,t)=>{var s;return(s=e.interaction)==null||s.disable(),e.hide()})).then(()=>{this.group.visible=!1})}update(){this.group.visible&&(this.scrollTargetY=ie.clamp(this.scrollTargetY,0,this.scrollMax),this.scrollY=ie.lerpFPS(this.scrollY,this.scrollTargetY,.1),this.group.position.y=this.scrollY,this.elements.forEach((e,t)=>{var s;(s=e.update)==null||s.call(e)}))}resize(){const e=this.scene.small?15:18,t=560,s=24;this.width=Math.min(q.screen.width-s*2,t);const n=22,r=Math.max(s,(q.screen.width-this.width)*.5);this.ready.then(()=>Promise.all(this.elements.map(a=>a.resize({size:e,width:this.width}))).then(()=>{const a=this.elements.reduce((c,h)=>c+h.mesh.size.y,0)+n*(this.elements.length-1);let o=0;if(this.scrollMax=Math.max(0,a-(q.screen.height-this.scrollMargin*4)),this.scrollMax>0){o=this.scrollMargin*2;const c=this.scrollMax===0?0:this.scrollY/this.scrollMax;this.scrollY=c*this.scrollMax;this.scrollTargetY=this.scrollY}else o=(q.screen.height-a)*.5,this.scrollY=0,this.scrollTargetY=0;let l=o;this.elements.forEach(c=>{c.mesh.position.set(r,-l,0);l+=c.mesh.size.y+n});if(this.backdrop){this.backdrop.scale.set(this.width+56,a+64,1);this.backdrop.position.set(r+this.width*.5,-o-a*.5,-1)}}))}setMouseSim(e){this.elements.forEach(t=>{t.els?t.els.forEach(s=>{s.mesh.material.uniforms.tSim.value=e.finalRT.texture,s.icon.material.uniforms.tSim.value=e.finalRT.texture}):t.mesh.material.uniforms.tSim.value=e.finalRT.texture})}}'''
    text = text[:pos_zF] + new_zF + text[pos_QF:]
    print('5. zF replaced successfully')
else:
    print('5. ERROR: zF bounds not found!')

# 6. Replace class L3 with continuous looping cryptic manifesto
pos_L3 = text.find('class L3{')
pos_F3 = text.find('class F3', pos_L3)

if pos_L3 != -1 and pos_F3 != -1:
    new_L3 = '''class L3{constructor(e){this.scene=e;this.ready=new Promise(t=>{this.isReady=t});this.options={manifestoWidth:.85,copyrightWidth:.9,align:"right",lineHeight:.85,size:.088};this.canBeShown=!1;this.visible=!1;this.hasBeenShownOnce=!1;this.isLooping=!1;this.loopTimeout=null;this.init()}async init(){const createShader=(color)=>({uniforms:{tMap:{value:le.load("../fonts/IBMPlexMono-Medium-datatexture.ktx2","data")},uColor:{value:new Z(color)},uShow1:{value:0},uShow2:{value:0},uBlink:{value:1}},vertexShader:`${Nt}${Ue}attribute vec3 textWeights;uniform float uShow1;uniform float uShow2;varying vec2 vUv;varying float vAlpha;void main(){float tr1=falloff(textWeights.x,0.0,1.0,0.1,clamp(uShow1,0.0,1.0));float tr2=falloff(textWeights.x,0.0,1.0,1.0,clamp(uShow2,0.0,1.0));vUv=uv;vUv.x=mod(uv.x+0.125*mod(floor((1.0-tr2)*5.753),8.0),1.0);vAlpha=tr1;gl_Position=projectionMatrix*viewMatrix*billboardModelMatrix()*vec4(position,1.0);}`,fragmentShader:`${ii}${Ht}${Ue}uniform sampler2D tMap;uniform vec3 uColor;uniform float uBlink;varying vec2 vUv;varying float vAlpha;void main(){vec2 uv=vUv;float alpha=vAlpha;if(uBlink<1.0)alpha*=0.6+0.4*mod(floor(uBlink*5.0),2.0);alpha*=msdf(tMap,uv);gl_FragColor=vec4(uColor,alpha);}`,depthWrite:!1,depthTest:!1});this.title=new Ui({font:"IBMPlexMono-Medium",text:"////// Frontier AI Lab",width:this.options.manifestoWidth,align:this.options.align,lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorTitle));this.title.name="title1";this.title.frustumCulled=!1;this.title.renderOrder=999;this.scene.add(this.title);this.text=new Ui({font:"IBMPlexMono-Medium",text:"Cognisee is a frontier AI lab",width:this.options.manifestoWidth,align:this.options.align,lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorText));this.text.name="text1";this.text.frustumCulled=!1;this.text.renderOrder=999;this.scene.add(this.text);this.title2=new Ui({font:"IBMPlexMono-Medium",text:"////// Collective Intelligence",width:this.options.manifestoWidth,align:this.options.align,lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorTitle));this.title2.name="title2";this.title2.frustumCulled=!1;this.title2.renderOrder=999;this.title2.visible=!1;this.scene.add(this.title2);this.text2=new Ui({font:"IBMPlexMono-Medium",text:"Building Artificial Collective Intelligence for humanity",width:this.options.manifestoWidth,align:this.options.align,lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorText));this.text2.name="text2";this.text2.frustumCulled=!1;this.text2.renderOrder=999;this.text2.visible=!1;this.scene.add(this.text2);this.copyright=new Ui({font:"IBMPlexMono-Medium",text:Be.copyright,width:this.options.copyrightWidth,align:"left",lineHeight:this.options.lineHeight,size:this.options.size},createShader(Be.colorTitle));this.copyright.name="copyright";this.copyright.frustumCulled=!1;this.copyright.renderOrder=999;this.scene.add(this.copyright);this.rights=new Ui({font:"IBMPlexMono-Medium",text:Be.rights,width:this.options.copyrightWidth,align:"left",lineHeight:this.options.lineHeight+.15,size:this.options.size},createShader(Be.colorText));this.rights.name="rights";this.rights.frustumCulled=!1;this.rights.renderOrder=999;this.scene.add(this.rights);await Promise.all([this.title.ready,this.text.ready,this.title2.ready,this.text2.ready,this.copyright.ready,this.rights.ready]);Q.on("webgl_hover_logo",this.blinkAnimation,this);Q.once("webgl_show_ui_intro",()=>{this.canBeShown=!0});this.scene.beforeRenderCbs.push(this.render.bind(this));this.isReady()}render(){const e=q.screen.width<Be.breakpointW||q.screen.height<Be.breakpointH,t=q.screen.width<Be.breakPointMobile||q.screen.height<Be.breakPointMobile,s=t?175:e?200:250,n=s,r=t?Be.gridSizeMobile:e?Be.gridSizeLow:Be.gridSize,a=t?Be.topMarginMobile:e?Be.topMarginLow:Be.topMargin;Si.positionUI({camera:this.scene.camera,mesh:this.title,x:q.screen.width-r,y:a+this.title.size.y*.75*n,width:s,height:n});Si.positionUI({camera:this.scene.camera,mesh:this.text,x:q.screen.width-r,y:a+this.title.size.y*2.25*n,width:s,height:n});if(this.title2)Si.positionUI({camera:this.scene.camera,mesh:this.title2,x:q.screen.width-r,y:a+this.title2.size.y*.75*n,width:s,height:n});if(this.text2)Si.positionUI({camera:this.scene.camera,mesh:this.text2,x:q.screen.width-r,y:a+this.title2.size.y*2.25*n,width:s,height:n});const l=(e?160:200)*.21,c=a+l+this.copyright.size.y*1.25*s;Si.positionUI({camera:this.scene.camera,mesh:this.copyright,x:r,y:c,width:s,height:s});Si.positionUI({camera:this.scene.camera,mesh:this.rights,x:r,y:c+this.copyright.size.y*1.5*s,width:s,height:s})}hide(){if(this.visible){this.visible=!1;if(this.loopTimeout)clearTimeout(this.loopTimeout);this.isLooping=!1;[this.title,this.text,this.title2,this.text2,this.copyright,this.rights].forEach(e=>{if(e){re.set(e.material.uniforms.uShow1,{value:0,overwrite:!0});re.set(e.material.uniforms.uShow2,{value:0,overwrite:!0});e.visible=!1}})}}show(){if(this.visible)return;this.visible=!0;[this.copyright,this.rights].forEach((e,t)=>{e.visible=!0;let s=this.hasBeenShownOnce?t*.15:.75+t*.2;re.fromTo(e.material.uniforms.uShow1,{value:0},{delay:s,value:1,duration:.6,ease:"sine.out",overwrite:!0});re.fromTo(e.material.uniforms.uShow2,{value:0},{delay:s,value:1,duration:.9,ease:"sine.out",overwrite:!0})});this.hasBeenShownOnce=!0;this.startManifestoLoop()}startManifestoLoop(){if(this.isLooping)return;this.isLooping=!0;const runPhase=(phase)=>{if(!this.visible){this.isLooping=!1;return}const curTitle=phase===0?this.title:this.title2,curText=phase===0?this.text:this.text2,oldTitle=phase===0?this.title2:this.title,oldText=phase===0?this.text2:this.text;if(oldTitle){oldTitle.visible=!1;re.set(oldTitle.material.uniforms.uShow1,{value:0});re.set(oldTitle.material.uniforms.uShow2,{value:0})}if(oldText){oldText.visible=!1;re.set(oldText.material.uniforms.uShow1,{value:0});re.set(oldText.material.uniforms.uShow2,{value:0})}curTitle.visible=!0;curText.visible=!0;Q.emit("webgl_play_audio","manifesto");re.fromTo(curTitle.material.uniforms.uShow1,{value:0},{value:1,duration:.45,ease:"sine.out",overwrite:!0});re.fromTo(curTitle.material.uniforms.uShow2,{value:0},{value:1,duration:.75,ease:"sine.out",overwrite:!0});re.fromTo(curText.material.uniforms.uShow1,{value:0},{delay:.12,value:1,duration:.55,ease:"sine.out",overwrite:!0});re.fromTo(curText.material.uniforms.uShow2,{value:0},{delay:.12,value:1,duration:.85,ease:"sine.out",overwrite:!0});this.loopTimeout=setTimeout(()=>{if(!this.visible){this.isLooping=!1;return}Q.emit("webgl_play_audio","ui-short");re.fromTo(curTitle.material.uniforms.uShow2,{value:1},{value:0,duration:.4,ease:"sine.in",overwrite:!0});re.fromTo(curTitle.material.uniforms.uShow1,{value:1},{value:0,duration:.35,ease:"sine.in",overwrite:!0});re.fromTo(curText.material.uniforms.uShow2,{value:1},{value:0,duration:.45,ease:"sine.in",overwrite:!0});re.fromTo(curText.material.uniforms.uShow1,{value:1},{value:0,duration:.4,ease:"sine.in",overwrite:!0,onComplete:()=>{curTitle.visible=!1;curText.visible=!1}});this.loopTimeout=setTimeout(()=>{if(!this.visible){this.isLooping=!1;return}runPhase(phase===0?1:0)},2500)},3200)};runPhase(0)}blinkAnimation(){[this.copyright,this.rights].forEach((e,t)=>{re.fromTo(e.material.uniforms.uBlink,{value:0},{value:1,delay:t*.1,duration:.1,ease:"none",overwrite:!0})})}update(e,t){(t||e<.15)&&this.hide();this.canBeShown&&e>.25&&e<.8&&this.show()}}'''
    text = text[:pos_L3] + new_L3 + text[pos_F3:]
    print('6. L3 replaced successfully')
else:
    print('6. ERROR: L3 bounds not found!')

with open('public/App3D-d68cb154.js', 'w') as f:
    f.write(text)

with open('public/assets/App3D-d68cb154.js', 'w') as f:
    f.write(text)

print('Updated both public/App3D-d68cb154.js and public/assets/App3D-d68cb154.js successfully!')
