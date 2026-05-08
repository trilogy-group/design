---
version: "alpha"
name: Design Standards and Skills
description: A tactile editorial-tech design system for a short design-standards SPA.
colors:
  primary: "#C43E28"
  ink: "#171512"
  paper: "#F3EFE6"
  paperRaised: "#FFF8E8"
  rule: "#342F29"
  clay: "#C43E28"
  cobalt: "#214EBC"
  brass: "#A77723"
  fern: "#2E6B47"
  onClay: "#FFF8E8"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 4rem
    fontWeight: 760
    lineHeight: 0.93
    letterSpacing: "0px"
  body:
    fontFamily: Atkinson Hyperlegible
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "0px"
  label:
    fontFamily: Archivo
    fontSize: 0.78rem
    fontWeight: 760
    lineHeight: 1
    letterSpacing: "0px"
rounded:
  sm: 4px
  md: 8px
spacing:
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
components:
  page:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  panel:
    backgroundColor: "{colors.paperRaised}"
    textColor: "{colors.ink}"
  rule-line:
    backgroundColor: "{colors.rule}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.onClay}"
    rounded: "{rounded.sm}"
    padding: 14px 18px
  label-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.onClay}"
  label-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
  label-fern:
    backgroundColor: "{colors.fern}"
    textColor: "{colors.onClay}"
  focus-ring:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.onClay}"
---

## Overview

The visual system borrows from printed reference manuals, color-proof sheets, and studio inspection tables. The interface should feel useful before it feels decorative.

## Colors

Ink and paper carry most of the page. Clay marks action and Impeccable. Cobalt marks DESIGN.md and machine-readable tokens. Brass and fern appear only where they clarify skill categories.

## Typography

Bricolage Grotesque is used as a compact poster face. Atkinson Hyperlegible keeps explanations readable. Archivo is reserved for compact labels and navigation.

## Layout

The page uses full-width bands, source sections, and annotated strips instead of repeated card grids. Dense material is chunked into groups that can be explained quickly.

## Components

Buttons are compact, high-contrast, and rectangular. Skill entries use numbered rows and restrained color tags rather than decorative icons.

## Do's and Don'ts

Do connect every visual choice to a teaching purpose. Do keep text short. Do give images dimensions. Do preserve focus states. Do not use glassmorphism, gradient text, hero metrics, or vague filler.
