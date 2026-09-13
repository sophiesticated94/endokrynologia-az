import test from 'node:test';
import assert from 'node:assert/strict';

import { adrenalSources, adrenalMathChemSources } from '../lib/endocrinology/nadnercza-content.ts';
import { parathyroidSources, parathyroidMathChemSources } from '../lib/endocrinology/przytarczyce-content.ts';
import { diabetesSources } from '../lib/course-diabetes-sources.ts';
import { gonadsSources } from '../lib/course-gonads-sources.ts';
import { nenSources } from '../lib/course-nen-sources.ts';
import { otyloscSources } from '../lib/course-otylosc-sources.ts';
import { pituitarySources } from '../lib/course-pituitary-sources.ts';
import { pituitaryMathChemSources } from '../lib/course-pituitary-math-chem.ts';
import { thyroidMathChemSources } from '../lib/course-thyroid-math-chem.ts';

const allCollections = [
  { name: 'adrenalSources', dict: adrenalSources },
  { name: 'diabetesSources', dict: diabetesSources },
  { name: 'gonadsSources', dict: gonadsSources },
  { name: 'nenSources', dict: nenSources },
  { name: 'otyloscSources', dict: otyloscSources },
  { name: 'parathyroidSources', dict: parathyroidSources },
  { name: 'pituitarySources', dict: pituitarySources },
  { name: 'adrenalMathChemSources', dict: adrenalMathChemSources },
  { name: 'parathyroidMathChemSources', dict: parathyroidMathChemSources },
  { name: 'pituitaryMathChemSources', dict: pituitaryMathChemSources },
  { name: 'thyroidMathChemSources', dict: thyroidMathChemSources },
];

