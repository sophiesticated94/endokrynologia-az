export type AdrenalSimulationMode =
  | 'steroidogenesis'
  | 'aldosterone_raa'
  | 'pheochromocytoma'
  | 'incidentaloma_ct'
  | 'crisis_resuscitation';

export type AdrenalState = {
  mode: AdrenalSimulationMode;
  // Oś HPA i kora
  primaryCortexIntegrity: number; // 0 to 100%
  acthLevel: number; // 0 to 500 pg/ml
  cyp21Activity: number; // 0 to 100% (blok enzymatyczny WPN)
  hydrocortisoneDoseMg: number; // 0 to 80 mg/dobę
  fludrocortisoneDoseMg: number; // 0 to 0.4 mg/dobę

  // Zespół Conna / RAA
  aldosteroneAdenomaLateralization: 'none' | 'left' | 'right' | 'bilateral_hyperplasia';
  spironolactoneMg: number; // 0 to 200 mg/dobę
  salineInfusionMl: number; // 0 do 2000 ml w teście

  // Pheochromocytoma i hemodynamika
  pheoMetanephrinesMultiplier: number; // 1 to 15x
  alphaBlockerDoxazosinMg: number; // 0 to 16 mg
  betaBlockerPropranololMg: number; // 0 to 120 mg

  // Tomografia komputerowa (Incydentaloma / Washout)
  ctNativeHu: number; // -10 do 80 HU
  ctVenousHu: number; // 20 do 180 HU
  ctDelayedHu: number; // 10 do 120 HU
  tumorDiameterMm: number; // 10 do 120 mm

  // Resuscytacja w przełomie
  crisisBolusGiven: boolean;
  salineResuscitationLiters: number; // 0 do 4 L
};

export type CalculatedAdrenalOutput = {
  cortisol: number; // µg/dl (norma rano 10–20)
  aldosterone: number; // ng/dl (norma 5–15)
  dheaS: number; // µg/dl (norma 120–360)
  ohp17: number; // ng/ml (norma <2, po Synacthenie <10)
  plasmaReninDrc: number; // mIU/l (norma 5–40)
  arr: number; // wskaźnik aldo/renina (norma <20–30)
  normetanephrine: number; // pg/ml (norma <120)
  systolicBp: number; // mmHg
  diastolicBp: number; // mmHg
  heartRate: number; // bpm
  serumSodium: number; // mmol/l (norma 135–145)
  serumPotassium: number; // mmol/l (norma 3,5–5,1)
  plasmaGlucose: number; // mg/dl (norma 70–99 na czczo)
  ctApwPercent: number; // % bezwzględnego wymywania (APW)
  ctRpwPercent: number; // % względnego wymywania (RPW)
  avsDominantGradient: number; // gradient aldo/kortyzol w AVS
  alertType: 'normal' | 'warning' | 'danger';
  status: string;
  hemodynamicWarning?: string;
  clinicalRecommendations: string[];
};

export const defaultAdrenalState: AdrenalState = {
  mode: 'steroidogenesis',
  primaryCortexIntegrity: 100,
  acthLevel: 30,
  cyp21Activity: 100,
  hydrocortisoneDoseMg: 0,
  fludrocortisoneDoseMg: 0,

  aldosteroneAdenomaLateralization: 'none',
  spironolactoneMg: 0,
  salineInfusionMl: 0,

  pheoMetanephrinesMultiplier: 1,
  alphaBlockerDoxazosinMg: 0,
  betaBlockerPropranololMg: 0,

  ctNativeHu: 6,
  ctVenousHu: 85,
  ctDelayedHu: 28,
  tumorDiameterMm: 22,

  crisisBolusGiven: false,
  salineResuscitationLiters: 0,
};

