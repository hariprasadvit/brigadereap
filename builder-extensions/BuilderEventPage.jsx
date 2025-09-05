"use client";

import React from "react";
import BuilderEventCard from "./BuilderEventCard";
import "../builder-styles/BuilderEvent.css";

const sampleEvents = [
  {
    id: 1,
    title: "UrbanTech Summit 2025",
    subtitle: "Rethinking infrastructure for smarter cities",
    excerpt:
      "Join founders, policy makers and investors for a two-day deep dive into urban technology trends and scalable solutions.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80",
        alt: "City skyline at dusk",
      },
      {
        src: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1200&q=80",
        alt: "Conference audience",
      },
      {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
        alt: "Speakers on stage",
      },
    ],
    website: "https://example.com/urbantech",
    tickets: "https://example.com/urbantech/tickets",
  },
  {
    id: 2,
    title: "Smart Cities Roundtable",
    subtitle: "Designing safer, greener urban spaces",
    excerpt:
      "An intimate roundtable for industry leaders to collaborate on actionable roadmaps for urban resiliency.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80",
        alt: "Roundtable discussion",
      },
      {
        src: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=1200&q=80",
        alt: "City planning map",
      },
      {
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
        alt: "Urban transport network",
      },
    ],
    website: "https://example.com/roundtable",
    tickets: "https://example.com/roundtable/tickets",
  },
  {
    id: 3,
    title: "Mobility & Energy Expo",
    subtitle: "Electric mobility and distributed energy systems",
    excerpt:
      "Explore product demos, investor sessions and case studies focused on sustainable urban mobility.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        alt: "Electric vehicle showcase",
      },
      {
        src: "https://images.unsplash.com/photo-1542317854-3c4f6a5f6f1e?w=1200&q=80",
        alt: "Solar panels on building",
      },
      {
        src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80",
        alt: "City street with EV",
      },
    ],
    website: "https://example.com/mobility",
    tickets: "https://example.com/mobility/tickets",
  },
];

export default function BuilderEventPage() {
  return (
    <main className="builder-event-page">
      <header className="builder-event-header" role="banner">
        <h1 className="builder-event-title">Where UrbanTech Comes Together</h1>
        <p className="builder-event-subtitle">
          We bring together founders, investors, and industry leaders to shape the
          future of cities—one conversation at a time.
        </p>
      </header>

      <section className="builder-event-grid" aria-label="Upcoming events">
        {sampleEvents.map((event) => (
          <BuilderEventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
}
