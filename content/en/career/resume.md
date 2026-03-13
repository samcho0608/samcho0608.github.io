---
title: "Resume"
date: 2026-03-13
description: "Resume summary for Sam Cho, senior backend engineer."
tags:
  - career
  - resume
  - backend
cssclasses:
  - resume-page
lang: en
draft: false
---

# Sam Cho

Senior Backend Engineer  
samcho9968@gmail.com  
[LinkedIn](https://www.linkedin.com/in/%EC%84%B1%EB%AF%BC-%EC%A1%B0-17a757250/) · [GitHub](https://github.com/samcho0608)

Backend engineer with 4+ years building high-traffic, high-reliability systems in fintech and e-commerce. I focus on designing reliable backend systems, reducing operational toil, and turning messy real-world workflows into maintainable software.

| Contact | Details |
|---|---|
| Current | Senior Backend Engineer, Coupang Interstellar Biz |
| Core Areas | Reliable backend systems, external integrations, observability, automation, agentic development |
| Channels | [LinkedIn](https://www.linkedin.com/in/%EC%84%B1%EB%AF%BC-%EC%A1%B0-17a757250/) · [GitHub](https://github.com/samcho0608) |
| Education | UCLA, B.S. in Computer Science and Engineering, Minor in Bioinformatics, GPA 3.6 / 4.0, currently on leave of absence |

## Highlights

- Unified 70+ financial institution APIs behind a single internal gateway
- Cut the settlement process from up to 2 weeks to 3 days through ETL automation
- Contributed to 614% revenue growth and improved ROAS by 150 percentage points through coupon system design
- Improved external integration reliability, reducing API error rate by 9% and helping achieve roughly 2-hour MTTR
- Expanded practical AI adoption with Claude Code-based tools, analysis workflows, and team-specific plugins

## Experience

### Coupang
One of Asia's largest e-commerce platforms by traffic volume.

#### Senior Backend Engineer, Interstellar Biz | Feb 2026 - Present

- Worked on the read path between frontend service layers and domain services, offloading high read traffic from backend domains
- Supported read-related cross-functional capabilities such as segment-based exposure and backend-driven UI orchestration
- Built and shared Chrome extensions that improved the usability and correctness of internal platform tools; these became a required install within the team
- Demonstrated Claude Code workflows for downstream impact analysis and network-access change analysis across owned repositories
- Published team-specific Claude Code plugins and ran recurring internal consulting sessions that helped teammates adopt AI-assisted workflows around department-specific tooling and evaluation processes

### Banksalad
MyData fintech platform with 11M+ downloads.

#### Server Engineer, Core Backend | Jul 2025 - Jan 2026

- Owned and operated core notification and remittance systems
- Executed a zero-downtime AML SaaS migration for remittance with no customer-facing disruption
- Built the remittance service developer center to improve partner integration experience

#### Server Engineer, Financial Shopping PA (Loan Comparison) | Nov 2022 - Jun 2025

- Built `lenderconnector`, a gateway that unified 70+ financial institution APIs behind a single internal interface
- Led the outsourcing architecture for financial institution integrations, replacing about 80% of in-house institution integration work with outsourced development
- Built and operated loan comparison settlement automation, reducing the settlement process from up to 2 weeks to 3 days
- Designed, implemented, and operated the coupon system that contributed to 614% revenue growth and improved ROAS by 150 percentage points
- Operated and improved Kubernetes-native scraping infrastructure used for automated form pre-fill in the loan application flow
- Built observability and monitoring systems across external integrations, improving API error rate by 9 percent and helping achieve roughly 2-hour MTTR
- Reduced Golang CI build time by about 94 percent using GitHub Actions cache and vendor mode
- Won the company-wide "Best Collaborator" award twice
- Completed mandatory military service through an industry-specialist program in Nov 2024

### Woodigo
Social SNS startup behind the "Cloop" app.

#### Backend and Mobile Engineer | Sep 2021 - Sep 2022

- Built the REST API backend from scratch using Spring Boot, Kotlin, and Hibernate
- Implemented OAuth2 authentication, CI/CD pipelines, and clean architecture patterns
- Started on the mobile side before moving into backend full-time

## Projects

### Financial Institution Gateway
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">Banksalad</p>
    <p class="resume-entry-date">Jan 2024 - Jun 2025</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>Built <code>lenderconnector</code> to unify institution-specific APIs behind a single internal interface</li>
      <li>Introduced SNS-SQS based event-driven communication to reduce coupling and replace unstable worker behavior</li>
      <li>Designed a security isolation model that enabled outsourced development without exposing internal systems or secrets</li>
      <li>Presented the architecture and outsourcing model at the internal TechSalad engineering conference</li>
    </ul>
  </div>
</div>

### Loan Comparison Settlement Automation
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">Banksalad</p>
    <p class="resume-entry-date">Jul 2024 - Jun 2025</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>Proposed the project independently, built stakeholder buy-in, and delivered it end to end</li>
      <li>Built a 3-stage ETL pipeline to process settlement data across 80+ institutions</li>
      <li>Reduced the settlement process from up to 2 weeks to 3 days</li>
      <li>Implemented cashback confirmation batches and back-office flows for payout, cancellation, and notifications</li>
    </ul>
  </div>
</div>

### Interest Rate Discount Coupon System
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">Banksalad</p>
    <p class="resume-entry-date">Jun 2023 - Jun 2025</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>Designed, implemented, and operated the coupon system that contributed to 614% revenue growth</li>
      <li>Built a DSL-based rules engine that improved ROAS by 150 percentage points</li>
      <li>Added Redis distributed locking to prevent concurrency failures during issuance</li>
    </ul>
  </div>
</div>

### Server-Side Scraping Infrastructure
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">Banksalad</p>
    <p class="resume-entry-date">Nov 2022 - Jun 2025</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>Operated and improved scraping infrastructure used directly in the loan application flow</li>
      <li>Fixed orchestrator behavior that caused unhealthy churn and uneven request distribution</li>
      <li>Implemented circuit breaker with fallback to handle target website changes more gracefully</li>
    </ul>
  </div>
</div>

## Skills

| Area | Stack |
|---|---|
| Languages | Go, Java, Kotlin, TypeScript |
| Frameworks | Spring Boot |
| Infrastructure | Kubernetes, AWS, Docker, GitHub Actions, Jenkins |
| Databases | MySQL, Redis |
| Observability | Datadog |
| Tooling | Playwright.js, Claude Code |
