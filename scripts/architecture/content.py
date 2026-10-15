"""Plain-English architecture content for each project, distilled from content/projects/*.mdx.

Only facts that already appear in each write-up are used. Blocks with no source
material (limits, next steps) are left empty rather than invented.

Flow stages (label + note) are read from src/components/story/data.ts so the PDFs
and the site figures never drift apart.
"""

# decisions: (title, why, cost_or_None)
CONTENT: dict[str, dict] = {
    "agora_rag": {
        "tagline": "Ask a question about global AI governance and get an answer with sources, not a guess.",
        "facts": [("1-5", "sub-queries per question"), ("4", "chunks retrieved per sub-query"), ("30 min / 7 days", "model memory / UI history")],
        "parts": [
            ("API layer (FastAPI)", "Checks each request and hands it to the core. No business logic lives here."),
            ("RAG core", "Reads documents, splits them into chunks, embeds them and searches Pinecone."),
            ("Chat engine", "Splits a question into sub-queries and writes the final answer."),
            ("Memory (Redis)", "Keeps recent turns so follow-up questions make sense."),
            ("Prompt file", "Every prompt template in one YAML file, loaded once at startup."),
        ],
        "decisions": [
            ("Split the question before searching", "One search over a multi-part question averages the parts and quietly drops one half of the answer. Splitting into up to 5 sub-queries and searching in parallel fixes that.", "Adds about 2-3 seconds. For a governance tool, completeness beats speed."),
            ("Chunk size tuned to the documents", "The default 1,200-token chunk turned each short document into a single chunk, which destroyed search precision. 500 tokens with 20% overlap gave 36 distinct chunks from 10 files.", None),
            ("Two separate memories", "A 30-minute, 5-message window feeds the model, because older context dilutes retrieval. A separate 7-day store backs the UI so users can reopen old sessions.", "Very old sessions lose model context even though the history stays visible."),
            ("Failures are loud, not silent", "An early version returned empty vectors when embedding failed, which Pinecone rejected with an unclear error. It now retries three times with backoff, then fails visibly.", None),
        ],
        "limits": ["Scanned or image-only PDFs cannot be read.", "Separating document sets by namespace is trust-based, not cryptographic, so it is unsuitable for sensitive multi-tenant data."],
        "next": ["Hybrid search (keyword plus semantic) to catch exact statute references.", "Cross-encoder reranking on the top 20 results before picking the final 4.", "Metadata filters such as jurisdiction, document type and year."],
    },
    "nigerian_rag_health_system": {
        "tagline": "A health assistant for Northern Nigeria that answers from verified documents and spots emergencies.",
        "note": "The emergency check and retrieval run side by side on every message, not one after the other.",
        "facts": [("648", "health documents indexed"), ("80%", "confidence needed to raise an emergency alert"), ("< 3 s", "typical response time")],
        "parts": [
            ("Emergency detector", "Gemini classifies each message and returns severity, condition, urgency and a reason."),
            ("Retrieval", "Embeds the question and finds the closest medical document chunks in Pinecone."),
            ("Answer writer", "Gemini answers from the retrieved text and names its sources."),
            ("Voice input", "Hausa speech-to-text, built in from the start."),
            ("Memory (Supabase)", "Stores chat history; falls back to session memory if the database is down."),
        ],
        "decisions": [
            ("Retrieval instead of fine-tuning", "Medical answers need traceable sources. With retrieval, every response points back to specific documents.", None),
            ("Emergency alerts are confidence-gated", "Keyword matching misses phrasing like \"my chest feels heavy\". Gemini scores severity instead, and an alert fires only above 80% confidence.", None),
            ("Hausa-first, not translated later", "Voice input supports Hausa natively rather than as an add-on translation layer.", None),
            ("Degrade, do not fail", "If Pinecone is unavailable the system falls back to a small set of curated, source-attributed snippets. Staying partly available beats going offline for people who may have no other guidance.", None),
        ],
        "limits": [],
        "next": [],
    },
    "groundwork": {
        "tagline": "An architecture advisor that interviews you first, then recommends with citations from real technical books.",
        "facts": [("6", "steps from interview to cited recommendation"), ("2", "technical books per knowledge domain"), ("2 weeks", "built solo, live on Render and Vercel")],
        "parts": [
            ("Elicitation state machine", "Asks questions until enough constraints are known. A hard minimum and maximum decide when to stop."),
            ("Query planner", "Turns the stated needs into 2-4 search queries, including concepts implied but never named."),
            ("Drift filter", "Drops any generated query whose meaning strays too far from what the user said."),
            ("Retrieval and rerank", "Pinecone search, then a rerank against the user's original wording."),
            ("Synthesizer", "Writes the recommendation, alternatives, tradeoffs and risks, with citations to book and chunk."),
        ],
        "decisions": [
            ("A fixed floor decides when to stop asking", "The language model can ask one more question but can never skip the minimum number of turns and populated fields. An \"I have enough\" on a nearly empty state is overridden.", None),
            ("Expand the search, then check for drift", "A scenario that needs updates within a second never says \"streaming\", so a literal search misses the right content. Generated queries are kept only if they stay close in meaning to the literal one.", None),
            ("One tagged index, with a fallback", "All content sits in one Pinecone index filtered by domain. If a filtered search returns too little, it widens to the whole corpus instead of showing \"no matches\".", None),
            ("Rerank against the original wording", "Expansion widens what is found; reranking keeps the final answer anchored to what the user actually said.", None),
        ],
        "limits": [
            "Only 2 of 5 architecture domains (ai-ml, data) have real book content so far.",
            "No automatic hallucination check; citations give traceability but nothing flags a wrong claim.",
            "Free-tier hosting means cold starts after inactivity and no uptime guarantee.",
            "Tested by the builder against real infrastructure, not yet by end users.",
        ],
        "next": [],
    },
    "digital_lending_esign_prediction": {
        "tagline": "Predicts which loan applicants will finish e-signing, so outreach goes where it works.",
        "facts": [("0.60 to 0.69", "ROC-AUC, baseline to winning model"), ("6", "models compared and tuned"), ("1", ".pkl file ready for integration")],
        "parts": [
            ("Data cleaning", "Fixes missing values and duplicate applicant IDs."),
            ("Feature engineering", "Total employment years, income-to-loan ratio and a composite risk score."),
            ("Model bench", "Six models, each tuned with GridSearchCV and RandomizedSearchCV."),
            ("Overfit check", "Compares training and validation scores for every model."),
            ("Export", "Winning XGBoost model and feature importances saved as a .pkl."),
        ],
        "decisions": [
            ("Keep the weak baseline in the loop", "Logistic regression scores only 0.60 but is easy to explain. Every boosted model is judged by its lift over it, which keeps the improvement honest.", None),
            ("Compare six models, do not assume", "Tree, forest, XGBoost, LightGBM, CatBoost and gradient boosting were each tuned separately. XGBoost won on the held-out test set.", None),
            ("Check overfitting before choosing", "Train versus validation gaps were checked per model, not just the final test score, to catch a model that memorised the data.", None),
            ("Be honest about the ceiling", "At about 0.69 ROC-AUC the model helps prioritise outreach. It is not for automatic approve or deny decisions.", None),
        ],
        "limits": ["ROC-AUC is moderate; not suitable for high-stakes decisions yet."],
        "next": ["Add user interaction and behavioural data beyond the static applicant fields.", "Build a pipeline for continuous model evaluation as new data arrives."],
    },
    "insightflow": {
        "tagline": "Type a sale in plain English and it becomes a clean, reportable record.",
        "facts": [("~90%", "of common formats covered by the fallback parser"), ("3", "pre-built SQL views for Power BI"), ("2", "parsers: Gemini first, regex as backup")],
        "parts": [
            ("Chat interface", "Takes messages like \"10 cement at 5000, 50 iron rods for 75000\"."),
            ("Parser", "Gemini 2.5 Flash extracts the items; a regex fallback covers outages and quota limits."),
            ("Item mapping", "A dictionary turns variants such as \"loaf\" into one canonical name."),
            ("Confirmation card", "Shows the parsed sale and grand total before anything is saved."),
            ("Database and views", "Supabase Postgres, with daily summary, category performance and top-items views for Power BI."),
        ],
        "decisions": [
            ("A fallback parser, because AI can fail", "Gemini has quota limits. The regex fallback handles three common patterns so data entry never stops.", None),
            ("Chat is detected before parsing", "Early versions threw errors on \"hi\" or \"help\". Greetings and questions are now answered directly and skip the parser.", None),
            ("Canonical item names", "\"Bread\", \"bread\" and \"loaf\" map to one item, so reports are not split across spellings.", None),
            ("Confirm before saving", "The parsed result is shown back as a card, so an AI misread is caught before it becomes a bad record.", None),
        ],
        "limits": [],
        "next": [],
    },
    "confidence_ai_coaching": {
        "tagline": "Live confidence coaching that scores how you feel and never leaves you with silence.",
        "facts": [("2", "scores combined; the lower one wins"), ("3", "retries before a supportive fallback"), ("4", "recent messages kept as context")],
        "parts": [
            ("Confidence assessor", "A keyword pass and a Gemini pass both score the message."),
            ("Context builder", "Adds the last four messages and the right prompts; low scores get a quote."),
            ("Gemini client", "Retries three times, then returns a written supportive reply."),
            ("Validator (Pydantic)", "Turns the AI's reply into typed fields: tips and next steps."),
            ("Session (Streamlit)", "Keeps the conversation for the current visit."),
        ],
        "decisions": [
            ("Score twice and trust the cautious one", "Under-reacting to distress is worse than over-reacting to a neutral message, so the lower of the two scores is used.", None),
            ("Every AI call has a real fallback", "If Gemini stays unreachable the user gets a supportive written reply instead of an error screen.", None),
            ("Validate the AI's own output", "Replies are parsed into typed models before they reach the interface, not trusted as free text.", None),
            ("Memory lives in the session only", "Context is the last four messages of the current visit.", "It does not carry across reloads or devices."),
        ],
        "limits": ["Conversation memory is not saved between visits."],
        "next": ["Multi-language support.", "Voice input and output.", "A plugin system and an OpenAPI layer. None of these are built yet."],
    },
    "fraud_risk_detection_ml": {
        "tagline": "Fraud detection that explains every flag, and caught its own data-leakage bug.",
        "note": "SHAP values and explanations are computed offline; only the follow-up chat on a case runs live.",
        "facts": [("1M+", "transactions at a 0.3% fraud rate"), ("0.82 to 0.92", "AUC-ROC after the leakage audit"), ("40,098 to 5,315", "approx. false positives after the fix")],
        "parts": [
            ("Feature engineering", "62 features pruned to 17, then 2 added back after the audit."),
            ("Random Forest", "Class-weighted, so fraud counts about 332 times more than normal in training."),
            ("SHAP and Gemini (offline)", "Explain each flagged transaction in plain English, grounded in the SHAP numbers."),
            ("Dashboard (Next.js)", "Static pages that read pre-computed results, so nothing heavy runs live."),
            ("Follow-up chat", "The one live feature: ask about a single case, answered from that case's facts only."),
        ],
        "decisions": [
            ("Class weighting instead of synthetic fraud", "Weighting keeps all the real training data and avoids made-up fraud patterns. SMOTE was tested and deliberately deferred.", None),
            ("Heavy work runs once, offline", "SHAP and explanations are slow, so they are baked into static files. Only the cheap follow-up question is live.", None),
            ("The audit is the headline", "An unexpectedly large AUC jump triggered a leakage check. It found a feature that used future data, in a model already deployed, and the fix was verified against the raw rows.", None),
            ("The mistakes are public", "A findings file documents an earlier version that reported the wrong gain and an incomplete check, before it was corrected.", None),
        ],
        "limits": ["One of the original 17 features correlated with the leaky one, so the original 0.822 AUC already carried some diluted leakage."],
        "next": [],
    },
    "sign_language_recognition_cnn": {
        "tagline": "Reads 25 American Sign Language hand gestures from a webcam in real time.",
        "facts": [("98.65% to 99.78%", "test accuracy after regularisation"), ("25", "hand gestures recognised"), ("28 x 28", "grayscale input per frame")],
        "parts": [
            ("Camera capture (OpenCV)", "Reads frames from the webcam on the server."),
            ("Preprocessing", "Grayscale, resize to 28 x 28, normalise."),
            ("CNN classifier", "Predicts the letter; two saved versions (.h5) allow a before/after comparison."),
            ("Flask stream", "Draws the letter on the frame and streams video to the browser (MJPEG)."),
        ],
        "decisions": [
            ("Keep both model versions", "The plain CNN reached 98.65%. Adding dropout and data augmentation reached 99.78%. Both files stay in the repo so the gain can be checked.", None),
            ("Stop on validation loss", "Early stopping watches validation loss with 3 epochs of patience and restores the best weights, instead of a metric that keeps rising as the model memorises.", None),
            ("Admit the local-only limit", "The demo opens the server's own camera, so it cannot serve public visitors. A browser-capture design was started to fix that.", None),
        ],
        "limits": ["Works as a local demo only; a public visitor's camera cannot reach a remote Python process this way."],
        "next": ["Finish the browser version: capture frames with getUserMedia and POST them to a /predict endpoint."],
    },
    "sentiment_lab_nlp": {
        "tagline": "A transparent first baseline for tweet sentiment, with its gaps named.",
        "facts": [("62%", "test accuracy on 61 tweets"), ("302", "positive and negative tweets used"), ("1,661", "TF-IDF features")],
        "parts": [],
        "decisions": [
            ("A baseline on purpose", "TF-IDF with Naive Bayes is fast and easy to read. Its value is showing what a better model has to beat.", None),
            ("Binary scope, stated as a simplification", "Dropping Neutral and Irrelevant made the first pass tractable, at the cost of two of the four real classes.", None),
        ],
        "limits": ["The validation file was loaded but never evaluated.", "Trained on about 300 rows, not the full dataset.", "Neutral and Irrelevant tweets are dropped, not handled."],
        "next": ["Evaluate on the validation set.", "Train on the full dataset.", "Handle all four classes."],
    },
    "ai_powered_sentence_completion": {
        "tagline": "Finish a sentence in the tone of a video-game story.",
        "facts": [("5 to 1", "words of context predict the next word"), ("Top 5", "words sampled for variety"), ("Hand-labelled", "emotion annotations in the dataset")],
        "parts": [],
        "decisions": [
            ("Next word as classification", "Predicting the next word is framed as choosing a class over the vocabulary. TF-IDF with Naive Bayes is a deliberately light baseline that shows the whole pipeline end to end.", None),
            ("Sample the top 5, not the single best", "Always taking the most likely word gives repetition. Sampling among the top five trades a little precision for more natural variety.", None),
            ("A custom emotion-labelled dataset", "Text was hand-curated from game scripts and lore with emotion labels. The labels exist but are not yet a model input.", None),
        ],
        "limits": ["Emotion labels are not yet used by the model.", "The Streamlit interface was scoped but not built; the model runs from a notebook."],
        "next": ["Swap in transformer embeddings for real context.", "Extend from sentences to paragraphs and dialogue.", "Use the emotion labels as a conditioning signal.", "Build the Streamlit interface."],
    },
    "market_basket_analysis_and_item_based_collaborative_filtering": {
        "tagline": "Finds what Bronze-tier customers buy together and recommends the next product.",
        "facts": [("806K+", "transactions analysed"), ("2", "independent segmentations: RFM and K-Means"), ("0", "rules at the strict threshold, reported not hidden")],
        "parts": [],
        "decisions": [
            ("Two segmentations, not one", "RFM quartiles and K-Means clustering ran on the same features. Getting a similar structure from two methods is a basic sanity check.", None),
            ("Scoped to one segment", "Bronze customers (low frequency, low spend, still active) have the most upside, so recommendations were built there.", None),
            ("Report the empty result", "At lift 6 or more and confidence 0.70 or more, no rules qualified. The threshold was not loosened until something appeared.", None),
            ("Name the weak spots", "Exact correlations of 1.0 or -0.5 on thin data are a known artefact, and the write-up says so.", None),
        ],
        "limits": ["Correlations from thin evidence can look more confident than they are."],
        "next": ["Re-run Apriori at a lower threshold to see weaker real associations.", "Weight correlations by the number of shared invoices.", "Repeat for the Silver and Gold segments."],
    },
    "bank_marketing_insights": {
        "tagline": "Finds what tracks with campaign success, and stops where the data stops supporting a model.",
        "facts": [("~20%", "of credit_default values missing"), ("1", "regression assumption tested: linearity failed"), ("3", "analysis subsets: client, campaign, economic")],
        "parts": [],
        "decisions": [
            ("Stop instead of forcing a model", "The linearity check failed, so the regression was dropped rather than shipped on bad assumptions.", None),
            ("Measure missing data first", "Unknown values became NaN and were counted before deciding what to do, instead of being filled in silently.", None),
            ("Split by question", "Client, campaign and economic columns were analysed separately so each question stays focused.", None),
        ],
        "limits": ["No predictive model was built; the findings are correlations."],
        "next": ["Try tree-based models (Random Forest, Gradient Boosting), which do not need linear relationships."],
    },
    "data_analysis_using_factor_analysis_and_linear_regression": {
        "tagline": "Reduces survey noise to four perfectionism factors and tests what predicts self-doubt.",
        "facts": [("4", "latent perfectionism factors"), ("50.3%", "variance explained by the factors"), ("13.6%", "variance in self-doubt explained")],
        "parts": [],
        "decisions": [
            ("Factor analysis before regression", "Many survey items overlap. Regressing on all of them would give a tangled, multicollinear model, so they were reduced to factors first.", None),
            ("Report effect size, not only significance", "50.3% and 13.6% are stated plainly. A model explaining 13.6% is a real but modest effect.", None),
            ("Tie results to the literature", "Findings are read against existing perfectionism research rather than shown in isolation.", None),
        ],
        "limits": ["Convenience sampling limits how far results generalise.", "A cross-sectional design shows correlation, not causation."],
        "next": ["Longitudinal or intervention studies to test causal claims."],
    },
    "data_predictive_insights_etl": {
        "tagline": "A pipeline that turns raw powerlifting results into a clean database, a dashboard and a baseline model.",
        "facts": [("8", "normalised tables, plus a failed-rows table"), ("R2 0.411", "regression baseline"), ("~114 kg", "average prediction error (RMSE)")],
        "parts": [
            ("Extract", "OpenPowerlifting CSV from Kaggle."),
            ("Transform", "Cleaning, TotalKg derivation and weight-class normalisation."),
            ("Load", "Normalised PostgreSQL schema for athletes, meets, lifts and performance."),
            ("Report and model", "Power BI dashboards plus a scikit-learn regression with an auto-generated report."),
        ],
        "decisions": [
            ("A normalised schema, not one flat table", "Splitting athletes, meets, equipment and lifts makes the data answer questions the way an analyst asks them.", None),
            ("A table for rows that fail", "Failed inserts go to ProblematicRows with the error and raw data, so one bad row never aborts the load or vanishes.", None),
            ("Model a coherent group", "The regression covers male competitors in full SBD meets with outliers removed, because mixed groups blur the signal.", None),
            ("Report the numbers as they are", "41.1% of variance explained and a roughly 114 kg error are stated as a baseline for spotting trends, not a precise predictor.", None),
        ],
        "limits": ["The model is a baseline for trends, not a precision predictor."],
        "next": [],
    },
    "optimize_rider_efficiency_and_maximize_profitability": {
        "tagline": "SQL that shows operations teams when and where bike-sharing makes money.",
        "facts": [("2 years", "of hourly ridership"), ("7-day", "rolling profit window"), ("3", "efficiency bands: high, moderate, low")],
        "parts": [],
        "decisions": [
            ("Derive revenue and profit once, in the join", "Computing them in the initial join means every later query uses the same numbers.", None),
            ("Efficiency as a category", "High, moderate and low bands give operations teams something to act on, instead of a raw ratio.", None),
            ("Rolling window over daily numbers", "A 7-day rolling sum smooths single good or bad days so the seasonal trend shows.", None),
            ("Prepared, not claimed", "Lagged features (previous-day riders) are ready for a model, but no forecasting model was trained or claimed.", None),
        ],
        "limits": [],
        "next": ["A demand forecasting model on the prepared lagged features.", "Anomaly detection for days outside a statistical band."],
    },
}
