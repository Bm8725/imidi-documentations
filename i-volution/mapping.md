# MIDI Mapping

Every parameter of the **i-VOLUTION MIDI System for Accordion** is mapped to standard MIDI messages, so it works with the **KORG PA series**, **TS4X** and other major digital synths without custom setup.

## Overview

| Function | MIDI Message | Details |
|---|---|---|
| **Transpose** | General MIDI via SysEx | Changes pitch on the connected synth |
| **Performance Change** | Via registers | Up to 11 |
| **Bank Select** | A, B, C, D (default) + L (BASS) | Up to 127, saves 11×127 |
| **Volume Control** | CC07 | Channel volume |
| **Expression (Bellows)** | CC11 | Driven by bellows pressure |

## Sections & Channels

i-VOLUTION sends velocity-sensitive MIDI data from both accordion sections, on **any MIDI channel**.

| Section | Hand | Included in |
|---|---|---|
| **SOLO** | Right (melody) | SOLO, R + L |
| **BASS** | Left | R + L |

## Transpose

Transpose is sent as **General MIDI via SysEx**. The current value is shown in real time on the 1.8" OLED display and adjusted with the multifunction encoder.

## Performance Change

Performance changes are triggered through the registers, with **up to 11** available.

## Bank Select

| Bank | Description |
|---|---|
| **A, B, C, D** | Default banks (SOLO) |
| **L** | BASS section bank, independent of the SOLO banks |

- Selection goes **up to 127**.
- Bank and performance combinations are stored as **11×127**.
- On the **R + L** version, the BASS section has its own independent bank select (+L, up to 127).
- The active bank is always visible on the OLED (for example `A · 03`).

## Volume & Expression

| Control | Message | Source |
|---|---|---|
| **Volume** | CC07 | Set from the encoder, shown on the OLED |
| **Expression** | CC11 | Bellows pressure, smoothed with EMA filtering |

### Bellows Response

Bellows pressure is processed with **EMA (Exponential Moving Average)** filtering. This gives a smooth, realistic response with minimal sensor noise, close to Advanced Physical Behavior Modeling (APBM).

### EMA Filter: C Example

The EMA filter blends each new sensor reading with the previous filtered value:

```
y[n] = α · x[n] + (1 − α) · y[n−1]
```

- `x[n]` is the raw pressure reading.
- `y[n]` is the filtered output.
- `α` (between 0 and 1) sets the smoothing. A small `α` gives a smoother but slower response, a large `α` gives a faster but noisier one.

> **Note:** this is a generic, illustrative example of how an EMA filter works. It is **not** the i-VOLUTION firmware, and the sensor resolution, `α` value and sampling rate used by the device are not published.

```c
#include <stdint.h>

#define EMA_SHIFT 3            /* alpha = 1/8 = 1 / (1 << EMA_SHIFT) */
#define ADC_BITS  12           /* example: 12-bit pressure sensor     */

typedef struct {
    int32_t state;             /* filtered value, scaled by 2^EMA_SHIFT */
    uint8_t initialized;
    uint8_t last_cc;           /* last CC11 value sent, to avoid repeats */
} ema_t;

/* Integer EMA: y += (x - y) / 8, no floating point needed */
static uint16_t ema_update(ema_t *f, uint16_t sample)
{
    if (!f->initialized) {
        f->state = (int32_t)sample << EMA_SHIFT;
        f->initialized = 1;
    } else {
        f->state += (int32_t)sample - (f->state >> EMA_SHIFT);
    }
    return (uint16_t)(f->state >> EMA_SHIFT);
}

/* Placeholder: replace with your MIDI output routine */
extern void midi_send_cc(uint8_t channel, uint8_t cc, uint8_t value);

/* Call this at a fixed rate (e.g. every 1-2 ms) with the raw sensor reading */
void bellows_task(ema_t *f, uint16_t raw_pressure, uint8_t midi_channel)
{
    uint16_t smooth = ema_update(f, raw_pressure);

    /* Scale 12-bit (0..4095) to MIDI 7-bit (0..127) */
    uint8_t cc11 = (uint8_t)(smooth >> (ADC_BITS - 7));

    /* Send only when the value changes, to keep MIDI traffic low */
    if (cc11 != f->last_cc) {
        midi_send_cc(midi_channel, 11, cc11);   /* CC11 = Expression */
        f->last_cc = cc11;
    }
}
```

**How it works:**

1. `ema_update` keeps the filtered value scaled by 8, so the math stays in integers.
2. Each call moves the output one eighth of the way toward the new reading, which removes sensor noise.
3. `bellows_task` converts the smoothed value to 0-127 and sends **CC11** only when it changes.

## Compatibility

| Device | Status |
|---|---|
| **KORG PA series** | Compatible |
| **TS4X** | Compatible |
| **Other major digital synths** | Compatible (General MIDI over SysEx, CC07, CC11) |

## Notes

- No firmware update is required. The mapping works out of the box.
- All values are shown in real time on the OLED display: bank, bellows expression, volume and transpose.