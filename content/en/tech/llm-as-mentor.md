---
title: "Using LLM as a Mentor, Not a Search Engine"
date: 2026-02-25
description: "How I used Gemini to go from zero networking knowledge to building a home VPN server and MacBook home server in a day. Three interaction patterns that actually made learning happen."
tags:
  - llm
  - ai
  - gemini
  - learning
  - developer-growth
  - productivity
  - networking
  - homelab
  - tutorial
lang: en
draft: false
aliases:
  - tech/llm-as-mentor
---

## The Setup

I spent one day building the entire home infrastructure described in this series. VPN server, port forwarding, DDNS, MacBook file sharing, remote desktop — all of it, from zero knowledge to working system, in about 8 hours.

I didn't know what port forwarding was at the start of that day.

I didn't know why DDNS exists. Didn't know what double NAT meant. Didn't know the difference between OpenVPN and WireGuard. Didn't know that macOS had both Screen Sharing and Remote Management, or why they conflicted. Didn't know about Private Wi-Fi Address.

The reason it was possible to learn all of this in a day is because **Gemini was my primary guide.** Not Google. Not Stack Overflow. Not a YouTube tutorial. Just a conversation.

Looking back, it wasn't just "ask LLM, get answer, copy-paste." There were three distinct patterns that made the learning actually stick. The three patterns are what I want to talk about.

## Pattern 1: Understand the Concept First, Then Configure

Before I touched the Archer's settings, I asked Gemini about the difference between two OpenVPN access control options:

- "Home Network Only"
- "Internet & Home Network"

There's a configuration screen on the router. Both options are there. I could have just picked one and moved on. But I asked why.

Gemini explained:
- "Home Network Only" means traffic stays inside your local network. Device connects to VPN, can access home files, but can't leave the home network.
- "Internet & Home Network" means the VPN tunnel routes everything — device can access home resources AND use the VPN as an exit point for internet traffic.

After understanding that difference, the choice was obvious based on my goals. I wanted iPhone to access MacBook files (home network) but also to appear as if it's at home for any cloud stuff (internet). So: "Internet & Home Network."

**Why this matters:** Understanding first vs following steps produces the same configuration initially. But when something breaks, only the person who understands the concept knows where to look. The person who followed steps is lost.

Plus, understanding the concept means you can make decisions. You're not dependent on a guide that covers your specific setup. You can adapt.

## Pattern 2: Bring the Symptom, Not the Search Query

Connection Timeout happened. That's a symptom. It's generic. Googling "OpenVPN Connection Timeout" would return dozens of possible causes — wrong port, firewall blocking, bad certificate, double NAT issues, ISP blocking, router bug, misconfigured DDNS, name resolution failure, the list goes on. I'd have to filter through them to figure out which applied to my specific setup.

Instead, I pasted the raw `.ovpn` file to Gemini and described what happened:

> "VPN client shows Connection Timeout. Here's my config file. Here's my setup: LG U+ router with static IP 219.107 on the Archer C6, which is running OpenVPN Server. I set up port forwarding, DDNS is configured. Tested on LTE so it's not a local network problem."

Gemini immediately looked at the config file, saw the `remote 192.168.219.107` line, and explained: **"That's a private IP. The Archer doesn't know its own public IP, so it filled in its WAN address from the LG router. This is a standard double NAT issue — from the internet, that private address is unreachable."**

No filtering needed. Gemini had the full context — my architecture, my specific router setup, the config file I was using — and diagnosed it immediately.

Same thing with the Private Wi-Fi Address problem later. I described seeing two MacBook entries in the DHCP client list, with different MACs and different IP assignments. Gemini said: **"That's Apple's Private Wi-Fi Address feature. The randomized MAC is the actual connected client. Your reservation rule is looking for the real MAC, which isn't what's connecting."**

Context collapses the diagnosis problem. Google can't do this. You have to know what to search for, and half the time you don't know what you don't know.

## Pattern 3: Keep Asking "What's Next?"

After the VPN was working, I asked: **"Is there anything else I can do from here?"**

I'd achieved the original goal. VPN worked. Done, right?

Gemini said: you already have a VPN tunnel to your home network, so now you can attach services to it. File sharing would be useful. Remote desktop too. You could set up a media server if you had one. Basically, anything that runs on your home network is now accessible from outside.

That triggered the next series of steps: SMB file sharing, VNC remote desktop. Each step built naturally on the previous one.

Without prompting, I would have stopped at VPN. That was the original goal. The expansion happened because I asked a mentor-like question: **"What does my current position enable?"**

A search engine can't answer that. You have to know what to search for. A mentor — or an LLM acting as one — can say: here's what you've built, here's what that lets you do next.

## Why This Is Different From Other Learning Methods

**Books and courses:** They have a fixed curriculum. You start from the beginning regardless of where you actually are. If you already know some of the fundamentals, you're bored. If you're missing some, you're lost. And if you want to diverge from the path, you're on your own.

**Google + Stack Overflow:** You have to know the search terms. Unknown concepts can't be searched — you don't know they exist. Error resolution requires you to filter results for your specific context yourself. "Connection Timeout" gets thousands of results. You have to guess which one applies.

**LLM as mentor:** You can start without knowing what you don't know. You can describe a symptom instead of trying to diagnose it yourself. Context accumulates and makes responses more accurate. Blocked? Diagnose together. Done? Get the next steps.

The speed difference is real. The concepts in this series — double NAT, port forwarding, DDNS, OpenVPN, SMB, Private MAC, VNC — would take weeks to learn from scratch through a book. Read the theory, test it, run into edge cases, dig deeper, finally understand. The actual work took one day.

## One Caveat: Feedback Loop Is Essential

Gemini suggested I use the LG U+ router's USB port for NAS setup. That sounded great. But it turned out the ISP firmware blocks USB functionality. Gemini didn't check that upfront.

This is important: **an LLM is not always right.** It's very confident and sounds authoritative, but it can be wrong.

The reason this didn't derail me: I actually tried it. The action-result-feedback loop caught the error. When the USB port didn't work, I came back and we pivoted. That loop of **suggestion → implementation → reality check → adjustment** is what makes LLM-guided learning work.

If I'd just read the answers without trying anything, I'd have a plausible-sounding but wrong mental model. The learning happens in the gap between what the LLM suggested and what actually happened.

## The Tool Matters Less Than How You Use It

These three patterns work with any LLM. Claude, GPT, Gemini. The specific model isn't the bottleneck.

What matters is:
1. **Ask why, not how** — concept first, implementation second
2. **Describe reality, not search terms** — bring the actual symptom and context
3. **Keep pushing forward** — ask what's next, what's possible, what this enables

A mentor doesn't just give you instructions. A mentor asks if you understand the concept. A mentor listens to your actual problem instead of guessing based on a few keywords. A mentor shows you what your current skills open up.

An LLM can be that mentor if you ask it the right way.

## Link Back

[[tech/router-vpn-01|See the full build log →]]
