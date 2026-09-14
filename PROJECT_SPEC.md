PROJECT:
Build a complete personal Interview Preparation Platform for Prathamesh Nikam.

PRIMARY REPOSITORY:
https://github.com/Prathmesh333/InterviewPrep

GITHUB PROFILE TO ANALYZE:
https://github.com/Prathmesh333

PURPOSE:
Create a polished, interactive, GitHub Pages-compatible interview preparation website tailored specifically to Prathmesh's background, projects, research, technologies, resume experience, and likely AI/ML/software engineering interviews.

This must NOT be a generic interview-question website.

The most important part of the website should be questions derived directly from Prathmesh's actual projects, repositories, technologies, research work, implementation decisions, experiments, architecture choices, limitations, results, and engineering experience.

==================================================
1. REPOSITORY ANALYSIS
==================================================

Explore Prathmesh333's GitHub repositories thoroughly.

For each meaningful repository:

1. Read the README.
2. Inspect important source files.
3. Identify:
   - purpose
   - problem being solved
   - motivation
   - architecture
   - algorithms
   - ML models
   - libraries
   - frameworks
   - datasets
   - training process
   - inference process
   - distributed architecture
   - evaluation metrics
   - optimizations
   - challenges
   - limitations
   - design decisions
   - experiments
   - deployment approach
   - engineering tradeoffs

Do not invent implementation details.

If something cannot be verified from the repository, clearly label it as:
"Needs clarification from Prathmesh."

Prioritize projects such as:

- HQDE
- FH-RAG
- TA-RS
- Ray/distributed ML projects
- CanIPlay
- VSFeed
- computer vision projects
- machine-learning projects
- NLP projects
- research implementations
- backend projects
- browser/extension projects
- other technically interesting repositories

==================================================
2. PROJECT-WISE INTERVIEW QUESTIONS
==================================================

Create a dedicated interview section for every important project.

Example hierarchy:

Projects
 ├── HQDE
 ├── FH-RAG
 ├── TA-RS
 ├── CanIPlay
 ├── VSFeed
 └── Other Projects

Each project should contain several categories of questions.

A. INTRODUCTORY QUESTIONS

Examples:

- Tell me about this project.
- What problem were you trying to solve?
- Why did you build it?
- What was your contribution?
- What technologies did you use?
- What was the hardest part?

B. ARCHITECTURE QUESTIONS

Examples:

- Explain the complete system architecture.
- How does data flow through the system?
- Why did you choose this architecture?
- What are the major components?
- Where could the architecture fail?

C. IMPLEMENTATION QUESTIONS

Generate questions based directly on the source code.

Examples:

- Why was Ray used here?
- How are workers initialized?
- How is synchronization performed?
- How is state maintained?
- How are predictions aggregated?
- How is the retrieval tree constructed?
- How is attention implemented?

D. DEEP TECHNICAL QUESTIONS

Interviewers should be able to drill into concepts underlying the project.

Example for HQDE:

HQDE
 -> Distributed training
 -> Ensemble learning
 -> Ray actors
 -> Delta aggregation
 -> Prediction fusion
 -> Byzantine robustness
 -> Adaptive quantization
 -> Learning-rate diversity
 -> Dropout diversity
 -> ResNet
 -> Communication overhead

Possible questions:

- Why Ray instead of PyTorch DDP?
- What is an actor in Ray?
- What happens if a worker fails?
- What is delta aggregation?
- Why aggregate parameter deltas instead of entire models?
- How does prediction fusion differ from training aggregation?
- What is Byzantine fault tolerance?
- How would quantization reduce network communication?
- What is the tradeoff introduced by quantization?
- Why create diversity between workers?

E. FOLLOW-UP QUESTIONS

Every major question should include likely interviewer follow-ups.

For example:

Main:
"Why did you use Ray?"

Follow-ups:
- Why not Spark?
- Why not multiprocessing?
- Why not PyTorch Distributed?
- How does Ray's object store work?
- What is an actor?
- What happens when an actor crashes?
- How would this scale across multiple nodes?

==================================================
3. ANSWER LEVELS
==================================================

For important questions provide three answer modes.

QUICK ANSWER
20-40 seconds.

Used when the interviewer expects a concise response.

STANDARD ANSWER
Approximately 1-2 minutes.

This should be the default interview answer.

