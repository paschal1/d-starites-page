"use client";

/**
 * D-Starite Technologies Academy: certificate page for every course, programme, webinar and workshop.
 *
 * Flow: choose course + enter name -> preview (watermarked) -> pay by transfer (paid webinars) or request on WhatsApp
 * (programmes, included in the fee) -> enter the unlock code you send -> download PNG.
 * The course list comes from the server (app/api/certificate/certificate-courses.ts), the unlock code is checked on
 * the server, and every certificate carries a signed certificate number plus a QR code that opens /verify.
 */
import { useEffect, useState } from "react";

// ── ACCOUNT + CONTACT DETAILS ────────────────────────────────────────────────
const ACCOUNT_NUMBER = "0078508706";
const ACCOUNT_NAME   = "Nwokeocha Paschal Chikwado";
const BANK           = "Access Bank";
const WA_NUMBER      = "2348130062780";

// ── CERTIFICATE DETAILS ──────────────────────────────────────────────────────
// Courses (and their fees) are edited on the server in app/api/certificate/certificate-courses.ts.
const SITE           = "https://www.dstariteitsolutions.online";
const SIGNER_NAME    = "Paschal Nwokeocha";
const SIGNER_TITLE   = "Founder, D-Starite Technologies";
/**
 * Optional handwritten signature. Paste a PNG (transparent background, about 600 x 200 px) as a data URI,
 * e.g. "data:image/png;base64,iVBOR...". Leave empty to print the signature line and name only.
 * It must be a data URI (not a file path) so it is included when the certificate is exported as a PNG.
 */
const SIGNATURE_IMAGE = "";
const MAX_NAME_LENGTH = 45;

// ── BRAND TOKENS ─────────────────────────────────────────────────────────────
const BRAND = {
  green:      "#0E7C41",
  greenDark:  "#0A5C31",
  greenDeep:  "#083D21",
  mint:       "#EAF8EF",
  mintBorder: "rgba(14,124,65,0.18)",
  white:      "#FFFFFF",
  ink:        "#0E2418",
  muted:      "#5B7A6B",
  line:       "rgba(14,124,65,0.14)",
};

type Course = {
  key: string;
  group: string;
  title: string;
  heading: string;
  kind: "completion" | "participation";
  description: string;
  fee: number;
};

const formatFee = (n: number) => `₦${n.toLocaleString("en-NG")}`;

