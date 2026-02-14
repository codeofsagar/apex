export const noiseHelperFunctions = `
  float hash(float n) { return fract(sin(n) * 43758.5453); }
  float hash3D(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 p = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + p.z * 113.0;
    return mix(mix(mix(hash(n), hash(n+1.0), f.x), mix(hash(n+57.0), hash(n+58.0), f.x), f.y),
               mix(mix(hash(n+113.0), hash(n+114.0), f.x), mix(hash(n+170.0), hash(n+171.0), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v=0.0, a=0.5, freq=1.0;
    for(int i=0;i<5;i++){v+=a*noise(p*freq);freq*=2.0;a*=0.5;} return v;
  }
  float fbm_improved(vec3 p) {
    float v=0.0, a=0.5, freq=1.0;
    vec3 w=vec3(fbm(p+vec3(0,23.4,12.7)),fbm(p+vec3(41.2,0,89.3)),fbm(p+vec3(16.8,33.5,0)))*0.3;
    p+=w;
    for(int i=0;i<5;i++){v+=a*noise(p*freq);freq*=2.1;a*=0.5;p=vec3(p.y+p.z,p.z-p.x,p.x+p.y)*0.7;} return v;
  }
  float voronoi(vec3 p) {
    vec3 i=floor(p),f=fract(p); float d=1.0;
    for(int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) for(int z=-1;z<=1;z++){
      vec3 nb=vec3(float(x),float(y),float(z)); d=min(d,length(nb+hash3D(i+nb)-f));
    } return d;
  }
`;

export const electricVertexShader = `
  uniform float time; uniform vec2 mouse; uniform float mouseInfluence;
  uniform float electricIntensity; uniform float arcFrequency; uniform vec3 themeColors[5];
  varying vec3 vPosition; varying vec3 vNormal; varying float vIntensity; varying float vDistFromMouse; varying vec2 vUv;
  ${noiseHelperFunctions}
  void main() {
    vec3 pos = position; vNormal = normal; vUv = uv;
    float wave = sin(position.x*2.0+time*1.5)*cos(position.y*2.0+time*1.2)*sin(position.z*2.0+time)*0.4
      + sin(position.x*3.0-time*1.6)*cos(position.y*3.0-time*1.3)*sin(position.z*3.0-time*0.9)*0.3
      + sin(position.x*8.0+time*3.0)*cos(position.y*7.0+time*2.5)*sin(position.z*9.0+time*3.5)*0.1
      + fbm_improved(vec3(position.x*2.5+time*0.7,position.y*2.5-time*0.8,position.z*2.5+time*0.6))*0.15;
    float arcNoise = fbm(vec3(position.x*5.0+time*3.0,position.y*5.0+time*2.0,position.z*5.0+time*4.0));
    float voronoiP = voronoi(vec3(position.x*4.0+time,position.y*4.0-time*1.2,position.z*4.0+time*0.9));
    arcNoise = mix(arcNoise, 1.0-voronoiP, 0.4);
    float electricDistortion = fbm_improved(vec3(position.x*3.0-time*2.0,position.y*4.0+time*1.5,position.z*3.0-time*1.8));
    float arcEffect = 0.0;
    float arcThreshold = mix(0.65, 0.55, arcFrequency*0.5);
    if(arcNoise>arcThreshold){ arcEffect = smoothstep(arcThreshold,arcThreshold+0.2,arcNoise)*arcFrequency*2.0; }
    float jumpThreshold = 0.97-arcFrequency*0.3;
    float jumpChance = hash(floor(time*10.0)+length(position)*20.0);
    if(jumpChance>jumpThreshold){ arcEffect += (jumpChance-jumpThreshold)/(1.0-jumpThreshold)*arcFrequency*2.0; }
    vec3 mousePos = vec3(mouse.x,mouse.y,0.0)*5.0;
    float dist = length(pos-mousePos); vDistFromMouse = dist;
    float ripple1 = sin(dist*3.0-time*15.0)*mouseInfluence;
    float ripple2 = sin(dist*6.0-time*18.0)*mouseInfluence*0.6;
    float ripple3 = sin(dist*9.0-time*12.0)*mouseInfluence*0.3;
    float falloff = smoothstep(5.0,0.2,dist);
    float combinedRipple = (ripple1+ripple2+ripple3)*falloff;
    vec3 pullDir = normalize(mousePos-pos);
    float pullStrength = mouseInfluence*smoothstep(4.0,0.0,dist)*0.7;
    if(mouseInfluence>0.5 && dist<1.5){
      pullStrength += (sin(time*30.0+position.x*20.0)*0.5+0.5)*0.08*mouseInfluence*(1.0-dist/1.5);
    }
    pos += normal*(wave*0.2*electricIntensity);
    pos += normal*(arcEffect*0.5*electricIntensity);
    pos += normal*(electricDistortion*0.15*electricIntensity);
    pos += normal*fbm(vec3(position.x*6.0+time*2.5,position.y*6.0-time*3.0,position.z*6.0+time*2.0))*0.08*electricIntensity;
    pos += normal*(combinedRipple*0.8);
    pos += pullDir*pullStrength;
    vIntensity = wave*0.5+0.5+arcEffect*2.5+abs(combinedRipple)+electricDistortion*0.5+sin(time*2.0)*0.1*electricIntensity;
    vPosition = pos;
    gl_Position = projectionMatrix*modelViewMatrix*vec4(pos,1.0);
  }
`;