DEEP DIVE
Detailed technical explanation.

Used when an interviewer asks follow-up questions.

Do not make answers unnecessarily verbose.

Answers must sound natural when spoken aloud.

Avoid answers that sound like ChatGPT-generated textbook paragraphs.

Use first-person wording when discussing Prathmesh's work:

"In this project, I..."
"I chose Ray because..."
"One issue I encountered was..."
"The reason we designed it this way was..."

==================================================
4. STAR ANSWERS
==================================================

For behavioral/project questions provide optional STAR structure.

Situation
Task
Action
Result

Examples:

- Describe a difficult technical problem.
- Describe a time an experiment failed.
- Tell me about a project you're proud of.
- Tell me about a disagreement in technical design.
- Tell me about something you learned independently.

==================================================
5. DIAGRAMS
==================================================

Add visual explanations for complicated concepts.

Prefer Mermaid or lightweight HTML/CSS/SVG diagrams compatible with GitHub Pages.

Useful diagrams include:

HQDE architecture

Dataset
  ↓
Coordinator
  ↓
Ray Workers
 ├ Worker 1
 ├ Worker 2
 ├ Worker 3
 └ Worker 4

Training path:
Local Training
 -> Model Delta
 -> Optional Quantization
 -> Aggregation
 -> Global Model

Inference path:
Worker Predictions
 -> Prediction Fusion
 -> Final Prediction

FH-RAG:

Document
 ↓
Chunking
 ↓
Hierarchical Tree
 ↓
Embedding
 ↓
Query
 ↓
Hierarchical Retrieval
 ↓
Beam Search
 ↓
Pruning
 ↓
Context
 ↓
LLM
 ↓
Answer

TA-RS:

Dialogue
 ↓
Speaker-aware representation
 ↓
DeBERTa
 ↓
Cross-Utterance Attention
 ↓
BiGRU
 ↓
Shared Representation
 ├ Ego State
 ├ Transaction Type
 ├ Stroke Type
 └ Life Position

Also include diagrams for:

- transformer attention
- RAG
- CNN
- ResNet
- distributed training
- MapReduce
- ensemble learning
- gradient descent
- backpropagation
- vector databases
- embeddings
- REST API flow
- browser extension architecture
- Ray actors/tasks/object store

==================================================
6. FH-RAG QUESTIONS
==================================================

Include questions such as:

- Explain your FH-RAG project.
- Why hierarchical RAG?
- What problem does normal flat chunking create?
- How did you construct the hierarchy?
- What is tree-structured chunking?
- What is fuzzy relevance propagation?
- What is level-aware beam search?
- What is soft-threshold pruning?
- Why use beam search?
- What is the retrieval complexity?
- How did you select chunks?
- How were embeddings generated?
- Why Sentence Transformers?
- Which similarity metric was used?
- How does retrieval differ from generation?
- How would FH-RAG behave with a million-page corpus?
- How would you handle hallucinations?
- What does faithfulness measure?
- What is MRR?
- What is nDCG@5?
- Why ROUGE?
- Why F1?
- What are the limitations?
- What would you change for production?

Also cover:

traditional RAG
hybrid search
BM25
dense retrieval
rerankers
chunking strategies
vector databases
embedding models
context windows
hallucination mitigation
retrieval evaluation
generation evaluation

==================================================
7. HQDE QUESTIONS
==================================================

Generate an extensive HQDE interview section.

Cover:

- distributed CNN training
- Ray
- actors
- tasks
- object references
- scheduling
- distributed state
- model replicas
- local optimization
- optimizer state
- learning-rate diversity
- dropout diversity
- prediction fusion
- delta aggregation
- adaptive quantization
- MapReduce aggregation
- fault tolerance
- Byzantine workers
- communication efficiency
- ensemble diversity
- PyTorch
- ResNet
- SmallResNet
- MNIST
- CIFAR-10
- SVHN
- scalability
- synchronization
- asynchronous vs synchronous learning

Important questions:

- What exactly is HQDE?
- Explain Algorithm 1.
- How does independent worker training work?
- Why intentionally vary learning rates?
- Why vary dropout?
- Why ensemble multiple workers?
- Explain prediction fusion.
- Explain delta aggregation.
- Why model deltas?
- What would happen if one worker becomes corrupted?
- How could Byzantine aggregation help?
- How would adaptive quantization work?
- What communication bottlenecks occur?
- How would you scale from one machine to a cluster?
- Why Ray?
- Spark vs Ray?
- Ray vs multiprocessing?
- Ray vs DDP?
- Ray actor vs Ray task?
- What happens when workers have different execution speeds?
- How would you recover a failed actor?

