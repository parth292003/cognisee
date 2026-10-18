const fs = require("fs");
const path = require("path");

const DIM = 56;
const SIZE = DIM * DIM * DIM;

function computeVolume(dim, sdfFunc) {
  const grid = new Float32Array(dim * dim * dim);
  const data = new Uint8Array(dim * dim * dim * 4);

  // Pass 1: compute SDF values
  let idx = 0;
  for (let k = 0; k < dim; k++) {
    const z = (k / (dim - 1)) * 2.0 - 1.0;
    for (let j = 0; j < dim; j++) {
      const y = (j / (dim - 1)) * 2.0 - 1.0;
      for (let i = 0; i < dim; i++) {
        const x = (i / (dim - 1)) * 2.0 - 1.0;
        grid[idx++] = sdfFunc(x, y, z);
      }
    }
  }

  // Pass 2: compute central-difference gradients and pack into RGBA
  const strideZ = dim * dim;
  const strideY = dim;
  for (let k = 0; k < dim; k++) {
    for (let j = 0; j < dim; j++) {
      for (let i = 0; i < dim; i++) {
        const centerIdx = k * strideZ + j * strideY + i;
        const dist = grid[centerIdx];

        const prevX = i > 0 ? grid[centerIdx - 1] : dist;
        const nextX = i < dim - 1 ? grid[centerIdx + 1] : dist;
        const prevY = j > 0 ? grid[centerIdx - strideY] : dist;
        const nextY = j < dim - 1 ? grid[centerIdx + strideY] : dist;
        const prevZ = k > 0 ? grid[centerIdx - strideZ] : dist;
        const nextZ = k < dim - 1 ? grid[centerIdx + strideZ] : dist;

        let gx = (nextX - prevX) * 0.5;
        let gy = (nextY - prevY) * 0.5;
        let gz = (nextZ - prevZ) * 0.5;
        const len = Math.hypot(gx, gy, gz) + 1e-6;
        gx /= len;
        gy /= len;
        gz /= len;

        const byteOffset = centerIdx * 4;
        data[byteOffset + 0] = Math.floor((gx * 0.5 + 0.5) * 255);
        data[byteOffset + 1] = Math.floor((gy * 0.5 + 0.5) * 255);
        data[byteOffset + 2] = Math.floor((gz * 0.5 + 0.5) * 255);

        // Normalize distance: dist in [-0.35, 0.35] maps to [0, 255]
        const normDist = (dist / 0.35) * 0.5 + 0.5;
        data[byteOffset + 3] = Math.max(0, Math.min(255, Math.floor(normDist * 255)));
      }
    }
  }

  return Buffer.from(data.buffer);
}

