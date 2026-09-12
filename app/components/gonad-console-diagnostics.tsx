'use client';
import { useState } from 'react';
import { Scale, AlertTriangle, Stethoscope, HeartPulse } from 'lucide-react';
import { calculateVermeulen } from '../../lib/gonad-simulator';

export function GonadConsoleDiagnostics() {
  // Stan kalkulatora Vermeulena
  const [totalT, setTotalT] = useState<number>(12.0); // nmol/L
  const [shbg, setShbg] = useState<number>(35.0); // nmol/L
  const [albumin, setAlbumin] = useState<number>(43.0); // g/L

  // Stan symulatora różnicowania hipogonadyzmu
  const [hypoType, setHypoType] = useState<'primary' | 'secondary' | 'altered_shbg'>('primary');
  const [hematocrit, setHematocrit] = useState<number>(48.0); // %
  const [fertilityDesired, setFertilityDesired] = useState<boolean>(false);

  const result = calculateVermeulen(totalT, shbg, albumin);
  const isShbgExtreme = shbg < 15 || shbg > 80;
  const isCriticallyHighHct = hematocrit > 54.0;

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Stethoscope size={20} color="#0284c7" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Diagnostyka Hipogonadyzmu Męskiego i Frakcje Testosteronu
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
        Rozpoznanie hipogonadyzmu wymaga potwierdzenia objawów klinicznych oraz dwukrotnego porannego oznaczenia testosteronu całkowitego na czczo. Przy zaburzeniach SHBG kluczowe jest wyliczenie wolnego testosteronu (cFT) wzorem Vermeulena.
      </p>

      {/* SEKCJA 1: KALKULATOR VERMEULENA */}
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Scale size={18} color="#0369a1" />
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            Kalkulator równania Vermeulena (prawo działania mas) vs wskaźnik FAI
          </h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Testosteron całkowity (TT):</span>
              <strong>{totalT} nmol/l</strong>
            </label>
            <input
              type="range"
              min="1.0"
              max="35.0"
              step="0.5"
              value={totalT}
              onChange={e => setTotalT(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '10px', color: '#64748b' }}>{(totalT * 28.84).toFixed(0)} ng/dl</span>
          </div>

          <div>
            <label style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>SHBG:</span>
              <strong>{shbg} nmol/l</strong>
            </label>
            <input
              type="range"
              min="8.0"
              max="120.0"
              step="1"
              value={shbg}
              onChange={e => setShbg(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '10px', color: shbg < 15 ? '#b45309' : shbg > 70 ? '#7c2d12' : '#64748b' }}>
              {shbg < 15 ? '↓ Otyłość / insulinooporność' : shbg > 70 ? '↑ Wiek / nadczynność / marskość' : 'Zakres prawidłowy'}
            </span>
          </div>

          <div>
            <label style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Albumina surowicy:</span>
              <strong>{albumin} g/l</strong>
            </label>
            <input
              type="range"
              min="28.0"
              max="52.0"
              step="1"
              value={albumin}
              onChange={e => setAlbumin(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '10px', color: '#64748b' }}>Stała Ka = 3,6×10⁴ M⁻¹</span>
          </div>
        </div>

        {isShbgExtreme && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', color: '#92400e', fontSize: '11px', marginBottom: '12px' }}>
            <AlertTriangle size={16} />
            <span>
              <strong>Pułapka SHBG ({shbg} nmol/l):</strong> Wskaźnik FAI (Free Androgen Index) traci wiarygodność matematyczną poza zakresem eugonadalnym! Prawidłowa ocena wymaga wyliczenia cFT wg Vermeulena lub oznaczenia dializą równowagową.
            </span>
          </div>
        )}

        {/* Wyniki frakcji Vermeulena */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', textAlign: 'center' }}>
          <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '10px', color: '#1e40af', fontWeight: 600 }}>Wolny testosteron (cFT)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8' }}>{result.freeT_pmol} <span style={{ fontSize: '11px' }}>pmol/l</span></div>
            <div style={{ fontSize: '11px', color: '#3b82f6' }}>{result.freeT_ng_dl} ng/dl ({result.freeT_percent}%)</div>
            <div style={{ fontSize: '10px', color: result.freeT_pmol < 220 ? '#dc2626' : '#16a34a', marginTop: '2px', fontWeight: 600 }}>
              {result.freeT_pmol < 220 ? '↓ Obniżony wolny T (<220 pmol/l)' : 'Norma wolnego T (≥220 pmol/l)'}
            </div>
          </div>

          <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#475569', fontWeight: 600 }}>Biodostępny T (Bio-T)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{result.bioavailableT_nmol} <span style={{ fontSize: '11px' }}>nmol/l</span></div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{result.bioavailableT_percent}% całkowitego T</div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Frakcja wolna + związana z albuminą</div>
          </div>

          <div style={{ padding: '10px', background: isShbgExtreme ? '#fef2f2' : '#f1f5f9', borderRadius: '8px', border: '1px dashed', borderColor: isShbgExtreme ? '#fca5a5' : '#cbd5e1' }}>
            <div style={{ fontSize: '10px', color: isShbgExtreme ? '#991b1b' : '#64748b', fontWeight: 700 }}>Wskaźnik FAI</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: isShbgExtreme ? '#dc2626' : '#334155' }}>{result.fai}</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>(100 × TT / SHBG) — niemiarodajny u mężczyzn</div>
          </div>
        </div>
      </div>

      {/* SEKCJA 2: DRZEWO DECYZYJNE HIPOGONADYZMU I BEZPIECZEŃSTWO TRT */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <HeartPulse size={18} color="#dc2626" />
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            Klasyfikacja etiologiczna EAU / Endocrine Society i bezpieczeństwo TRT
          </h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Wzorzec laboratoryjny osi:
            </label>
            <select
              value={hypoType}
              onChange={e => setHypoType(e.target.value as typeof hypoType)}
              style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="primary">Hipogonadyzm pierwotny (LH/FSH podwyższone)</option>
              <option value="secondary">Hipogonadyzm wtórny (LH/FSH niskie/nieadekwatne)</option>
              <option value="altered_shbg">Pozorny hipogonadyzm (izolowane wahania SHBG)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Monitorowanie hematokrytu (Hct): <strong>{hematocrit}%</strong>
            </label>
            <input
              type="range"
              min="40"
              max="60"
              step="0.5"
              value={hematocrit}
              onChange={e => setHematocrit(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
            <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={fertilityDesired}
                onChange={e => setFertilityDesired(e.target.checked)}
              />
              <span style={{ fontWeight: 700, color: fertilityDesired ? '#dc2626' : '#334155' }}>
                Pacjent planuje potomstwo w najbliższym czasie
              </span>
            </label>
          </div>
        </div>

        {/* Interpretacja kliniczna i zalecenia */}
        <div style={{ padding: '12px', borderRadius: '8px', background: isCriticallyHighHct || fertilityDesired ? '#fef2f2' : '#f0fdf4', border: '1px solid', borderColor: isCriticallyHighHct || fertilityDesired ? '#fecaca' : '#bbf7d0' }}>
          {isCriticallyHighHct && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              <span>BEZWZGLĘDNA INTERWENCJA: Hematokryt {hematocrit}% (&gt;54%)!</span>
            </div>
          )}
          {fertilityDesired && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              <span>PRZECIWWSKAZANIE DO TRT: Chęć zachowania płodności! Egzogenny testosteron hamuje spermatogenezę!</span>
            </div>
          )}

          <div style={{ fontSize: '11px', color: '#1e293b', lineHeight: 1.5 }}>
            {hypoType === 'primary' && (
              <div>
                <strong>Postać pierwotna (hipergonadotropowa):</strong> Niewydolność komórek Leydiga (np. zespół Klinefeltera 47,XXY, pourazowe, pozapalne, po chemio/radioterapii). Wysokie LH i FSH dowodzą prawidłowej odpowiedzi przysadki.
                {fertilityDesired ? (
                  <p style={{ margin: '4px 0 0', color: '#dc2626' }}>
                    <strong>Postępowanie:</strong> Standardowa TRT definitywnie zablokuje resztkową spermatogenezę. Przed leczeniem konieczne badanie nasienia i ewentualna kriokonserwacja / biopsja TESE!
                  </p>
                ) : (
                  <p style={{ margin: '4px 0 0', color: '#166534' }}>
                    <strong>Postępowanie:</strong> Wskazana substytucja testosteronem (TRT) z celem stężenia w środkowym przedziale normy (400–700 ng/dl, 14–24 nmol/l). Kontrola Hct, PSA i parametrów wątrobowych po 3, 6 i 12 miesiącach.
                  </p>
                )}
              </div>
            )}

            {hypoType === 'secondary' && (
              <div>
                <strong>Postać wtórna (hipogonadotropowa):</strong> Niewydolność przysadki lub podwzgórza (np. gruczolaki przysadki, hiperprolaktynemia, hemochromatoza, leczenie opioidami/sterydami, otyłość olbrzymia). Niskie lub nieadekwatnie prawidłowe LH/FSH.
                {fertilityDesired ? (
                  <p style={{ margin: '4px 0 0', color: '#2563eb' }}>
                    <strong>Leczenie prokreacyjne z wyboru:</strong> Indukcja spermatogenezy gonadotropinami — hCG (1000–2000 IU 2–3×/tydz.) w celu stymulacji komórek Leydiga + rFSH (75–150 IU 2–3×/tydz.) dla komórek Sertolego. Alternatywnie u wybranych pacjentów: SERM (klomifen) przy zachowanej rezerwie przysadki.
                  </p>
                ) : (
                  <p style={{ margin: '4px 0 0', color: '#166534' }}>
                    <strong>Postępowanie:</strong> Diagnostyka MRI okolicy podwzgórzowo-przysadkowej, ocena prolaktyny i żelaza. W przypadku braku planów prokreacyjnych kwalifikacja do TRT.
                  </p>
                )}
              </div>
            )}

            {hypoType === 'altered_shbg' && (
              <div>
                <strong>Pozorne zaburzenie stężeń testosteronu:</strong> Niski testosteron całkowity przy prawidłowym cFT ({result.freeT_pmol} pmol/l) wynika z obniżenia SHBG (otyłość brzuszna, zespół metaboliczny, stłuszczenie wątroby). Pacjent jest eugonadalny tkankowo.
                <p style={{ margin: '4px 0 0', color: '#0369a1' }}>
                  <strong>Postępowanie:</strong> TRT nie jest wskazana! Leczeniem z wyboru jest redukcja masy ciała, leczenie insulinooporności i modyfikacja stylu życia, co przywraca prawidłową syntezę SHBG.
                </p>
              </div>
            )}

            {isCriticallyHighHct && (
              <div style={{ marginTop: '8px', padding: '6px 8px', background: '#fee2e2', borderRadius: '4px', color: '#991b1b', fontWeight: 600 }}>
                Zalecenie hematologiczne: Bezwzględne wstrzymanie TRT lub zmniejszenie dawki, nawodnienie pacjenta oraz wykonanie upustu krwi (flebotomii 400–500 ml) do czasu uzyskania Hct &lt;50%.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