==================================================
8. TA-RS QUESTIONS
==================================================

Cover:

- multi-task learning
- dialogue modeling
- speaker-aware embeddings
- DeBERTa
- cross-utterance attention
- causal attention
- BiGRU
- weak supervision
- noisy labels
- sparse labels
- custom losses
- multi-task balancing
- conversation context
- psychological states
- inference

Questions should include:

- Explain TA-RS.
- Why multi-task learning?
- What tasks are predicted?
- Why DeBERTa?
- Why GRU after transformer embeddings?
- What does speaker awareness provide?
- What is cross-utterance attention?
- Why causal attention?
- How did you deal with weak labels?
- How would label noise affect training?
- How would you balance four losses?
- Could tasks negatively interfere?
- What is negative transfer?
- How would you evaluate each task?
- What privacy concerns exist with psychological dialogue data?
- What are the ethical risks?

==================================================
9. FUNDAMENTAL INTERVIEW SECTIONS
==================================================

Create comprehensive topic sections.

Machine Learning

- supervised learning
- unsupervised learning
- semi-supervised learning
- reinforcement learning
- bias variance
- overfitting
- underfitting
- regularization
- cross validation
- feature engineering
- normalization
- standardization
- missing values
- outliers
- class imbalance
- PCA
- dimensionality reduction
- ROC
- AUC
- precision
- recall
- F1
- confusion matrix
- regression metrics

Deep Learning

- perceptron
- MLP
- activation functions
- loss functions
- forward propagation
- backpropagation
- gradient descent
- SGD
- Adam
- learning rate
- batch size
- dropout
- batch normalization
- vanishing gradient
- exploding gradient
- initialization

CNN

- convolution
- kernels
- padding
- stride
- pooling
- receptive field
- channels
- ResNet
- residual connection
- transfer learning

NLP

- tokenization
- stemming
- lemmatization
- TF-IDF
- Word2Vec
- CBOW
- Skip-Gram
- GloVe
- FastText
- embeddings
- RNN
- LSTM
- GRU
- seq2seq
- attention
- transformer
- BERT
- DeBERTa

LLMs

- transformer
- self-attention
- multi-head attention
- positional encoding
- pretraining
- fine-tuning
- instruction tuning
- RLHF
- LoRA
- PEFT
- quantization
- hallucinations
- context windows
- inference

RAG

- embeddings
- vector DB
- similarity search
- chunking
- retrieval
- reranking
- hybrid search
- grounding
- citations
- evaluation

Distributed Systems

- process vs thread
- concurrency
- parallelism
- synchronization
- consistency
- MapReduce
- distributed training
- parameter server
- all-reduce
- data parallelism
- model parallelism
- pipeline parallelism
- fault tolerance

Ray

Create a particularly detailed section because Ray is central to Prathmesh's research.

Cover:

- Ray task
- Ray actor
- ObjectRef
- object store
- scheduler
- resources
- remote decorators
- actor state
- placement
- fault tolerance
- Ray Data
- Ray Train
- Ray Tune
- Ray Serve
- distributed execution

==================================================
10. COMPUTER SCIENCE FUNDAMENTALS
==================================================

Include interview preparation for:

DSA
- arrays
- strings
- hashing
- stack
- queue
- linked list
- trees
- BST
- heap
- graphs
- BFS
- DFS
- recursion
- dynamic programming
- greedy
- binary search
- sorting
- complexity analysis

DBMS
- SQL
- joins
- normalization
- indexes
- transactions
- ACID
- locks
- isolation levels
- relational vs NoSQL

Operating Systems
- process
- thread
- scheduling
- context switching
- deadlock
- paging
- virtual memory
- synchronization
- mutex
- semaphore

Computer Networks
- TCP
- UDP
- HTTP
- HTTPS
- DNS
- REST
- WebSocket
- TCP handshake
- OSI
- latency
- bandwidth

Software Engineering
- OOP
- SOLID
- design patterns
- APIs
- testing
- Git
- CI/CD

==================================================
11. PYTHON
==================================================