// 1. Commercial Passenger Jetliner (Boeing 787 / Airbus A350)
function sdfCommercialPlane(x, y, z) {
  const ax = Math.abs(x);

  // 1. Sleek cylindrical fuselage
  // Length: z from -0.62 to +0.55
  let dFuselage;
  if (z > 0.35) {
    // Aerodynamic nose cone tapering to tip at z = 0.58
    const t = (z - 0.35) / 0.23;
    const r = Math.max(0.015, 0.082 * Math.pow(1.0 - t, 0.7));
    dFuselage = Math.hypot(x, y, Math.max(0, z - 0.58)) - r;
  } else if (z < -0.40) {
    // Tail cone tapering smoothly to z = -0.64
    const t = (-0.40 - z) / 0.24;
    const r = Math.max(0.018, 0.082 * (1.0 - t));
    dFuselage = Math.hypot(x, y, Math.max(0, -0.64 - z)) - r;
  } else {
    // Main cabin tube
    dFuselage = Math.hypot(x, y) - 0.082;
  }

  // Cockpit windshield contour
  if (z > 0.22 && z < 0.42 && y > 0.01) {
    const dCockpit = Math.hypot(x, y - 0.06, z - 0.28) - 0.065;
    dFuselage = Math.min(dFuselage, dCockpit);
  }

  // 2. Wide Swept Wings (Continuous global distance field)
  const cSpan = Math.max(0.06, Math.min(0.76, ax));
  const spanT = cSpan / 0.76;
  const zLead = 0.16 - 0.44 * spanT;
  const zTrail = -0.16 - 0.20 * spanT;
  const cZ = Math.max(zTrail, Math.min(zLead, z));
  const yWing = -0.01 + 0.05 * spanT;
  const tWing = 0.038 * (1.0 - 0.45 * spanT);
  const cY = Math.max(yWing - tWing, Math.min(yWing + tWing, y));
  const dWings = Math.hypot(ax - cSpan, y - cY, z - cZ) - 0.015;

  // Winglets at tips
  const cSpanW = Math.max(0.70, Math.min(0.76, ax));
  const cYW = Math.max(0.03, Math.min(0.18, y));
  const cZW = Math.max(-0.36, Math.min(-0.25, z));
  const dWinglet = Math.hypot(ax - cSpanW, y - cYW, z - cZW) - 0.022;

  // 3. Twin Jet Turbofan Engines under wings
  const cZE = Math.max(-0.16, Math.min(0.14, z));
  const dEngines = Math.hypot(ax - 0.23, y + 0.075, z - cZE) - 0.055;

  // 4. Vertical Tail Fin
  const cZT = Math.max(-0.62, Math.min(-0.32, z));
  const tTail = (-0.32 - cZT) / 0.30;
  const yTop = 0.04 + 0.34 * (1.0 - tTail);
  const cYT = Math.max(0.04, Math.min(yTop, y));
  const dTail = Math.hypot(ax, y - cYT, z - cZT) - 0.022;

  // 5. Horizontal Tail Stabilizers (Rear wings)
  const cSpanH = Math.max(0.04, Math.min(0.36, ax));
  const tH = cSpanH / 0.36;
  const zLeadH = -0.44 - 0.16 * tH;
  const zTrailH = -0.56 - 0.06 * tH;
  const cZH = Math.max(zTrailH, Math.min(zLeadH, z));
  const cYH = Math.max(0.01, Math.min(0.04, y));
  const dHTail = Math.hypot(ax - cSpanH, y - cYH, z - cZH) - 0.018;

  return Math.min(dFuselage, dWings, dWinglet, dEngines, dTail, dHTail);
}

// 2. High-Definition Biotechnology DNA Double Helix
function sdfDNA(x, y, z) {
  if (Math.abs(y) > 0.82) return Math.abs(y) - 0.78;

  const R = 0.30;
  const pitch = 0.72; // elegant 2.2 twists along height
  const k = (2 * Math.PI) / pitch;

  const theta = Math.atan2(z, x);
  const r = Math.hypot(x, z);

  // Strand A (Sugar-phosphate backbone)
  let dAngleA = (theta - k * y) % (2 * Math.PI);
  if (dAngleA > Math.PI) dAngleA -= 2 * Math.PI;
  if (dAngleA < -Math.PI) dAngleA += 2 * Math.PI;
  const distStrandA = Math.hypot(r - R, dAngleA * R) - 0.042;

  // Strand B (Offset by 180 degrees)
  let dAngleB = (theta - (k * y + Math.PI)) % (2 * Math.PI);
  if (dAngleB > Math.PI) dAngleB -= 2 * Math.PI;
  if (dAngleB < -Math.PI) dAngleB += 2 * Math.PI;
  const distStrandB = Math.hypot(r - R, dAngleB * R) - 0.042;

  let dHelix = Math.min(distStrandA, distStrandB);

  // Distinct base-pair connecting rungs with base nodes
  const rungSpacing = 0.08;
  const rungIdx = Math.round(y / rungSpacing);
  const yRung = rungIdx * rungSpacing;
  if (Math.abs(yRung) <= 0.75) {
    const thetaRung = k * yRung;
    const nx = Math.cos(thetaRung);
    const nz = Math.sin(thetaRung);
    const proj = x * nx + z * nz;
    const clampedProj = Math.max(-R, Math.min(R, proj));
    const closestX = clampedProj * nx;
    const closestZ = clampedProj * nz;
    
    // Cylindrical rung
    const dRung = Math.hypot(x - closestX, y - yRung, z - closestZ) - 0.022;
    
    // Base pair junction sphere nodes at ends
    const dNode1 = Math.hypot(x - R * nx, y - yRung, z - R * nz) - 0.048;
    const dNode2 = Math.hypot(x + R * nx, y - yRung, z + R * nz) - 0.048;
    
    dHelix = Math.min(dHelix, dRung, dNode1, dNode2);
  }

  return dHelix;
}


