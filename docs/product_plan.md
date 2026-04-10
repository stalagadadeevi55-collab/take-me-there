# Product Architecture & Strategy: Route & Profit Intelligence Platform

## SECTION 1: PRODUCT SUMMARY

- **Product Name Ideas:** MarginRoute, ShiftX, PathProfit, YieldDrive
- **One-Line Value Proposition:** A driver-first intelligence platform that optimizes routes based on time, fuel, and profitability, not just raw distance.
- **Short Product Description:** A mobile-first Progressive Web App (PWA) designed for service and delivery professionals. It transforms a static list of jobs into a dynamically optimized, profit-maximizing route. By layering deterministic routing engines, predictive historical intelligence, and a conversational AI interface, it helps drivers complete more stops in less time, adapt to mid-day changes, and maximize their hourly earnings.
- **Target Users:** Independent contractors, owner-operators, and small-to-medium fleet drivers in high-frequency, complex routing verticals.
- **Core Pain Points:** 
  1. Traditional GPS apps optimize for A-to-B distance, ignoring the cost of time, setup/teardown variables, and complex time windows.
  2. Re-optimizing a route mid-day due to a cancellation or delay is entirely manual and error-prone.
  3. Drivers don't have visibility into how routing decisions impact their direct bottom-line profit per hour.
- **Differentiation vs Typical Routing:** Google Maps limits stops and doesn't handle time windows. Fleet management tools (like Samsara) are built for enterprise dispatchers, not the driver's mobile UX. We focus on the *driver's profit and efficiency* unit economics locally.

---

## SECTION 2: USER SEGMENTS

### A. Mowing & Lawn Care Businesses
- **Persona:** Marcus, 35. Owner-operator of a 2-truck lawn care business. He drives one truck and manages 2 employees on the other.
- **Workflows:** Loads jobs for the week. Needs to sequence 15-20 yards per day. Drives a truck with a heavy trailer (low MPG, hard to park/turn around). 
- **Inefficiencies:** Routing across town 3 times a day because of client scheduling demands. Spending 10 minutes parking and unloading the trailer at bad sites. Fuel burn while towing.
- **Success Metrics:** Yards mowed per shift; reduction in fuel consumed per truck; zero time wasted backtracking.
- **Must-Have Features:** Neighborhood clustering (doing all houses in one subdivision back-to-back), property size/setup time notes, heavy-vehicle routing (avoiding tight dead-ends).
- **Edge Cases:** Weather delays pushing 3 jobs to tomorrow, requiring a complete route re-optimization for the remainder of the week.

### B. Medical Delivery Drivers
- **Persona:** Sarah, 28. Independent contractor delivering specialty meds from centralized pharmacies to nursing homes and patients.
- **Workflows:** Hub-to-spoke. Arrives at pharmacy, scans 25 packages, hits the road. 
- **Inefficiencies:** Traffic delays causing a missed delivery window at a clinic (which means returning the package to the hub). Cumbersome physical signature processes.
- **Success Metrics:** 100% On-Time Delivery (OTD) rate. Zero SLA breaches.
- **Must-Have Features:** Strict time-window constraints (e.g., "Must deliver between 1 PM and 3 PM"), Proof of Delivery (PoD) with signature/photo, HIPAA-compliant data masking (showing only address, not patient condition).
- **Edge Cases:** An STAT (urgent) order gets pushed to the driver mid-route, requiring the system to immediately re-route the sequence to hit the STAT window without dropping existing commitments.

---

## SECTION 3: MVP DEFINITION

The Goal of the MVP is to prove that our optimization yields a higher completion rate or lower fuel spend than the driver's current manual process.