export const electricFragmentShader = `
  uniform float time; uniform float mouseInfluence; uniform float electricIntensity;
  uniform float glowStrength; uniform float arcFrequency; uniform vec3 themeColors[5];
  varying vec3 vPosition; varying vec3 vNormal; varying float vIntensity; varying float vDistFromMouse; varying vec2 vUv;
  ${noiseHelperFunctions}
  void main() {
    vec3 deepColor=themeColors[0],baseColor=themeColors[1],mainColor=themeColors[2],accentColor=themeColors[3],highlightColor=themeColors[4];
    float t1=sin(time*0.7)*0.5+0.5, t2=sin(time*0.5+1.5)*0.5+0.5, t3=sin(time*1.3+0.7)*0.5+0.5;
    float noisePattern = fbm_improved(vec3(vPosition.x*3.0+time,vPosition.y*3.0-time*0.7,vPosition.z*3.0+time*1.2));
    float pulse=sin(time*3.0+vPosition.x*0.5)*0.5+0.5, fastPulse=sin(time*15.0+vPosition.y*0.8)*0.5+0.5;
    float arcTravel1=sin(vPosition.x*12.0+vPosition.y*12.0+time*8.0);
    float arcTravel2=sin(vPosition.y*8.0+vPosition.z*8.0+time*5.6);
    float arcTravel3=sin(vPosition.x*6.0+vPosition.z*10.0+time*12.0);
    float branchPattern=voronoi(vec3(vPosition.x*5.0+time*2.0,vPosition.y*5.0-time*1.5,vPosition.z*5.0+time*2.5));
    float arc1=smoothstep(0.7,0.9,arcTravel1)*smoothstep(0.9,0.7,arcTravel1);
    float arc2=smoothstep(0.6,0.8,arcTravel2)*smoothstep(0.8,0.6,arcTravel2);
    float arc3=smoothstep(0.75,0.85,arcTravel3)*smoothstep(0.85,0.75,arcTravel3);
    float arcMix=max(max(arc1,arc2),arc3);
    float arc=mix(arcMix,1.0-branchPattern,0.3)*electricIntensity*arcFrequency*2.0;
    float nodeEffect=0.0; vec3 normPos=normalize(vPosition);
    float xF=abs(normPos.x),yF=abs(normPos.y),zF=abs(normPos.z);
    float nodeFactor=voronoi(vPosition*5.0+time*0.5);
    if((xF>0.95||yF>0.95||zF>0.95)&&nodeFactor<0.3&&hash3D(floor(vPosition*12.0))>0.5){
      nodeEffect=(sin(time*5.0+hash(length(vPosition))*10.0)*0.5+0.5)*arcFrequency*0.8;
    }
    float spark=0.0, sparkThreshold=0.98-arcFrequency*0.25;
    if(hash(floor(time*20.0)+vPosition.x*17.0+vPosition.y*9.0)>sparkThreshold){
      spark=(0.7+hash(vPosition.z+time)*0.3)*electricIntensity;
      spark*=smoothstep(0.0,0.3,hash(vPosition.y*32.0+time*5.0));
    }
    vec3 baseColorMix=mix(deepColor,baseColor,noisePattern*0.7+0.3);
    float energyFlow=fbm_improved(vec3(vPosition.x*2.0-time*2.0,vPosition.y*2.0+time,vPosition.z*2.0-time*1.5));
    baseColorMix=mix(baseColorMix,mainColor,energyFlow*0.05*electricIntensity);
    float arcWidth=0.7+sin(time*3.0+vPosition.x*5.0)*0.3;
    vec3 arcColor=mix(mainColor,accentColor,arcWidth*t2);
    arcColor=mix(arcColor,highlightColor,arc*t3*0.7);
    float arcVar=fbm(vec3(vPosition.x*4.0+time*1.5,vPosition.y*4.0-time*2.0,vPosition.z*4.0+time));
    arcColor=mix(arcColor,accentColor,arcVar*0.4);
    vec3 finalColor=mix(baseColorMix,arcColor,arc*arcWidth*0.9);
    vec3 nodeColor=mix(accentColor,highlightColor,fastPulse);
    finalColor=mix(finalColor,nodeColor,nodeEffect);
    finalColor=mix(finalColor,highlightColor,nodeEffect*fastPulse*0.7);
    vec3 sparkColor=mix(accentColor,highlightColor,hash(vPosition.y+time)*0.7+0.3);
    finalColor=mix(finalColor,sparkColor,spark);
    float highlight=smoothstep(0.5,1.2,vIntensity);
    finalColor=mix(finalColor,mainColor,highlight*0.2*(1.0-arc)); 
    finalColor=mix(finalColor,accentColor,highlight*0.4*arc);
    float mouseEffect=smoothstep(5.0,0.5,vDistFromMouse)*mouseInfluence;
    if(mouseEffect>0.3){
      float discharge=hash(vPosition.x*10.0+vPosition.y*10.0+floor(time*25.0));
      if(discharge>0.7){
        float dBranch=fbm(vec3(vPosition.x*20.0+time*5.0,vPosition.y*20.0-time*6.0,vPosition.z*20.0+time*4.0));
        vec3 dColor=mix(accentColor,highlightColor,(discharge-0.7)*3.0);
        dColor=mix(dColor,mainColor,dBranch*0.5);
        finalColor=mix(finalColor,dColor,(discharge-0.7)*3.0*mouseEffect);
      }
    }
    float edgeFactor=pow(1.0-abs(dot(vNormal,vec3(0,0,1))),2.0);
    vec3 edgeColor=mix(mainColor,accentColor,t2);
    edgeColor=mix(edgeColor,highlightColor,edgeFactor*0.5);
    float edgeNoise=fbm(vec3(vPosition.x*8.0+time*2.0,vPosition.y*8.0-time*1.5,vPosition.z*8.0+time*2.5))*0.5+0.5;
    edgeColor=mix(edgeColor,accentColor,edgeNoise*0.6);
    finalColor+=edgeColor*edgeFactor*electricIntensity*0.3;
    float flickerSpeed=25.0+hash(vPosition.y*10.0)*20.0;
    float flicker=0.92+0.08*hash(vPosition.x*15.0+floor(time*flickerSpeed));
    flicker*=0.96+0.04*sin(time*(50.0+hash(vPosition.z)*40.0)+vPosition.y*30.0);
    finalColor*=flicker;
    float glow=pow(vIntensity*(mouseEffect*0.5+0.5),2.0)*glowStrength;
    vec3 glowColor=mix(mainColor,accentColor,t3*0.7+noisePattern*0.3);
    finalColor+=glowColor*glow*0.7;
    finalColor+=highlightColor*glow*0.4*pulse;
    float bf=0.6+electricIntensity*0.6;
    bf*=0.95+0.05*sin(time*2.0);
    finalColor*=bf;
    float brightness = length(finalColor);
    float alpha = smoothstep(0.1, 0.3, brightness);
    gl_FragColor=vec4(finalColor, alpha);
  }
`;

