/** Educational arithmetic on measured inputs; null means unavailable, never zero. */
const finite = (...v: number[]) => v.every(Number.isFinite);
export function lipidCalculations(tc: number, hdl: number, tg: number) {
  if (!finite(tc, hdl, tg) || tc <= 0 || hdl < 0 || hdl >= tc || tg < 0) return { friedewald: null, sampson: null, nonHdl: null };
  const nonHdl = tc - hdl;
  const f = nonHdl - tg / 5;
  const s = tc / .948 - hdl / .971 - (tg / 8.56 + tg * nonHdl / 2140 - tg * tg / 16100) - 9.44;
  return { nonHdl, friedewald: tg < 400 && f >= 0 ? f : null, sampson: tg <= 800 && s >= 0 ? s : null };
}
export function fib4(age: number, ast: number, alt: number, platelets: number) {
  if (!finite(age, ast, alt, platelets) || age < 18 || ast < 0 || alt <= 0 || platelets <= 0) return null;
  return age * ast / (platelets * Math.sqrt(alt));
}
export function calciumClearance(urineCa: number, serumCr: number, serumCa: number, urineCr: number) {
  if (!finite(urineCa, serumCr, serumCa, urineCr) || urineCa < 0 || serumCr <= 0 || serumCa <= 0 || urineCr <= 0) return null;
  return urineCa * serumCr / (serumCa * urineCr);
}
export function washout(native: number, enhanced: number, delayed: number) {
  if (!finite(native, enhanced, delayed) || enhanced <= native || enhanced <= 0 || delayed > enhanced) return null;
  return { absolute: 100 * (enhanced - delayed) / (enhanced - native), relative: 100 * (enhanced - delayed) / enhanced };
}
export function gepGrade(ki67: number, mitoses: number, differentiation: 'well' | 'poor' | 'unknown', site: 'digestive' | 'lung') {
  if (!finite(ki67, mitoses) || ki67 < 0 || ki67 > 100 || mitoses < 0) return 'Nieprawidłowe dane';
  if (site === 'lung') return 'Płuco: klasyfikacja narządowa — ocena morfologii, mitoz i martwicy';
  if (differentiation === 'unknown') return 'Brak oceny zróżnicowania — nie rozstrzygaj NET vs NEC';
  if (differentiation === 'poor') return 'NEC — rozpoznanie morfologiczne';
  return ki67 > 20 || mitoses > 20 ? 'NET G3' : ki67 >= 3 || mitoses >= 2 ? 'NET G2' : 'NET G1';
}
export function hyperglycemicCriteria(glucose: number, sodium: number, urea: number, ketones: number, ph: number, bicarbonate: number, diabetesKnown: boolean) {
  if (!finite(glucose, sodium, urea, ketones, ph, bicarbonate) || glucose <= 0 || sodium <= 0 || urea < 0 || ketones < 0 || ph < 6 || ph > 8 || bicarbonate <= 0) return null;
  const effective = 2 * sodium + glucose / 18;
  const total = effective + urea; // urea in mmol/L, NOT BUN mg/dL
  const dka = (glucose >= 200 || diabetesKnown) && ketones >= 3 && (ph < 7.3 || bicarbonate < 18);
  const hhs = glucose >= 600 && (effective > 300 || total > 320) && ketones < 3 && ph >= 7.3 && bicarbonate >= 15;
  return { effective, total, dka, hhs, mixed: glucose >= 600 && (effective > 300 || total > 320) && (ketones >= 3 || ph < 7.3 || bicarbonate < 18) };
}
export function volumeDoubling(d1: number, d2: number, days: number) {
  if (!finite(d1, d2, days) || d1 <= 0 || d2 <= d1 || days <= 0) return null;
  return days * Math.LN2 / Math.log((d2 / d1) ** 3);
}
