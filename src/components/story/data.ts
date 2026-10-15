// Story-view copy for each project, keyed by mdx slug.
// Stages are taken from each project's own "Solution Architecture" section;
// numbers only appear here if they already appear in that write-up.

import type { LayoutName } from '@/components/story/layouts';

export interface Stage {
  label: string;
  note: string;
}

export interface StoryEntry {
  short: string;
  summary: string;
  caption: string;
  layout: LayoutName;
  stages: Stage[];
}

export const productionOrder = [
  'agora_rag',
  'nigerian_rag_health_system',
  'groundwork',
  'digital_lending_esign_prediction',
  'insightflow',
  'confidence_ai_coaching'
];

export const researchOrder = [
  'fraud_risk_detection_ml',
  'sign_language_recognition_cnn',
  'sentiment_lab_nlp',
  'ai_powered_sentence_completion',
  'market_basket_analysis_and_item_based_collaborative_filtering',
  'bank_marketing_insights',
  'data_analysis_using_factor_analysis_and_linear_regression',
  'data_predictive_insights_etl',
  'optimize_rider_efficiency_and_maximize_profitability'
];

export const story: Record<string, StoryEntry> = {
  agora_rag: {
    short: 'Agora RAG',
    summary:
      'A retrieval system over the ETO AGORA corpus of global AI governance documents. Every question is split into sub-queries, retrieved in parallel from Pinecone and answered by Gemini 2.5 Flash with sources attached.',
    caption: 'RAG PIPELINE',
    layout: 'zigzag',
    stages: [
      { label: 'Sub-query split', note: 'Gemini classifies intent and splits multi-part questions into up to 5 sub-queries.' },
      { label: 'Parallel retrieval', note: 'Embed each sub-query, pull the top 4 chunks from Pinecone by cosine similarity.' },
      { label: 'Context assembly', note: 'Dedupe chunks, rank by score, add the last 5 turns from Redis.' },
      { label: 'Synthesis', note: 'Gemini 2.5 Flash answers under a strict governance-analyst prompt.' },
      { label: 'Answer + memory', note: 'Answer and sources returned; the Q&A pair is saved to Redis with a 30-minute TTL.' }
    ]
  },
  nigerian_rag_health_system: {
    short: 'Dr. Amina',
    summary:
      'A medical RAG chatbot for underserved communities in Northern Nigeria, built for the DataFest Africa 2025 Hackathon. It flags emergencies, takes Hausa voice input and answers from 648 verified health documents.',
    caption: 'DUAL-PATH ASSISTANT',
    layout: 'dual',
    stages: [
      { label: 'Query in', note: 'Every message runs two paths in parallel: emergency check and retrieval.' },
      { label: 'Emergency check', note: 'Few-shot Gemini returns structured JSON; alert only if confidence is at least 0.80.' },
      { label: 'Retrieval', note: 'Gemini embedding, then Pinecone search over the medical document chunks.' },
      { label: 'Grounded answer', note: 'Gemini answers from the retrieved context with source attribution.' },
      { label: 'Persist', note: 'Conversation saved in Supabase; a database failure falls back to session memory.' }
    ]
  },
  groundwork: {
    short: 'Groundwork',
    summary:
      'An architecture advisor that refuses to recommend anything until an interview has gathered real constraints. It then answers from a curated corpus of technical books, with citations back to the source.',
    caption: 'ADVISOR PIPELINE',
    layout: 'staircase',
    stages: [
      { label: 'Elicitation', note: 'A state machine with a deterministic floor; the LLM can add a question but never skip the floor.' },
      { label: 'Query planning', note: 'One LLM call expands the stated needs into 2 to 4 search queries.' },
      { label: 'Drift filter', note: 'Queries that drift too far from the literal one (cosine threshold) are dropped.' },
      { label: 'Retrieval', note: 'Domain-filtered Pinecone search that widens when results are thin.' },
      { label: 'Rerank', note: 'Scored against the original query so the answer stays anchored to what was said.' },
      { label: 'Synthesis', note: 'Recommendation, alternatives, tradeoffs and risks, grounded only in retrieved text.' }
    ]
  },
  digital_lending_esign_prediction: {
    short: 'E-Sign prediction',
    summary:
      'An end-to-end model that predicts whether a loan applicant will complete e-signing, a real bottleneck in digital lending. Six models were compared and the winner exported as a .pkl file.',
    caption: 'MODELLING PIPELINE',
    layout: 'belt',
    stages: [
      { label: 'Applicant data', note: 'Clean missing values and duplicate IDs from the raw training file.' },
      { label: 'Feature engineering', note: 'Income-to-loan ratio, employment years and a composite risk score.' },
      { label: 'Baseline', note: 'Logistic regression as an interpretable reference (ROC-AUC 0.60).' },
      { label: 'Six models, tuned', note: 'Tree, forest, XGBoost, LightGBM, CatBoost and gradient boosting, with overfit checks.' },
      { label: 'Winner exported', note: 'XGBoost came out ahead (ROC-AUC about 0.69 on test) and was saved as a .pkl.' }
    ]
  },
  insightflow: {
    short: 'Insightflow',
    summary:
      'Conversational inventory tracking for building-materials stores. Sales typed in plain language are parsed by Gemini with a regex fallback, saved to Supabase and exposed to Power BI.',
    caption: 'PARSE AND CONFIRM FLOW',
    layout: 'snake',
    stages: [
      { label: 'Message in', note: 'Greetings and questions are answered directly and skip the parser.' },
      { label: 'Parse', note: 'Gemini 2.5 Flash extracts the items; a regex fallback covers quota limits and failures.' },
      { label: 'Canonical names', note: 'A dictionary maps variants like "loaf" to one item so analytics stay clean.' },
      { label: 'Confirm', note: 'The parsed sale is shown as a card before anything is saved.' },
      { label: 'Supabase', note: 'The confirmed transaction is inserted into Postgres.' },
      { label: 'Power BI views', note: 'Pre-aggregated SQL views feed the dashboards, with no live joins.' }
    ]
  },
  confidence_ai_coaching: {
    short: 'ConfidenceAI',
    summary:
      'Live AI confidence coaching with explainable scoring. A keyword check and a Gemini check both score the user, and the more cautious score wins.',
    caption: 'COACHING LOOP',
    layout: 'ring',
    stages: [
      { label: 'Message in', note: 'The user writes how they feel; "motivate me" short-circuits to a quote.' },
      { label: 'Hybrid score', note: 'Keyword pass and Gemini pass run together and the lower score is used.' },
      { label: 'Context build', note: 'Last 4 messages plus system and response prompts; low scores add a quote.' },
      { label: 'Gemini call', note: 'Three retries, then a written supportive fallback instead of an error.' },
      { label: 'Validated reply', note: 'Pydantic checks the AI output into tips and next steps before it reaches the UI.' }
    ]
  },
  fraud_risk_detection_ml: {
    short: 'Fraud detection',
    summary:
      'Fraud detection on 1M+ interbank transactions at a 0.3% fraud rate, with no synthetic balancing. A self-audit caught a data-leakage bug and lifted AUC-ROC from 0.82 to 0.92, and SHAP plus Gemini explain every flag.',
    caption: 'DETECTION PIPELINE',
    layout: 'funnel',
    stages: [
      { label: 'Transactions', note: '1 million transactions, about 3,000 of them fraud.' },
      { label: 'Features', note: 'Started at 62 features, pruned to 17, then 2 more added back after the audit.' },
      { label: 'Random Forest', note: 'AUC-ROC 0.9227 and 67.5% recall (405 of 600 fraud cases caught).' },
      { label: 'SHAP values', note: 'Computed offline for each scored transaction.' },
      { label: 'Gemini explanation', note: 'SHAP values and transaction facts become a plain-English explanation.' },
      { label: 'Leakage audit', note: 'Caught a look-ahead feature; the fix cut false positives from about 40,098 to 5,315.' }
    ]
  },
  sign_language_recognition_cnn: {
    short: 'Sign language CNN',
    summary:
      'A convolutional network that classifies 25 American Sign Language hand gestures. Dropout, augmentation and early stopping took test accuracy from 98.65% to 99.78%, with a real-time Flask webcam demo.',
    caption: 'VISION PIPELINE',
    layout: 'strip',
    stages: [
      { label: 'Webcam frame', note: 'OpenCV reads a frame from the webcam on the server.' },
      { label: 'Preprocess', note: 'Grayscale, resize to 28 by 28, normalize.' },
      { label: 'CNN', note: 'Classifies 25 gestures; early stopping watched validation loss.' },
      { label: 'Letter overlay', note: 'The predicted letter is drawn on the frame and streamed to the browser.' }
    ]
  },
  sentiment_lab_nlp: {
    short: 'Sentiment Lab',
    summary:
      'A TF-IDF and Naive Bayes baseline for classifying gaming and brand tweets as positive or negative. It reaches 62% accuracy on a small test set, reported as a first baseline with the missing steps named.',
    caption: 'BASELINE PIPELINE',
    layout: 'grid',
    stages: [
      { label: 'Tweets', note: 'A 500-row sample, filtered to positive and negative: 302 rows.' },
      { label: 'Tokenize', note: 'NLTK tokenization and stopword removal.' },
      { label: 'TF-IDF', note: 'A 302 by 1,661 feature matrix.' },
      { label: 'Naive Bayes', note: 'Trained on a split of 241 and 61, giving 62% test accuracy.' }
    ]
  },
  ai_powered_sentence_completion: {
    short: 'Sentence completion',
    summary:
      'Train a model on video-game scripts and lore and it starts writing like one. TF-IDF and Naive Bayes finish a sentence like "the hero must" in the right narrative tone.',
    caption: 'GENERATION LOOP',
    layout: 'spiral',
    stages: [
      { label: 'Game text', note: 'A hand-curated corpus of game scripts and lore with emotion labels.' },
      { label: 'Sliding window', note: 'Five words of context predict the sixth.' },
      { label: 'TF-IDF', note: 'Vectorize the context strings.' },
      { label: 'Naive Bayes', note: 'Predict the next word as a class over the vocabulary.' },
      { label: 'Top-5 sampling', note: 'Sample from the five most likely words to avoid repeating itself.' },
      { label: 'Slide and repeat', note: 'Append the word, shift the window, predict again.' }
    ]
  },
  market_basket_analysis_and_item_based_collaborative_filtering: {
    short: 'Market basket',
    summary:
      'What customers buy together and why. Market basket analysis finds the patterns, then item-based collaborative filtering recommends products to the Bronze customer segment.',
    caption: 'RECOMMENDER PIPELINE',
    layout: 'fork',
    stages: [
      { label: 'Transactions', note: 'Online Retail II, 806K+ rows, cleaned of cancelled and missing-ID orders.' },
      { label: 'RFM segments', note: 'Recency, frequency and monetary quartiles give Gold, Silver and Bronze.' },
      { label: 'K-Means check', note: 'A second, independent segmentation (k=4) cross-checks the tiers.' },
      { label: 'Apriori on Bronze', note: 'A strict threshold (lift 6 or more) gave an empty result, reported as a finding.' },
      { label: 'Collaborative filtering', note: 'Co-occurrence and Pearson correlation give per-customer recommendations.' }
    ]
  },
  bank_marketing_insights: {
    short: 'Bank marketing',
    summary:
      'Cleaning and correlation analysis of a bank campaign dataset to find what tracks with success. The linearity check failed, so the project stopped at correlation insights.',
    caption: 'ANALYSIS PIPELINE',
    layout: 'arc',
    stages: [
      { label: 'Campaign CSV', note: 'Client, campaign and economic attributes.' },
      { label: 'Normalize', note: 'Fix job and education formatting; rebuild dates.' },
      { label: 'Missing values', note: 'Unknowns turned into NaN and measured: about 20% missing in credit_default.' },
      { label: 'Encode', note: 'Label and one-hot encoding.' },
      { label: 'Correlations', note: 'Correlate every feature with campaign outcome.' },
      { label: 'Linearity check', note: 'It failed, so the regression was dropped rather than forced.' }
    ]
  },
  data_analysis_using_factor_analysis_and_linear_regression: {
    short: 'Factor analysis',
    summary:
      'Exploratory factor analysis on perfectionism survey data, then a regression of the latent factors on self-doubt. Run in jamovi, as analysis rather than software.',
    caption: 'ANALYSIS WORKFLOW',
    layout: 'cross',
    stages: [
      { label: 'Survey data', note: 'Perfectionism and self-doubt items.' },
      { label: 'Screening', note: 'Checked sample size, missingness and distribution.' },
      { label: 'Factor analysis', note: 'Four latent factors, explaining 50.3% of variance.' },
      { label: 'Regression', note: 'Self-doubt on the factor scores; the model explains 13.6% of variance.' },
      { label: 'Literature', note: 'Findings read against the existing perfectionism research.' }
    ]
  },
  data_predictive_insights_etl: {
    short: 'ETL pipeline',
    summary:
      'An ETL pipeline that pulls powerlifting competition data into a normalized PostgreSQL schema, trains a scoped regression (R² 0.411) and feeds Power BI dashboards.',
    caption: 'ETL PIPELINE',
    layout: 'wave',
    stages: [
      { label: 'Raw CSV', note: 'OpenPowerlifting export from Kaggle.' },
      { label: 'Transform', note: 'Cleaning, TotalKg derivation and weight-class normalization.' },
      { label: 'PostgreSQL', note: 'A normalized schema; failed rows go to a ProblematicRows table instead of being dropped.' },
      { label: 'Power BI', note: 'Dashboards query the normalized schema directly.' },
      { label: 'Regression', note: 'Scoped to male SBD lifters; R² 0.411 and about 114 kg average error.' }
    ]
  },
  optimize_rider_efficiency_and_maximize_profitability: {
    short: 'Rider efficiency',
    summary:
      'SQL analysis of a bike-sharing system: ridership joined to cost data to compute real profit and find the best time slots, with a Power BI dashboard for operations teams.',
    caption: 'SQL ANALYSIS',
    layout: 'rise',
    stages: [
      { label: 'Rides + costs', note: 'Two years of hourly ridership plus a price and COGS table.' },
      { label: 'Join', note: 'Revenue and profit derived once, in the join.' },
      { label: 'Season by hour', note: 'Average profit by season and hour finds the best operating windows.' },
      { label: 'Efficiency bands', note: 'High, moderate and low efficiency, so teams can act on it.' },
      { label: 'Rolling window', note: 'A 7-day rolling profit sum smooths daily noise.' },
      { label: 'Power BI', note: 'The dashboard reads the joined data directly.' }
    ]
  }
};
