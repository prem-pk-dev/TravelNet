# TravelNet

**Professional Travel Network & Community**

TravelNet is a mobile-first, multi-page static frontend concept for travel and tourism professionals. Its product direction combines professional networking patterns inspired by LinkedIn with community management patterns inspired by Facebook Groups, adapted for travel agencies, tour operators, hotels, DMCs, suppliers, destination specialists and travelers.

## Current implementation

### Foundation and home feed
- Responsive desktop/mobile application shell and consistent TravelNet identity
- Home feed with category filtering and industry conversation cards
- Demo post composer with local persistence, reactions, comments and saved state
- Professional recommendation cards and connection invitation demo
- Responsive sidebar and mobile bottom navigation
- Accessible modal basics, toast feedback and reduced-motion CSS support

### Professional profiles and network discovery
- Separate `profile.html` and `network.html` pages
- Local profile editing for headline, location and introduction
- Experience, education and travel-interest profile sections
- Searchable professional directory with speciality and region filters
- Local connection invitation state and pending invitation list
- Illustrative sample profiles are labelled as demo content

### Communities and group management UI
- Separate `groups.html` community directory and `community.html` detail page
- Search and filters for community topic and access type
- Open group join/leave and request-to-join demo states saved locally
- Community guidelines and discussion topic examples
- New discussion drafts stored only in this browser
- Local community moderation preview with production moderation explicitly not connected

### Company pages and supplier discovery
- Separate `companies.html` directory and `company.html` profile detail page
- Searchable illustrative business directory with business-type and region filters
- Company profiles show business category, location, destination focus, service capabilities and demo status
- Local-only request-information form with explicit non-delivery notice
- All sample organisations are fictional illustrative records and are not verified businesses

### Authentication and onboarding UI
- Separate login.html and signup.html screens
- Password visibility toggle and client-side form validation
- Three-step onboarding.html profile setup flow
- Role selection, company, job title, location, experience and interest selection
- Non-sensitive onboarding profile draft saved locally in the current browser
- Home page links to sign-in, account creation and profile setup

## Project structure

    TravelNet/
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── onboarding.html
    ├── profile.html
    ├── network.html
    ├── companies.html
    ├── company.html
    ├── groups.html
    ├── community.html
    ├── assets/css/styles.css
    ├── assets/css/auth.css
    ├── assets/css/network.css
    ├── assets/css/business.css
    ├── assets/css/groups.css
    ├── assets/js/app.js
    ├── assets/js/auth.js
    ├── assets/js/network.js
    ├── assets/js/business.js
    ├── assets/js/groups.js
    ├── .github/workflows/deploy.yml
    └── README.md

## Technology
- HTML5, CSS3 and Vanilla JavaScript
- LocalStorage / SessionStorage for non-sensitive prototype state
- No custom backend

## Run locally
Open index.html through a static local server (recommended) or use GitHub Pages/Cloudflare Pages.

## Prototype and security limitations
This is a static frontend prototype, not a production social network. Sign-in and account creation screens are UI demonstrations only. No credentials are transmitted, authenticated or stored. Do not enter real passwords or sensitive personal information. Profile drafts and feed interactions are stored only in the current browser and are not shared between users or devices.

Real authentication, secure permissions, shared profiles, real-time messaging, notifications, verification, moderation, payments and recruitment data require trusted external services or a backend. These features must not be represented as live until integrated and tested.

## Roadmap
1. Foundation and shared components — implemented
2. Authentication and onboarding UI — implemented as frontend prototype
3. Home feed and content creation — initial prototype implemented
4. Profiles and professional network — initial frontend implemented
5. Company pages and supplier discovery — initial frontend implemented
6. Groups and community administration — initial frontend implemented
7. Messaging and notifications
8. Jobs and recruitment
9. Events and publishing
10. Learning Hub
11. Premium and advertising interfaces
12. Settings and admin tools
13. Accessibility, responsive and functional QA
14. Deployment verification

## Product principles
- Separate HTML pages for major product screens.
- Mobile-first responsive experience.
- No fake testimonials, fake ratings or unverified business claims.
- Demo data must be clearly distinguished from real user/business records.
- Buttons should have working actions; unavailable production integrations must be identified honestly.
