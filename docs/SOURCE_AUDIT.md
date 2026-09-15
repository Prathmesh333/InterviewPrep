# Source audit and coverage

Inspected 13 September 2026. Public repository inventory: 35 repositories. This is a README-level account survey with targeted core-code inspection for HQDE-PyPI and PsychoTA, not an audit of every implementation. No ML training or benchmark was executed.

## Supplied material

The prior conversation supplied three project questions: FH-RAG at University of Hyderabad, HQDE ensemble/distributed training, and TA-RS psychological-state prediction. These are retained as fh-story, hqde-story and psychota-story. The uploaded Pasted text.txt contains 60 question occurrences mapped to 40 complete canonical answers in data/source-questions.json. Duplicate and closely related phrasings are retained as source aliases. Truncated sample answers were replaced with original complete explanations.

## Important corrections

- FH-RAG was not located in this public inventory. Its architecture, six variants, SQuAD/BookSum evaluation and Ray use are supplied claims. No scores are invented. Illustrative equations are explicitly labeled.
- TA-RS is mapped to PsychoTA because the architecture matches; the equivalence of project names is inferred. The custom DeBERTa-style block should not be described as necessarily loading a pretrained DeBERTa checkpoint. Causal cross-utterance attention is followed by a bidirectional GRU. The full model is not strictly causal. The documented multi-stage training plan is not fully codified.
- Current HQDE has independent and epoch-level FedAvg modes, optional Ray and local fallback, and delta quantization. Quantum utilities are classical tensor operations. Module presence does not prove end-to-end Byzantine resilience. Text dict batches are not fully plug-and-play with the core training API.
- Profile and older README benchmark/production language is not treated as verified measurement. TRACE and other marketing percentages are not repeated as outcomes. EvidenceMem explicitly reports a negative result for default visual-only reliability weighting. VanGuard documents mock sensors.

## Inspection depth