Create Python interview questions ranging from basic through advanced.

Cover:

- list
- tuple
- set
- dictionary
- mutability
- comprehensions
- lambda
- decorators
- generators
- iterators
- context managers
- exceptions
- OOP
- dunder methods
- GIL
- multiprocessing
- threading
- asyncio
- memory management
- garbage collection

Include runnable code examples where useful.

==================================================
12. SQL
==================================================

Create practical SQL interview exercises.

Each should contain:

Question
Schema
Expected output
Solution
Explanation
Alternative solution if useful

Cover:

JOIN
GROUP BY
HAVING
CTE
subquery
window functions
ROW_NUMBER
RANK
DENSE_RANK
aggregations
dates
top-N queries
duplicates

==================================================
13. WEBSITE UX
==================================================

Build the website as a real interview study application.

Required layout:

Desktop:
left sidebar navigation
main content area
optional right-hand table of contents

Mobile:
collapsible menu
responsive cards
readable typography

Navigation:

Dashboard
Projects
Machine Learning
Deep Learning
NLP
LLMs
RAG
Computer Vision
Distributed Systems
Ray
Python
SQL
DSA
DBMS
Operating Systems
Computer Networks
Behavioral
Mock Interviews

==================================================
14. SEARCH
==================================================

Add global search.

It should search:

- question text
- answer
- tags
- projects
- technology
- topic

Example searches:

"Ray actor"
"RAG chunking"
"overfitting"
"HQDE aggregation"
"TA-RS DeBERTa"

==================================================
15. FILTERS
==================================================

Every question can have metadata:

Project
Topic
Difficulty
Question Type

Difficulty:
Beginner
Intermediate
Advanced

Question Type:
Concept
Project
Coding
Architecture
Behavioral
Research
Follow-up

==================================================
16. QUESTION CARDS
==================================================

Cards should show:

Question

tags

difficulty

buttons:

Show Quick Answer
Show Interview Answer
Deep Dive
Follow-up Questions
Explain Visually

Answers should initially remain collapsed.

==================================================
17. STUDY MODE
==================================================

Add a distraction-free study mode.

Show one question at a time.

Buttons:

Reveal Answer
Next Question
Previous Question
Mark Known
Needs Revision

Store study progress using localStorage.

No backend is required.

==================================================
18. RANDOM INTERVIEW MODE
==================================================

Generate random interview sessions.

Example:

15-question ML Engineer Interview

Mix:

3 project questions
3 ML questions
2 deep-learning questions
2 RAG/LLM questions
2 Python questions
1 SQL question
1 system/distributed question
1 behavioral question

==================================================
19. MOCK INTERVIEW MODE
==================================================

Provide interviewer-style sequences.

Example:

Q1:
Tell me about HQDE.

Follow-up:
Why Ray?

Follow-up:
Why wouldn't multiprocessing be sufficient?

Follow-up:
Explain how Ray schedules remote tasks.

Follow-up:
What happens if a worker crashes?

This mode should make preparation resemble an actual interview.

==================================================
20. PROGRESS TRACKING
==================================================

Use browser localStorage.

Track:

questions viewed
questions mastered
questions needing revision
topic progress
project progress

Dashboard examples:

HQDE: 72%
RAG: 58%
Machine Learning: 65%
Python: 44%

==================================================
21. BOOKMARKING
==================================================

Allow questions to be bookmarked.

Provide a "Bookmarks" study section.

==================================================
22. CODE EXAMPLES
==================================================

Use syntax-highlighted code blocks for technical answers.

Examples:

Python
PyTorch
Ray
SQL
JavaScript/TypeScript

Include code only where it improves interview understanding.

==================================================
23. DIFFICULTY PROGRESSION
==================================================

Questions should progress naturally.

Example:

RAG Level 1:
What is RAG?

Level 2:
Why is RAG useful?

Level 3:
How does retrieval work?

Level 4:
How would you choose a chunk size?

Level 5:
How would you evaluate retrieval separately from generation?

Level 6:
How would you scale retrieval to hundreds of millions of vectors?

==================================================
24. INTERVIEW TRAPS
==================================================

For important questions add:

"Interviewer may ask next"

and

"Common mistake"

Example:

Question:
Accuracy is 95%. Is the model good?

Common mistake:
Immediately saying yes.

