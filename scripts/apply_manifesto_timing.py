import sys

def main():
    with open('public/App3D-d68cb154.js', 'r') as f:
        code = f.read()

    # Read the template for L3
    l3_start = code.find('class L3{')
    l3_end = code.find('class ', l3_start + 10)
    if l3_start == -1 or l3_end == -1:
        print('Error finding class L3')
        return

    # Extract existing shader code strings from L3 to ensure perfect consistency
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

    def patch(filePath):
        with open(filePath, 'r') as f:
            c = f.read()
        l3_s = c.find('class L3{')
        l3_e = c.find('class ', l3_s + 10)
        c = c[:l3_s] + new_l3 + c[l3_e:]

        target_intro = 'this.introTL.call(()=>{Q.emit("webgl_show_ui_intro")},null,4.5)'
        replacement_intro = 'this.introTL.call(()=>{Q.emit("webgl_show_ui_intro")},null,4.5),this.introTL.call(()=>{if(this.manifesto)this.manifesto.startAfterLandscape()},null,7.5)'
        if target_intro in c and 'startAfterLandscape()' not in c.split(target_intro)[1][:150]:
            c = c.replace(target_intro, replacement_intro, 1)

        with open(filePath, 'w') as f:
            f.write(c)
        print('Patched', filePath)

    patch('public/App3D-d68cb154.js')
    patch('public/assets/App3D-d68cb154.js')

if __name__ == '__main__':
    main()
