import { parseBlogBody, type BlogBlock } from "@/lib/blog-body";

/**
 * Articles written for the E-Bringgs engineering blog.
 *
 * Bodies are authored as one string in the markup documented in
 * `src/lib/blog-body.ts`, then parsed into `BlogBlock[]` at build. Malformed
 * markup fails the build rather than rendering as plain text — so the string
 * below is the authoring format, and `BlogPost.body` is the checked structure
 * the renderer consumes.
 *
 * `externalUrl` is the canonical post on the live blog. Set it to the URL and a
 * "Read on the live blog" button appears on the article page; leave it `null`
 * and the button is hidden.
 */
export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  cover: string;
  figure: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  externalUrl: string | null;
  body: BlogBlock[];
  signoff: string;
};

/** A post as authored: identical to `BlogPost`, but `body` is still markup. */
type RawPost = Omit<BlogPost, "body"> & { body: string };

const rawPosts: RawPost[] = [
  {
    slug: "reviewing-code-you-did-not-write",
    title: "Reviewing Code You Did Not Write",
    subtitle: "The skill the industry now runs on, and nobody teaches it",
    excerpt: "A large share of the code I ship each week was drafted in seconds by a model. Reading it takes far longer than generating it did, and that is now the job.",
    readTime: "6 min read",
    tags: ["Code Review", "AI-Assisted Dev", "Engineering Practice"],
    cover: "/blog/reviewing-code-you-did-not-write-cover.png",
    figure: {
      src: "/blog/reviewing-code-you-did-not-write-figure.png",
      alt: "A review-protocol.md file listing five numbered steps for reviewing code you did not write",
      caption: "The protocol, written down. Step three is the one people skip.",
      width: 1370,
      height: 1028,
    },
    externalUrl: null,
    body: `There is a question I now ask myself before every commit, and it has nothing to do with whether the code works.

> Can I explain this to someone who is annoyed with me?

Not narrate it. Explain it. Say why this line exists, what happens if it is removed, what I considered instead. That question has become the hard part of my job, because a large share of the code I ship in a given week was drafted in seconds by a model, and reading it takes far longer than generating it did.

The industry noticed the generation part. Everyone has an opinion about how much faster teams are now. Almost nobody is talking about the other side of that trade, which is that the bottleneck moved. It used to be typing. Now it is comprehension, and comprehension does not scale the way generation does.

## What used to make review work

Code review as a practice was built on an assumption that is quietly disappearing. The assumption was that somebody understood the code.

When a colleague opened a pull request, they had spent hours in the problem. They had tried the approach that did not work. They knew which line was load bearing and which was leftover. My job as a reviewer was to bring a second perspective to a decision that had already been reasoned through once. I was checking the reasoning, not reconstructing it.

That is no longer the default. When the author of a diff is a model, nobody has done the reasoning yet. The pull request arrives complete, formatted, plausibly named, and unexamined. If I review it the old way, looking for style issues and obvious mistakes, I am checking the packaging of something whose contents nobody has opened.

The uncomfortable version of this: a diff that looks clean is now weak evidence that anyone thought about it.

## Where the review has to start now

I stopped treating review as a final pass and started treating it as the first time anyone actually engages with the logic. That changes what I look for.

The first thing I do is read the whole thing with the editor closed and try to say out loud what it does. Not what each line does, what the unit accomplishes. If I stall, that is the finding. I do not keep reading in the hope that context arrives later, because it will not. I go back and ask specific questions about the part that stalled me until I can restate it without looking.

Then I run three questions against every branch that touches state.

> What happens if this runs twice. What happens if it fails halfway. What happens if two of these run at the same time.

Those three cover most of what I have actually shipped as bugs. They are also exactly the questions that a plausible looking implementation tends to fail, because they are about the environment the code runs in rather than about the code itself.

[figure]

The step people skip is the fourth one. Break it on purpose. Remove the guard, delete the await, drop the lock, and see whether anything complains. If nothing does, I have learned something valuable. Either the guard was decoration, or the test that should have caught its removal does not exist. Both are worth knowing before a user finds out.

I want to be clear that this is not slower than writing the code myself. It is slower than not reviewing, which is what the alternative usually is in practice.

## Ownership is a real thing, not a feeling

There is a version of this argument that turns into a purity test, where anything a model touched is suspect and real engineers type everything themselves. That is not my position and I do not think it survives contact with a deadline.

My position is narrower. Whatever process produced the code, one human has to be able to defend every line of it, and that human is whoever's name is on the commit.

The practical way I get there is to rewrite something. Rename the variables to match the conventions in the rest of the file. Pull an inline block into a named function. Reorder the guards so the cheapest check runs first. None of that changes behaviour, and all of it forces me to hold the whole thing in my head at once, which is the only reliable way I know to convert code I received into code I own.

The commit message is the tell. If I can write a message that explains why the change was needed, in terms of the system rather than in terms of the diff, I understood it. If the best I can do is describe what the lines say, I did not, and I go back.

## What this costs, and what it buys

The cost is real time on every change, and it does not compress. There is no version of this where I get faster at understanding by understanding less.

What it buys is the ability to change the system later. Code nobody understands is not an asset, it is a liability with good syntax. It works until the day it needs to change, and then it stops the team, because modifying code you cannot explain is either guesswork or a rewrite.

I have shipped both kinds. The parts of my platform I can explain are the parts I still improve. The parts I cannot are the parts I route around, add flags to, and quietly resent. The generated code did not cause that pattern, it just made it much easier to produce at volume.

## The thing I would tell a team adopting this

Make the review protocol explicit and write it down, because the old one is now insufficient and everybody is improvising privately.

Say out loud that the reviewer's job includes reconstructing intent, not just checking it. Budget for that. If a pull request takes twenty minutes to generate and forty to review, that is not a failure of the tooling, that is the actual shape of the work now.

And treat "I cannot explain this yet" as a normal, sayable thing rather than an admission of weakness. The alternative is a codebase where everyone assumes somebody else understood it, which is how you end up with software that nobody can touch and nobody will admit to not understanding.

The code was never the hard part. It just used to look like it was.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies. This is the review protocol I actually use, refined mostly by the times I skipped it.",
  },
  {
    slug: "generated-code-fails-in-a-specific-shape",
    title: "Generated Code Fails in a Specific Shape",
    subtitle: "A field guide to the bugs that look correct on the first read",
    excerpt: "Generated code does not fail randomly. It is correct as a description of the happy path, and silent about the environment it will run in.",
    readTime: "5 min read",
    tags: ["AI-Assisted Dev", "Code Review", "Concurrency"],
    cover: "/blog/generated-code-fails-in-a-specific-shape-cover.png",
    figure: {
      src: "/blog/generated-code-fails-in-a-specific-shape-figure.png",
      alt: "Two versions of a redeemCredit function in credit.service.ts, the second enforcing the balance check inside the query",
      caption: "Top: correct as a description. Bottom: the same rule enforced by the database instead of by hope.",
      width: 1496,
      height: 1258,
    },
    externalUrl: null,
    body: `Generated code does not fail randomly. After a year of shipping a lot of it, I can predict where it will break before I read the diff, and the prediction is usually right.

That predictability is useful. It means review can be targeted instead of exhaustive. Here is the pattern I have settled on, which is that the failures cluster in one place: the code is correct as a description of the happy path, and silent about the environment it will run in.

## The signature

Every bug in this category shares a shape. The logic is right if you assume the function runs once, alone, on a machine where nothing else is happening and nothing fails.

Production violates all three of those assumptions constantly, and they are exactly the assumptions that are invisible in a code sample. A function that reads a balance, checks it, and writes it back is textbook correct. It is also wrong the first time two requests arrive together, and nothing in the code says so.

[figure]

The version on top is the one I got. It reads well. Somebody reviewing it quickly sees a balance check and a decrement and moves on, because that is what the code is supposed to do. The version underneath is the same rule enforced inside the query, where the database can hold the line. No lock, no transaction, no race.

I did not catch this by being clever. I caught it because "what happens if two of these run at once" is one of three questions I now ask about anything that touches state.

## Five places it concentrates

Concurrency, which is the big one. Read, decide, write. Check the seat count then insert the enrolment. Verify a coupon then apply it. All of these are correct in a single-threaded story and wrong under traffic. The fix is almost always to make the database enforce the condition rather than the application, either through the query filter or a constraint.

Retries and duplicates. Code assumes it will be called once. Payment confirmations arrive twice, one from the browser redirect and one from the provider webhook. Queues redeliver. Users double tap. Generated handlers rarely account for this because the second call is not visible in the description of the problem.

The failure path. Happy path complete, error path either missing or reduced to a catch that logs and moves on. What I look for specifically is partial failure. If this function does three writes and the second fails, what state is the system in. The generated answer to that question is usually silence.

Boundaries. Empty arrays, zero, null, the first page, the last page, the timezone at midnight, the amount that exactly equals the balance. Generated code handles the middle of the range confidently and the edges optimistically.

Version drift. APIs that were correct two years ago, arguments that moved, methods that were deprecated. This one is easy to catch because it fails loudly at runtime, which makes it the least dangerous item on the list.

Notice that four of the five are not about syntax or even about logic in isolation. They are about the gap between a function and a system.

## Why the bugs land here

I find it useful to be concrete about the mechanism instead of hand waving about hallucination.

A model is producing the most plausible continuation of the code so far. Plausibility is calibrated on a vast amount of published code, and published code is overwhelmingly illustrative. Tutorials, documentation snippets, answers to narrow questions, example repos. That body of work is optimised for teaching one idea clearly, which means it deliberately strips out concurrency handling, retry logic and error paths, because those obscure the point being made.

So the training distribution is full of code that is correct as an illustration and incomplete as an implementation. The output inherits that. It is not making things up, it is faithfully reproducing a genre whose conventions include leaving out the hard parts.

That also explains the second thing I notice, which is that the confidence is uniform. Illustrative code does not hedge. There are no comments saying this part is subtle. So the generated version of the trickiest function in your system looks exactly as settled as the version that formats a date.

## How I actually review with this in mind

I do not read the diff top to bottom any more. I search it.

First I find every place that reads state and then writes it, and I ask whether the condition can be pushed into the write. That single pass catches most of the concurrency class.

Then I find every entry point that can be triggered externally, and I ask whether calling it twice with the same input produces the same result. Webhooks, callbacks, queue consumers, retry-eligible endpoints. If the answer is no, it needs an idempotency record, not a comment saying this should not happen.

Then I look at each function that performs more than one write and ask what happens if it stops halfway. Sometimes the answer is that it is fine. Often the answer is a partially created record that nothing will ever clean up.

Finally I check the edges: zero, empty, exact equality, and the largest value someone might plausibly enter.

That is maybe ten minutes on a moderate diff, and it has a much better hit rate than reading every line with equal attention, because it goes where the bugs actually live.

## The part that surprised me

I expected generated code to be wrong in obvious ways. Wrong function names, invented libraries, logic that does not compile. Those exist and they cost almost nothing, because the machine catches them immediately.

The expensive ones are the opposite. They compile, they pass the test you thought to write, they work in staging, and they fail under conditions your development environment structurally cannot reproduce. A single-user test environment cannot produce a race. A machine that never sleeps cannot produce a cold start. A clean database cannot produce the duplicate that arrives three seconds later.

Which means the review is not looking for mistakes in the code. It is looking for the assumptions the code is making about the world, and checking them against the world I actually deploy to.

That skill was always valuable. It is now the whole job.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies, where the money paths get the most paranoid version of this review.",
  },
  {
    slug: "tests-are-the-only-thing-you-still-own",
    title: "Tests Are the Only Thing You Still Own",
    subtitle: "When code becomes cheap, the specification becomes the asset",
    excerpt: "When generating an implementation takes minutes, the implementation stops being the expensive artifact. The specification is the part you still own.",
    readTime: "5 min read",
    tags: ["Testing", "Technical Debt", "Engineering Practice"],
    cover: "/blog/tests-are-the-only-thing-you-still-own-cover.png",
    figure: {
      src: "/blog/tests-are-the-only-thing-you-still-own-figure.png",
      alt: "wallet.spec.ts containing two tests: one rejecting an oversized withdrawal, one settling exactly once on duplicate confirmations",
      caption: "Read them as sentences, not as code. Those are business rules in the only format that checks itself.",
      width: 1658,
      height: 1074,
    },
    externalUrl: null,
    body: `I shipped a platform with four user roles, a payment engine that stacks four kinds of discount, and no test suite at all.

The decision was defensible when I made it. The domain was moving weekly, the schema changed under me twice, and tests written on Monday would have been deleted on Thursday. Iteration speed was worth more than confidence, and I took the trade knowingly.

That justification expired a long time before I admitted it. What made me finally admit it was not a bug. It was noticing which parts of my own codebase I had started avoiding.

## The map of fear

Open your project and list the files you do not want to change. Not the ugly ones, the scary ones. The ones where you would rather add a flag than edit the logic.

For me it is the checkout. It is the subsystem with the most branches, the highest cost of failure, and the largest number of interacting rules, which is precisely the description of the code that most needs tests and least has them. That correlation is not a coincidence. Complexity is what makes tests feel expensive to write, and it is also what makes them necessary.

The list of files you are afraid of is your test backlog, in priority order, and it is more honest than any coverage report.

## Why this got sharper, not softer

Here is the argument I did not expect to be making a year ago.

When generating an implementation takes minutes, the implementation stops being the expensive artifact. I can produce three versions of a service function before lunch. What I cannot produce automatically is the answer to the question of which behaviours are correct, because that lives in the business, in the conversations with agents and tutors, in the decision that a discount caps at the remaining balance rather than going negative.

> That knowledge exists in exactly two places. Your head, and your tests.

If it only lives in your head, then every regeneration, every refactor, every model-assisted rewrite is a fresh chance to lose it silently. The code will still look right. It just quietly will not do the thing you decided six months ago that it must do.

Tests are the durable half of the system now. They are the part that says what the software is for, in a form that survives the implementation being replaced.

[figure]

Read those two tests as sentences rather than as code. A withdrawal larger than the balance is rejected and the balance does not move. Two confirmations for the same reference produce one settlement. Those are business rules, written down in the only format that checks itself.

## What I would write first, and what I would skip

If I were restarting with a fixed budget of twenty tests, none of them would be for components.

Every one would go on a rule that costs money or trust when it breaks. Money math and rounding. The permission boundary that separates a support account from an admin one. The idempotency of anything a provider can call twice. The state machine transitions that are legal and the ones that are not. Those tests are cheap to write because the logic is pure, and they fail loudly for exactly the right reasons.

The next tier is one integration test per critical flow, hitting a real database. Sign up, pay, receive access. Not because the individual pieces are untested, but because the wiring between them is where things actually break in my experience, and no unit test looks at wiring.

What I would skip, without guilt: snapshot tests of rendered trees, tests that assert a component called a function, and anything testing a library I did not write. Those inflate coverage and fail on every intentional change, which trains the team to approve red builds. A suite people learn to ignore is worse than no suite, because it costs time and buys nothing.

## The loan metaphor, taken seriously

Skipping tests is borrowing. That framing is old and mostly used as a scold, so let me be specific about the terms, because the terms are what matter.

The principal is the tests you did not write. The interest is paid in a currency you do not notice at first: slightly slower changes, slightly more manual verification, slightly more hesitation. It compounds quietly.

The default event is the day you decide not to make a change you know is right, because the risk of touching that file is higher than the benefit of improving it. That is the moment the debt stopped being financial and became structural. The system is now shaped by your fear of it.

I hit that point on my discount stacking logic. I know how I would restructure it. I have not, because the only way to verify the restructure is to manually walk every combination of points, voucher, referral credit and installment split, and I am not going to do that reliably at eleven at night.

That is the real cost, and it never showed up as a bug report.

## Where I actually am

The payment tests are being written now, before anything else, because that is where the fear map points. It is slower than I would like, because writing tests against code that was designed without them means untangling the design first, which is another form of the interest payment.

The thing I would tell someone at the start of a project, holding the same trade-off I held: you are probably right that tests would churn early. Take the loan. Just write down when you will repay it, in terms of a condition rather than a date. When the payment logic stops changing weekly. When the second developer joins. When real money moves through it.

Because the loan does not come due on a schedule. It comes due the day you need to change something and discover you have quietly given up the ability to.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies. This one is written from the wrong side of the decision.",
  },
  {
    slug: "you-probably-do-not-need-microservices",
    title: "You Probably Do Not Need Microservices",
    subtitle: "An honest accounting of what distribution costs a small team",
    excerpt: "Distribution is not wrong. It is priced for a problem most small teams do not have. An honest accounting of what it costs a team of one to ten.",
    readTime: "6 min read",
    tags: ["Architecture", "Microservices", "Monolith"],
    cover: "/blog/you-probably-do-not-need-microservices-cover.png",
    figure: {
      src: "/blog/you-probably-do-not-need-microservices-figure.png",
      alt: "Directory tree of a modular monolith with billing, classroom, identity and projects modules under one deployable",
      caption: "One deployable, real boundaries. The rule in the comment is the entire trick.",
      width: 1478,
      height: 890,
    },
    externalUrl: null,
    body: `The strongest argument for microservices I have ever heard, in private, from a working engineer, was that it would look good on the team's resumes.

He was joking. He was also not joking, and everyone in the room knew it. That is the honest starting point for this conversation, because the technical arguments get made loudly and the career arguments get made quietly, and both are doing work in the decision.

I want to lay out what distribution actually costs when you are a team of one to ten, because the pattern is not wrong. It is priced for a problem most of us do not have.

## What you are actually buying

Services solve a small number of real problems, and they solve them well.

You can deploy independently, which matters when teams are large enough that coordinating a release is genuinely expensive. You can scale one component separately, which matters when one component has a load profile the others do not. You can enforce boundaries organisationally, which matters when the alternative is thirty people reaching into each other's code. And you can isolate failure, so one bad component does not take the process down.

Every one of those is a real benefit. Notice how many of them are about the size and structure of the team rather than the software. Independent deploys solve a coordination problem. Enforced boundaries solve a discipline problem at scale. If your coordination problem is a group chat with two people in it, you are buying a solution to something you do not have.

## What you are actually paying

The bill has items that do not appear in the architecture diagram.

Every call that used to be a function call is now a network call, which means it can be slow, it can fail, it can succeed and then be lost on the way back, and it can succeed twice. Code that was previously guaranteed to run once and either return or throw now needs timeouts, retries, and idempotency at every hop. That is not extra work at the boundary. That is a different way of writing all the code that crosses one.

Transactions stop being available. In one process with one database, a write that touches three tables either happens or does not. Split those tables across services and you are hand rolling consistency, usually with events and compensating actions and a reconciliation job that runs nightly and that somebody has to look at.

Debugging changes character. A stack trace stops being the whole story, because the story now spans four processes. You need distributed tracing before you can answer questions you used to answer by reading a log line, and setting that up is a project.

And then the operational tax, repeated per service. A pipeline. A deploy target. A secret store entry. Monitoring. Alerting. Version pinning. A dependency upgrade that used to be one pull request is now five, or worse, it is one and the other four drift.

None of this is fatal. All of it takes time that is not being spent on the product, and small teams are, definitionally, short of exactly that.

## The version that works at small scale

The alternative is not a big ball of mud. That is the false choice that pushes teams into distribution before they need it.

You can have real boundaries inside one deployable. Modules with their own models and their own service interfaces, where the rule is that modules talk to each other through exported functions and never by importing each other's internals.

[figure]

That rule is the entire trick, and it is enforceable in review. Break it and you get the worst outcome, which is a codebase that is tangled internally and would be miserable to split later. Hold it and you get most of what services promise. Clear ownership, clear interfaces, the ability to reason about one module at a time.

The part people undersell is that this is also the cheapest possible preparation for splitting up later. When one module genuinely outgrows the process, its boundary already exists. Extracting it becomes a mechanical change rather than an archaeology project. You have kept the option without paying for it.

## The exception that is actually real

There is one case where I would split early, and it is not about scale.

If a component has a fundamentally different runtime shape, put it somewhere else. A video transcoder that pins CPU for minutes at a time does not belong in the process serving your API, because it will make request latency ugly in ways that are hard to trace. A machine learning inference service with a five gigabyte model and a Python runtime does not belong in your Node process for obvious reasons.

That is a resource isolation argument, not an architecture fashion argument, and it is easy to recognise because you can state the specific interference you are avoiding.

The related case is a component with a wildly different availability requirement. If webhook ingestion must stay up while the rest of the platform is being deployed, that is a real reason to separate it, and I would separate exactly that and nothing else.

## How I would decide

Ask what specific pain you are trying to remove, and check that it exists today rather than in the plan.

If the answer is that deploys are risky, the fix is a test suite and a pipeline, not distribution, because distributed deploys are riskier per unit of change, not less. If the answer is that one part is slow, measure which part, then scale or optimise that part. If the answer is that the codebase is tangled, modules fix that inside one process and services do not, because a network boundary does not untangle logic, it just makes the tangle harder to see.

If the answer is that it will look good when you are hiring, or when you are being hired, say so out loud. It is a legitimate consideration and it deserves to be weighed against the cost in the open rather than dressed up as scalability.

My platform runs three front ends and one backend process, and the backend hosts both an HTTP API and a WebSocket server on the same port. That is a bet with a known expiry date, and I have written down what triggers the split. Until that trigger fires, the simplest thing that is honestly bounded is winning.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies, on a stack chosen to be boring where it can be.",
  },
  {
    slug: "postgres-is-eating-your-stack",
    title: "Postgres Is Eating Your Stack",
    subtitle: "Where one database is genuinely enough, and where it stops",
    excerpt: "Queues, caching, search and vectors in one database. Where that genuinely holds, and the specific trigger that tells you it has stopped.",
    readTime: "5 min read",
    tags: ["Postgres", "Architecture", "Databases"],
    cover: "/blog/postgres-is-eating-your-stack-cover.png",
    figure: {
      src: "/blog/postgres-is-eating-your-stack-figure.png",
      alt: "queue.sql creating a jobs table and claiming work with FOR UPDATE SKIP LOCKED",
      caption: "A durable job queue in the database you already run. No broker, no second thing to operate.",
      width: 1316,
      height: 1258,
    },
    externalUrl: null,
    body: `A pattern I keep seeing on small teams: an architecture diagram with five data stores on it, run by three people, where four of those stores exist because a blog post said they should.

Postgres, plus Redis for caching, plus a message broker for jobs, plus a search cluster, plus a vector database because there is an AI feature now. Each was added for a defensible reason. Together they are five things to operate, secure, back up, upgrade, monitor and pay for, and the team is small enough that nobody owns most of them.

The counter position has become popular for good reason. One database, until it visibly stops working. Here is where that holds and where it does not, based on the parts I have actually run rather than the parts I have read about.

## Jobs and queues

This is the clearest case. If your queue depth is thousands of jobs rather than millions, you do not need a broker.

Postgres has had the primitive that makes this work for years, and it is not a hack.

[figure]

The lock is held by the row, so workers pull without stepping on each other. Jobs survive a restart because they are rows in a durable database. Retry counts and scheduling are columns you already know how to query, which means debugging a stuck queue is a select statement rather than a broker-specific tool you use twice a year.

What you also get, and this is the underrated part, is transactional enqueue. Creating an order and scheduling its confirmation email happen in one transaction. Either both exist or neither does. With a separate broker, that is the classic dual write problem, where the order commits and the enqueue fails and a customer never hears from you. Solving that properly needs an outbox table, which is a queue in your database, which is where we started.

Where it stops: when you need fan out to many consumers, cross-service event streaming, or throughput that makes your primary database the contention point for everything else in the product.

## Caching

Redis is genuinely better at caching than Postgres, and I still would not add it on day one.

Most caching people implement early is either unnecessary, because the query is fast and the traffic is low, or better solved by an index, or better solved at the HTTP layer where a CDN can hold the response and your server never sees the request. In-process memory covers a surprising amount of the rest at a single instance.

Where it stops: shared state across instances. The moment you run more than one process and need them to agree on a rate limit counter, a session, or a lock, you want Redis and you should take it. That is a specific trigger and it is easy to recognise, unlike "we might need caching."

## Search

Full text search in Postgres covers more than people expect. Tokenisation, stemming, ranking, weights across columns, prefix matching. For a catalogue of courses or products in the thousands, it is fine, it is one join away from the data it describes, and it stays consistent because it is the same transaction.

Where it stops: relevance tuning as a first class product concern, faceting across many dimensions at scale, typo tolerance that users actually notice, and multi million document corpora. If search is the product, use a search engine. If search is a filter box, you already have one.

## Vectors and the AI feature

The vector database market exists partly because it arrived before Postgres had a good answer, and that gap has closed. pgvector handles embedding storage and similarity search well within the sizes most product features need.

The advantage is not raw speed. It is that your embeddings sit next to the rows they describe, so a similarity query can filter by tenant, by permission, by date, by anything already in your schema, in one query with real joins. Keeping vectors in a separate store means either duplicating that metadata or filtering after retrieval, which is worse in both directions.

Where it stops: very large corpora, heavy re-indexing, or latency requirements that need a purpose built engine.

## The real argument

The point is not that Postgres is technically superior to specialised tools. On their own axis, it is not, and the people who built those tools were not wasting their time.

The point is that operational surface is a cost that gets ignored during architecture and paid every week afterwards. Each additional store means another failure mode, another set of credentials, another backup you should test and probably have not, another upgrade path, another thing that breaks at two in the morning while you are learning its diagnostic tooling for the first time under pressure.

For a small team, the correct question is not which tool is best for this workload in isolation. It is whether this workload is painful enough, right now, to justify permanently operating another system.

## How to decide without guessing

Write down the trigger before you need it, the same way you would for splitting a service. Not a feeling, a measurement.

Move jobs to a broker when queue latency under normal load exceeds what the product can tolerate, or when job volume starts affecting query performance for user facing requests. Add Redis when you run more than one instance and need shared counters or locks. Move search out when relevance work becomes a recurring product task rather than a one time configuration.

Then run one database until a trigger fires, and when one does, add exactly the one thing the trigger names.

The five store diagram is not the sign of a sophisticated team. Usually it is the sign of a team that made five decisions early, in the abstract, and now maintains all of them.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies, where the database is deliberately the boring part.",
  },
  {
    slug: "your-error-messages-are-a-product-surface",
    title: "Your Error Messages Are a Product Surface",
    subtitle: "Most software fails badly because nobody owns failure",
    excerpt: "Failure is not an edge case, it is a screen. Most software fails badly because nobody owns the failure state.",
    readTime: "5 min read",
    tags: ["UX", "Error Handling", "Fintech"],
    cover: "/blog/your-error-messages-are-a-product-surface-cover.png",
    figure: {
      src: "/blog/your-error-messages-are-a-product-surface-figure.png",
      alt: "errors.ts mapping thrown errors into four kinds of user-facing message with tone, message and retry flags",
      caption: "One mapping, four kinds. Line 17 is the sentence that took me longest to learn to write.",
      width: 1712,
      height: 1396,
    },
    externalUrl: null,
    body: `My mobile sign up once failed with this: the request took longer than expected 0:0:20.000000.

Nothing was broken. My hosting spins containers down when they go idle, and the first request after a quiet period took twenty four seconds to boot and respond. The client had a twenty second timeout, so it gave up four seconds early and reported a failure that had not happened.

Two things went wrong there, and only one of them was the timeout. The other is that the message told the user about my HTTP client's internal state, in a duration format nobody outside the codebase has ever seen, and said nothing about what they should do.

That second failure is everywhere in software, and it survives because no one is responsible for it. Designers specify the happy path. Engineers implement the logic. The error state falls between them and ends up being whatever the exception happened to say.

## Failure is not an edge case

The framing that causes the damage is treating errors as exceptional. In a product used on mobile data, in a market with unreliable connectivity, failure is not rare. It is a normal daily state of the application, experienced by a large share of users in any given week.

If a meaningful percentage of sessions include at least one failed request, then the failure state is not an edge case, it is a screen. It deserves the same attention as any other screen, which means it needs to answer the questions a user actually has.

There are three, and every good failure message answers all three. What happened, in the user's terms. Whose problem it is. What to do next.

Most messages answer none of them. "Something went wrong" answers none. "Error 500" answers none. "Request failed with status code 422" answers none while also leaking implementation.

## The taxonomy that fixed it for me

I stopped writing error copy per catch block and started mapping errors into a small set of kinds, each with a defined shape of response.

[figure]

Four kinds cover almost everything.

There is the user's input being wrong, which belongs next to the field, not in a banner, and should say what would be right rather than what was wrong. There is a legitimate business state that blocks the action, insufficient balance, expired voucher, closed cohort, which is not an error at all really, it is information, and it should come with the action that resolves it. There is the transient failure, timeout, network drop, provider unavailable, where the crucial thing is telling the user whether it is safe to retry. And there is the genuine defect, where honesty and a reference code beat any attempt to explain.

The mapping happens in one place. That matters more than the specific categories, because it means the quality of failure copy is a property of the system rather than a property of whoever wrote that particular catch block on a Friday.

## The sentence that money products need

There is one line in that code that took me the longest to learn to write.

> Your money has not moved.

When a payment request times out, the user does not want an apology. They want to know whether they have been charged, because their next action depends entirely on the answer. Without that sentence, a cautious person waits and checks their bank, and an impatient person taps pay again. The second group is why ambiguous failure messages produce duplicate transactions.

If you can determine the state, say it plainly. If you genuinely cannot, say that too, and give them a reference and a place to check. What you must not do is write something neutral and comfortable that leaves the question open, because the ambiguity is not resolved by the user shrugging. It is resolved by them guessing.

## The failure that hides

The worst error handling I have shipped was not a bad message. It was no message.

A misconfigured CORS rule was making every API call from one origin fail. The dashboard rendered as an almost empty page, because failed fetches fell back to empty arrays throughout the app. Exactly one screen had an explicit error card, so a total outage presented as a product that looked like it had no content rather than one that was broken.

Empty and failed rendering identically is a lie the interface tells, and it does not only mislead the user. It misled me, because if a failed fetch produces an empty array and no log line, then my monitoring cannot distinguish the two either.

Every list in a product needs three visually distinct states. Loading, failed, and genuinely empty. Collapsing the last two feels tidy and costs you the ability to notice outages.

## What to do this week

You do not need a redesign. Pick the three most common failures in your product, which you can get from your error tracker in about five minutes, and rewrite those three messages so they answer the three questions.

Then find every place a failed fetch renders as empty and make it render as failed, with a retry. While you are there, log it, because that instrumentation is what would have told me about the CORS outage on the day it started rather than whenever a user thought to complain.

Then write one rule down for the team: no error message ships that a person outside the codebase cannot act on.

Users forgive software that breaks. Everything breaks. What they do not forgive is software that breaks and then refuses to tell them what it did with their money.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies. The twenty four second cold start is real, and so is the four second gap that started this.",
  },
  {
    slug: "idempotency-is-not-a-payments-trick",
    title: "Idempotency Is Not a Payments Trick",
    subtitle: "Anything that can retry needs it, and almost everything retries",
    excerpt: "Almost everything in a modern system can fire twice, usually for reasons outside your control. Three mechanisms that make that safe.",
    readTime: "5 min read",
    tags: ["Distributed Systems", "Idempotency", "Payments"],
    cover: "/blog/idempotency-is-not-a-payments-trick-cover.png",
    figure: {
      src: "/blog/idempotency-is-not-a-payments-trick-figure.png",
      alt: "idempotency.ts wrapping work in a claim record that is created atomically before the work runs",
      caption: "The claim is written first, atomically. Do the work first and you have moved the race, not removed it.",
      width: 1694,
      height: 1258,
    },
    externalUrl: null,
    body: `Most developers meet idempotency in a payments integration guide, implement it once because the provider insists, and file it under fintech. That filing is the mistake, and it is why the same bug keeps appearing in systems that have nothing to do with money.

The principle is simple enough to state in one line. If an operation can be triggered more than once, it must produce the same result every time, not the same result plus a side effect.

The reason it matters far outside payments is that almost everything in a modern system can be triggered more than once, usually for reasons outside your control.

## Count the triggers

Take any handler in your application and list the ways it can fire twice.

The user taps twice, because the first tap gave no feedback on a slow connection. The browser retries a request that the network dropped after the server had already processed it. Your queue redelivers a job, because at least once delivery is what most queues offer and exactly once mostly is not real. A provider webhook arrives, and then arrives again, because the provider did not receive your acknowledgement in time. A cron job overlaps with the previous run that has not finished. A deploy restarts a worker mid task. Someone refreshes a page that submits on load.

None of those are exotic. Most systems have five or six of them active right now, and the only thing standing between them and duplicate records is timing.

The failure looks the same across all domains. Two enrolments for one student. Two invitation emails. Two ledger entries. Two projects created from one purchase. The domain changes, the shape does not.

## Fast is not the same as safe

The response I hear most often is that the window is tiny, so the race is unlikely.

Unlikely is a probability statement, and probability statements need a denominator. At ten requests a day, a one in a thousand race is a problem you will never see. At a hundred thousand requests a day, that same race happens a hundred times, and every one of them is a support ticket or a corrupted record.

The uncomfortable part is that you inherit the higher denominator at exactly the moment things are going well. Growth converts your unlikely bug into a daily one, and it does it during the week you are least able to stop and fix it.

## What actually makes something idempotent

There are three mechanisms, and picking the right one matters more than the code.

The cheapest is a natural uniqueness constraint. If the operation creates a record that already has a naturally unique identity, put a unique index on it and let the database reject the duplicate. A settlement keyed by provider reference, an enrolment keyed by student and cohort. The second attempt fails at the storage layer, you catch the conflict, and you return the existing record. No extra tables, no extra state.

The second is the conditional write, where the precondition lives inside the query rather than in an if statement before it. This is the pattern that also solves concurrency, which is not a coincidence, since both problems come from the gap between checking and acting.

The third, for operations with no natural key, is an explicit idempotency record created before the work begins.

[figure]

The important detail there is the ordering. The claim is written first, atomically, and the work happens after. If you do the work first and record it afterwards, you have moved the race rather than removed it, because the second caller arrives during the gap.

The second important detail is the in progress state. A duplicate that arrives while the original is still running should not be allowed to proceed and should not silently return success either. Rejecting with a conflict is honest, and the client can retry once the first one lands.

## Where I have needed it outside payments

Invitation emails, because a resend button and a retry both call the same function, and receiving the same invite four times makes a product feel broken in a way users mention.

Enrolment, because a student tapping an unresponsive button twice should occupy one seat, and seat counts feed capacity rules that decide whether a cohort is closed.

Certificate generation, because generating twice produces two documents with two identifiers, and a certificate identifier that is not unique defeats the entire point of having one.

File uploads, where a retry after a network drop otherwise leaves an orphan in storage that nothing references and nothing cleans up.

Anything driven by a queue, without exception, because at least once delivery means the queue is explicitly promising you duplicates.

## Make it a default, not a decision

The habit that has served me best is to treat this as a property of the entry point rather than a feature of specific handlers.

Every route that mutates state gets asked one question during review. What happens if this is called twice with the same input. If the answer is that it is safe, that gets said out loud, ideally in a comment or a test. If the answer is that it is not, it does not merge without one of the three mechanisms above.

That question takes ten seconds to ask and it catches a class of bug that is extremely expensive to find later, because duplicates do not throw. They sit in the database looking like legitimate records, and you usually discover them during reconciliation, or when a user asks why they were charged for two of something.

The payments integration guide was right. It was just describing a general property of distributed systems while wearing a very specific costume.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies, where every externally reachable endpoint gets this question in review.",
  },
  {
    slug: "put-that-state-in-the-url",
    title: "Put That State in the URL",
    subtitle: "Filters, tabs and pagination belong in the address bar",
    excerpt: "Filters, tabs and pagination belong in the address bar. Put them in component memory and four behaviours break at once.",
    readTime: "5 min read",
    tags: ["Frontend", "React", "URL State"],
    cover: "/blog/put-that-state-in-the-url-cover.png",
    figure: {
      src: "/blog/put-that-state-in-the-url-figure.png",
      alt: "useTxFilters.ts reading filter state directly from URL search params with no mirrored local state",
      caption: "No mirror, no sync effect, nothing to drift. One source of truth.",
      width: 1640,
      height: 1212,
    },
    externalUrl: null,
    body: `Here is a test you can run on any web app in under a minute, including your own.

Filter a list. Sort it. Go to page three. Now copy the address bar and send it to a colleague. When they open it, do they see what you saw?

For most applications, they see the unfiltered first page, because all of that state lived in component memory and the URL never changed. Then hit the back button. If it exits the entire page instead of undoing the filter, that is the same bug from a different angle.

This is one of the most common defects in modern frontends, and it is almost never filed as a defect. It just quietly makes the product feel worse than it is.

## What the address bar actually is

The URL is a piece of persistent, shareable, user editable application state that browsers have supported forever, and that most single page applications stopped using when routing moved to the client.

When state lives there, four behaviours come free and require no code. Refresh preserves the view. Back and forward move through the user's own history of what they were looking at. Links are shareable, so a support agent can send a customer the exact filtered list. And bookmarks work, so a user who checks failed transactions every morning can save that view instead of reconstructing it daily.

When the same state lives in component memory, all four of those break at once, and you get bug reports that look unrelated to each other for months.

## The rule that keeps it simple

The version people implement first is state in a hook plus an effect that syncs it to the URL, and another effect that syncs the URL back into state on navigation. That is two sources of truth held together by synchronisation code, and it will drift. Back navigation updates the URL but not the state, or a filter change writes twice and produces two history entries per click.

The rule that avoids all of it is to have no mirror. Read directly from the URL, write directly to the URL, and let the router be the only place the value lives.

[figure]

Three details in there are worth naming, because they are what separates a working implementation from an irritating one.

Absent parameters mean defaults. When status is all, the key is deleted rather than written, which keeps URLs short and readable, and means a plain link is the same as an explicitly unfiltered one.

Changing a filter resets pagination. Without that line, a user on page five who narrows the filter lands on an empty page five of a two page result, sees nothing, and concludes there are no results.

Text input uses replace rather than push. If every keystroke pushes a history entry, back becomes useless, since the user has to press it fourteen times to escape a search box. Discrete actions like changing a tab or a page push. Continuous ones replace.

## What does not belong there

This is a principle, not a religion, and pushing everything into the URL produces its own mess.

Ephemeral interface state stays local. Whether a dropdown is open, whether a tooltip is showing, the current hover target. Nobody wants to link to an open dropdown.

Anything sensitive stays out of it entirely. URLs end up in browser history, in server access logs, in analytics, and in the referer header sent to third parties. That is the wrong home for a token, an identifier that should not be enumerable, or anything personal.

Large state stays out for practical reasons. If your filter object is fifty fields, encoding it produces a URL that breaks when pasted into a chat app that wraps lines.

The useful boundary is this: if a user could reasonably want to return to this exact view later, or show it to someone, it goes in the URL. Otherwise it does not.

## The part that pays off later

Beyond the user facing wins, there is an engineering benefit that shows up quietly.

State in the URL is state you can reason about from outside the application. A bug report becomes a link, and the link contains the reproduction. Support gets faster because a customer can send exactly what they are looking at. Analytics gets better because the parameters people actually use are already in your page views, so you can see which filters matter without instrumenting anything.

And on the implementation side, the entire class of synchronisation bugs disappears, because there is nothing to synchronise. One source of truth, read where it is needed, written when it changes.

## Try it on one screen

You do not need to convert the whole application. Pick the busiest list view in your product, the one with filters people use daily, and move its state to the address bar this week.

Then run the test at the top again on that screen. Filter it, copy the link, open it in a private window, press back. When all four behaviours work, you will have fixed a set of small annoyances that your users never bothered reporting, because they assumed that is just how web applications work now.

It is not. It is how they work when the state ended up in the wrong place.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies, where the transaction filters live entirely in the URL for exactly these reasons.",
  },
  {
    slug: "engineering-for-the-next-billion-users",
    title: "Engineering for the Next Billion Users",
    subtitle: "Cold starts, timeout budgets and cheap Android, from Lagos",
    excerpt: "Cold starts, timeout budgets and cheap Android, from Lagos. Constraints that make ordinary engineering mistakes visible faster.",
    readTime: "5 min read",
    tags: ["Performance", "Mobile", "Emerging Markets"],
    cover: "/blog/engineering-for-the-next-billion-users-cover.png",
    figure: {
      src: "/blog/engineering-for-the-next-billion-users-figure.png",
      alt: "api_client.dart configuring Dio connect and receive timeouts above the measured cold start, with a backing-off retry interceptor",
      caption: "The ceiling now sits above the measured cold start, and retries back off instead of hammering.",
      width: 1586,
      height: 1028,
    },
    externalUrl: null,
    body: `Most performance advice is written from a place where the network is assumed and only its speed is in question. Fast connection, slow connection, maybe a throttled profile in dev tools to represent the bad case.

That is not the environment I ship into. Here the network is a variable that goes to zero, comes back, and goes to zero again while a user is halfway through a form. Data costs real money per megabyte, which means every asset you send is a small charge to someone's balance. Devices are mid range Android with a fraction of the CPU your laptop has and a browser holding eleven other tabs.

The advice that comes out of that environment is different, and I would argue it is better for everyone, because a product that works on a bad connection also works on a good one.

## The failure that is not a failure

My mobile sign up was reporting timeouts. Nothing was broken.

My hosting spins containers down when they go idle. The first request after a quiet period took twenty four seconds to wake the container and respond. The HTTP client had a twenty second timeout, so it gave up four seconds before the answer arrived and told the user the request had failed.

I had picked twenty seconds because it felt generous. I never measured. That is the whole lesson, and it is embarrassing in a useful way.

> A timeout is not a preference. It is a claim about your infrastructure's worst case, and if the claim is wrong, your client manufactures failures against a backend that is working correctly.

[figure]

Two changes there. The ceiling now sits above the measured cold start, and retries back off rather than hammering, because on a flaky mobile network the second attempt one second later usually fails for the same reason the first one did.

The order matters too. Measure first, then set the timeout, then treat reducing the cold start as a separate piece of work with its own priority. Raising the timeout is not a fix for slowness. It stops you lying to the user about what is happening while you deal with the actual cause.

## Bytes are money

There is a category of frontend decision that is invisible in a market with unmetered data and very visible here.

A twelve megabyte bundle is not just slow. On a metered connection it is a charge, and users notice apps that cost them money. So does an autoplaying video, an uncompressed hero image, a font family loaded in six weights when the design uses two, and an analytics stack that ships more code than the feature it measures.

The discipline I hold is a budget rather than a checklist. Initial route under a couple of hundred kilobytes of compressed JavaScript, images sized to their display width and served in a modern format, fonts subset and limited, third party scripts justified individually. Every dependency that ships to the client has to earn its size, and the honest question is not whether it is useful but whether it is worth what it costs the user to download.

Rendering matters for a related reason. On a cheap device, a heavy first render is seconds of unresponsive interface. Server rendering the content-heavy screens and keeping the interactive parts small is not a framework preference here. It is the difference between a page that appears and a page that eventually appears.

## Design for the network dropping mid action

The scenario that breaks products is not a slow request. It is a request that starts, and then the network disappears, and the user has no idea what happened to it.

Three things make that survivable.

The first is telling the truth about state, especially where money is involved. A timeout on a payment must say whether the transaction went through, and if that genuinely cannot be determined yet, it must say that plainly and give the user a way to check. Ambiguity here does not make users patient. It makes them retry, and retries on payment endpoints produce duplicates unless every one of those endpoints is idempotent, which is why the two topics are inseparable.

The second is retrying the right things. Reads retry freely. Writes only retry when the endpoint is idempotent, and then with backoff. That distinction has to be encoded in the client, not left to a global interceptor that treats every request the same.

The third is not losing the user's work. A form that clears itself when a submission fails is a small cruelty on a connection that fails often. Keep the input, keep the draft, let them retry into the same state they were in.

## What this discipline is worth elsewhere

None of this is charity work for a difficult market. The constraints just make ordinary engineering mistakes visible faster.

An application that survives a network dropping mid request is one where the failure paths are actually implemented. An application with a byte budget is one where nobody added a dependency casually. An application whose timeouts are measured is one where somebody knows the real latency profile of their own infrastructure.

Those are properties every team claims to want. They are the ones that quietly go untested when the developer's connection is fast enough to hide their absence.

If you are shipping to markets like mine, or thinking about it, the starting point is unglamorous. Measure your actual cold start, on your actual hosting, at the time of day your users are quietest. Then open your product on a mid range phone on mobile data and try to complete the main flow.

Whatever annoys you in that ten minutes is your roadmap, and it will be more useful than any performance article, including this one.`,
    signoff: "I build EdTech and fintech products at E-Bringgs Technologies in Lagos, for users on exactly the connections described here.",
  },
  {
    slug: "payment-integration-outside-stripes-world",
    title: "Payment Integration Outside Stripe's World",
    subtitle: "What changes when the provider, the currency and the failures differ",
    excerpt: "Different provider, different currency, different failure modes. The five principles that survive the move, and the code that changes.",
    readTime: "6 min read",
    tags: ["Payments", "Fintech", "Webhooks"],
    cover: "/blog/payment-integration-outside-stripes-world-cover.png",
    figure: {
      src: "/blog/payment-integration-outside-stripes-world-figure.png",
      alt: "webhooks.ts verifying a Paystack signature against the raw request body, then acknowledging before enqueueing the work",
      caption: "Verify the raw body, compare in constant time, acknowledge before you work.",
      width: 1676,
      height: 1120,
    },
    externalUrl: null,
    body: `Almost every tutorial about accepting payments assumes a world with a mature SDK, a stable webhook contract, a currency with two decimal places that nobody argues about, and a card that either works or declines within two seconds.

Plenty of us build outside that world. Different providers, different currencies, different failure modes, and users paying by bank transfer from an app that may confirm in four seconds or in four minutes. The principles that survive the move are the interesting part, because they turn out to be the ones that were load bearing all along.

## Money is an integer

The first decision, and the one that is most expensive to change later, is how you represent an amount.

Store the smallest unit as an integer. In naira that means kobo, so twelve thousand five hundred naira is stored as 1250000. Never a float, never a decimal string that gets parsed in three different places, never a number that has been through a currency formatter and back.

The reason is not theoretical. Floating point addition of currency values produces results that are almost right, and almost right compounds. Split an amount three ways for an installment plan, apply a percentage discount, and reconcile against a provider's figure, and you find yourself one kobo out with no idea which of the six operations introduced it.

Integers make the whole class of problem disappear. Formatting happens once, at the edge, when a number becomes a string for a human to read. Everywhere else it is an integer and arithmetic behaves.

The corollary is that your API accepts a product identifier, not an amount. If the client sends a price, then the client has an opinion about the total, and two systems with opinions about money will eventually disagree. Resolve the price on the server from your own catalogue, every time.

## The provider is the source of truth, the browser is a hint

The mental model that causes the most bugs is treating the user's return from the payment page as confirmation.

It is not. It is a hint that something probably happened. The user might close the tab. Their connection might drop on the redirect. They might screenshot a success page from a previous attempt. The only authoritative statement about a payment is the one that comes from the provider, verified.

[figure]

Three things in there are worth stating explicitly.

Verify against the raw body. Any middleware that parses and re-serialises JSON before you compute the signature will produce a different byte sequence and a failing comparison, and the resulting bug is genuinely unpleasant to trace.

Compare in constant time. It is one function call and it removes a timing side channel.

Acknowledge before you work. Providers time out waiting for your response and then retry, which means slow processing inside the handler turns one event into several. Respond immediately, then do the work in a job, which also means a crash halfway through processing does not lose the event.

## Everything gets called twice

Confirmation arrives through the redirect and through the webhook, and either can land first. Providers retry when acknowledgement is late. Users refresh. Queues redeliver.

So the settlement path has to be idempotent by construction rather than by luck. Keyed on the provider reference, which is the natural unique identifier you have been given for free, enforced with a unique index so the database rejects the second write rather than your application hoping to notice.

This is where the double entry ledger earns its keep. If every movement is a pair of entries recorded against a reference, then a duplicate settlement is a duplicate pair, and a unique index on the reference makes it impossible rather than merely unlikely. Reconciliation becomes a query rather than a spreadsheet.

## About skipping the SDK

I talk to my provider over plain HTTPS with hand written request bodies, and I would make that choice again in this context, with a caveat.

What it bought me: no dependency to keep current, no version treadmill, and complete visibility into what is on the wire. When a request fails I am debugging my code and their API, not a wrapper's interpretation of both. Provider documentation in this part of the world moves, and a thin layer I control adapts faster than waiting for a library update.

What it costs: I write the retry logic, the error mapping and the signature verification myself, and I own the correctness of all three. That is fine for four endpoints. It would not be fine for forty, and if the provider's SDK is well maintained and matches your language properly, take it.

The point is that this is a decision with a stated reason, not a default. Both answers are defensible. Only one of them is defensible without thinking about it, and it is neither.

## The parts nobody writes about

A few things I learned the hard way that do not appear in integration guides.

Bank transfer confirmations are not instant, and your interface must be honest about pending as a real state rather than treating it as a slow success. Users will refresh, so pending needs its own screen that answers what happens next.

Test keys and live keys should be structurally impossible to confuse. Different environment variable names, a startup check that refuses to boot with a live key against a non production database, and a visible indicator in the interface when running in test mode.

Reconciliation is a feature, not an afterthought. Somewhere there needs to be a job that fetches the provider's record of the day and compares it against yours, and reports differences. You will find some. Finding them yourself is much better than a customer finding them for you.

And keep the provider's raw response. Store it. When a dispute arrives in six months, the record of exactly what they told you and when is the only thing that settles it.

## What actually transfers

If you move from one provider to another, or one market to another, the code changes and the principles do not.

Money is an integer in the smallest unit. Price resolves on the server. The provider is authoritative and the browser is a hint. Everything that can be called twice must be idempotent. Every movement is recorded so it can be reconciled.

Those five hold whether you are integrating Stripe, Paystack, Flutterwave or something that does not exist yet. The SDK is the part that changes. The discipline is the part worth learning.`,
    signoff: "I build fintech products at E-Bringgs Technologies, in naira, over an integration written by hand on purpose.",
  },
];

export const posts: BlogPost[] = rawPosts.map((post) => ({
  ...post,
  body: parseBlogBody(post.body, post.slug),
}));

export const getPost = (slug: string) =>
  posts.find((post) => post.slug === slug);