export function calculateAdrenalState(state: AdrenalState): CalculatedAdrenalOutput {
  const recommendations: string[] = [];
  let alertType: 'normal' | 'warning' | 'danger' = 'normal';
  let status = 'Prawidłowa czynność kory i rdzenia nadnerczy (Euhormonemia)';
  let hemodynamicWarning: string | undefined;

  // 1. Oś HPA i Steroidogeneza
  const cortexFraction = state.primaryCortexIntegrity / 100;
  const cyp21Fraction = state.cyp21Activity / 100;

  // Endogenny kortyzol zależny od kory i aktywności 21-OH (zniszczona kora w Addisonie traci rezerwę i nie odpowiada na ACTH)
  const acthStimulationFactor = cortexFraction < 0.2 ? Math.min(1.2, state.acthLevel / 30) : state.acthLevel / 30;
  let endogenousCortisol = acthStimulationFactor * 14 * cortexFraction * cyp21Fraction;
  // Dodanie substytucji hydrokortyzonem
  let totalCortisol = endogenousCortisol + state.hydrocortisoneDoseMg * 0.45;
  totalCortisol = Math.max(0.4, Math.round(totalCortisol * 10) / 10);

  // 17-OHP (rośnie dramatycznie, gdy spada 21-OH, a ACTH jest wysokie)
  let baseOhp = 1.1;
  if (cyp21Fraction < 0.8) {
    const blockDeficit = 1 - cyp21Fraction;
    baseOhp += blockDeficit * (state.acthLevel / 20) * 8.5;
  }
  // Hydrokortyzon tłumi ACTH i obniża 17-OHP
  if (state.hydrocortisoneDoseMg > 0) {
    baseOhp = Math.max(1.0, baseOhp * Math.max(0.2, 1 - state.hydrocortisoneDoseMg / 50));
  }
  const final17Ohp = Math.round(baseOhp * 10) / 10;

  // DHEA-S
  let baseDhea = 220 * cortexFraction;
  if (cyp21Fraction < 0.5) {
    // ucieczka w szlak androgenowy
    baseDhea += (1 - cyp21Fraction) * 280;
  }
  const finalDhea = Math.round(baseDhea);

  // 2. Oś Aldosteron - RAA
  let baseAldo = 10 * cortexFraction * cyp21Fraction;
  let baseRenin = 18;

  if (state.aldosteroneAdenomaLateralization === 'left' || state.aldosteroneAdenomaLateralization === 'right') {
    baseAldo = 38; // autonomiczna nadprodukcja jednostronna
    baseRenin = 2.1; // stłumiona renina
  } else if (state.aldosteroneAdenomaLateralization === 'bilateral_hyperplasia') {
    baseAldo = 26;
    baseRenin = 3.5;
  }

  // Wpływ wlewu soli (test obciążenia 0,9% NaCl)
  if (state.salineInfusionMl >= 1500) {
    if (state.aldosteroneAdenomaLateralization === 'none') {
      baseAldo = Math.min(baseAldo, 3.2); // fizjologiczne stłumienie <5 ng/dl
    } else {
      baseAldo = Math.max(baseAldo * 0.85, 18); // brak supresji w PA!
    }
  }

  // Wpływ spironolaktonu
  if (state.spironolactoneMg > 0) {
    baseRenin += state.spironolactoneMg * 0.25; // odblokowanie reniny
  }

  // Wpływ fludrokortyzonu
  const effectiveAldoActivity = baseAldo + state.fludrocortisoneDoseMg * 120;
  const finalAldo = Math.round(baseAldo * 10) / 10;
  const finalRenin = Math.round(baseRenin * 10) / 10;
  const arr = Math.round((finalAldo / Math.max(0.5, finalRenin)) * 10) / 10;

  // Cewnikowanie AVS
  let avsDominantGradient = 1.1;
  if (state.aldosteroneAdenomaLateralization === 'left' || state.aldosteroneAdenomaLateralization === 'right') {
    avsDominantGradient = 5.8; // lateralizacja >4:1
  } else if (state.aldosteroneAdenomaLateralization === 'bilateral_hyperplasia') {
    avsDominantGradient = 1.3; // brak lateralizacji <2:1
  }

  // 3. Katecholaminy i Pheochromocytoma
  const normetanephrine = Math.round(85 * state.pheoMetanephrinesMultiplier);

  // Hemodynamika: ciśnienie i tętno
  let systolicBp = 122;
  let diastolicBp = 78;
  let heartRate = 72;

  // Wpływ katecholamin
  if (state.pheoMetanephrinesMultiplier > 1) {
    const extra = state.pheoMetanephrinesMultiplier;
    systolicBp += extra * 8;
    diastolicBp += extra * 5;
    heartRate += extra * 4;

    // Pułapka beta-blokera bez blokady alfa!
    if (state.betaBlockerPropranololMg > 0 && state.alphaBlockerDoxazosinMg === 0) {
      // Katastrofalna nieprzeciwstawiona stymulacja alfa!
      systolicBp += 45;
      diastolicBp += 30;
      hemodynamicWarning =
        'KARDYNALNY BŁĄD: Podanie beta-blokera przed blokadą alfa wywołało nieprzeciwstawioną stymulację receptorów alfa-1 i skrajny przełom nadciśnieniowy!';
      alertType = 'danger';
      status = 'Zagrażający życiu przełom nadciśnieniowy w feochromocytoma!';
    } else if (state.alphaBlockerDoxazosinMg > 0) {
      // Skuteczna blokada alfa
      const alphaDrop = Math.min(50, state.alphaBlockerDoxazosinMg * 4.5);
      systolicBp -= alphaDrop;
      diastolicBp -= alphaDrop * 0.6;
      if (state.betaBlockerPropranololMg > 0) {
        // Dołączony bezpiecznie beta-bloker zwalnia tętno
        heartRate = Math.max(62, heartRate - state.betaBlockerPropranololMg * 0.35);
      }
    }
  }

  // Wpływ aldosteronu na ciśnienie
  if (effectiveAldoActivity > 25) {
    systolicBp += Math.min(30, (effectiveAldoActivity - 25) * 0.7);
    diastolicBp += Math.min(20, (effectiveAldoActivity - 25) * 0.5);
  }

  // Wpływ hipowolemii w chorobie Addisona / przełomie
  if (cortexFraction < 0.2 && state.hydrocortisoneDoseMg === 0) {
    systolicBp = Math.max(65, systolicBp - 45);
    diastolicBp = Math.max(40, diastolicBp - 30);
    heartRate = Math.min(135, heartRate + 35); // tachykardia odruchowa
  }

  // 4. Elektrolity i Glikemia
  let sodium = 140;
  let potassium = 4.2;
  let glucose = 88;

  // Brak aldosteronu (Addison / WPN) -> utrata soli i hiperkaliemia
  if (effectiveAldoActivity < 5) {
    sodium -= (5 - effectiveAldoActivity) * 2.8;
    potassium += (5 - effectiveAldoActivity) * 0.38;
  } else if (effectiveAldoActivity > 25) {
    // Nadmiar aldosteronu (Conn) -> hipokaliemia
    potassium -= Math.min(1.6, (effectiveAldoActivity - 25) * 0.06);
    sodium = Math.min(148, sodium + (effectiveAldoActivity - 25) * 0.15);
  }

  // Spironolakton chroni przed hipokaliemią
  if (state.spironolactoneMg > 0) {
    potassium = Math.min(5.0, potassium + state.spironolactoneMg * 0.008);
  }

  // Glikemia (spadek przy braku kortyzolu)
  if (totalCortisol < 4.0) {
    glucose -= (4.0 - totalCortisol) * 9.5;
  }

  // Resuscytacja w przełomie nadnerczowym
  if (state.mode === 'crisis_resuscitation') {
    if (state.crisisBolusGiven) {
      systolicBp += 28;
      diastolicBp += 18;
      totalCortisol = 48; // wysokie stężenie po 100 mg bolusie
      glucose += 25;
    }
    if (state.salineResuscitationLiters > 0) {
      sodium += state.salineResuscitationLiters * 3.5;
      potassium = Math.max(4.2, potassium - state.salineResuscitationLiters * 0.55);
      systolicBp += state.salineResuscitationLiters * 6;
    }
  }

  // 5. Tomografia komputerowa (Washout)
  const E = state.ctVenousHu;
  const N = state.ctNativeHu;
  const D = state.ctDelayedHu;

  let ctApwPercent = 0;
  if (E - N !== 0) {
    ctApwPercent = Math.max(0, Math.min(100, Math.round(((E - D) / (E - N)) * 100)));
  }

  let ctRpwPercent = 0;
  if (E !== 0) {
    ctRpwPercent = Math.max(0, Math.min(100, Math.round(((E - D) / E) * 100)));
  }

  // Klasyfikacja stanu i rekomendacje
  if (state.mode === 'incidentaloma_ct') {
    if (state.ctNativeHu <= 10) {
      status = 'Łagodny gruczolak bogaty w lipidy (<=10 HU)';
      alertType = 'normal';
      recommendations.push('Gęstość natywna <=10 HU wyklucza złośliwość z blisko 100% pewnością.');
      recommendations.push('Wg wytycznych ESE 2023 nie wymaga dalszych badań TK ani kontroli obrazowej.');
      recommendations.push('Wykonaj przesiew hormonalny: test 1 mg DEX, metanefryny, a przy NT wskaźnik ARR.');
    } else {
      if (ctApwPercent >= 60 || ctRpwPercent >= 40) {
        status = 'Łagodny gruczolak ubogi w lipidy (>10 HU, prawidłowy washout >=60%)';
        alertType = 'warning';
        recommendations.push('Szybkie wymywanie kontrastu (APW >=60%) potwierdza łagodny charakter zmiany.');
        recommendations.push('Wyklucz autonomię wydzielniczą (MACS / Pheo / Conn).');
      } else {
        status = 'Podejrzenie złośliwości: zmiana uboga w lipidy z opóźnionym wymywaniem (<60% APW)';
        alertType = 'danger';
        recommendations.push('Wysoka gęstość natywna i niski washout budzą silne podejrzenie raka ACC lub przerzutu.');
        recommendations.push('Skieruj na konsylium wielodyscyplinarne; rozważ radykalną adrenalektomię otwartą.');
      }
    }
  } else if (state.mode === 'aldosterone_raa') {
    if (arr > 30 && finalAldo >= 15) {
      if (avsDominantGradient > 4) {
        status = 'Jednostronny gruczolak aldosteronowy — Zespół Conna (APA z lateralizacją AVS)';
        alertType = 'danger';
        recommendations.push('Wskaźnik ARR podwyższony, gradient AVS >4:1 potwierdza lateralizację.');
        recommendations.push('Leczeniem z wyboru jest laparoskopowa adrenalektomia jednostronna (wyleczenie).');
      } else {
        status = 'Obustronny przerost kory nadnerczy (BAH — brak lateralizacji w AVS)';
        alertType = 'warning';
        recommendations.push('Brak lateralizacji w AVS wyklucza operację; leczeniem z wyboru jest spironolakton.');
      }
    } else {
      status = 'Prawidłowy układ RAA (brak cech pierwotnego hiperaldosteronizmu)';
    }
  } else if (state.mode === 'pheochromocytoma') {
    if (state.pheoMetanephrinesMultiplier >= 3) {
      if (!hemodynamicWarning) {
        status = 'Czynny guz chromochłonny (Pheochromocytoma) pod kontrolą blokady alfa';
        alertType = 'warning';
        recommendations.push('Utrzymuj blokadę alfa (doksazosyna) przez 10–14 dni przed zabiegiem.');
        recommendations.push('Płynoterapia dożylna i sól kuchenna w diecie na 48h przed operacją.');
      }
    }
  } else if (state.mode === 'crisis_resuscitation') {
    if (!state.crisisBolusGiven) {
      status = 'OSTRY PRZEŁOM NADNERCZOWY: Wstrząs naczyniowy i hipowolemiczny!';
      alertType = 'danger';
      recommendations.push('NATYCHMIAST podaj 100 mg hydrokortyzonu i.v. w bolusie bez czekania na badania!');
      recommendations.push('Rozpocznij szybki wlew 1000 ml 0,9% NaCl w ciągu pierwszej godziny.');
    } else {
      status = 'Trwa resuscytacja przełomu nadnerczowego: powrót stabilności hemodynamicznej';
      alertType = 'warning';
      recommendations.push('Kontynuuj wlew 200 mg hydrokortyzonu / dobę.');
      recommendations.push('Monitoruj glikemię i stężenie potasu.');
    }
  } else if (cyp21Fraction < 0.3) {
    status = 'Wrodzony przerost nadnerczy (WPN — ciężki niedobór 21-hydroksylazy)';
    alertType = 'danger';
    recommendations.push('Masywna akumulacja 17-OHP z ucieczką w szlak androgenowy.');
    recommendations.push('Wymaga substytucji hydrokortyzonem i fludrokortyzonem w celu stłumienia ACTH.');
  } else if (cortexFraction < 0.2 && state.hydrocortisoneDoseMg === 0) {
    status = 'Nieleczona choroba Addisona (Pierwotna niewydolność kory nadnerczy)';
    alertType = 'danger';
    recommendations.push('Ciężka hiponatremia i hiperkaliemia z powodu braku aldosteronu.');
    recommendations.push('Wdrożyć hydrokortyzon doustnie (15–25 mg/d) i fludrokortyzon (0,05–0,1 mg/d).');
  }

  return {
    cortisol: totalCortisol,
    aldosterone: finalAldo,
    dheaS: finalDhea,
    ohp17: final17Ohp,
    plasmaReninDrc: finalRenin,
    arr,
    normetanephrine,
    systolicBp: Math.round(systolicBp),
    diastolicBp: Math.round(diastolicBp),
    heartRate: Math.round(heartRate),
    serumSodium: Math.round(sodium * 10) / 10,
    serumPotassium: Math.round(potassium * 10) / 10,
    plasmaGlucose: Math.round(glucose),
    ctApwPercent,
    ctRpwPercent,
    avsDominantGradient,
    alertType,
    status,
    hemodynamicWarning,
    clinicalRecommendations: recommendations,
  };
}

