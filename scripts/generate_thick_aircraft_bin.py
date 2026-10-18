import os
import math
import struct

def build_aircraft_volume(dim=48):
    size = dim * dim * dim
    grid = [999.0] * size

    # We want a classic commercial/transport jet (Boeing 787 / Gulfstream silhouette):
    # Fuselage along Z (-0.8 to +0.8)
    # Swept wings along X (-0.85 to +0.85)
    # Prominent engines under wings at x = +-0.38
    # Swept vertical tail fin at z = -0.4 to -0.75, y > 0
    # Swept horizontal tail stabilizers at z = -0.5 to -0.75, y = 0.05
    for k in range(dim):
        z = (k / (dim - 1)) * 2.0 - 1.0
        for j in range(dim):
            y = (j / (dim - 1)) * 2.0 - 1.0
            for i in range(dim):
                x = (i / (dim - 1)) * 2.0 - 1.0
                ax = abs(x)

                # 1. Fuselage
                d_fuse = 999.0
                if z > 0.82:
                    d_fuse = math.hypot(x, y, z - 0.82)
                elif z < -0.80:
                    d_fuse = math.hypot(x, y, z + 0.80)
                else:
                    # Nose taper (z > 0.4), Tail taper (z < -0.4)
                    r = 0.18
                    if z > 0.40:
                        r = 0.18 * (1.0 - (z - 0.40) / 0.42) ** 0.6 + 0.02
                    elif z < -0.35:
                        r = 0.18 * (1.0 - (-0.35 - z) / 0.45) ** 0.7 + 0.02
                    d_fuse = math.hypot(x, y) - r

                # Cockpit windshield
                if 0.25 < z < 0.55 and y > 0.05:
                    d_canopy = math.hypot(x, y - 0.11, z - 0.38) - 0.13
                    d_fuse = min(d_fuse, d_canopy)

                # 2. Broad Swept Wings with substantial thickness
                d_wings = 999.0
                if ax < 0.88 and -0.45 < z < 0.35:
                    z_lead = 0.28 - 0.68 * ax
                    z_trail = -0.32 + 0.18 * ax
                    t_wing = 0.11 * (1.0 - 0.45 * (ax / 0.88)) # Thick wings so particles gather!
                    if z_trail <= z <= z_lead:
                        d_wings = max(abs(y + 0.02) - t_wing, 0.0)
                    else:
                        dz = max(z - z_lead, z_trail - z)
                        dy = max(0.0, abs(y + 0.02) - t_wing)
                        d_wings = math.hypot(dz, dy)

                # Winglets at wingtips
                if 0.80 < ax < 0.88 and -0.35 < z < 0.10:
                    y_winglet = 0.22 * ((ax - 0.80) / 0.08)
                    if 0 <= y <= y_winglet:
                        d_wings = min(d_wings, abs(ax - 0.85) - 0.04)

                # 3. Two Large Turbofan Jet Engines
                d_eng = 999.0
                if -0.28 < z < 0.15:
                    e1 = math.hypot(x - 0.36, y + 0.15) - 0.11
                    e2 = math.hypot(x + 0.36, y + 0.15) - 0.11
                    d_eng = min(e1, e2)

                # 4. Swept Vertical Tail Fin
                d_tail = 999.0
                if -0.75 < z < -0.32 and y > 0 and ax < 0.07:
                    y_top = 0.58 * (1.0 - ((-0.32 - z) / 0.43) ** 1.3)
                    if y <= y_top:
                        d_tail = max(ax - 0.045, 0.0)
                    else:
                        d_tail = math.hypot(ax, y - y_top)

                # 5. Horizontal Tail Stabilizers (Rear Wings)
                d_htail = 999.0
                if -0.75 < z < -0.40 and abs(y - 0.06) < 0.08 and ax < 0.48:
                    z_hlead = -0.42 - 0.52 * (ax / 0.48)
                    z_htrail = -0.72 + 0.12 * (ax / 0.48)
                    t_htail = 0.07 * (1.0 - ax / 0.50)
                    if z_htrail <= z <= z_hlead:
                        d_htail = max(abs(y - 0.06) - t_htail, 0.0)
                    else:
                        dz = max(z - z_hlead, z_htrail - z)
                        d_htail = math.hypot(dz, max(0.0, abs(y - 0.06) - t_htail))

                dist = min(d_fuse, d_wings, d_eng, d_tail, d_htail)
                grid[k * dim * dim + j * dim + i] = dist

    # Pass 2: compute gradients & RGBA
    strideZ = dim * dim
    strideY = dim
    raw_bytes = bytearray(size * 4)

    for k in range(dim):
        for j in range(dim):
            for i in range(dim):
                center = k * strideZ + j * strideY + i
                dist = grid[center]

                prevX = grid[center - 1] if i > 0 else dist
                nextX = grid[center + 1] if i < dim - 1 else dist
                prevY = grid[center - strideY] if j > 0 else dist
                nextY = grid[center + strideY] if j < dim - 1 else dist
                prevZ = grid[center - strideZ] if k > 0 else dist
                nextZ = grid[center + strideZ] if k < dim - 1 else dist

                gx = (nextX - prevX) * 0.5
                gy = (nextY - prevY) * 0.5
                gz = (nextZ - prevZ) * 0.5
                l = math.hypot(gx, gy, gz) + 1e-6
                gx /= l
                gy /= l
                gz /= l

                b_off = center * 4
                raw_bytes[b_off + 0] = int(math.floor((gx * 0.5 + 0.5) * 255))
                raw_bytes[b_off + 1] = int(math.floor((gy * 0.5 + 0.5) * 255))
                raw_bytes[b_off + 2] = int(math.floor((gz * 0.5 + 0.5) * 255))

                normDist = (dist / 0.32) * 0.5 + 0.5
                raw_bytes[b_off + 3] = max(0, min(255, int(math.floor(normDist * 255))))

    return raw_bytes

# Save raw binary volume
vol_bytes = build_aircraft_volume(48)
os.makedirs('public/volumes', exist_ok=True)
os.makedirs('public/assets', exist_ok=True)
with open('public/volumes/aircraft.bin', 'wb') as f:
    f.write(vol_bytes)
with open('public/assets/aircraft.bin', 'wb') as f:
    f.write(vol_bytes)
print(f"Generated aircraft.bin ({len(vol_bytes)} bytes) with thick wings & prominent engines!")
