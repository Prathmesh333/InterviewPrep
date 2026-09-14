# Repository evidence audit

Reviewed 13–14 September 2026. Repository inventory came from the GitHub API. Public README files were read where present; priority source paths were inspected without running untrusted repository code. Model training was not executed.

## Findings that change interview answers

- **HQDE learning-rate diversity:** constructor variation is overridden by the common learning rate passed through normal setup_workers_training. Dropout variation is conditional on the selected model signature and explicit kwargs.
- **HQDE communication:** aggregate_weights fetches full worker states before manager-side delta rounding. Quantization counters do not establish actual Ray wire-byte savings.
- **HQDE faults:** separate Byzantine and MapReduce modules are not automatically the core trainer call path. Checkpoints are not an automatic crash-recovery policy.
- **PsychoTA architecture:** Hu feeds causal attention and the bidirectional GRU in parallel. Transaction logits use Hp; ego/stroke use Hs. Ego/stroke logits are detached before entering the script integrator.
- **PsychoTA sparse labels:** the combined loss is gated on ego_labels. An ignore index alone does not prove arbitrary task-only batches or all-ignored batches work.
- **CanIPlay:** browser HTTP/image timings and failed-probe percentages are not ICMP latency or measured UDP packet loss. Fast-error reachability and cancellation have important limits.
- **VSFeed:** the panel launches the integrated browser with a simple-browser fallback; it is not a custom rendering engine.
- **FH-RAG:** the portfolio names tree chunking, fuzzy relevance, beam search, SQuAD and BookSum, but provides repo: null. These are portfolio statements, not audited experiment evidence.
- **TA-RS naming:** the portfolio explicitly labels TA-RS / PsychoTA and links PsychoTA.
- **TRACE:** grading confidence is a coverage/score-range/reasoning-length heuristic, not a calibrated correctness probability.

## Source-inspected project paths

### HQDE
Explain the boundary between independent ensembles, federated updates, and prediction fusion.