- **User Inputs:**
  - Import a list of addresses (via basic CSV upload on web, or manual input/copy-paste on mobile).
  - Define simple service times (e.g., "15 mins per stop").
  - Define shift start/end location (e.g., driver's home).
- **Outputs:**
  - An ordered list of stops visualized on a map and as a list.
  - Turn-by-turn navigation handoff (deep-linking to Google Maps/Apple Maps).
  - Estimated shift completion time and total mileage.
- **Workflows:**
  1. Driver inputs stops.
  2. Driver clicks "Optimize Route".
  3. System uses deterministic engine to order stops.
  4. Driver marks stops as "Complete" sequentially.
- **Screens (PWA):**
  - **Login/Auth:** Phone number SMS OTP.
  - **Today's Route:** List of jobs, map preview, "Start Route" button.
  - **Active Stop View:** Big "Navigate" button, "Mark Complete" swipe-to-confirm.
- **Out of Scope for MVP:**
  - In-app turn-by-turn navigation map engine (too expensive/complex for MVP).
  - AI predictive layer and LLM chat.
  - Direct integration with CRM software (ServiceTitan, etc.).
- **Assumptions Being Tested:** Drivers are willing to use a 3rd party app to sequence their day, rather than just punching addresses one-by-one into Waze.

---

## SECTION 4: AI STRATEGY

Routing AI must be reliable. We cannot hallucinate a route. Therefore, we use a strict 3-layer architecture.

### 1. Deterministic Rules Engine (Core Logic)
- **Responsibilities:** Solves the mathematically hard Vehicle Routing Problem (VRP). Enforces strict constraints like time windows and vehicle capacities.
- **Data Inputs:** Distance matrix (travel times between all pairs of stops), set of coordinates, time window hard limits.
- **Example Outputs:** `[Stop 4, Stop 1, Stop 3, Stop 2]`
- **Timeline:** **MVP Requirement**. We will utilize Google OR-Tools or a specialized routing API (e.g., Route4Me API or Mapbox Optimization API) as the foundation.

### 2. Predictive Intelligence (Historical Data Layer)
- **Responsibilities:** Adjusts the inputs going *into* the deterministic engine based on reality. 
- **Data Inputs:** Historical GPS telemetry, driver completion times, parking delay data.
- **Example Outputs:** Adjusting the expected duration of a hospital delivery from "5 minutes" (baseline) to "18 minutes" (predictive) because historical data shows drivers always struggle to find parking there. This forces the deterministic engine to output a different, more realistic route.
- **Timeline:** **Beta+**. Requires capturing enough MVP data to train models.

### 3. LLM / Conversational Layer (UX & Explainability)
- **Responsibilities:** Translates complex system decisions into driver-friendly explanations. Ingests unstructured inputs.
- **Data Inputs:** Driver voice memos ("I skipped the Smiths because the gate was locked"), optimization logs.
- **Example Outputs:** 
  - *Explainability:* "We routed you to Elm Street first because missing its 2 PM time window would cost you a $50 SLA penalty."
  - *Data Entry:* Driver says "Add a 30-minute lunch break at 1 PM." The LLM parses this intent and converts it into a rigid Time Window constraint for the deterministic engine.
- **Timeline:** **V2**.

---

## SECTION 5: CORE FEATURES

| Feature | Description | Phase |
| :--- | :--- | :--- |
| **Route Optimization (TSP)** | Shortest path sequencing of up to 50 stops | **MVP** |
| **Deep-link Navigation** | 1-click push to Google Maps/Waze w/ coordinates | **MVP** |
| **Job Status Toggling** | Mark "Complete", "Skipped", or "Failed" | **MVP** |
| **Time Windows** | Hard SLA constraints (Deliver between X and Y) | **Beta+** |
| **Mid-Day Re-Optimization** | 1-click re-calculate if a job is added/dropped | **Beta+** |
| **Proof of Delivery (PoD)** | Photo capture and simple signature pad | **Beta+** |
| **Driver Profiles** | Historical velocity, preferred break times | **Beta+** |
| **Profit Analytics** | Weekly dashboard mapping earnings vs fuel vs time | **V2** |
| **Predictive Service Times** | ML adjusted stop durations based on location history | **V2** |
| **Voice-to-Action (LLM)** | "Reschedule my next stop to tomorrow" via voice | **V2** |

---

## SECTION 6: MOBILE UX DESIGN

- **Design Philosophy:** Big touch targets, high contrast (for sunlight visibility), designed for single-handed use while walking. Premium aesthetics using curated color palettes, subtle glassmorphism for floating UI elements, and highly responsive micro-animations for interactions (e.g., satisfying checkmark animations).
- **Navigation Pattern:** Bottom app bar (Home, Route, Add, Profile).
- **Main Screens:**
  1. **Home/Dashboard:** Daily summary (e.g., "5 stops left, ~2.5 hrs remaining"). Big primary Call to Action to resume the current route.
  2. **Active Route (Map + List):** Split screen. Map on top with path line. Draggable bottom sheet with the ordered list of stops.
  3. **Stop Details (Focus Mode):** Takes over screen when arriving. Huge address, notes field. Big buttons: [Navigate] [Mark Complete].
  4. **AI Insights (V2):** A feed of contextual cards ("💡 You usually finish this route 30 mins faster; traffic is heavy today.").
- **Offline Behavior (Critical):** The day's route, notes, and map geometry must be cached in local storage (Service Worker/IndexedDB) at the start of the shift. If a driver loses cell service, they can still view their sequenced list and mark jobs complete. Synced back to the server when connection is restored.

---

## SECTION 7: DOMAIN MODEL

**Core Entities:**
- `Organization` (Tenant)
  - `id`, `name`, `billing_plan`, `settings`
- `User`
  - `id`, `org_id`, `role` (driver, admin), `phone`, `auth_token`
- `Vehicle`
  - `id`, `org_id`, `fuel_type`, `mpg_estimate`, `capacity`
- `Job` (Abstract base)
  - `id`, `org_id`, `lat`, `lng`, `address`, `status` (pending, complete, skipped), `base_duration_mins`
- `Route`
  - `id`, `driver_id`, `vehicle_id`, `date`, `status` (planned, active, finished)
- `RouteStop` (Join table enforcing order)
  - `id`, `route_id`, `job_id`, `sequence_number`, `eta`, `actual_arrival`, `actual_departure`

**Vertical Extensions:**
- `MowingJob` (Extends Job)
  - `lot_size_sqft`, `equipment_required` (e.g., "Z-Turn Mower"), `gate_code`
- `MedicalDelivery` (Extends Job)
  - `time_window_start`, `time_window_end`, `requires_signature` (boolean), `stat_urgent` (boolean), `patient_reference_id` (masked)

---

## SECTION 8: TECHNICAL ARCHITECTURE

- **Frontend (PWA):** Next.js (React) deployed to Vercel. Chosen for excellent PWA support, fast initial load via SSR, and React ecosystem. Styling via Vanilla CSS with custom utility classes ensuring high-performance, non-generic, premium aesthetics requested. Use `next-pwa` for Service Workers.
- **Backend API:** Node.js + TypeScript (Express or Fastify). Fast iteration, easily handles async I/O heavy workloads (talking to external routing APIs).
- **Database:** PostgreSQL with PostGIS extension (hosted on Supabase or Neon). PostGIS is non-negotiable for spatial queries (e.g., "Find all jobs within 5 miles of current lat/lng").
- **Caching & Queues:** Redis (Upstash). Used to process route optimization requests asynchronously, preventing frontend timeouts on heavy VRP calculations.
- **Routing Engine:** Google OR-Tools (Python microservice) OR Mapbox Optimization API. For the MVP, an external API like Mapbox is faster to implement. For Beta+, building a custom Python OR-Tools microservice via Docker allows injection of custom constraints.
- **Auth:** Supabase Auth (OTP SMS primary, drivers hate passwords).
- **Observability:** Sentry for frontend/backend error tracking; PostHog for user analytics product metrics (funnels, drop-offs).

---

## SECTION 9: API DESIGN (RESTful)

*All requests require `Authorization: Bearer <token>`*

**Route Management**
- `POST /api/v1/routes`: Create a new route container for a date.
- `POST /api/v1/routes/{id}/optimize`: Trigger async optimization of all assigned jobs. Returns a Job ID.
- `GET /api/v1/routes/{id}/status`: Poll for optimization completion.
- `GET /api/v1/routes/{id}`: Fetch ordered sequence, coordinates, and ETAs.

**Job / Stop Execution**
- `POST /api/v1/jobs`: Bulk upload/create jobs.
- `PATCH /api/v1/route-stops/{id}/status`: Driver marks a stop active/complete. (Payload includes current GPS timestamp for analytics).
- `POST /api/v1/route-stops/{id}/pod`: Upload photo/signature payload for a stop.

---

## SECTION 10: DATA STRATEGY & PRIVACY

- **What we collect:** High-frequency GPS pings *only while a route is active*. Timestamps for button presses (Arrive, Complete). Job metadata.
- **How it improves the system:** GPS breadcrumbs are compared against the planned route. If deviations occur frequently in a specific neighborhood, the predictive ML layer adjusts future travel time matrices for that edge.
- **What to avoid:** Do NOT track location when `status != active`. Drivers are highly sensitive to "big brother" tracking.
- **Medical Compliance (HIPAA):** 
  - Database must encrypt at rest.
  - Job payloads sent to the mobile client must never contain raw patient health information (PHI) unless strictly necessary for delivery, and if so, must be access-logged.
  - Photos taken for PoD must go straight to secure cloud storage (e.g., AWS S3 via pre-signed URLs) and NOT be saved in the phone's native camera roll.

---

## SECTION 11: BETA PLAN

- **Onboarding:** High-touch concierge. Do not launch self-serve immediately. Find 5 owner-operator lawn businesses and 5 medical couriers. We will manually ingest their spreadsheets into the system to remove friction.
- **Measurement:** 
  - *Quantitative:* Reduction in total miles driven per route compared to their historical average. Time to complete 10 stops. 
  - *Qualitative:* Driver CSAT score ("Did you feel less stressed today?").
- **Feedback Loop:** In-app simple feedback button + mandatory weekly 15-min debrief call with beta testers.
- **Success Criteria:** 70% of Beta testers choose to keep using the product after the 30-day trial instead of returning to their old methods.

---

## SECTION 12: ROADMAP

| Phase | Core Goal | Key Deliverables | Risk to Mitigate |
| :--- | :--- | :--- | :--- |
| **MVP (Weeks 1-6)** | Prove basic value | PWA, manual entry, Mapbox basic routing, Status toggles | Driver adoption/friction |
| **Beta (Month 3)** | Handle real-world chaos | Time windows, PoD logic, Offline support, CSV upload | Scale of solver timeouts |
| **V1 (Month 6)** | Commercialization | Stripe billing, multi-driver dispatch dashboard, API integrations | Churn due to missing niche features |
| **V2 (Month 9+)** | The Intelligence Moat | Predictive ML times, LLM voice interactions, Profit analytics UI | Tech debt / complexity |

---

## SECTION 13: COMPETITIVE POSITIONING

- **Who we compete with:** 
  1. Consumer apps (Google Maps, Waze, Circuit Route Planner).
  2. Enterprise legacy software (Samsara, Route4Me, Verizon Connect).
- **Why we are different:** Consumer apps are too dumb (no time windows, no profit logic). Enterprise apps are too heavy (require massive implementation, terrible mobile UX for the actual driver). We own the "Prosumer/SMB Mobile" space. We treat the driver as the primary stakeholder, not an afterthought.
- **Long-term Moat:** Proprietary data telemetry. Once we know the *actual* time it takes to service a house or park at a specific clinic, our predictive routing becomes vastly superior to standard distance-based APIs.

---

## SECTION 14: OPEN QUESTIONS

1. **Product:** Will lawn care operators actually configure "service time per property", or is that too much data entry friction? Need to test default assumptions.
2. **AI/Tech:** At what job volume does an external API (Mapbox) become cost-prohibitive vs building our own OR-Tools solver cluster? 
3. **UX:** How do we handle deep-linking limitations in iOS where Apple Maps sometimes strips out exact coordinates or complex waypoints?
4. **Monetization:** Should we charge per driver/month (SaaS) or per route optimized (usage-based)? Couriers prefer per-route, mowers usually prefer flat-fee.

---

## SECTION 15: NEXT STEPS & RECOMMENDATION

**Recommendation for MVP Starting Point:**
Do NOT build both vertical extensions (Mowing and Medical) at once. The constraints are too divergent.

1. **Pick Mowing / Field Service first.** It is more forgiving than Medical Delivery. If a lawn is cut at 3 PM instead of 1 PM, nobody dies, and there are no HIPAA compliance hurdles on day one.
2. **Build out the core PWA and basic routing (without time windows).** Give it to 3 local lawn care businesses for free.
3. **Draft the database schema** focusing heavily on the `Job` and `RouteStop` relationships. 
4. **Setup Next.js environment** ensuring the PWA manifest and basic offline Service Worker are prioritized before any complex UI is built.

**Immediate Action:** Choose the primary beta industry (Mowing) and allow me to start scaffolding the Next.js PWA and the PostgreSQL schema.
