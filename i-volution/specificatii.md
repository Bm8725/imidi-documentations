# Technical Specifications

## Hardware

| Parameter | Value |
|---|---|
| **Product** | i-VOLUTION MIDI System for Accordion |
| **Manufacturer** | [iMIDI](https://www.imidi.co.uk) |
| **Display** | 1.8" OLED |
| **Control** | Single multifunction digital encoder, intuitive menu |
| **Power management** | TPS63061 (ultra-low power consumption, long battery life) |
| **Firmware** | No update required |
| **Latency** | Ultra-low, tuned for live performance |
| **Warranty** | 2 years |

## Sections & Channels

| Parameter | Value |
|---|---|
| **Sections** | SOLO (right hand), BASS (left hand) |
| **Response** | Velocity-sensitive on both sections |
| **MIDI channels** | Any MIDI channel |

## Bellows Response

| Parameter | Value |
|---|---|
| **Filtering** | EMA (Exponential Moving Average) |
| **Behavior** | Smooth, realistic pressure response with minimal sensor noise |
| **Reference model** | Close to Advanced Physical Behavior Modeling (APBM) |

## MIDI Implementation

| Function | Details |
|---|---|
| **Transpose** | General MIDI via SysEx |
| **Performance Change** | Up to 11, via registers |
| **Bank Select** | A, B, C, D (default) + L (BASS), up to 127 (saves 11×127) |
| **Volume Control** | CC07 |
| **Expression (Bellows)** | CC11 |

## Compatibility

- KORG PA series
- TS4X
- Other major digital synths

## Available Versions

| Version | Sections | Display | Bellows Emulation | Warranty | Price |
|---|---|---|---|---|---|
| **SOLO** | Right hand | 1.8" OLED | EMA | 2 years | $949.9 |
| **R + L** | Right + Left (SOLO + BASS) | 1.8" OLED | EMA | 2 years | $1299.9 |