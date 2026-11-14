# Phase 01 — LinkedIn homepage and platform shell research

**Project:** TravelNet  
**Reference:** LinkedIn professional network  
**Status:** Initial architecture audit and first TravelNet homepage adaptation implemented  
**Scope:** Logged-in homepage shell, global navigation, discovery surfaces, feed entry points and responsive navigation  
**Implementation constraint:** Static frontend only (HTML, CSS and vanilla JavaScript). Browser-local demo state only. No backend or live multi-user claims.

## 1. Reference pattern inventory

The LinkedIn-style professional homepage is best understood as a set of persistent navigation and discovery layers around a personalized content feed.

### Global shell
- Persistent brand/home entry point.
- Global search with people, companies, groups and content as search domains.
- Primary destinations for Home, My Network, Jobs, Messaging and Notifications.
- Account/profile access and contextual actions.
- Responsive collapse of desktop navigation into compact mobile navigation.

### Logged-in homepage content hierarchy
1. Welcome / contextual entry point.
2. Post composer and supported content types.
3. Personalized or selected feed.
4. Feed controls (relevance/latest, category or content filters).
5. Professional recommendations.
6. Topic and group discovery.
7. Company and industry discovery.
8. Events and opportunities as secondary discovery surfaces.
9. Saved content and account utilities.

### Feed interaction inventory
- Create a post with text and supported media.
- React, comment, reply, share/repost and save.
- Open contextual post menu.
- Report or hide content.
- Filter or sort feed.
- Display author identity, role, organization/location context and timestamp.
- Provide clear empty, loading, error and confirmation states.
- Keep all actions keyboard accessible and expose meaningful labels.

### Discovery inventory
- People recommendations with a clear connect/follow action.
- Group recommendations with a direct route to the group detail.
- Company discovery by category and region.
- Topic discovery with a clear explanation of the subject.
- Events and opportunities should be linked to dedicated pages once those modules are implemented.

## 2. Current TravelNet repository audit

The existing repository already contains separate pages for:
- Home feed
- Professional profile
- My network
- Communities and community detail
- Companies and company detail
- Messages and conversation
- Notifications
- Login, signup and onboarding

Existing home feed behavior includes local demo post creation, category filtering, reactions, comments, saving and connection-invitation feedback. These states are browser-local and do not sync between people or devices.

Known limitation from the audit:
- Some jobs/events workspace controls currently resolve to placeholder views rather than complete dedicated pages.
- The current sample people, posts and organisations are illustrative demo content, not verified real accounts or businesses.
- Search is a frontend demonstration, not a global indexed search service.

## 3. TravelNet homepage adaptation delivered

The homepage has been extended with three additional discovery surfaces:

### Communities worth joining
- Tour Operations Forum
- Hospitality Partnerships Circle
- Travel Technology Lab
- Each card routes to the corresponding community detail page.

### Travel business network
- Travel agencies and advisors
- Tour operators and DMCs
- Hotels and hospitality
- Travel technology providers
- The section routes to the existing company directory.

### Industry exchange call-to-action
- Reinforces professional knowledge-sharing as the core product behavior.
- Routes new visitors to the existing signup/onboarding experience.

A dedicated responsive stylesheet was added at `assets/css/home-discovery.css`. Existing TravelNet logo markup, typography, forest-green palette and page structure were preserved.

## 4. UX and accessibility requirements to carry forward

- Use descriptive labels for icon-only controls.
- Maintain visible keyboard focus.
- Keep controls large enough for touch interaction.
- Use semantic headings and landmarks.
- Ensure every card action has a real destination or functional interaction.
- Announce dynamic feedback through accessible live regions.
- Respect reduced-motion preferences.
- Keep responsive layouts free of horizontal overflow.
- Label browser-local demo actions honestly.

## 5. Acceptance checklist

- [x] Homepage keeps the existing TravelNet identity and logo.
- [x] New community cards link to existing community detail routes.
- [x] Business category discovery links to the existing company directory.
- [x] Homepage discovery sections have responsive layout rules.
- [x] New stylesheet is loaded by the homepage.
- [x] No backend dependency introduced.
- [ ] Full browser QA at desktop, tablet and mobile breakpoints.
- [ ] Validate all community card IDs against the current group data.
- [ ] Complete global search behavior and result states.
- [ ] Complete Jobs and Events dedicated pages before promoting those navigation items.
- [ ] Audit feed sorting, richer reactions, repost semantics and post visibility controls against current reference behavior.
- [ ] Capture and compare current LinkedIn logged-in homepage states for final visual parity review.

## 6. Next research sequence

1. Finish LinkedIn global navigation and logged-in homepage behavior.
2. Research LinkedIn post composer, feed ranking controls and post interaction states.
3. Research My Network, invitations, following and recommendations.
4. Research professional profile and company page patterns.
5. Research LinkedIn Groups in depth.
6. Compare each verified pattern with TravelNet's existing implementation and update the corresponding page.