export const adrenalPresets = [
  {
    id: 'healthy',
    title: 'Zdrowe nadnercza (Euhormonemia)',
    description: 'Prawidłowa rezerwa kory, sprawny układ RAA i brak nadprodukcji katecholamin.',
    state: defaultAdrenalState,
  },
  {
    id: 'addison_unmanaged',
    title: 'Choroba Addisona (Nieleczona)',
    description: 'Autoimmunologiczny zanik kory: skrajnie niski kortyzol, aldosteron, hiperkaliemia i hipotensja.',
    state: {
      ...defaultAdrenalState,
      mode: 'steroidogenesis' as AdrenalSimulationMode,
      primaryCortexIntegrity: 5,
      acthLevel: 350,
      hydrocortisoneDoseMg: 0,
      fludrocortisoneDoseMg: 0,
    },
  },
  {
    id: 'addison_treated',
    title: 'Choroba Addisona (Wyrównana substytucją)',
    description: 'Prawidłowe ciśnienie i elektrolity na hydrokortyzonie 20 mg/d i fludrokortyzonie 0,1 mg/d.',
    state: {
      ...defaultAdrenalState,
      mode: 'steroidogenesis' as AdrenalSimulationMode,
      primaryCortexIntegrity: 5,
      acthLevel: 80,
      hydrocortisoneDoseMg: 20,
      fludrocortisoneDoseMg: 0.1,
    },
  },
  {
    id: 'wpn_classic',
    title: 'Wrodzony przerost nadnerczy (WPN — blok 21-OH)',
    description: 'Defekt 21-hydroksylazy: masywna akumulacja 17-OHP, nadmiar androgenów, utrata soli.',
    state: {
      ...defaultAdrenalState,
      mode: 'steroidogenesis' as AdrenalSimulationMode,
      cyp21Activity: 5,
      acthLevel: 280,
      hydrocortisoneDoseMg: 0,
      fludrocortisoneDoseMg: 0,
    },
  },
  {
    id: 'conn_syndrome_apa',
    title: 'Zespół Conna (Gruczolak APA lewego nadnercza)',
    description: 'Autonomiczny aldosteron, stłumiona renina, ARR >35, hipokaliemia i lateralizacja w AVS.',
    state: {
      ...defaultAdrenalState,
      mode: 'aldosterone_raa' as AdrenalSimulationMode,
      aldosteroneAdenomaLateralization: 'left' as const,
      spironolactoneMg: 0,
      salineInfusionMl: 0,
    },
  },
  {
    id: 'pheo_unpposed_beta_error',
    title: 'Pheochromocytoma: Błąd wczesnego beta-blokera!',
    description: 'Kardynalny błąd: podanie propranololu bez blokady alfa wywołuje skok ciśnienia do 240/135 mmHg!',
    state: {
      ...defaultAdrenalState,
      mode: 'pheochromocytoma' as AdrenalSimulationMode,
      pheoMetanephrinesMultiplier: 6,
      alphaBlockerDoxazosinMg: 0,
      betaBlockerPropranololMg: 40,
    },
  },
  {
    id: 'incidentaloma_lipid_rich',
    title: 'Incydentaloma łagodne bogate w lipidy (6 HU)',
    description: 'Gęstość natywna <=10 HU i washout APW 73% wg wytycznych ESE 2023 wykluczają raka.',
    state: {
      ...defaultAdrenalState,
      mode: 'incidentaloma_ct' as AdrenalSimulationMode,
      ctNativeHu: 6,
      ctVenousHu: 80,
      ctDelayedHu: 26,
      tumorDiameterMm: 24,
    },
  },
  {
    id: 'acc_malignant_suspicion',
    title: 'Podejrzenie raka kory nadnerczy (ACC)',
    description: 'Duży guz 75 mm o wysokiej gęstości natywnej 38 HU i słabym wash-oucie (APW 28%).',
    state: {
      ...defaultAdrenalState,
      mode: 'incidentaloma_ct' as AdrenalSimulationMode,
      ctNativeHu: 38,
      ctVenousHu: 95,
      ctDelayedHu: 79,
      tumorDiameterMm: 75,
    },
  },
];

