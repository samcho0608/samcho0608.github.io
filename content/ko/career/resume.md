---
title: "이력서"
date: 2026-03-13
description: "시니어 백엔드 엔지니어 조성민의 이력서 요약."
tags:
  - career
  - resume
  - backend
cssclasses:
  - resume-page
lang: ko
draft: false
---

# 조성민

시니어 백엔드 엔지니어  
samcho9968@gmail.com  
[LinkedIn](https://www.linkedin.com/in/%EC%84%B1%EB%AF%BC-%EC%A1%B0-17a757250/) · [GitHub](https://github.com/samcho0608)

핀테크와 이커머스 환경에서 대규모 트래픽 시스템을 설계하고 운영해온 4년 차 백엔드 엔지니어입니다. 안정적인 백엔드 시스템을 설계하고, 사람이 메우고 있던 복잡한 실무 프로세스를 유지보수 가능한 소프트웨어로 바꿔 운영 비용을 줄이는 일에 집중해왔습니다.

| Contact | Details |
|---|---|
| Current | 쿠팡 Interstellar Biz 시니어 백엔드 엔지니어 |
| Core Areas | Reliable Backend Systems, External Integrations, Observability, Automation, Agentic Development |
| Channels | [LinkedIn](https://www.linkedin.com/in/%EC%84%B1%EB%AF%BC-%EC%A1%B0-17a757250/) · [GitHub](https://github.com/samcho0608) |
| Education | UCLA Computer Science and Engineering, Bioinformatics 부전공, GPA 3.6 / 4.0, 현재 휴학 |

## Highlights

- 70개 이상의 금융사 API를 하나의 내부 인터페이스로 추상화한 Gateway server 구축
- 80개 이상의 금융사 데이터를 처리하는 ETL pipeline을 설계해 정산 처리 과정을 최대 2주에서 3일로 단축
- 금리할인쿠폰 시스템 설계와 운영을 통해 매출 614% 성장과 ROAS 150%p 개선에 기여
- 외부 기관 연동부의 API 오류율을 9% 개선하고 MTTR 약 2시간 수준 달성
- Claude Code 기반 internal tools, codebase 분석 사례, plugin 배포를 통해 팀의 AI 활용 방식을 확장

## 경력

### 쿠팡
아시아 최대 규모 트래픽을 처리하는 이커머스 플랫폼 중 하나.

#### 시니어 백엔드 엔지니어, Interstellar Biz | 2026.02 - 현재

- frontend service layer와 domain service layer 사이의 high-availability read path 개발 및 운영
- backend domain의 high read traffic offloading 담당
- segment-based exposure, backend-driven UI orchestration 등 read 관련 cross-functional capability 개발
- 부서 내 platform tools 사용성을 높이는 Chrome Extensions를 개발·배포해 팀 내 필수 설치 tools로 정착
- Claude Code를 활용한 codebase 분석 use case를 제시해 팀 내 AI 활용 가능성을 확장
  - API Spec 필드 변경의 downstream 영향도를 분석할 수 있다는 사례를 제시
  - 망 접근 권한 변경이 development environment에 미치는 영향을 Claude Code로 분석해, 두 자릿수 규모 repository 대상 report를 low cost와 짧은 lead time으로 도출하고 사람은 지시와 검토 중심으로만 개입
- 팀 특화 harness를 제공하는 Claude Code plugin을 배포하고, 주기적인 consulting을 통해 팀원들의 AI 기반 workflow adoption을 지원

### 뱅크샐러드
누적 다운로드 1,100만의 마이데이터 핀테크 서비스.

#### 서버 엔지니어, Core Backend | 2025.07 - 2026.01

- core notification system과 remittance system 운영
- AML SaaS를 고객 영향 없이 무중단 전환
- remittance service developer center 구축으로 external integration experience 개선

#### 서버 엔지니어, 금융쇼핑 PA (대출비교) | 2022.11 - 2025.06

- 70개 이상의 금융사 API를 단일 인터페이스로 추상화한 `lenderconnector` 설계 및 구축
- 금융사 API outsourcing architecture를 주도해 약 80%의 인하우스 개발을 outsourcing으로 전환
- 대출비교 서비스 정산 자동화와 backoffice 개발을 통해 manual process를 최대 2주에서 3일로 단축
- 대출 비교 핵심 기능인 coupon system 설계, 구현, 운영을 총괄해 매출 614% 향상과 ROAS 150%p 개선에 기여
- 대출 신청 자동입력용 scraping infrastructure 운영 및 개선
- Datadog 기반 dashboards, monitors, automated reports를 구축해 외부 기관 연동부 MTTR 약 2시간 수준 달성 및 API error rate 9% 개선
- GitHub Actions cache와 vendor mode로 Golang CI 시간을 약 94% 단축
- 전사 동료 투표 기반 "올해의 협업왕" 2회 수상
- 산업기능요원 소집해제 (2024.11)

### 우디고
지도 위에 장소를 공유하고 관리하는 SNS 앱 "클룹" 서비스 스타트업.

#### 백엔드 / 모바일 엔지니어 | 2021.09 - 2022.09

- Spring Boot, Kotlin 기반 REST API server를 처음부터 구축
- OAuth2 인증, CI/CD pipeline, Clean Architecture 설계
- 모바일 개발에서 백엔드로 역할 확장

## Projects

### 금융사 Gateway 서버
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">뱅크샐러드</p>
    <p class="resume-entry-date">2024.01 - 2025.06</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li><code>lenderconnector</code>를 구축해 금융사별 API를 단일 internal interface로 추상화</li>
      <li>SNS-SQS 기반 event-driven architecture를 도입해 service coupling과 worker instability 완화</li>
      <li>외부 개발을 가능하게 하는 security isolation 구조를 설계해 outsourcing model 정착</li>
      <li>사내 TechSalad 컨퍼런스에서 architecture와 outsourcing 사례 발표</li>
    </ul>
  </div>
</div>

### 대출비교 서비스 정산 자동화
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">뱅크샐러드</p>
    <p class="resume-entry-date">2024.07 - 2025.06</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>문제 발굴, 제안, 설계, 구현까지 프로젝트를 end-to-end로 주도</li>
      <li>80개 이상의 금융사 데이터를 처리하는 3-stage ETL pipeline 구축</li>
      <li>대출비교 서비스 정산 처리 과정을 최대 2주에서 3일로 단축</li>
      <li>cashback 확정 batch 및 지급/취소/알림 backoffice 기능 구현</li>
    </ul>
  </div>
</div>

### 금리할인쿠폰 시스템
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">뱅크샐러드</p>
    <p class="resume-entry-date">2023.06 - 2025.06</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>coupon system 설계, 구현, 운영을 총괄해 매출 614% 향상에 기여</li>
      <li>DSL 기반 Rule Engine으로 ROAS 150%p 개선</li>
      <li>Redis distributed lock을 적용해 concurrency issue 방지</li>
    </ul>
  </div>
</div>

### 서버 사이드 스크래핑 인프라
<div class="resume-entry">
  <div class="resume-entry-meta">
    <p class="resume-entry-org">뱅크샐러드</p>
    <p class="resume-entry-date">2022.11 - 2025.06</p>
  </div>
  <div class="resume-entry-body">
    <ul>
      <li>대출 신청 flow에 직접 연결되는 scraping infrastructure 운영 및 개선</li>
      <li>orchestrator 로직을 수정해 신규 pod 쏠림과 churn 완화</li>
      <li>Circuit Breaker with Fallback 패턴을 적용해 사이트 변경 대응력 강화</li>
    </ul>
  </div>
</div>

## 기술 스택

| Area | Stack |
|---|---|
| Languages | Go, Java, Kotlin, TypeScript |
| Frameworks | Spring Boot |
| Infrastructure | Kubernetes, AWS, Docker, GitHub Actions, Jenkins |
| Databases | MySQL, Redis |
| Observability | Datadog |
| Tooling | Playwright.js, Claude Code |