- [AgenticEngineering](https://github.com/Prathmesh333/AgenticEngineering): README inspected. Covered by repository collection. Revision: a89e83be3d72f41ce3e6cbe1979fcd2e3c1c602c.
- [ai-job-search](https://github.com/Prathmesh333/ai-job-search): README inspected. Fork: no original-authorship claim; contribution history not audited. Revision: cdf3dfdc194d838752c79eadb4670e2d8cece848.
- [AI-Voice-Summarizer-using-LM-Studio](https://github.com/Prathmesh333/AI-Voice-Summarizer-using-LM-Studio): README inspected. Insufficient README evidence for a personal technical answer; retained in inventory. Revision: 45daf5dcbb67f6025e94d5a2cb53bf139801d376.
- [AI4Bharat-JansevaAI](https://github.com/Prathmesh333/AI4Bharat-JansevaAI): README inspected. Covered by repository collection. Revision: f8689837d78d27b3a12fdb552d9686c9ff445930.
- [AR-Treasure-Hunt](https://github.com/Prathmesh333/AR-Treasure-Hunt): README inspected. Covered by repository collection. Revision: faa5d9ff931a4565ca0255260913bbdb57f9be2e.
- [CanIPlay](https://github.com/Prathmesh333/CanIPlay): README inspected. Covered by repository collection. Revision: acf951b5e5353830e8ead892eb83b23048d1f22f.
- [controlled-technical-english-writing-skill](https://github.com/Prathmesh333/controlled-technical-english-writing-skill): README inspected. Covered by repository collection. Revision: e6cb28449d07ffe8f20b8055ff6cf027705d41cd.
- [cuda](https://github.com/Prathmesh333/cuda): metadata only / README unavailable. Insufficient README evidence for a personal technical answer; retained in inventory. Revision: metadata only; no README revision.
- [DL](https://github.com/Prathmesh333/DL): metadata only / README unavailable. Insufficient README evidence for a personal technical answer; retained in inventory. Revision: metadata only; no README revision.
- [evidencemem](https://github.com/Prathmesh333/evidencemem): README inspected. Covered by repository collection. Revision: 1eb8badd97c341a24be726b912a92c6b190bad7d.
- [F1-Race-Prediction](https://github.com/Prathmesh333/F1-Race-Prediction): README inspected. Covered by repository collection. Revision: cd389129e9cb42a855457ed35b728598684aeffd.
- [ForecastForge](https://github.com/Prathmesh333/ForecastForge): README inspected. Covered by repository collection. Revision: 5b5cf354c1c33b7f2508ae5e5b070aa1c528e2da.
- [github-slideshow](https://github.com/Prathmesh333/github-slideshow): README inspected. Profile, portfolio or GitHub training material; inventoried rather than treated as an engineering deployment. Revision: c7a55706779987602c85eaebe75a07e14508585c.
- [Hierarchical-Quantum-Distributed-Ensemble-Learning](https://github.com/Prathmesh333/Hierarchical-Quantum-Distributed-Ensemble-Learning): README inspected. Earlier HQDE repository: tree and README inspected; current package receives the detailed collection. Revision: 27d7c2c590e77228a843bd38127a343f97370f04.
- [HQDE-PyPI](https://github.com/Prathmesh333/HQDE-PyPI): README inspected. Covered by repository collection. Revision: 725a32adb5ac35d74df41ee51c55a6d533f1d957.
- [InterviewPrep](https://github.com/Prathmesh333/InterviewPrep): metadata only / README unavailable. Empty at inspection; website implemented in this PR. Revision: metadata only; no README revision.
- [iris-visual-agent](https://github.com/Prathmesh333/iris-visual-agent): README inspected. Covered by repository collection. Revision: 31041756dcde79e78c8c18330d461707a37e6245.
- [Neural-Consensus-Engine](https://github.com/Prathmesh333/Neural-Consensus-Engine): README inspected. Covered by repository collection. Revision: 2f62699714531abbf09d3adba3f6c000971610e7.
- [Prathmesh333](https://github.com/Prathmesh333/Prathmesh333): README inspected. Profile, portfolio or GitHub training material; inventoried rather than treated as an engineering deployment. Revision: 74a550fee2607c738a9377d363b76feccbed78ac.
- [prathmesh333.github.io](https://github.com/Prathmesh333/prathmesh333.github.io): README inspected. Profile, portfolio or GitHub training material; inventoried rather than treated as an engineering deployment. Revision: 5cc977acc50a5435fda1134d8aa7e1956f885f3a.
- [PsychoTA](https://github.com/Prathmesh333/PsychoTA): README inspected. Covered by repository collection. Revision: c5ccc0c393bf76b7d4e45738f262fc0ad7984bd7.
- [Python-Clearly](https://github.com/Prathmesh333/Python-Clearly): README inspected. Covered by repository collection. Revision: 04d3a4c21b57ec2c2aeb29b84e1881ff3bbee354.
- [ray](https://github.com/Prathmesh333/ray): README inspected. Fork: no original-authorship claim; contribution history not audited. Revision: 224ef96b8979afda9a4e9696d960333a877ccce5.
- [ResearchHub](https://github.com/Prathmesh333/ResearchHub): README inspected. Covered by repository collection. Revision: 04316339e8b27e53ed31c566be1c8201cbd739b7.
- [SEM-](https://github.com/Prathmesh333/SEM-): metadata only / README unavailable. Insufficient README evidence for a personal technical answer; retained in inventory. Revision: metadata only; no README revision.
- [ShortList-D](https://github.com/Prathmesh333/ShortList-D): README inspected. Covered by repository collection. Revision: 0c614a3e3728141fedde7c6e4da61de90fc4a34a.
- [SIH_Team_VanGuard_Prototype](https://github.com/Prathmesh333/SIH_Team_VanGuard_Prototype): README inspected. Covered by repository collection. Revision: 25f5ec577b8cac9598d9dd211c737f3b08cb0111.
- [SystemDesign](https://github.com/Prathmesh333/SystemDesign): README inspected. Covered by repository collection. Revision: 26ef24d8e39d096669f4e728b2fbe4a8055638b2.
- [TakeOne](https://github.com/Prathmesh333/TakeOne): README inspected. Covered by repository collection. Revision: eacfaf107662b353d0b0c75d4d6dd9ea7dee4029.
- [TRACE_Transparent_Results_and_Academic_Compliance_Engine](https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine): README inspected. Covered by repository collection. Revision: 26177ebf5b223c27f38fd98726509334d604024c.
- [TypeScript](https://github.com/Prathmesh333/TypeScript): README inspected. Covered by repository collection. Revision: e46dafc56d6a12de57775778ed0293db0a6e016d.
- [VedaAI](https://github.com/Prathmesh333/VedaAI): metadata only / README unavailable. Insufficient README evidence for a personal technical answer; retained in inventory. Revision: metadata only; no README revision.
- [VOICETOTEXT](https://github.com/Prathmesh333/VOICETOTEXT): metadata only / README unavailable. Insufficient README evidence for a personal technical answer; retained in inventory. Revision: metadata only; no README revision.
- [vsfeed](https://github.com/Prathmesh333/vsfeed): README inspected. Covered by repository collection. Revision: f7370ba6ae8da56b0c6333f2883b7755a0990f97.
- [WeakEnsembleStrongDecisionTree](https://github.com/Prathmesh333/WeakEnsembleStrongDecisionTree): README inspected. Covered by repository collection. Revision: dbfe9811ee58663f4bb5f42913f818bd6549136f.

## Refresh process

Re-read the linked source before changing a project claim. Prefer commit-pinned links for implementation facts. Mark uninspected proposals as proposals. For results, require command, data split, seed, hardware and saved output. Update this audit and the visible content date together. Add a new question ID to the supplied mapping only when it answers that source question; never delete mapping entries to make validation pass.
