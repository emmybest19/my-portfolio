# Trade-offs: emmanuelebri.dev

## 1. Content source
- **Chose:** typed TypeScript files in `src/data/`
- **Over:** a CMS or markdown pipeline
- **Why:** a broken entry becomes a build error, not a blank section.
- **Cost:** every content change needs a commit.

## 2. Rendering
- **Chose:** all routes prerendered with `generateStaticParams`
- **Over:** rendering on request
- **Why:** fast pages, no database, nothing to keep running.
- **Cost:** new content needs a rebuild to appear.

## 3. Client JavaScript
- **Chose:** server components by default, client only where needed
- **Over:** a fully client side app
- **Why:** less JavaScript sent to the browser.
- **Cost:** I have to think about where each component runs.

## 4. Contact form
- **Chose:** EmailJS from the browser
- **Over:** an API route or serverless function
- **Why:** keeps the site fully static.
- **Cost:** relies on a third party and its rate limits.

## 5. Theming
- **Chose:** one token set redefined under `.dark`
- **Over:** two separate stylesheets
- **Why:** a new colour is added once.
- **Cost:** every colour must go through a variable.

## 6. Testing
- **Chose:** lint and a type checked build as the gates
- **Over:** a full test suite for now
- **Why:** the content is static and typed.
- **Cost:** parser bugs are caught later. Parser tests are next.