- [HQDE-PyPI/README.md](https://github.com/Prathmesh333/HQDE-PyPI/blob/725a32adb5ac35d74df41ee51c55a6d533f1d957/README.md)
- [HQDE-PyPI/hqde/core/hqde_system.py](https://github.com/Prathmesh333/HQDE-PyPI/blob/725a32adb5ac35d74df41ee51c55a6d533f1d957/hqde/core/hqde_system.py)

### TA-RS / PsychoTA
Reason through speaker-aware dialogue modeling, four task heads, and the limits of weak labels.

- [PsychoTA/README.md](https://github.com/Prathmesh333/PsychoTA/blob/c5ccc0c393bf76b7d4e45738f262fc0ad7984bd7/README.md)
- [PsychoTA/psychota/model.py](https://github.com/Prathmesh333/PsychoTA/blob/c5ccc0c393bf76b7d4e45738f262fc0ad7984bd7/psychota/model.py)
- [PsychoTA/psychota/trainer.py](https://github.com/Prathmesh333/PsychoTA/blob/c5ccc0c393bf76b7d4e45738f262fc0ad7984bd7/psychota/trainer.py)
- [prathmesh333.github.io/script.js](https://github.com/Prathmesh333/prathmesh333.github.io/blob/5cc977acc50a5435fda1134d8aa7e1956f885f3a/script.js)

TA-RS / PsychoTA naming is supported by the portfolio. Code confirms the architecture; personal contribution and experiment results need confirmation.

### FH-RAG
Prepare hierarchical retrieval concepts while keeping unverified implementation and results explicit.

- [prathmesh333.github.io/script.js](https://github.com/Prathmesh333/prathmesh333.github.io/blob/5cc977acc50a5435fda1134d8aa7e1956f885f3a/script.js)

Needs clarification from Prathmesh. No public FH-RAG implementation was located in the repository inventory or code search. The portfolio describes the project, but code, formulas, datasets and results remain unverified.

### CanIPlay
Discuss browser networking, concurrent probes, cancellation, and honest measurement.

- [CanIPlay/README.md](https://github.com/Prathmesh333/CanIPlay/blob/acf951b5e5353830e8ead892eb83b23048d1f22f/README.md)
- [CanIPlay/js/tester.js](https://github.com/Prathmesh333/CanIPlay/blob/acf951b5e5353830e8ead892eb83b23048d1f22f/js/tester.js)

### VSFeed
Walk through an editor extension, browser commands, local state, and focus timers.

- [vsfeed/README.md](https://github.com/Prathmesh333/vsfeed/blob/f7370ba6ae8da56b0c6333f2883b7755a0990f97/README.md)
- [vsfeed/src/extension.ts](https://github.com/Prathmesh333/vsfeed/blob/f7370ba6ae8da56b0c6333f2883b7755a0990f97/src/extension.ts)
- [vsfeed/src/components/BrowserManager.ts](https://github.com/Prathmesh333/vsfeed/blob/f7370ba6ae8da56b0c6333f2883b7755a0990f97/src/components/BrowserManager.ts)

### EvidenceMem
Inspectable visual memory over a frozen encoder.

- [evidencemem/README.md](https://github.com/Prathmesh333/evidencemem/blob/1eb8badd97c341a24be726b912a92c6b190bad7d/README.md)
- [evidencemem/src/evidencemem/classifier.py](https://github.com/Prathmesh333/evidencemem/blob/1eb8badd97c341a24be726b912a92c6b190bad7d/src/evidencemem/classifier.py)

### ForecastForge
Probabilistic forecasting with an auditable backtest boundary.

- [ForecastForge/README.md](https://github.com/Prathmesh333/ForecastForge/blob/5b5cf354c1c33b7f2508ae5e5b070aa1c528e2da/README.md)
- [ForecastForge/src/backtest.py](https://github.com/Prathmesh333/ForecastForge/blob/5b5cf354c1c33b7f2508ae5e5b070aa1c528e2da/src/backtest.py)

### TreeStack CNN
Learned ensemble combination and leakage-resistant experiments.

- [WeakEnsembleStrongDecisionTree/README.md](https://github.com/Prathmesh333/WeakEnsembleStrongDecisionTree/blob/dbfe9811ee58663f4bb5f42913f818bd6549136f/README.md)
- [WeakEnsembleStrongDecisionTree/src/treestack_cnn/stacking.py](https://github.com/Prathmesh333/WeakEnsembleStrongDecisionTree/blob/dbfe9811ee58663f4bb5f42913f818bd6549136f/src/treestack_cnn/stacking.py)

### ResearchHub
Authentication, authorization and project membership.

- [ResearchHub/README.md](https://github.com/Prathmesh333/ResearchHub/blob/04316339e8b27e53ed31c566be1c8201cbd739b7/README.md)
- [ResearchHub/src/server/middleware/auth.ts](https://github.com/Prathmesh333/ResearchHub/blob/04316339e8b27e53ed31c566be1c8201cbd739b7/src/server/middleware/auth.ts)

### Neural Consensus Engine
Parallel expert generation followed by a synthesis stage.

- [Neural-Consensus-Engine/README.md](https://github.com/Prathmesh333/Neural-Consensus-Engine/blob/2f62699714531abbf09d3adba3f6c000971610e7/README.md)
- [Neural-Consensus-Engine/backend/core/orchestrator.py](https://github.com/Prathmesh333/Neural-Consensus-Engine/blob/2f62699714531abbf09d3adba3f6c000971610e7/backend/core/orchestrator.py)

### JanSeva AI
Conversation assistance with explicit eligibility rules.

- [AI4Bharat-JansevaAI/README.md](https://github.com/Prathmesh333/AI4Bharat-JansevaAI/blob/f8689837d78d27b3a12fdb552d9686c9ff445930/README.md)
- [AI4Bharat-JansevaAI/src/services/eligibility/matcher.ts](https://github.com/Prathmesh333/AI4Bharat-JansevaAI/blob/f8689837d78d27b3a12fdb552d9686c9ff445930/src/services/eligibility/matcher.ts)

### F1 Race Prediction
Feature availability, temporal splits and regression evaluation.

- [F1-Race-Prediction/README.md](https://github.com/Prathmesh333/F1-Race-Prediction/blob/cd389129e9cb42a855457ed35b728598684aeffd/README.md)
- [F1-Race-Prediction/f1_final.py](https://github.com/Prathmesh333/F1-Race-Prediction/blob/cd389129e9cb42a855457ed35b728598684aeffd/f1_final.py)

### Shortlist’d
Resume editing with source preservation and per-user storage.

- [ShortList-D/README.md](https://github.com/Prathmesh333/ShortList-D/blob/0c614a3e3728141fedde7c6e4da61de90fc4a34a/README.md)
- [ShortList-D/firestore.rules](https://github.com/Prathmesh333/ShortList-D/blob/0c614a3e3728141fedde7c6e4da61de90fc4a34a/firestore.rules)

### Iris Visual Agent
Opt-in browser activity capture with explicit privacy boundaries.

- [iris-visual-agent/README.md](https://github.com/Prathmesh333/iris-visual-agent/blob/31041756dcde79e78c8c18330d461707a37e6245/README.md)
- [iris-visual-agent/apps/extension/src/lib/privacy.js](https://github.com/Prathmesh333/iris-visual-agent/blob/31041756dcde79e78c8c18330d461707a37e6245/apps/extension/src/lib/privacy.js)

### TakeOne
Scene-description retrieval over indexed video segments.

- [TakeOne/README.md](https://github.com/Prathmesh333/TakeOne/blob/eacfaf107662b353d0b0c75d4d6dd9ea7dee4029/README.md)
- [TakeOne/search/vector_search.py](https://github.com/Prathmesh333/TakeOne/blob/eacfaf107662b353d0b0c75d4d6dd9ea7dee4029/search/vector_search.py)

### TRACE
Grading support with explicit confidence heuristics and review limits.

- [TRACE_Transparent_Results_and_Academic_Compliance_Engine/README.md](https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine/blob/26177ebf5b223c27f38fd98726509334d604024c/README.md)
- [TRACE_Transparent_Results_and_Academic_Compliance_Engine/app/services/grading/confidence.py](https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine/blob/26177ebf5b223c27f38fd98726509334d604024c/app/services/grading/confidence.py)

## Complete repository inventory

| Repository | Review depth / use |
| --- | --- |
| [AgenticEngineering](https://github.com/Prathmesh333/AgenticEngineering) | README reviewed; supporting learning/documentation project. No claim of source-level audit or personal results. |
| [ai-job-search](https://github.com/Prathmesh333/ai-job-search) | README reviewed; explicitly credited upstream fork. No attribution of the original author’s job-search outcomes to Prathmesh. |
| [AI-Voice-Summarizer-using-LM-Studio](https://github.com/Prathmesh333/AI-Voice-Summarizer-using-LM-Studio) | README is only a title; no implementation claims derived. |
| [AI4Bharat-JansevaAI](https://github.com/Prathmesh333/AI4Bharat-JansevaAI) | README + selected source; dedicated project bank. |
| [AR-Treasure-Hunt](https://github.com/Prathmesh333/AR-Treasure-Hunt) | README reviewed; learning/prototype scope. Prototype/mock data and AR marker claims not promoted to deployment achievements. |
| [CanIPlay](https://github.com/Prathmesh333/CanIPlay) | README + selected source; dedicated project bank. |
| [controlled-technical-english-writing-skill](https://github.com/Prathmesh333/controlled-technical-english-writing-skill) | README reviewed; supporting learning/documentation project. No claim of source-level audit or personal results. |
| [cuda](https://github.com/Prathmesh333/cuda) | Notebook tree inspected; no README. Learning examples; related DL/CNN fundamentals, no invented experiment results. |
| [DL](https://github.com/Prathmesh333/DL) | Notebook tree inspected; no README. Learning examples; related DL/CNN fundamentals, no invented experiment results. |
| [evidencemem](https://github.com/Prathmesh333/evidencemem) | README + selected source; dedicated project bank. |
| [F1-Race-Prediction](https://github.com/Prathmesh333/F1-Race-Prediction) | README + selected source; dedicated project bank. |
| [ForecastForge](https://github.com/Prathmesh333/ForecastForge) | README + selected source; dedicated project bank. |
| [github-slideshow](https://github.com/Prathmesh333/github-slideshow) | README reviewed; learning/prototype scope. Prototype/mock data and AR marker claims not promoted to deployment achievements. |
| [Hierarchical-Quantum-Distributed-Ensemble-Learning](https://github.com/Prathmesh333/Hierarchical-Quantum-Distributed-Ensemble-Learning) | README and tree reviewed; earlier HQDE implementation. Current bank uses HQDE-PyPI to avoid mixing versions. |
| [HQDE-PyPI](https://github.com/Prathmesh333/HQDE-PyPI) | README + selected source; dedicated project bank. |
| [InterviewPrep](https://github.com/Prathmesh333/InterviewPrep) | Initially empty target repository; website created here. |
| [iris-visual-agent](https://github.com/Prathmesh333/iris-visual-agent) | README + selected source; dedicated project bank. |
| [Neural-Consensus-Engine](https://github.com/Prathmesh333/Neural-Consensus-Engine) | README + selected source; dedicated project bank. |
| [Prathmesh333](https://github.com/Prathmesh333/Prathmesh333) | Profile/portfolio context; portfolio source inspected for project naming and FH-RAG evidence boundary. |
| [prathmesh333.github.io](https://github.com/Prathmesh333/prathmesh333.github.io) | Profile/portfolio context; portfolio source inspected for project naming and FH-RAG evidence boundary. |
| [PsychoTA](https://github.com/Prathmesh333/PsychoTA) | README + selected source; dedicated project bank. |
| [Python-Clearly](https://github.com/Prathmesh333/Python-Clearly) | README reviewed; supporting learning/documentation project. No claim of source-level audit or personal results. |
| [ray](https://github.com/Prathmesh333/ray) | Upstream Ray fork; treated as technology reference, not original authorship. No contribution claim without commit comparison. |
| [ResearchHub](https://github.com/Prathmesh333/ResearchHub) | README + selected source; dedicated project bank. |
| [SEM-](https://github.com/Prathmesh333/SEM-) | Inventory metadata; no root README retrieved. Insufficient evidence for a detailed project story. |
| [ShortList-D](https://github.com/Prathmesh333/ShortList-D) | README + selected source; dedicated project bank. |
| [SIH_Team_VanGuard_Prototype](https://github.com/Prathmesh333/SIH_Team_VanGuard_Prototype) | README reviewed; learning/prototype scope. Prototype/mock data and AR marker claims not promoted to deployment achievements. |
| [SystemDesign](https://github.com/Prathmesh333/SystemDesign) | README reviewed; supporting learning/documentation project. No claim of source-level audit or personal results. |
| [TakeOne](https://github.com/Prathmesh333/TakeOne) | README + selected source; dedicated project bank. |
| [TRACE_Transparent_Results_and_Academic_Compliance_Engine](https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine) | README + selected source; dedicated project bank. |
| [TypeScript](https://github.com/Prathmesh333/TypeScript) | README reviewed; supporting learning/documentation project. No claim of source-level audit or personal results. |
| [VedaAI](https://github.com/Prathmesh333/VedaAI) | Inventory metadata; no root README retrieved. Insufficient evidence for a detailed project story. |
| [VOICETOTEXT](https://github.com/Prathmesh333/VOICETOTEXT) | Inventory metadata; no root README retrieved. Insufficient evidence for a detailed project story. |
| [vsfeed](https://github.com/Prathmesh333/vsfeed) | README + selected source; dedicated project bank. |
| [WeakEnsembleStrongDecisionTree](https://github.com/Prathmesh333/WeakEnsembleStrongDecisionTree) | README + selected source; dedicated project bank. |

## Follow-up evidence to supply

- FH-RAG source URL or archive, exact formulas, experiment configs and executed result logs.
- The exact HQDE paper revision for any numbered Algorithm 1 mapping.
- Personal contribution/commits, actual debugging episodes and verified outcomes for STAR answers.
- Dataset splits, seeds, hardware, timings and baseline budgets before inserting numerical achievements.

## Reading links for general concepts

- [Ray actors](https://docs.ray.io/en/latest/ray-core/actors.html)
- [Python threading and GIL build assumptions](https://docs.python.org/3/library/threading.html)

General concept explanations are educational content. Repository evidence links support the specific project behaviors, not every proposed engineering improvement.