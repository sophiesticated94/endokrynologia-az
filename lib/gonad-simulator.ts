// Simulator logic for Gonads & Reproductive Medicine (Module 06)

export interface VermeulenResult {
  freeT_pmol: number;
  freeT_ng_dl: number;
  freeT_percent: number;
  bioavailableT_nmol: number;
  bioavailableT_percent: number;
  fai: number;
}

export function calculateVermeulen(totalT_nmol: number, shbg_nmol: number, alb_g_l: number = 43): VermeulenResult {
  if (![totalT_nmol, shbg_nmol, alb_g_l].every(Number.isFinite) || totalT_nmol < 0 || shbg_nmol <= 0 || alb_g_l <= 0) throw new RangeError('Invalid measured testosterone, SHBG or albumin');
  const tMol = totalT_nmol * 1e-9;
  const shbgMol = shbg_nmol * 1e-9;
  const albMol = (alb_g_l / 66437); // Human serum albumin Mw ~66.4 kDa
  const Ks = 1.0e9; // SHBG association constant (L/mol)
  const Ka = 3.6e4; // Albumin association constant (L/mol)

  const N = 1 + Ka * albMol;
  const a = N * Ks;
  const b = N + Ks * (shbgMol - tMol);
  const c = -tMol;

  const delta = Math.max(0, b * b - 4 * a * c);
  const freeTMol = b >= 0 ? (-2 * c) / (b + Math.sqrt(delta)) : (-b + Math.sqrt(delta)) / (2 * a);
  const freeT_pmol = freeTMol * 1e12;
  const freeT_ng_dl = (freeT_pmol * 288.42) / 10000; // pmol/L to ng/dL
  const freeT_percent = totalT_nmol > 0 ? (freeTMol / tMol) * 100 : 0;

  const bioMol = freeTMol * (1 + Ka * albMol);
  const bioavailableT_nmol = bioMol * 1e9;
  const bioavailableT_percent = totalT_nmol > 0 ? (bioMol / tMol) * 100 : 0;

  const fai = shbg_nmol > 0 ? (100 * totalT_nmol) / shbg_nmol : 0;

  return {
    freeT_pmol: Math.round(freeT_pmol * 10) / 10,
    freeT_ng_dl: Math.round(freeT_ng_dl * 100) / 100,
    freeT_percent: Math.round(freeT_percent * 100) / 100,
    bioavailableT_nmol: Math.round(bioavailableT_nmol * 10) / 10,
    bioavailableT_percent: Math.round(bioavailableT_percent * 10) / 10,
    fai: Math.round(fai * 10) / 10,
  };
}