test('Sources provenance: every dictionary has valid entries and schema', () => {
  let totalSources = 0;
  const seenIds = new Map();

  for (const { name, dict } of allCollections) {
    const keys = Object.keys(dict);
    assert.ok(keys.length > 0, `Collection ${name} should not be empty`);

    for (const key of keys) {
      const s = dict[key];
      totalSources++;

      // 1. Key consistency
      assert.equal(s.id, key, `In ${name}: key "${key}" must equal source.id "${s.id}"`);

      // 2. Uniqueness
      if (seenIds.has(s.id)) {
        // Allow intentional cross-module re-use only if identical source
        const prev = seenIds.get(s.id);
        assert.equal(s.url, prev.url, `Duplicate source id ${s.id} with conflicting URLs`);
      } else {
        seenIds.set(s.id, { ...s, from: name });
      }

      // 3. Mandatory fields
      assert.ok(typeof s.title === 'string' && s.title.trim().length >= 5, `In ${name}/${key}: title must be non-empty string`);
      assert.match(s.year, /^(19\d\d|20[0-2]\d|2030)$/, `In ${name}/${key}: year "${s.year}" must be valid 4-digit year (1900-2030)`);
      assert.ok(typeof s.kind === 'string' && s.kind.trim().length > 0, `In ${name}/${key}: kind must be specified`);
      assert.match(s.url, /^https?:\/\//, `In ${name}/${key}: url "${s.url}" must start with http:// or https://`);

      // 4. DOI validation if URL is a DOI
      if (s.url.includes('doi.org/')) {
        const doiPart = s.url.split('doi.org/')[1];
        assert.ok(doiPart, `In ${name}/${key}: empty DOI after doi.org/`);
        assert.match(
          doiPart,
          /^10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$/,
          `In ${name}/${key}: invalid DOI format "${doiPart}"`
        );
        // Ban known placeholders or test DOIs
        assert.notEqual(doiPart, '10.1000/182', `In ${name}/${key}: placeholder DOI found`);
        assert.ok(!doiPart.includes('xxxx'), `In ${name}/${key}: dummy DOI found`);
      }
    }
  }

  assert.ok(totalSources >= 70, `Expected at least 70 sources across modules, found ${totalSources}`);
});

test('Sources provenance: clinical guidelines and consensus are present for core topics', () => {
  // Check that critical clinical topics have verified guidelines attached
  assert.ok(diabetesSources.dka_guidelines, 'DKA guidelines must be present');
  assert.match(diabetesSources.dka_guidelines.url, /10\.2337\/dci24-0032/, 'DKA should point to ADA/EASD 2024 consensus');

  assert.ok(parathyroidSources.ese_phpt, 'ESE PHPT guideline must be present');
  assert.match(parathyroidSources.ese_phpt.url, /10\.1002\/jbmr\.4677/, 'PHPT should point to Bilezikian 2022 international workshop');

  assert.ok(adrenalMathChemSources.cah_kinetics, 'CAH kinetics paper must be present');
  assert.match(adrenalMathChemSources.cah_kinetics.url, /10\.1210\/jcem\.85\.3\.6441/, 'CAH kinetics should point to Krone et al.');

  assert.ok(thyroidMathChemSources.tpo_chem, 'TPO / thyroglobulin structure paper must be present');
  assert.match(thyroidMathChemSources.tpo_chem.url, /10\.1038\/s41586-020-1995-4/, 'Tg structure should point to Coscia et al. Nature 2020');

  // Specific 2022-2026 guideline & consensus checks
  assert.match(diabetesSources.gdm_guidelines.url, /10\.1016\/S0020-7292\(15\)30007-2/, 'GDM should point to FIGO initiative');
  assert.equal(parathyroidSources.kdigo_ckd_mbd.year, '2017', 'KDIGO CKD-MBD update is 2017');
  assert.match(parathyroidSources.kdigo_ckd_mbd.url, /10\.1016\/j\.kisu\.2017\.04\.001/, 'KDIGO CKD-MBD should have valid DOI');
  assert.equal(parathyroidSources.ese_hypopara.year, '2025', 'ESE hypoparathyroidism guideline update is 2025');
  assert.match(parathyroidSources.ese_hypopara.url, /10\.1093\/ejendo\/lvaf222/, 'ESE hypoparathyroidism 2025 should have valid DOI');
  assert.equal(nenSources['ata-mtc-2024'].year, '2015', 'ATA MTC guideline is 2015');
  assert.match(nenSources['ata-mtc-2024'].url, /10\.1089\/thy\.2014\.0335/, 'ATA MTC guideline should have valid DOI');
  assert.match(nenSources['eanm-prrt-2023'].url, /10\.1007\/s00259-012-2330-6/, 'EANM PRRT should point to joint procedure guidance');
  assert.equal(nenSources['men-consensus-2021'].year, '2012', 'Thakker MEN1 guideline is 2012');
  assert.match(nenSources['men-consensus-2021'].url, /10\.1210\/jc\.2012-1230/, 'MEN1 guideline should have Thakker DOI');
  assert.match(otyloscSources['esc-eas-dyslipidemia-2023'].url, /10\.1093\/eurheartj\/ehz455/, 'ESC/EAS dyslipidemia should have 2019 DOI');
  assert.ok(pituitarySources.pituitary_prolactinoma_2023, 'Pituitary Society prolactinoma consensus must exist');
  assert.match(pituitarySources.pituitary_prolactinoma_2023.url, /10\.1038\/s41574-023-00886-5/, 'Pituitary Society prolactinoma must point to 2023 consensus');
  assert.ok(pituitarySources.pituitary_incidentaloma_2025, 'Pituitary Society incidentaloma consensus must exist');
  assert.match(pituitarySources.pituitary_incidentaloma_2025.url, /10\.1038\/s41574-025-01134-8/, 'Pituitary Society incidentaloma must point to 2025 statement');
  assert.ok(pituitarySources.avpd_copeptin, 'AVP-D copeptin landmark trial must exist');
  assert.match(pituitarySources.avpd_copeptin.url, /10\.1056\/NEJMoa1803760/, 'AVP-D copeptin trial must point to NEJM landmark');
  assert.ok(otyloscSources.esc_eas_dyslipidemia_2025, 'ESC/EAS 2025 focused update must exist');
  assert.match(otyloscSources.esc_eas_dyslipidemia_2025.url, /escardio\.org/, 'ESC/EAS 2025 must point to ESC practice guidelines');
  assert.ok(adrenalSources.endo_pa, 'Endocrine Society PA guideline must exist');
  assert.equal(adrenalSources.endo_pa.year, '2025', 'Endocrine Society PA guideline must be 2025');
});