// 3. Humanoid Autonomous Robotics & Bionic Android
function sdfRobot(x, y, z) {
  const ax = Math.abs(x);
  const az = Math.abs(z);

  // 1. Head / Helmet
  // Cranium: rounded head centered at y = 0.58
  const dHead = Math.hypot(x, y - 0.58, z) - 0.135;
  // Visor optics horizontal bar (facing front z > 0)
  const dVisor = Math.max(Math.hypot(x, y - 0.58), Math.max(-z + 0.09, z - 0.145)) - 0.055;
  // Side audio/sensor antenna nodes
  const dEars = Math.hypot(ax - 0.14, y - 0.58, z) - 0.038;
  const headPart = Math.min(dHead, dVisor, dEars);

  // 2. Cervical Neck Collar
  const dNeck = Math.hypot(x, z) - 0.055;
  const neckPart = Math.max(dNeck, Math.max(0.42 - y, y - 0.49));

  // 3. Torso & Power Core
  // Upper Chest / Armor Plate (y from 0.16 to 0.42, broader at top)
  const chestW = 0.26 - 0.06 * ((0.42 - y) / 0.26);
  const dChest = Math.max(ax - chestW, Math.max(az - 0.11, Math.max(0.16 - y, y - 0.42)));
  // Central Power Core Node / Arc Reactor
  const dCore = Math.hypot(x, y - 0.29, z - 0.10) - 0.048;
  // Spine / Midsection (y from -0.06 to 0.16)
  const dSpine = Math.hypot(x, z) - 0.095;
  const spinePart = Math.max(dSpine, Math.max(-0.06 - y, y - 0.16));
  // Pelvis / Waist chassis (y from -0.22 to -0.06)
  const dPelvis = Math.max(ax - 0.21, Math.max(az - 0.11, Math.max(-0.22 - y, y - (-0.06))));
  const torsoPart = Math.min(dChest, dCore, spinePart, dPelvis);

  // 4. Arms & Manipulators
  // Shoulder Pauldrons / Ball joints
  const dShoulder = Math.hypot(ax - 0.32, y - 0.36, z) - 0.068;
  // Upper Arms (capsule from (0.33, 0.33, 0) to (0.35, 0.10, 0.02))
  const tArm1 = Math.max(0, Math.min(1, (0.33 - y) / 0.23));
  const arm1X = 0.33 + 0.02 * tArm1;
  const arm1Z = 0.02 * tArm1;
  const dUpperArm = Math.hypot(ax - arm1X, y - (0.33 - 0.23 * tArm1), z - arm1Z) - 0.042;
  // Elbow Joint
  const dElbow = Math.hypot(ax - 0.35, y - 0.09, z - 0.02) - 0.046;
  // Forearms (from (0.35, 0.07, 0.02) to (0.33, -0.18, 0.06))
  const tArm2 = Math.max(0, Math.min(1, (0.07 - y) / 0.25));
  const arm2X = 0.35 - 0.02 * tArm2;
  const arm2Z = 0.02 + 0.04 * tArm2;
  const dForearm = Math.hypot(ax - arm2X, y - (0.07 - 0.25 * tArm2), z - arm2Z) - 0.038;
  // Hands / Bionic Manipulators
  const dHands = Math.hypot(ax - 0.32, y - (-0.24), z - 0.07) - 0.035;
  const armPart = Math.min(dShoulder, dUpperArm, dElbow, dForearm, dHands);

  // 5. Lower Chassis / Bionic Legs
  // Hip Joints
  const dHips = Math.hypot(ax - 0.13, y - (-0.23), z) - 0.055;
  // Thighs (y from -0.52 to -0.25)
  const dThigh = Math.max(Math.hypot(ax - 0.13, z) - 0.058, Math.max(-0.52 - y, y - (-0.25)));
  // Knee Joints
  const dKnee = Math.hypot(ax - 0.13, y - (-0.54), z - 0.01) - 0.055;
  // Calves / Lower Legs (y from -0.82 to -0.56)
  const dCalf = Math.max(Math.hypot(ax - 0.13, z) - 0.050, Math.max(-0.82 - y, y - (-0.56)));
  // Foot Pads (y from -0.89 to -0.82, z from -0.06 to 0.10)
  const dFoot = Math.max(ax - 0.13 - 0.045, Math.max(Math.abs(z - 0.02) - 0.08, Math.max(-0.89 - y, y - (-0.82))));
  const legPart = Math.min(dHips, dThigh, dKnee, dCalf, dFoot);

  return Math.min(headPart, neckPart, torsoPart, armPart, legPart);
}