export const particleVertexShader = `
  uniform float time; uniform float arcFrequency; uniform float electricIntensity; uniform vec3 themeColors[5];
  attribute float size; attribute float offset; attribute float speed; attribute float particleType;
  varying vec3 vColor; varying float vAlpha; varying float vParticleType; varying float vAngle;
  ${noiseHelperFunctions}
  void main() {
    vec3 pos=position; vParticleType=particleType;
    float t=time*speed+offset; vAngle=t*10.0;
    vec3 dC=themeColors[0],bC=themeColors[1],mC=themeColors[2],aC=themeColors[3],hC=themeColors[4];
    if(particleType<1.0){
      if(hash(offset+floor(time*10.0))>0.8) pos+=normalize(position)*sin(t*30.0)*0.05*electricIntensity;
      pos+=vec3(sin(t*speed*2.0)*0.03,cos(t*speed*2.0)*0.03,sin(t*speed*2.0+1.0)*0.03)*electricIntensity;
      vColor=mix(bC,mC,hash(offset)*0.7+0.3);
    } else if(particleType<2.0){
      float n=noise(vec3(offset*5.0,time*3.0,offset*3.0));
      pos+=normalize(position)*sin(t*50.0)*0.08*electricIntensity;
      pos+=vec3(sin(t*7.0+offset)*0.04,cos(t*9.0+offset*2.0)*0.04,sin(t*8.0+offset*1.5)*0.04)*electricIntensity;
      pos-=normalize(position)*(sin(t*8.0)*0.05*electricIntensity);
      vColor=mix(mC,aC,n*0.8+0.2);
    } else if(particleType<3.0){
      pos+=vec3(sin(t*speed*0.5)*0.01,cos(t*speed*0.5)*0.01,sin(t*speed*0.5+1.0)*0.01);
      pos+=normalize(position)*sin(t*5.0)*0.03;
      vColor=mix(aC,hC,sin(t*3.0)*0.5+0.5);
    } else if(particleType<4.0){
      if(hash(offset*3.0+floor(time*5.0))>0.9)
        pos+=vec3((hash(offset+time)-0.5)*0.2,(hash(offset*2.0+time)-0.5)*0.2,(hash(offset*3.0+time)-0.5)*0.2)*electricIntensity;
      pos+=vec3(sin(t*20.0)*0.02,cos(t*25.0)*0.02,sin(t*22.0)*0.02)*electricIntensity;
      vColor=mix(aC,hC,0.7);
    } else if(particleType<5.0){
      float trail=fbm(vec3(offset*5.0+time*0.5,offset*5.0-time*0.7,offset*5.0+time*0.6));
      vec3 flowDir=vec3(sin(position.y*5.0+time),cos(position.z*5.0+time),sin(position.x*5.0+time));
      pos+=flowDir*0.04*electricIntensity;
      pos+=vec3(sin(t*speed*3.0)*0.02,cos(t*speed*3.0)*0.02,0.0);
      vColor=mix(mC,aC,trail);
    } else {
      pos+=vec3(sin(t*0.7)*0.03,cos(t*0.5)*0.03,sin(t*0.6)*0.03);
      pos.x+=cos(t*0.2)*0.01; pos.y+=sin(t*0.2)*0.01;
      vColor=mix(dC,bC,0.7+0.3*sin(t));
    }
    float flickerFreq=particleType<1.0?30.0:particleType<2.0?50.0:particleType<3.0?10.0:particleType<4.0?20.0:particleType<5.0?15.0:5.0;
    float visThresh=particleType<1.0?0.4:particleType<2.0?0.3:particleType<3.0?0.2:particleType<4.0?0.5:particleType<5.0?0.3:0.2;
    float visibility=step(visThresh*(1.0-arcFrequency*0.5),hash(offset+floor(time*flickerFreq)))*electricIntensity;
    float pSize=size*visibility*(0.8+hash(offset+time*20.0)*0.4);
    if(particleType>=3.0) pSize*=1.2;
    if(particleType>=2.0 && particleType<3.0) pSize*=1.5*(1.0+sin(t*8.0)*0.5);
    vAlpha=visibility*(0.3+0.7*hash(offset+time*40.0))*electricIntensity;
    vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);
    gl_Position=projectionMatrix*mvPosition;
    gl_PointSize=pSize*(300.0/-mvPosition.z);
  }
`;