Better answer:
Check class balance, baseline, precision, recall, F1, confusion
matrix, and business cost.

==================================================
25. PROJECT OWNERSHIP QUESTIONS
==================================================

For every major project, include questions that test whether the candidate actually built it.

Examples:

- Which file contains the main training logic?
- What object is created first?
- Walk me through execution from entry point.
- What did you personally implement?
- What broke most frequently?
- What debugging tools did you use?
- Which experiment performed poorly?
- If you rebuilt it today, what would you change?
- What is one limitation you could not solve?

Answers must be grounded in repository code whenever possible.

==================================================
26. RESEARCH QUESTIONS
==================================================

Because Prathmesh has research-oriented projects, include questions about:

hypothesis
baselines
ablation studies
evaluation metrics
statistical significance
experimental setup
reproducibility
limitations
threats to validity
future work

Examples:

- Why did you choose these baselines?
- What does the ablation study demonstrate?
- How do you know the improvement came from your method?
- Were results statistically significant?
- Could there be dataset leakage?
- What happens on an unseen dataset?
- How reproducible are the experiments?

==================================================
27. ANSWER QUALITY
==================================================

Answers must:

- sound human
- be technically accurate
- avoid unnecessary jargon
- avoid exaggerating Prathmesh's contribution
- use his actual projects
- explain reasoning
- be suitable for speaking in interviews
- distinguish "I implemented" from "the project/research proposed"
- avoid claiming production-scale deployment unless verified

Do NOT write generic answers such as:

"This project enhanced my understanding..."

Prefer concrete engineering language:

"I used Ray actors because each worker needed to maintain its own model,
optimizer and scheduler state between training rounds."

==================================================
28. UI DESIGN
==================================================

Use a modern developer-tool inspired design.

Visual inspiration:

VS Code
GitHub
Linear
Ray documentation
modern technical documentation

Prefer:

dark/light themes
clean cards
subtle borders
excellent typography
monospace labels for technology
minimal animations
strong readability

Avoid excessive gradients and flashy effects.

==================================================
29. TECH STACK
==================================================

The site must work on GitHub Pages.

Preferred:

HTML
CSS
JavaScript

or a static framework that GitHub Pages can deploy reliably.

Avoid backend requirements.

Data can live in:

JSON
JavaScript objects
Markdown converted during build

Keep questions separated from UI code when possible.

Example:

data/
  projects/
    hqde.json
    fh-rag.json
    ta-rs.json
  ml.json
  dl.json
  nlp.json
  rag.json
  ray.json
  python.json

==================================================
30. SEO / METADATA
==================================================

Add proper:

title
description
favicon
OpenGraph metadata
responsive viewport

Title example:

Prathmesh Nikam | Interview Prep

==================================================
31. README
==================================================

Update README with:

project description
features
screenshots if available
local development instructions
directory structure
how to add questions
GitHub Pages deployment instructions

==================================================
32. GITHUB PAGES
==================================================

Ensure deployment works correctly from GitHub Pages.

If required, configure GitHub Actions deployment.

No hard-coded localhost paths.

All routes/assets must work under repository subpath:

/InterviewPrep/

==================================================
33. DATA QUALITY
==================================================

Remove duplicate questions.

Merge nearly identical concepts where appropriate.

Link related questions.

Example:

"What is overfitting?"

Related:
- regularization
- dropout
- cross-validation
- bias-variance tradeoff

==================================================
34. CONTENT PRIORITY
==================================================

Content priority should be:

1. Prathmesh's actual projects
2. Technologies appearing in those projects
3. ML / DL / NLP / RAG / distributed systems
4. Ray
5. Python
6. CS fundamentals
7. SQL
8. Behavioral questions

The website should ultimately prepare Prathmesh to answer both:

"What is attention?"

and:

"Why did YOU use this specific attention mechanism in TA-RS?"

==================================================
35. FINAL GOAL
==================================================

When finished, Prathmesh should be able to use this site as his primary
personal interview-preparation platform.

An interviewer should be able to pick almost anything from his resume or
GitHub and the website should contain:

- the expected question
- a concise answer
- a detailed answer
- likely follow-ups
- concept explanation
- diagrams where useful
- relevant implementation details
- limitations and tradeoffs

The end product should feel like a personalized interactive technical
interview handbook built directly from Prathmesh's own work.