// 3. Slim, Soaring Modern Skyscraper (Architecture & Infrastructure)
function sdfBuilding(x, y, z) {
  if (y < -0.82 || y > 0.90) return Math.max(-0.82 - y, y - 0.90);

  const ax = Math.abs(x);
  const az = Math.abs(z);

  // Needle Spire (Crown: y from 0.68 to 0.88)
  if (y > 0.68) {
    const t = (y - 0.68) / 0.20;
    const rSpire = 0.035 * (1.0 - t) + 0.005;
    return Math.hypot(x, z) - rSpire;
  }

  // Tier 4 (Upper crown setback: y from 0.45 to 0.68)
  if (y > 0.45) {
    const dBox = Math.max(ax - 0.08, az - 0.08);
    return Math.max(dBox, Math.max(0.45 - y, y - 0.68));
  }

  // Tier 3 (High tower setback: y from 0.15 to 0.45)
  if (y > 0.15) {
    const dBox = Math.max(ax - 0.12, az - 0.12);
    return Math.max(dBox, Math.max(0.15 - y, y - 0.45));
  }

  // Tier 2 (Mid tower setback: y from -0.25 to 0.15)
  if (y > -0.25) {
    const dBox = Math.max(ax - 0.16, az - 0.16);
    return Math.max(dBox, Math.max(-0.25 - y, y - 0.15));
  }

  // Tier 1 (Slender base: y from -0.82 to -0.25)
  const dBox = Math.max(ax - 0.20, az - 0.20);
  return Math.max(dBox, Math.max(-0.82 - y, y - (-0.25)));
}

// 4. YouTube Showcase: Empty volume so no button or clutter blocks the video!
function sdfEmpty(x, y, z) {
  // Return large distance so particles disperse away smoothly into ambient space
  return 2.0;
}

const volumes = [
  { name: "aircraft.bin", fn: sdfCommercialPlane },
  { name: "dna.bin", fn: sdfDNA },
  { name: "robot.bin", fn: sdfRobot },
  { name: "building.bin", fn: sdfBuilding },
  { name: "video.bin", fn: sdfEmpty }
];

const targetDirs = [
  path.join(__dirname, "..", "public", "volumes"),
  path.join(__dirname, "..", "public", "assets", "volumes")
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

for (const vol of volumes) {
  console.log(`Generating ${vol.name} (dim=${DIM})...`);
  const buf = computeVolume(DIM, vol.fn);
  console.log(`Computed ${vol.name}: ${buf.length} bytes`);
  for (const dir of targetDirs) {
    const file = path.join(dir, vol.name);
    fs.writeFileSync(file, buf);
    console.log(`  -> Wrote ${file}`);
  }
}

console.log("All 4 volume assets updated successfully!");
