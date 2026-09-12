'use client';
import { useState, useMemo } from 'react';
import { ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export type GonadPhenotype = 'male' | 'female' | 'post_gonadectomy' | 'primary_hypo';
export type BaselineAxis = 'normal' | 'secondary_hypo' | 'pcos';
export type DrugKey =
  | 'estradiol'
  | 'testosterone'
  | 'progestin'
  | 'gnrh_agonist'
  | 'gnrh_antagonist'
  | 'hcg'
  | 'serm'
  | 'aromatase_inhibitor'
  | 'spironolactone'
  | 'cyproterone'
  | 'finasteride';

interface DrugConfig {
  key: DrugKey;
  label: string;
  category: string;
  mechanism: string;
}

const AVAILABLE_DRUGS: DrugConfig[] = [
  { key: 'estradiol', label: 'Estradiol (E2)', category: 'Estrogeny', mechanism: 'Aktywacja ERα/ERβ, ujemne sprzężenie na LH/FSH (lub dodatnie w fazie przedowulacyjnej)' },
  { key: 'testosterone', label: 'Testosteron (T)', category: 'Androgeny', mechanism: 'Aktywacja AR, ujemne sprzężenie podwzgórzowo-przysadkowe, aromatyzacja do E2' },
  { key: 'progestin', label: 'Progesteron / Progestagen', category: 'Progestageny', mechanism: 'Aktywacja PR, silne hamowanie pulsacji GnRH i wyrzutu LH, transformacja endometrium' },
  { key: 'gnrh_agonist', label: 'Agonista GnRH (np. leuprorelina)', category: 'Modulatory GnRH', mechanism: 'Faza ostra: flare wyrzutu LH/FSH; Faza przewlekła: desensytyzacja i supresja osi' },
  { key: 'gnrh_antagonist', label: 'Antagonista GnRH (np. cetroreliks)', category: 'Modulatory GnRH', mechanism: 'Natychmiastowe kompetencyjne blokowanie receptora GnRHR bez efektu flare' },
  { key: 'hcg', label: 'hCG (Choriogonadotropina)', category: 'Gonadotropiny', mechanism: 'Agonista receptora LH/CGR w komórkach Leydiga/ziarnistych, pobudza syntezę T i dojrzewanie' },
  { key: 'serm', label: 'SERM (np. klomifen / tamoksyfen)', category: 'Modulatory receptora', mechanism: 'Blokada ER w podwzgórzu/przysadce znosząca ujemne sprzężenie → wzrost LH i FSH' },
  { key: 'aromatase_inhibitor', label: 'Inhibitor aromatazy (np. letrozol)', category: 'Inhibitory enzymów', mechanism: 'Blokada konwersji androgenów do estrogenów, spadek E2, odhamowanie osi HPG' },
  { key: 'spironolactone', label: 'Spironolakton', category: 'Antyandrogeny', mechanism: 'Blokada MR oraz receptora AR, słabe hamowanie 17α-hydroksylazy / 17,20-liazy' },
  { key: 'cyproterone', label: 'Octan cyproteronu (CPA)', category: 'Antyandrogeny / Progestageny', mechanism: 'Silna blokada AR oraz silne ośrodkowe hamowanie wydzielania gonadotropin (ujemne sprzężenie)' },
  { key: 'finasteride', label: 'Inhibitor 5α-reduktazy (finasteryd)', category: 'Inhibitory enzymów', mechanism: 'Hamowanie konwersji T do aktywnego 5α-DHT w tkankach docelowych (prostata, skóra)' },
];

export function GonadConsoleHpg() {
  const [phenotype, setPhenotype] = useState<GonadPhenotype>('male');
  const [baseline, setBaseline] = useState<BaselineAxis>('normal');
  const [selectedDrugs, setSelectedDrugs] = useState<Record<DrugKey, boolean>>({
    estradiol: false,
    testosterone: false,
    progestin: false,
    gnrh_agonist: false,
    gnrh_antagonist: false,
    hcg: false,
    serm: false,
    aromatase_inhibitor: false,
    spironolactone: false,
    cyproterone: false,
    finasteride: false,
  });
  const [e2Route, setE2Route] = useState<'transdermal' | 'oral'>('transdermal');
  const [tRoute, setTRoute] = useState<'transdermal' | 'injection'>('injection');
  const [duration, setDuration] = useState<'acute' | 'chronic'>('chronic');

  const toggleDrug = (key: DrugKey) => {
    setSelectedDrugs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Modelowanie wektorów zmian
  const simulation = useMemo(() => {
    const hasGonads = phenotype === 'male' || phenotype === 'female';
    const isMaleGonad = phenotype === 'male';
    const isFemaleGonad = phenotype === 'female';

    // Wektory wyjściowe
    let gnrh = phenotype === 'post_gonadectomy' || phenotype === 'primary_hypo' ? '↑↑' : baseline === 'secondary_hypo' ? '↓↓' : 'N';
    let lh = phenotype === 'post_gonadectomy' || phenotype === 'primary_hypo' ? '↑↑ (brak sprzężenia)' : baseline === 'secondary_hypo' ? '↓↓' : 'N (pulsacyjny)';
    let fsh = phenotype === 'post_gonadectomy' || phenotype === 'primary_hypo' ? '↑↑' : baseline === 'secondary_hypo' ? '↓↓' : 'N';
    let t = isMaleGonad ? 'N (fizjologiczny)' : 'N (niski bazowy)';
    let e2 = isFemaleGonad ? 'N (zależny od cyklu)' : 'N (niski fizjologiczny)';
    let dht = isMaleGonad ? 'N' : 'N (niski)';
    const p4 = isFemaleGonad ? 'N (faza zależna)' : 'N (śladowy)';
    let shbg = 'N (zakres referencyjny)';
    let arActivation = isMaleGonad ? 'Prawidłowa męska' : 'Niska fizjologiczna';
    let erActivation = isFemaleGonad ? 'Prawidłowa żeńska' : 'Niska fizjologiczna';

    const tissueNotes: string[] = [];
    const confidence = 'Wysoki poziom pewności co do kierunku regulacji pętli sprzężeń.';

    // Efekty leków
    const d = selectedDrugs;

    // GnRH Agonist vs Antagonist
    if (d.gnrh_agonist) {
      if (duration === 'acute') {
        gnrh = 'Przesycony stymulacją';
        lh = '↑↑ Wyrzut (flare effect)';
        fsh = '↑ Wyrzut (flare effect)';
        if (hasGonads) {
          t = isMaleGonad ? '↑↑ Przejściowy wyrzut T' : t;
          e2 = isFemaleGonad ? '↑↑ Przejściowy wyrzut E2' : e2;
          tissueNotes.push('Faza ostra agonisty: przejściowe zaostrzenie objawów zależnych od hormonów (flare).');
        }
      } else {
        gnrh = 'Ciągła desensytyzacja GnRHR';
        lh = '↓↓↓ Głęboka supresja (<0,5 IU/l)';
        fsh = '↓↓ Głęboka supresja';
        if (hasGonads) {
          t = '↓↓↓ Kastracja farmakologiczna (<20–50 ng/dl)';
          e2 = '↓↓↓ Supresja do stężeń pomenopauzalnych';
          dht = '↓↓↓ Spadek zależny od braku T';
          arActivation = 'Minimalna';
          erActivation = 'Minimalna';
          tissueNotes.push('Kastracja farmakologiczna: atrofia tkanek zależnych od hormonów płciowych, zatrzymanie gametogenezy.');
        }
      }
    }

    if (d.gnrh_antagonist) {
      gnrh = 'Zablokowany receptor GnRHR';
      lh = '↓↓↓ Natychmiastowa supresja (brak flare)';
      fsh = '↓↓ Natychmiastowa supresja';
      if (hasGonads) {
        t = isMaleGonad ? '↓↓↓ Spadek do kastracji' : t;
        e2 = isFemaleGonad ? '↓↓↓ Spadek do kastracji' : e2;
        arActivation = isMaleGonad ? 'Gwałtowny spadek' : arActivation;
      }
      tissueNotes.push('Blokada natychmiastowa bez fazy pobudzenia (zaleta w onkologii i protokołach IVF).');
    }

    // Egzogenny Testosteron
    if (d.testosterone) {
      t = tRoute === 'injection' ? '↑↑ Wysokie stężenia / piki' : '↑ Stabilny poziom eugonadalny';
      arActivation = '↑↑ Pełna aktywacja AR';
      dht = d.finasteride ? '↓↓ Obniżony przez lek' : '↑ Wzrost z konwersji 5α';
      if (hasGonads) {
        lh = '↓↓↓ Zablokowane ujemnym sprzężeniem';
        fsh = '↓↓↓ Zablokowane ujemnym sprzężeniem';
        tissueNotes.push('Egzogenny T blokuje intratestikularne stężenie T i hamuje spermatogenezę (ryzyko niepłodności!).');
      }
      tissueNotes.push('Wzrost hematokrytu (ryzyko erytrocytozy przy Hct >54%), stymulacja anabolizmu mięśniowego i kości.');
    }

    // Egzogenny Estradiol
    if (d.estradiol) {
      e2 = '↑↑ Stężenia terapeutyczne (cel GAHT 100–200 pg/ml)';
      erActivation = '↑↑ Pełna aktywacja ERα/ERβ';
      if (hasGonads) {
        lh = '↓↓ Zablokowane ujemnym sprzężeniem';
        fsh = '↓↓ Zablokowane ujemnym sprzężeniem';
      }
      if (e2Route === 'oral') {
        shbg = '↑↑ Wzrost (efekt pierwszego przejścia w wątrobie)';
        tissueNotes.push('Doustny E2: silny wzrost syntezy SHBG, TG oraz czynników krzepnięcia w wątrobie (wyższe ryzyko VTE).');
      } else {
        shbg = '↔ Neutralny wpływ na syntezę wątrobową';
        tissueNotes.push('Przezskórny E2: omija pierwsze przejście wątrobowe, bezpieczny profil zakrzepowo-zatorowy.');
      }
    }

    // SERM (Klomifen / Tamoksyfen)
    if (d.serm) {
      if (hasGonads && baseline !== 'secondary_hypo') {
        gnrh = '↑↑ Odhamowanie (brak percepcji E2)';
        lh = '↑↑ Pobudzenie wydzielania';
        fsh = '↑ Pobudzenie wydzielania';
        if (isMaleGonad) {
          t = '↑ Wzrost endogennej produkcji w jądrach';
          tissueNotes.push('SERM u mężczyzn: stymuluje endogenną produkcję T z zachowaniem spermatogenezy (alternatywa dla TRT).');
        }
      } else {
        tissueNotes.push('SERM wymaga sprawnej osi podwzgórze-przysadka; brak efektu przy niewydolności centralnej lub po gonadektomii.');
      }
    }

    // Inhibitor aromatazy
    if (d.aromatase_inhibitor) {
      e2 = '↓↓ Zablokowana aromatyzacja obwodowa';
      if (hasGonads && baseline !== 'secondary_hypo') {
        lh = '↑ Wzrost w odpowiedzi na brak E2';
        fsh = '↑ Wzrost stymulujący pęcherzyki/Leydiga';
        t = isMaleGonad ? '↑ Wzrost endogennego T i stosunku T/E2' : t;
      }
      tissueNotes.push('Inhibitor aromatazy: gwałtowny spadek E2, ryzyko utraty gęstości mineralnej kości (BMD) przy długiej terapii.');
    }

    // hCG
    if (d.hcg) {
      if (isMaleGonad) {
        t = '↑↑ Bezpośrednia stymulacja komórek Leydiga';
        tissueNotes.push('hCG imituje LH, podtrzymując intratestikularne stężenie testosteronu niezbędne dla spermatogenezy.');
      } else if (isFemaleGonad) {
        tissueNotes.push('hCG pobudza ciałko żółte do syntezy P4 i E2; w procedurach IVF służy jako trigger końcowego dojrzewania oocytów.');
      } else {
        tissueNotes.push('Brak efektu obwodowego przy braku tkanki gonadowej.');
      }
    }

    // Spironolakton & CPA
    if (d.spironolactone) {
      arActivation = '↓ Zablokowany receptor androgenowy';
      tissueNotes.push('Spironolakton: blokada AR zmniejsza trądzik, łojotok i hirsutyzm; hamowanie aldosteronu stwarza ryzyko hiperkaliemii.');
    }
    if (d.cyproterone) {
      arActivation = '↓↓↓ Silna blokada AR';
      lh = '↓↓↓ Silna supresja ośrodkowa';
      fsh = '↓↓ Supresja';
      tissueNotes.push('Octan cyproteronu: podwójne działanie (blokada AR + silna supresja przysadki); wymaga monitorowania prób wątrobowych i prolaktyny.');
    }

    // Finasteryd
    if (d.finasteride) {
      dht = '↓↓↓ Spadek stężenia 5α-DHT o 70–85%';
      tissueNotes.push('Finasteryd: selektywny spadek DHT w mieszku włosowym i prostacie, bez hamowania osi HPG.');
    }

    return { gnrh, lh, fsh, t, e2, dht, p4, shbg, arActivation, erActivation, tissueNotes, confidence };
  }, [phenotype, baseline, selectedDrugs, e2Route, tRoute, duration]);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Zap size={20} color="#6366f1" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Symulator Farmakodynamiki Osi HPG i Modulatorów Receptora
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
        Zdefiniuj fenotyp gonadalny i wybierz kombinację leków. Model ilustruje mechanistyczne wektory zmian hormonalnych (sprzężenia pętli HPG), aktywność receptorów AR/ER oraz przewidywane konsekwencje tkankowe.
      </p>

      {/* Wybór fenotypu i stanu osi */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Fenotyp gonadalny:</label>
          <select value={phenotype} onChange={e => setPhenotype(e.target.value as GonadPhenotype)} style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="male">Mężczyzna (obecne jądra)</option>
            <option value="female">Kobieta (obecne jajniki)</option>
            <option value="post_gonadectomy">Stan po gonadektomii (brak gonad)</option>
            <option value="primary_hypo">Hipogonadyzm pierwotny (dysgenezja)</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Stan wyjściowy osi:</label>
          <select value={baseline} onChange={e => setBaseline(e.target.value as BaselineAxis)} style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="normal">Prawidłowa czynność osi (eugonadotropowa)</option>
            <option value="secondary_hypo">Niedoczynność wtórna (hipogonadotropowa)</option>
            <option value="pcos">Zespół PCOS / hiperandrogenizm</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Czas ekspozycji na leczenie:</label>
          <select value={duration} onChange={e => setDuration(e.target.value as 'acute' | 'chronic')} style={{ width: '100%', padding: '6px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="chronic">Przewlekła (stan stacjonarny, adaptacja)</option>
            <option value="acute">Ostra / wczesna (efekt flare, początek)</option>
          </select>
        </div>
      </div>

      {/* Panel wyboru leków */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
          Aktywne farmakoterapie (możesz łączyć leki):
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
          {AVAILABLE_DRUGS.map(drug => {
            const isChecked = selectedDrugs[drug.key];
            return (
              <label
                key={drug.key}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isChecked ? '#6366f1' : '#e2e8f0',
                  background: isChecked ? '#eef2ff' : '#fff',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleDrug(drug.key)}
                  style={{ marginTop: '2px' }}
                />
                <div>
                  <strong style={{ color: isChecked ? '#4338ca' : '#0f172a' }}>{drug.label}</strong>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>{drug.mechanism}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Dodatkowe opcje dróg podania */}
      {(selectedDrugs.estradiol || selectedDrugs.testosterone) && (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '10px', background: '#f1f5f9', borderRadius: '6px', fontSize: '11px' }}>
          {selectedDrugs.estradiol && (
            <div>
              <strong>Droga podania estradiolu:</strong>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <label><input type="radio" checked={e2Route === 'transdermal'} onChange={() => setE2Route('transdermal')} /> Przezskórna (plaster/żel)</label>
                <label><input type="radio" checked={e2Route === 'oral'} onChange={() => setE2Route('oral')} /> Doustna (efekt wątrobowy)</label>
              </div>
            </div>
          )}
          {selectedDrugs.testosterone && (
            <div>
              <strong>Forma testosteronu:</strong>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <label><input type="radio" checked={tRoute === 'injection'} onChange={() => setTRoute('injection')} /> Iniekcyjna (estry domięśniowe)</label>
                <label><input type="radio" checked={tRoute === 'transdermal'} onChange={() => setTRoute('transdermal')} /> Przezskórna (żel)</label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wyniki symulacji wektorowej */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
          Przewidywane kierunki zmian osi hormonalnej i receptorów:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', textAlign: 'center' }}>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>GnRH</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{simulation.gnrh}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>LH / FSH</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#4338ca' }}>{simulation.lh}</div>
            <div style={{ fontSize: '11px', color: '#6366f1' }}>FSH: {simulation.fsh}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Testosteron / DHT</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0284c7' }}>{simulation.t}</div>
            <div style={{ fontSize: '11px', color: '#0369a1' }}>DHT: {simulation.dht}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Estradiol / SHBG</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#db2777' }}>{simulation.e2}</div>
            <div style={{ fontSize: '11px', color: '#9d174d' }}>SHBG: {simulation.shbg}</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Aktywność AR / ER</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>AR: {simulation.arActivation}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#e11d48' }}>ER: {simulation.erActivation}</div>
          </div>
        </div>
      </div>

      {/* Konsekwencje tkankowe i uwagi kliniczne */}
      {simulation.tissueNotes.length > 0 && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 700, fontSize: '12px', marginBottom: '6px' }}>
            <CheckCircle2 size={16} />
            <span>Kluczowe konsekwencje tkankowe i bezpieczeństwo:</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11px', color: '#14532d', lineHeight: 1.5 }}>
            {simulation.tissueNotes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Zastrzeżenie dydaktyczne */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', fontSize: '11px', color: '#92400e' }}>
        <ShieldAlert size={16} />
        <div>
          <strong>Zastrzeżenie metodologiczne:</strong> Model rozdziela mechanizm molekularny od przewidywanego kierunku zmian i nie generuje fikcyjnych stężeń laboratoryjnych. Ostateczne stężenia zależą od farmakokinetyki, masy ciała, metabolizmu wątrobowego oraz adherencji pacjenta.
        </div>
      </div>
    </div>
  );
}