function buildWALink(name: string, course: Course) {
  const msg = encodeURIComponent(
    course.fee > 0
      ? `Hello! 👋 I just paid for my *${course.title} Certificate*.\n\n` +
        `*Name on certificate:* ${name}\n` +
        `*Course:* ${course.title}\n` +
        `*Amount paid:* ${formatFee(course.fee)}\n` +
        `*Account:* ${ACCOUNT_NUMBER} (${BANK})\n\n` +
        `Please find attached my payment receipt. Kindly send my unlock code. Thank you!`
      : `Hello! 👋 I have completed *${course.title}* and would like my certificate.\n\n` +
        `*Name on certificate:* ${name}\n` +
        `*Course:* ${course.title}\n\n` +
        `Please confirm my completion and send my unlock code. Thank you!`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
/** "2609" (YYMM) -> "September 2026" */
const periodLabel = (p: string) => `${MONTH_NAMES[parseInt(p.slice(2), 10) - 1]} ${2000 + parseInt(p.slice(0, 2), 10)}`;
const monthYearNow = () => { const d = new Date(); return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`; };

// ─────────────────────────────────────────────────────────────────────────────
// QR CODE GENERATOR (dependency-free)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Minimal QR code generator: byte mode, error-correction level M, versions 1 to 10 (up to 213 bytes).
// No dependencies. Returns a square matrix where `true` is a dark module.
// ─────────────────────────────────────────────────────────────────────────────
// [total data codewords, EC codewords per block, blocks in group 1, data per block g1, blocks in group 2, data per block g2]
const QR_EC_M: number[][] = [
  [],
  [16, 10, 1, 16, 0, 0],
  [28, 16, 1, 28, 0, 0],
  [44, 26, 1, 44, 0, 0],
  [64, 18, 2, 32, 0, 0],
  [86, 24, 2, 43, 0, 0],
  [108, 16, 4, 27, 0, 0],
  [124, 18, 4, 31, 0, 0],
  [154, 22, 2, 38, 2, 39],
  [182, 22, 3, 36, 2, 37],
  [216, 26, 4, 43, 1, 44],
]
const QR_ALIGN: number[][] = [[], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]]

const GF_EXP: number[] = new Array(512)
const GF_LOG: number[] = new Array(256)
;(() => {
  let x = 1
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x
    GF_LOG[x] = i
    x <<= 1
    if (x & 0x100) x ^= 0x11d
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255]
})()

const gfMul = (a: number, b: number) => (a && b ? GF_EXP[GF_LOG[a] + GF_LOG[b]] : 0)

function rsRemainder(data: number[], degree: number): number[] {
  let gen = [1]
  for (let i = 0; i < degree; i++) {
    const next = new Array(gen.length + 1).fill(0)
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gen[j]
      next[j + 1] ^= gfMul(gen[j], GF_EXP[i])
    }
    gen = next
  }
  const rem: number[] = new Array(degree).fill(0)
  for (const b of data) {
    const factor = b ^ (rem.shift() as number)
    rem.push(0)
    for (let i = 0; i < degree; i++) rem[i] ^= gfMul(gen[i + 1], factor)
  }
  return rem
}

function makeQR(text: string): boolean[][] {
  const bytes = Array.from(new TextEncoder().encode(text))

  // 1. Pick the smallest version that fits.
  let ver = 1
  for (; ver <= 10; ver++) {
    const countBits = ver <= 9 ? 8 : 16
    if (4 + countBits + bytes.length * 8 <= QR_EC_M[ver][0] * 8) break
  }
  if (ver > 10) throw new Error('QR data is too long')
  const [dataCodewords, ecLen, n1, d1, n2, d2] = QR_EC_M[ver]

  // 2. Data bits: mode, length, payload, terminator, padding.
  const bits: number[] = []
  const push = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1)
  }
  push(0b0100, 4)
  push(bytes.length, ver <= 9 ? 8 : 16)
  bytes.forEach((b) => push(b, 8))
  push(0, Math.min(4, dataCodewords * 8 - bits.length))
  while (bits.length % 8) bits.push(0)
  for (let pad = 0xec; bits.length < dataCodewords * 8; pad ^= 0xec ^ 0x11) push(pad, 8)
  const data: number[] = []
  for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2))

  // 3. Split into blocks, add Reed-Solomon codewords, interleave.
  const blocks: number[][] = []
  let k = 0
  for (let i = 0; i < n1 + n2; i++) {
    const len = i < n1 ? d1 : d2
    blocks.push(data.slice(k, k + len))
    k += len
  }
  const ecs = blocks.map((b) => rsRemainder(b, ecLen))
  const codewords: number[] = []
  for (let i = 0; i < Math.max(d1, d2); i++) blocks.forEach((b) => i < b.length && codewords.push(b[i]))
  for (let i = 0; i < ecLen; i++) ecs.forEach((e) => codewords.push(e[i]))
  const allBits: number[] = []
  codewords.forEach((c) => {
    for (let i = 7; i >= 0; i--) allBits.push((c >>> i) & 1)
  })

  // 4. Build the matrix.
  const size = ver * 4 + 17
  const m: boolean[][] = Array.from({ length: size }, () => new Array(size).fill(false))
  const fn: boolean[][] = Array.from({ length: size }, () => new Array(size).fill(false))
  const setF = (x: number, y: number, dark: boolean) => {
    m[y][x] = dark
    fn[y][x] = true
  }
  for (let i = 0; i < size; i++) {
    setF(6, i, i % 2 === 0)
    setF(i, 6, i % 2 === 0)
  }
  const finder = (cx: number, cy: number) => {
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx
        const y = cy + dy
        if (x < 0 || y < 0 || x >= size || y >= size) continue
        const dist = Math.max(Math.abs(dx), Math.abs(dy))
        setF(x, y, dist !== 2 && dist !== 4)
      }
  }
  finder(3, 3)
  finder(size - 4, 3)
  finder(3, size - 4)
  const pos = QR_ALIGN[ver]
  pos.forEach((cy, i) =>
    pos.forEach((cx, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === pos.length - 1) || (i === pos.length - 1 && j === 0)) return
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setF(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1)
    }),
  )

  const drawFormat = (mask: number) => {
    const d = (0 << 3) | mask // ECC level M = 00
    let rem = d
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
    const f = ((d << 10) | rem) ^ 0x5412
    const bit = (i: number) => ((f >>> i) & 1) !== 0
    for (let i = 0; i <= 5; i++) setF(8, i, bit(i))
    setF(8, 7, bit(6))
    setF(8, 8, bit(7))
    setF(7, 8, bit(8))
    for (let i = 9; i < 15; i++) setF(14 - i, 8, bit(i))
    for (let i = 0; i < 8; i++) setF(size - 1 - i, 8, bit(i))
    for (let i = 8; i < 15; i++) setF(8, size - 15 + i, bit(i))
    setF(8, size - 8, true)
  }
  drawFormat(0)
  if (ver >= 7) {
    let rem = ver
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25)
    const v = (ver << 12) | rem
    for (let i = 0; i < 18; i++) {
      const bit = ((v >>> i) & 1) !== 0
      const a = size - 11 + (i % 3)
      const b = Math.floor(i / 3)
      setF(a, b, bit)
      setF(b, a, bit)
    }
  }

  // 5. Place data bits in the zig-zag order.
  let idx = 0
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j
        const upward = ((right + 1) & 2) === 0
        const y = upward ? size - 1 - vert : vert
        if (!fn[y][x] && idx < allBits.length) m[y][x] = allBits[idx++] === 1
      }
    }
  }

  // 6. Choose the mask with the lowest penalty.
  const applyMask = (mask: number) => {
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        if (fn[y][x]) continue
        let inv = false
        switch (mask) {
          case 0: inv = (x + y) % 2 === 0; break
          case 1: inv = y % 2 === 0; break
          case 2: inv = x % 3 === 0; break
          case 3: inv = (x + y) % 3 === 0; break
          case 4: inv = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break
          case 5: inv = ((x * y) % 2) + ((x * y) % 3) === 0; break
          case 6: inv = (((x * y) % 2) + ((x * y) % 3)) % 2 === 0; break
          default: inv = (((x + y) % 2) + ((x * y) % 3)) % 2 === 0
        }
        if (inv) m[y][x] = !m[y][x]
      }
  }
  const penalty = (): number => {
    let p = 0
    const lines: boolean[][] = []
    for (let i = 0; i < size; i++) {
      lines.push(m[i])
      lines.push(m.map((row) => row[i]))
    }
    const finderA = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]
    const finderB = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1]
    for (const line of lines) {
      let run = 1
      for (let i = 1; i <= size; i++) {
        if (i < size && line[i] === line[i - 1]) run++
        else {
          if (run >= 5) p += 3 + (run - 5)
          run = 1
        }
      }
      for (let i = 0; i + 11 <= size; i++) {
        let a = true
        let b = true
        for (let j = 0; j < 11; j++) {
          const v = line[i + j] ? 1 : 0
          if (v !== finderA[j]) a = false
          if (v !== finderB[j]) b = false
        }
        if (a) p += 40
        if (b) p += 40
      }
    }
    for (let y = 0; y < size - 1; y++)
      for (let x = 0; x < size - 1; x++) if (m[y][x] === m[y][x + 1] && m[y][x] === m[y + 1][x] && m[y][x] === m[y + 1][x + 1]) p += 3
    let dark = 0
    m.forEach((row) => row.forEach((v) => v && dark++))
    const total = size * size
    p += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10
    return p
  }
  let best = 0
  let bestPenalty = Infinity
  for (let mask = 0; mask < 8; mask++) {
    applyMask(mask)
    drawFormat(mask)
    const p = penalty()
    if (p < bestPenalty) {
      bestPenalty = p
      best = mask
    }
    applyMask(mask) // undo
  }
  applyMask(best)
  drawFormat(best)
  return m
}

/** SVG path data (one path, 1 unit per module) for the given matrix, offset by `quiet` modules. */
function qrPath(matrix: boolean[][], quiet = 0): string {
  let d = ''
  matrix.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (dark) d += `M${x + quiet} ${y + quiet}h1v1h-1z`
    }),
  )
  return d
}


// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATE ARTWORK (one SVG string, used for the on-screen image AND the PNG download)
// ─────────────────────────────────────────────────────────────────────────────
const CW = 1000; // certificate canvas, A4 landscape proportions
const CH = 707;
const PAL = {
  deep: "#083D21", green: "#0E7C41", gold: "#C9A227", goldDark: "#9A7B14",
  paper: "#FDFEFB", cream: "#FBF3D3", ink: "#0E2418", muted: "#5B7A6B",
};
const SERIF = "Cambria, Georgia, 'Times New Roman', serif";
const SANS  = "Calibri, 'Segoe UI', Arial, sans-serif";
const MONO  = "Consolas, 'Courier New', monospace";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function cleanName(raw: string) {
  return raw.replace(/\s+/g, " ").trim();
}

/** Turns a name into a safe file name: keeps letters (including accented ones), swaps spaces and forbidden characters for "_". */
function fileSafe(raw: string) {
  return cleanName(raw).replace(/[\\/:*?"<>|\s]+/g, "_").replace(/^_+|_+$/g, "");
}

function certSeal(cx: number, cy: number) {
  const n = 36, r1 = 62, r2 = 57;
  let pts = "";
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI * i) / n;
    pts += `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)} `;
  }
  return `
  <polygon points="${pts}" fill="url(#gold)"/>
  <circle cx="${cx}" cy="${cy}" r="53" fill="${PAL.cream}" stroke="${PAL.goldDark}" stroke-width="1"/>
  <text font-family="${SANS}" font-size="7.6" font-weight="700" fill="${PAL.deep}">
    <textPath xlink:href="#sealRing" textLength="276" lengthAdjust="spacing">D-STARITE TECHNOLOGIES ACADEMY • VERIFIED •</textPath>
  </text>
  <circle cx="${cx}" cy="${cy}" r="37" fill="${PAL.deep}"/>
  <circle cx="${cx}" cy="${cy}" r="33" fill="none" stroke="url(#gold)" stroke-width="1.4"/>
  <text x="${cx}" y="${cy + 9}" text-anchor="middle" font-family="${SERIF}" font-size="26" font-weight="700" fill="#F3DC85">DS</text>`;
}

type CertArt = { name: string; course: Course; awarded: string; certId?: string; verifyUrl?: string; preview: boolean; pxWidth?: number };

function buildCertificateSVG({ name, course, awarded, certId, verifyUrl, preview, pxWidth = CW }: CertArt): string {
  const shown = cleanName(name) || "Your Full Name";
  const nameSize = Math.round(Math.min(50, 660 / (shown.length * 0.58)));
  const pxHeight = Math.round((pxWidth * CH) / CW);
  const isCompletion = course.kind === "completion";
  const titleText = isCompletion ? "CERTIFICATE OF COMPLETION" : "CERTIFICATE OF PARTICIPATION";
  const phrase = isCompletion ? "has successfully completed the" : "has successfully participated in the";
  const headingSize = Math.round(Math.min(35, 800 / (course.heading.length * 0.56)));
  const descSize = Math.min(14.5, Math.round((880 / (course.description.length * 0.5)) * 10) / 10);

  // QR code (real once unlocked, placeholder in the preview)
  let qr = "";
  if (!preview && verifyUrl) {
    let m: boolean[][];
    try {
      m = makeQR(verifyUrl);
    } catch {
      m = makeQR(verifyUrl.split("&n=")[0]); // very long names: QR carries the number only, /verify asks for the name
    }
    const scale = 100 / (m.length + 4);
    qr = `<g transform="translate(74 528) scale(${scale.toFixed(4)})"><path d="${qrPath(m, 2)}" fill="${PAL.deep}"/></g>`;
  } else {
    qr = `<rect x="80" y="534" width="100" height="100" fill="none" stroke="${PAL.muted}" stroke-width="1.2" stroke-dasharray="5 4"/>
      <text x="130" y="588" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${PAL.muted}">QR appears</text>
      <text x="130" y="604" text-anchor="middle" font-family="${SANS}" font-size="13" fill="${PAL.muted}">after unlock</text>`;
  }
  const idText = !preview && certId ? esc(certId) : "DST-AIB-XXXX-XXXX";

  const signature = SIGNATURE_IMAGE
    ? `<image x="690" y="534" width="200" height="66" preserveAspectRatio="xMidYMax meet" href="${SIGNATURE_IMAGE}" xlink:href="${SIGNATURE_IMAGE}"/>`
    : "";

  const rosette = Array.from({ length: 36 }, (_, i) =>
    `<ellipse cx="500" cy="345" rx="300" ry="112" transform="rotate(${i * 5} 500 345)"/>`).join("");

  const micro = "D-STARITE TECHNOLOGIES ACADEMY • ".repeat(14);
  const watermark = preview
    ? `<defs><pattern id="wm" width="300" height="150" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
         <text x="150" y="86" text-anchor="middle" font-family="${SANS}" font-size="38" font-weight="700" letter-spacing="7" fill="${PAL.deep}" fill-opacity="0.16">PREVIEW</text>
       </pattern></defs>
       <rect x="0" y="0" width="${CW}" height="${CH}" fill="url(#wm)"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${pxWidth}" height="${pxHeight}" viewBox="0 0 ${CW} ${CH}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F3DC85"/><stop offset="0.5" stop-color="${PAL.gold}"/><stop offset="1" stop-color="${PAL.goldDark}"/>
    </linearGradient>
    <path id="sealRing" d="M 455,574 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"/>
  </defs>

  <!-- frame -->
  <rect width="${CW}" height="${CH}" fill="${PAL.deep}"/>
  <rect x="14" y="14" width="${CW - 28}" height="${CH - 28}" fill="${PAL.paper}"/>
  <rect x="28" y="28" width="${CW - 56}" height="${CH - 56}" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <rect x="37" y="37" width="${CW - 74}" height="${CH - 74}" fill="none" stroke="${PAL.green}" stroke-width="0.8"/>
  <g stroke="url(#gold)" stroke-width="3" fill="none" stroke-linecap="square">
    <path d="M50 88 V50 H88"/><path d="M${CW - 50} 88 V50 H${CW - 88}"/>
    <path d="M50 ${CH - 88} V${CH - 50} H88"/><path d="M${CW - 50} ${CH - 88} V${CH - 50} H${CW - 88}"/>
  </g>

  <!-- faint rosette + microprint (security-style detail) -->
  <g fill="none" stroke="${PAL.green}" stroke-width="0.6" opacity="0.07">${rosette}</g>
  <text x="66" y="50" font-family="${SANS}" font-size="5" fill="${PAL.green}" fill-opacity="0.55" textLength="${CW - 132}" lengthAdjust="spacing">${micro}</text>
  <text x="66" y="${CH - 42}" font-family="${SANS}" font-size="5" fill="${PAL.green}" fill-opacity="0.55" textLength="${CW - 132}" lengthAdjust="spacing">${micro}</text>

  <!-- heading -->
  <text x="500" y="100" text-anchor="middle" font-family="${SANS}" font-size="15" font-weight="700" letter-spacing="5" fill="${PAL.green}">D-STARITE TECHNOLOGIES ACADEMY</text>
  <line x1="330" y1="118" x2="482" y2="118" stroke="${PAL.gold}" stroke-width="1.6"/>
  <line x1="518" y1="118" x2="670" y2="118" stroke="${PAL.gold}" stroke-width="1.6"/>
  <rect x="495" y="113" width="10" height="10" fill="${PAL.gold}" transform="rotate(45 500 118)"/>
  <text x="500" y="174" text-anchor="middle" font-family="${SERIF}" font-size="37" font-weight="700" letter-spacing="4" fill="${PAL.deep}">${titleText}</text>

  <!-- body -->
  <text x="500" y="216" text-anchor="middle" font-family="${SERIF}" font-size="18" font-style="italic" fill="${PAL.muted}">This is to certify that</text>
  <text x="500" y="288" text-anchor="middle" font-family="${SERIF}" font-size="${nameSize}" font-weight="700" fill="${PAL.deep}">${esc(shown)}</text>
  <line x1="190" y1="308" x2="810" y2="308" stroke="${PAL.gold}" stroke-width="2.2"/>
  <line x1="240" y1="315" x2="760" y2="315" stroke="${PAL.gold}" stroke-width="0.8" opacity="0.8"/>
  <text x="500" y="352" text-anchor="middle" font-family="${SERIF}" font-size="18" font-style="italic" fill="${PAL.muted}">${phrase}</text>
  <text x="500" y="402" text-anchor="middle" font-family="${SERIF}" font-size="${headingSize}" font-weight="700" fill="${PAL.green}">${esc(course.heading)}</text>
  <text x="500" y="434" text-anchor="middle" font-family="${SANS}" font-size="${descSize}" fill="${PAL.muted}">${esc(course.description)}</text>
  <text x="500" y="466" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" letter-spacing="1.6" fill="${PAL.deep}">AWARDED ${esc(awarded.toUpperCase())}</text>

  <!-- verification block -->
  <rect x="68" y="522" width="112" height="112" fill="#fff" stroke="${PAL.gold}" stroke-width="1.2"/>
  ${qr}
  <text x="196" y="550" font-family="${SANS}" font-size="10.5" font-weight="700" letter-spacing="2" fill="${PAL.muted}">CERTIFICATE NO.</text>
  <text x="196" y="575" font-family="${MONO}" font-size="16" font-weight="700" fill="${PAL.deep}">${idText}</text>
  <text x="196" y="601" font-family="${SANS}" font-size="12" fill="${PAL.muted}">Scan the QR code or visit</text>
  <text x="196" y="619" font-family="${SANS}" font-size="12.5" font-weight="700" fill="${PAL.green}">${esc(SITE.replace("https://www.", ""))}/verify</text>

  <!-- seal -->
  ${certSeal(500, 574)}

  <!-- signature -->
  ${signature}
  <line x1="650" y1="602" x2="930" y2="602" stroke="${PAL.deep}" stroke-width="1"/>
  <text x="790" y="624" text-anchor="middle" font-family="${SERIF}" font-size="17" font-weight="700" fill="${PAL.deep}">${esc(SIGNER_NAME)}</text>
  <text x="790" y="642" text-anchor="middle" font-family="${SANS}" font-size="12" fill="${PAL.muted}">${esc(SIGNER_TITLE)}</text>

  <text x="500" y="653" text-anchor="middle" font-family="${SANS}" font-size="9.5" letter-spacing="2.2" fill="${PAL.muted}">EMPOWERING GROWTH THROUGH INNOVATION</text>
  ${watermark}
</svg>`;
}

function svgDataUri(svg: string) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/** The certificate as an image: identical to what gets downloaded, and safe (no injected HTML). */
function CertificateImage({ name, course, awarded, certId, verifyUrl, preview }: Omit<CertArt, "pxWidth">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={svgDataUri(buildCertificateSVG({ name, course, awarded, certId, verifyUrl, preview }))}
      alt={preview ? "Certificate preview" : `Certificate of ${course.kind} for ${cleanName(name)}`}
      style={{ display: "block", width: "100%", height: "auto" }}
      draggable={false}
    />
  );
}

// ── DOWNLOAD: SVG → Canvas → PNG (no dependencies) ───────────────────────────
async function downloadCertAsPNG(name: string, course: Course, awarded: string, certId: string, verifyUrl: string): Promise<void> {
  const scale = 3; // 3000 × 2121 px: sharp on any screen and when printed
  const svg = buildCertificateSVG({ name, course, awarded, certId, verifyUrl, preview: false, pxWidth: CW * scale });

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = CW * scale;
      canvas.height = CH * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error("Canvas unavailable")); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) { reject(new Error("PNG export failed")); return; }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(pngBlob);
        a.download = `DStarite_${course.key}_Certificate_${fileSafe(name)}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
        resolve();
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG failed to load into image"));
    };

    img.src = url;
  });
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
type Step = "enter" | "preview" | "pay" | "verify" | "done";

