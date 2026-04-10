# Setup & MVP Initialization Plan

This plan outlines the action list to configure your environment and start building the RouteIQ MVP. 

## Discovery
I surveyed your workspace and found that a **Vite + React** project is already initialized in `C:\ProjectLaddu\takeMeThere\take-me-there`. 
Instead of overriding this with a Next.js application, it is far more efficient to use this existing Vite configuration and layer PWA capabilities on top of it. Vite is extremely fast and perfect for our mobile-first React SPA.

> [!WARNING]
> **Environment Issue Detected:** I attempted to start tool installation, but `npm`, `npx`, `yarn`, and `pnpm` are not recognized commands in the current terminal session. This usually means Node.js is not installed, or it is not present in this session's PATH variable. 
> **Action Required:** You will need to ensure Node.js is installed on your system or fix your terminal's path before we can execute dependency installations.

## Proposed Changes

### 1. Core Tool Installation (Dependencies)
Once Node/NPM is available, we will run the installation for the following core packages:
*   **Routing/State:** `npm install react-router-dom` (For client-side navigation between Home, Map, and Jobs views).
*   **PWA Support:** `npm install -D vite-plugin-pwa` (To generate the manifest and Web Workers for offline support).
*   **Database/Auth:** `npm install @supabase/supabase-js` (To connect to our BaaS for driver auth and syncing routing data).
*   **Maps:** `npm install mapbox-gl react-map-gl` (To render interactive maps and draw routes).
*   **UI / Icons:** `npm install lucide-react` (Clean, standardized icon set for the mobile PWA).

### 2. Scaffold Initial Directory Structure
We will modify the existing `src/` directory to support our Domain Model:
*   `src/pages/` - (Home, RouteMap, JobDetails)
*   `src/components/` - (MapOverlay, BottomSheet, JobCard, NavigationBar)
*   `src/lib/` - (Supabase client, Mapbox API integration layer)
*   `src/store/` - (React Context or simple state for offline caching)
*   `src/styles/` - (Vanilla CSS variables for our premium design system)

### 3. PWA Setup
#### [MODIFY] [vite.config.js](file:///C:/ProjectLaddu/takeMeThere/take-me-there/vite.config.js)
- Import and configure `vite-plugin-pwa` to cache routing requests and core assets.

#### [MODIFY] [public/manifest.json](file:///C:/ProjectLaddu/takeMeThere/take-me-there/public/manifest.json)
- Generate a new manifest representing our mobile application (name, icons, theme color set to a dark mobile-first palette).

## Open Questions
1. Can you confirm if Node.js/NPM is installed on your Windows machine, or if we need to troubleshoot its PATH registration first?
2. Do you have a preferred Mapbox or Supabase account ready, or would you like me to mock these integrations for the immediate UI development?

## Verification Plan

### Automated Tests
*   Run the development server (`npm run dev`) and successfully load the React application.
*   Verify Lighthouse PWA score constraints are met locally.

### Manual Verification
*   We will visually verify the bottom navigation bar and Map layout rendering properly when viewing using Chrome's mobile emulator.