export const particleFragmentShader = `
  varying vec3 vColor; varying float vAlpha; varying float vParticleType; varying float vAngle;
  void main() {
    vec2 center=gl_PointCoord-vec2(0.5); float dist=length(center);
    float strength;
    if(vParticleType<1.0){ strength=1.0-smoothstep(0.2,0.5,dist); }
    else if(vParticleType<2.0){
      strength=1.0-smoothstep(0.1,0.4,dist);
      float sd=abs(center.x-center.y*sign(sin(vAngle)));
      if(sd<0.2) strength=mix(strength,1.2,(0.2-sd)*5.0);
    } else if(vParticleType<3.0){
      strength=mix(smoothstep(0.0,0.2,dist),1.0-smoothstep(0.3,0.5,dist),0.7);
    } else if(vParticleType<4.0){
      strength=1.0-smoothstep(0.0,0.5,dist);
      if(dist<0.2) strength=mix(strength,2.0,1.0-dist*5.0);
    } else if(vParticleType<5.0){
      strength=1.0-smoothstep(0.1,0.4,length(vec2(center.x,center.y*1.5)));
      strength*=0.7+0.3*sin(center.x*10.0+vAngle);
    } else { strength=(1.0-smoothstep(0.0,0.4,dist))*0.7; }
    float alpha=strength*vAlpha;
    if(alpha<0.01) discard;
    gl_FragColor=vec4(vColor,alpha);
  }
`;

// --- FIXED: Chromatic Aberration now calculates alpha from brightness ---
export const chromaticAberrationShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float amount; uniform float time;
    varying vec2 vUv;
    void main() {
      float dynamic=amount*(1.0+sin(time*3.0)*0.2);
      vec2 center=vUv-0.5; vec2 dir=normalize(center);
      float falloff=smoothstep(0.0,0.6,length(center));
      vec2 offset=dir*dynamic*falloff;
      
      vec4 cr=texture2D(tDiffuse,vUv+offset);
      vec4 cg=texture2D(tDiffuse,vUv);
      vec4 cb=texture2D(tDiffuse,vUv-offset);
      
      vec3 finalColor = vec3(cr.r, cg.g, cb.b);
      
      // FIX: Calculate alpha based on the maximum brightness of the RGB channels
      // This effectively makes the black background transparent again
      float alpha = max(max(finalColor.r, finalColor.g), finalColor.b);
      
      gl_FragColor=vec4(finalColor, alpha);
    }
  `
};