export default function AICertPage() {
  const [courses,      setCourses]      = useState<Course[]>([]);
  const [coursesState, setCoursesState] = useState<"loading" | "ready" | "error">("loading");
  const [courseKey,    setCourseKey]    = useState("");
  const [step,         setStep]         = useState<Step>("enter");
  const [fullName,     setFullName]     = useState("");
  const [nameError,    setNameError]    = useState("");
  const [unlockCode,   setUnlockCode]   = useState("");
  const [codeError,    setCodeError]    = useState("");
  const [checking,     setChecking]     = useState(false);
  const [certId,       setCertId]       = useState("");
  const [awarded,      setAwarded]      = useState("");
  const [downloading,  setDownloading]  = useState(false);
  const [dlError,      setDlError]      = useState("");

  function loadCourses() {
    setCoursesState("loading");
    fetch("/api/certificate/courses")
      .then((r) => r.json())
      .then((d) => { setCourses(d.courses ?? []); setCoursesState("ready"); })
      .catch(() => setCoursesState("error"));
  }
  useEffect(loadCourses, []);

  const course = courses.find((c) => c.key === courseKey) ?? null;
  const paid = !!course && course.fee > 0;
  const name = cleanName(fullName);
  const verifyUrl = certId
    ? `${SITE}/verify?id=${encodeURIComponent(certId)}&n=${encodeURIComponent(name)}`
    : "";
  const groups = Array.from(new Set(courses.map((c) => c.group)));

  function handlePreview() {
    if (!course) {
      setNameError("Please choose the course you completed.");
      return;
    }
    if (name.length < 3) {
      setNameError("Please enter your full name (at least 3 characters).");
      return;
    }
    if (name.length > MAX_NAME_LENGTH) {
      setNameError(`Please use ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }
    setNameError("");
    setStep("preview");
  }

  // The unlock code is issued by you (/certificate-admin) and checked on the server.
  async function handleVerify() {
    if (!course) return;
    if (!unlockCode.trim()) {
      setCodeError("Please enter the unlock code we sent you.");
      return;
    }
    setChecking(true);
    setCodeError("");
    try {
      const res = await fetch("/api/certificate/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, courseKey: course.key, code: unlockCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.certificateId) {
        setCertId(data.certificateId);
        setAwarded(periodLabel(data.period));
        setStep("done");
      } else {
        setCodeError(data.error || "We could not check your code. Please try again or message us on WhatsApp.");
      }
    } catch {
      setCodeError("We could not reach the server. Please check your connection and try again.");
    } finally {
      setChecking(false);
    }
  }

  async function handleDownload() {
    if (!course) return;
    setDownloading(true);
    setDlError("");
    try {
      await downloadCertAsPNG(name, course, awarded, certId, verifyUrl);
    } catch (err) {
      console.error(err);
      setDlError("Download failed. Please try again or contact us on WhatsApp.");
    } finally {
      setDownloading(false);
    }
  }

  // ── SHARED STYLES ───────────────────────────────────────────────────────────
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: `linear-gradient(180deg,${BRAND.white} 0%,${BRAND.mint} 45%,${BRAND.white} 100%)`,
    fontFamily: "'Inter','Segoe UI',sans-serif",
    color: BRAND.ink,
    padding: "0 16px 60px",
  };

  const cardStyle: React.CSSProperties = {
    background: BRAND.white,
    border: `1px solid ${BRAND.line}`,
    borderRadius: "16px",
    padding: "36px 32px",
    maxWidth: "560px",
    margin: "0 auto",
    boxShadow: "0 4px 24px rgba(14,124,65,0.06)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: BRAND.mint,
    border: `1.5px solid ${BRAND.mintBorder}`,
    borderRadius: "10px",
    color: BRAND.ink,
    fontSize: "17px",
    outline: "none",
    boxSizing: "border-box",
  };

  const btnPrimary: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    background: BRAND.green,
    color: BRAND.white,
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    color: BRAND.green,
    marginBottom: "8px",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  };

  const errorStyle: React.CSSProperties = {
    color: "#C0392B",
    fontSize: "13px",
    marginTop: "8px",
    fontWeight: 500,
  };

  const stepDot = (n: number, label: string, active: boolean, done: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: "7px", opacity: done || active ? 1 : 0.35 }}>
      <div style={{
        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
        background: done ? BRAND.greenDark : active ? BRAND.green : BRAND.mint,
        border: done || active ? "none" : `1px solid ${BRAND.mintBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: 800,
        color: done || active ? BRAND.white : BRAND.muted,
      }}>
        {done ? "✓" : n}
      </div>
      <span style={{ fontSize: "12px", fontWeight: active ? 700 : 400, color: active ? BRAND.greenDeep : BRAND.muted }}>
        {label}
      </span>
    </div>
  );
  const divider = <div style={{ width: "20px", height: "1px", background: BRAND.mintBorder, alignSelf: "center", flexShrink: 0 }} />;

  const isDone    = step === "done";
  const isPay     = step === "pay";
  const isVerify  = step === "verify";
  const isPreview = step === "preview";
  const isEnter   = step === "enter";

  return (
    <main style={pageStyle}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "56px 0 36px" }}>
        <span style={{
          display: "inline-block",
          background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`,
          color: BRAND.greenDark, padding: "5px 14px", borderRadius: "100px",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "18px",
        }}>
          D-Starite Technologies Academy
        </span>
        <h1 style={{
          fontSize: "clamp(26px,6vw,46px)", fontWeight: 900, lineHeight: 1.1,
          letterSpacing: "-0.02em", margin: "0 auto 12px", maxWidth: "580px",
          color: BRAND.greenDeep,
        }}>
          Get Your<br />
          <span style={{ color: BRAND.green }}>Certificate</span>
        </h1>
        <p style={{ color: BRAND.muted, fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
          Choose the course you completed, enter your name exactly as you want it on your certificate, preview it, and download.
        </p>
      </div>

      {/* ── PROGRESS ─────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(8px,3vw,28px)", marginBottom: "36px", flexWrap: "wrap", padding: "0 12px" }}>
        {stepDot(1, "Course",   isEnter,   !isEnter)}
        {divider}
        {stepDot(2, "Preview",  isPreview, isPay || isVerify || isDone)}
        {divider}
        {stepDot(3, course && !paid ? "Request" : "Pay", isPay, isVerify || isDone)}
        {divider}
        {stepDot(4, "Unlock",   isVerify,  isDone)}
        {divider}
        {stepDot(5, "Download", isDone,    false)}
      </div>

      {/* ── STEP 1: Course + name ────────────────────────── */}
      {step === "enter" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
            Which course did you complete?
          </h2>
          <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
            Choose your course, then enter your name exactly as it should appear. It cannot be changed after your code is issued.
          </p>

          <label htmlFor="cert-course" style={labelStyle}>Course</label>
          {coursesState === "loading" && <p style={{ color: BRAND.muted, fontSize: "14px", margin: "0 0 20px" }}>Loading courses…</p>}
          {coursesState === "error" && (
            <div style={{ marginBottom: "20px" }}>
              <p role="alert" style={{ ...errorStyle, marginTop: 0 }}>⚠️ We could not load the course list.</p>
              <button onClick={loadCourses} style={{ marginTop: "8px", padding: "10px 16px", background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "8px", color: BRAND.greenDeep, fontWeight: 700, cursor: "pointer" }}>
                Try again
              </button>
            </div>
          )}
          {coursesState === "ready" && (
            <select
              id="cert-course"
              value={courseKey}
              onChange={(e) => { setCourseKey(e.target.value); setNameError(""); }}
              style={{ ...inputStyle, marginBottom: "20px" }}
            >
              <option value="">Select your course…</option>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {courses.filter((c) => c.group === g).map((c) => (
                    <option key={c.key} value={c.key}>{c.title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          )}

          <label htmlFor="cert-name" style={labelStyle}>Full Name</label>
          <input
            id="cert-name"
            type="text"
            placeholder="e.g. Adaeze Chukwuemeka"
            value={fullName}
            maxLength={MAX_NAME_LENGTH + 10}
            onChange={(e) => { setFullName(e.target.value); setNameError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handlePreview()}
            style={inputStyle}
          />
          {nameError && <p role="alert" style={errorStyle}>⚠️ {nameError}</p>}
          <button onClick={handlePreview} disabled={coursesState !== "ready"} style={{ ...btnPrimary, marginTop: "22px", opacity: coursesState === "ready" ? 1 : 0.6 }}>
            Preview My Certificate →
          </button>
        </div>
      )}

      {/* ── STEP 2: Preview ──────────────────────────────── */}
      {step === "preview" && course && (
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <div style={{
            background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`,
            borderRadius: "16px", padding: "16px", marginBottom: "20px",
            boxShadow: "0 4px 24px rgba(14,124,65,0.06)",
          }}>
            <p style={{ fontSize: "11px", color: BRAND.greenDark, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px", textAlign: "center" }}>
              Preview: the watermark is removed, and your certificate number and QR code are added, once your code is issued
            </p>
            <CertificateImage name={name} course={course} awarded={monthYearNow()} preview />
          </div>
          <div style={{ ...cardStyle, maxWidth: "820px" }}>
            <p style={{ fontSize: "15px", color: BRAND.ink, marginBottom: "18px", lineHeight: 1.6 }}>
              <strong style={{ color: BRAND.greenDeep }}>{course.title}</strong> for <strong style={{ color: BRAND.greenDeep }}>&ldquo;{name}&rdquo;</strong>
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => setStep("enter")} style={{
                flex: 1, minWidth: "110px", padding: "13px",
                background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`,
                color: BRAND.greenDeep, borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer",
              }}>
                ← Edit
              </button>
              <button onClick={() => setStep("pay")} style={{ ...btnPrimary, flex: 2, minWidth: "160px", width: "auto" }}>
                {paid ? "Pay & Get Certificate →" : "Request My Certificate →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: Pay (paid courses) or Request (included in programme fee) ── */}
      {step === "pay" && course && (
        <div style={cardStyle}>
          {paid ? (
            <>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
                Complete Payment
              </h2>
              <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "22px" }}>
                Transfer to the account below, then tap the WhatsApp button to send your receipt. We&apos;ll reply with your unlock code.
              </p>

              {/* Bank details */}
              <div style={{ background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "12px", padding: "18px 20px", marginBottom: "18px" }}>
                <p style={{ fontSize: "11px", color: BRAND.greenDark, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Bank Transfer Details
                </p>
                {([
                  ["Amount",         formatFee(course.fee)],
                  ["Account Number", ACCOUNT_NUMBER],
                  ["Account Name",   ACCOUNT_NAME],
                  ["Bank",           BANK],
                ] as [string,string][]).map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${BRAND.mintBorder}` }}>
                    <span style={{ fontSize: "13px", color: BRAND.muted }}>{label}</span>
                    <span style={{ fontSize: label === "Amount" ? "20px" : "14px", fontWeight: label === "Amount" ? 900 : 700, color: BRAND.greenDeep, textAlign: "right" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div style={{ background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "12px", padding: "14px 18px", marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: BRAND.greenDark, marginBottom: "8px" }}>After payment:</p>
                {["Save your payment receipt (screenshot)", "Tap the button below to open WhatsApp", "Send the pre-filled message + attach receipt", "We'll reply with your unlock code within minutes"].map((s, i) => (
                  <p key={i} style={{ fontSize: "13px", color: BRAND.ink, marginBottom: "5px" }}>{i + 1}. {s}</p>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
                Request Your Certificate
              </h2>
              <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "22px", lineHeight: 1.6 }}>
                Your certificate for <strong style={{ color: BRAND.greenDeep }}>{course.title}</strong> is included in your programme fee, so there is nothing to pay here.
                Send us a request on WhatsApp. We confirm you completed the course, then send your unlock code.
              </p>
              <div style={{ background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "12px", padding: "14px 18px", marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: BRAND.greenDark, marginBottom: "8px" }}>What happens next:</p>
                {["Tap the button below to open WhatsApp", "Send the pre-filled request", "We confirm your completion and reply with your unlock code"].map((s, i) => (
                  <p key={i} style={{ fontSize: "13px", color: BRAND.ink, marginBottom: "5px" }}>{i + 1}. {s}</p>
                ))}
              </div>
            </>
          )}

          {/* WhatsApp CTA */}
          <a
            href={buildWALink(name, course)}
            target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", textDecoration: "none", marginBottom: "10px",
              background: "#25D366", color: "#fff", padding: "15px", borderRadius: "10px",
              fontWeight: 700, fontSize: "16px", cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ verticalAlign: "middle", marginRight: "8px", marginBottom: "2px" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {paid ? "I've Paid: Send Receipt on WhatsApp" : "Request My Unlock Code on WhatsApp"}
          </a>

          <button onClick={() => setStep("verify")} style={{
            width: "100%", padding: "12px", background: "transparent",
            border: `1px solid ${BRAND.mintBorder}`, color: BRAND.muted,
            borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer",
          }}>
            I already have an unlock code →
          </button>
        </div>
      )}

      {/* ── STEP 4: Unlock code ───────────────────────────── */}
      {step === "verify" && course && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
            Enter Your Unlock Code
          </h2>
          <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
            We sent your personal unlock code on WhatsApp. It only works for <strong style={{ color: BRAND.greenDeep }}>{name}</strong> and <strong style={{ color: BRAND.greenDeep }}>{course.title}</strong>.
          </p>
          <label htmlFor="cert-code" style={labelStyle}>Unlock Code</label>
          <input
            id="cert-code"
            type="text"
            placeholder="Enter code"
            value={unlockCode}
            onChange={(e) => { setUnlockCode(e.target.value.toUpperCase()); setCodeError(""); }}
            onKeyDown={(e) => e.key === "Enter" && !checking && handleVerify()}
            style={{ ...inputStyle, letterSpacing: "0.15em", fontSize: "22px", textAlign: "center", textTransform: "uppercase" }}
            autoComplete="off"
            autoFocus
          />
          {codeError && <p role="alert" style={errorStyle}>⚠️ {codeError}</p>}
          <button onClick={handleVerify} disabled={checking} style={{ ...btnPrimary, marginTop: "22px", marginBottom: "12px", opacity: checking ? 0.7 : 1 }}>
            {checking ? "Checking…" : "Unlock My Certificate →"}
          </button>
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", color: "#128C7E", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
            💬 Haven&apos;t received your code? Message us on WhatsApp
          </a>
        </div>
      )}

      {/* ── STEP 5: Download ─────────────────────────────── */}
      {step === "done" && course && (
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          {/* Success */}
          <div role="status" style={{
            background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`,
            borderRadius: "12px", padding: "16px 20px", marginBottom: "20px", textAlign: "center",
          }}>
            <p style={{ fontSize: "24px", marginBottom: "4px" }}>🎉</p>
            <p style={{ fontWeight: 800, fontSize: "16px", color: BRAND.greenDark, marginBottom: "4px" }}>
              Certificate unlocked!
            </p>
            <p style={{ fontSize: "13px", color: BRAND.muted }}>
              {course.title} · ready to download for <strong style={{ color: BRAND.greenDeep }}>{name}</strong>
            </p>
          </div>

          {/* Certificate */}
          <div style={{ background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "16px", padding: "16px", marginBottom: "20px", boxShadow: "0 4px 24px rgba(14,124,65,0.06)" }}>
            <CertificateImage name={name} course={course} awarded={awarded} certId={certId} verifyUrl={verifyUrl} preview={false} />
          </div>

          {/* Download */}
          <div style={{ ...cardStyle, maxWidth: "820px" }}>
            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{ ...btnPrimary, marginBottom: "10px", opacity: downloading ? 0.7 : 1, background: BRAND.greenDark }}
            >
              {downloading ? "Generating…" : "⬇️  Download Certificate (PNG)"}
            </button>
            {dlError && <p role="alert" style={errorStyle}>⚠️ {dlError}</p>}
            <p style={{ fontSize: "12px", color: BRAND.muted, textAlign: "center", lineHeight: 1.6, marginBottom: "20px" }}>
              Downloads as a high-resolution PNG (3000 × 2121 px), ready to share on LinkedIn, WhatsApp, or print.
            </p>
            <div style={{ background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "10px", padding: "12px 16px", marginBottom: "18px", fontSize: "13px", color: BRAND.ink, lineHeight: 1.6, textAlign: "center" }}>
              Certificate no. <strong style={{ fontFamily: "Consolas, 'Courier New', monospace" }}>{certId}</strong>. Anyone can confirm it is genuine by scanning the QR code or visiting{" "}
              <a href={verifyUrl} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.green, fontWeight: 700 }}>
                {SITE.replace("https://www.", "")}/verify
              </a>.
            </div>
            <div style={{ borderTop: `1px solid ${BRAND.line}`, paddingTop: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: BRAND.muted, marginBottom: "8px" }}>Share your achievement</p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`I just received my ${course.heading} certificate from D-Starite Technologies Academy! 🎓\n\nVerify it here: ${verifyUrl}`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "14px", color: "#128C7E", fontWeight: 700, textDecoration: "none" }}
              >
                📤 Share on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ───────────────────────────────────────── */}
      <p style={{ textAlign: "center", marginTop: "48px", fontSize: "12px", color: BRAND.muted }}>
        Questions? Chat us on{" "}
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
          style={{ color: BRAND.green, fontWeight: 600, textDecoration: "none" }}>WhatsApp</a>
        {" · "}
        <a href="https://www.dstariteitsolutions.online" style={{ color: BRAND.green, textDecoration: "none" }}>
          dstariteitsolutions.online
        </a>
      </p>
    </main>
  );
}