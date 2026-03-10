---
title: "Home Infra Build Log, Part 1: Why I Built It and How I Designed It"
date: 2026-02-25
description: "How a YouTube video about studio apartment IoT led to buying a smart switch, rediscovering a spare router, and eventually building a home VPN server. Covers the motivation and Double NAT architecture."
tags:
  - networking
  - homelab
  - double-nat
  - nat
  - router
  - vpn
  - tp-link
  - archer-c6
  - lg-uplus
  - iot
  - smart-home
  - self-hosted
  - tutorial
  - apartment-living
series: "home-infra"
series_order: 1
lang: en
draft: false
---

## It Started With a YouTube Video

I came across a Korean YouTube channel called 자취남 (Jachwinam) — a creator who makes content about studio apartment living, including IoT and smart home setups. Watching someone automate their apartment lights in a 25 sqm space made it look accessible. I ordered a Matter-compatible smart switch that evening.

Got it installed, got the lights running on automation. Satisfying. And naturally, my brain jumped to: **what else around here can I do something with?**

That's when I remembered: **I have a spare router sitting in a drawer.**

## The Spare Router

I bought it a couple of years ago for an apartment where the landlord didn't provide Wi-Fi. When I moved here — which came with an ISP router already set up — it went straight into storage. Been there since.

So I asked Gemini: what can you actually do with a spare router?

Four options came up:
1. **Range extender** — boost Wi-Fi signal coverage
2. **Wireless bridge** — connect wired devices wirelessly
3. **Switch** — add more LAN ports
4. **VPN server** — create an encrypted tunnel for remote access

For my apartment (small, already good Wi-Fi coverage, everything's wireless), the first three don't apply. The fourth one caught my attention.

## Why VPN Made Sense

Gemini mentioned something while explaining the VPN option: you could put IoT devices on a guest network through the Archer, isolated from your main devices. Once it was said, I couldn't un-think it. My new smart switch — a relatively cheap device with firmware I don't control — was sitting on the same network as my MacBook. If it got compromised, it'd be on my network.

**IoT security** became reason one.

**Learning** was reason two. I work as a backend engineer, and I knew what VPN was — conceptually. But I'd never actually built one. DHCP? Barely remembered it beyond the name. What actually happens when NAT runs twice? Couldn't have explained it clearly. I recently changed jobs too, and understanding a new company's infrastructure is just part of the job for a backend engineer. Building it hands-on felt like the fastest way to actually understand how these things work, not just what they're called.

## Where the Conversation Led

It started as "let's learn what VPN is." But as the Gemini conversation went on, ideas kept stacking.

VPN means remote access into the home network. Remote access means I could use the MacBook as a file server and remote desktop. And since the Archer is already there, a guest network would isolate IoT devices from the MacBook.

One idea at a time. Here's what that ended up as:

```mermaid
graph LR
    A["Primary Router<br/>(ISP-provided)"]
    B["Secondary Router<br/>(VPN Server<br/>+ Guest Network)"]
    C["MacBook<br/>(SMB + VNC)"]
    D["IoT Devices<br/>(Guest Network)"]

    A -->|Wired Ethernet| B
    A -->|Wi-Fi| C
    B -->|Wi-Fi| C
    B -->|Wi-Fi| D

    style A fill:#4a90e2
    style B fill:#f5a623
    style C fill:#7ed321
    style D fill:#d0021b
```

The primary router is the ISP gateway. The secondary router plugs in via ethernet and serves two purposes: it runs a VPN server (so I can access my stuff from outside), and it broadcasts a guest network where IoT devices live in isolation.

My MacBook connects to the secondary router's main network. That means from anywhere with internet, I can VPN in and access my MacBook for file sharing and remote control.

## The Networking Problem: Double NAT

When I told Gemini I already had an ISP router at home, it flagged the double NAT situation right away. Obvious in hindsight, but not something I'd thought of on my own.

One router, one NAT. Two routers stacked — the secondary plugged into the primary — and NAT happens twice. The secondary router gets a private IP from the primary (192.168.219.xxx), and VPN traffic needs to navigate both layers to reach it:

```mermaid
graph LR
    A["Internet<br/>(Public IP)"]
    B["Primary Router<br/>(Translates Public → 192.168.219.x)"]
    C["Secondary Router<br/>(192.168.219.xxx<br/>Translates 192.168.219.x → 192.168.0.x)"]
    D["iPhone<br/>(via VPN)"]

    A -->|UDP port 1194| B
    B -->|UDP port 1194<br/>to 192.168.219.xxx| C
    C -->|OpenVPN tunnel| D

    style A fill:#4a90e2
    style B fill:#f5a623
    style C fill:#f5a623
    style D fill:#7ed321
```

The primary router doesn't forward incoming VPN traffic by default — that requires explicit **port forwarding**. The forwarding rule needs a fixed target, so the secondary router's IP must be locked via **DHCP static binding**. And since ISPs rotate public IPs, I need a **DDNS** hostname that always points to the current public address.

Three things. Next post is where I actually build them — including one bug that makes the double NAT problem very concrete.