export const adrenalSimulatorLegend = {
  modes: [
    {
      id: 'steroidogenesis',
      title: 'Oś HPA i Steroidogeneza',
      description: 'Modelowanie stężenia kortyzolu, 17-OHP, DHEA-S, sodu i potasu pod wpływem integralności kory i bloków enzymatycznych WPN.',
    },
    {
      id: 'aldosterone_raa',
      title: 'Układ RAA i Zespół Conna',
      description: 'Ocena wskaźnika ARR, testu obciążenia solą fizjologiczną oraz interpretacji cewnikowania żył nadnerczowych (AVS).',
    },
    {
      id: 'pheochromocytoma',
      title: 'Rdzeń i Pheochromocytoma',
      description: 'Symulacja hemodynamiczna katecholamin i demonstracja śmiertelnego błędu podania beta-blokera przed blokadą alfa.',
    },
    {
      id: 'incidentaloma_ct',
      title: 'Kalkulator TK Incydentaloma (Washout)',
      description: 'Wprowadzanie gęstości w HU (faza natywna, wrotna, 15 min) z automatycznym obliczaniem APW i RPW wg wytycznych ESE 2023.',
    },
    {
      id: 'crisis_resuscitation',
      title: 'Resuscytacja w Przełomie Nadnerczowym',
      description: 'Modelowanie ciśnienia i elektrolitów po podaniu ratunkowego bolusu 100 mg hydrokortyzonu i wlewów soli fizjologicznej.',
    },
  ],
};
