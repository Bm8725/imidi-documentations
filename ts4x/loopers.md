# Loopers & Step Samplers

::: warning Under development
TS4X is under active development. Features may change before release.
:::

TS4X includes **integrated loopers** and **step-based samplers**, built for live performance.

## Features

| Feature | Description |
|---|---|
| **Step sampler** | 4 tracks, 16 steps per track, 16th-note resolution |
| **Tempo** | 40 to 240 BPM |
| **Looper** | Record, play and overdub, up to 60 seconds |
| **Latency** | Runs at under 1.8 ms |

A track with no sample loaded stays silent. See [Import Audio Samplers (.wav)](/ts4x/samplers).

## Step Sampler

The step grid has one row per track and one button per step. The current step is highlighted while the sequencer runs:

```tsx
{row.map((on, s) => (
  <button
    key={s}
    aria-label={`Track ${t + 1}, step ${s + 1}`}
    aria-pressed={on}
    className={`cell${on ? ' on' : ''}${s === step ? ' now' : ''}${s % 4 === 0 ? ' beat' : ''}`}
    onClick={() => toggle(t, s)}
  />
))}
```

Each toggle updates the pattern in the engine immediately:

```tsx
const toggle = (t: number, s: number) => {
  const on = !grid[t][s];
  setGrid(g => g.map((row, i) => (i === t ? row.map((c, j) => (j === s ? on : c)) : row)));
  void api.setStep(t, s, on);
};
```

The sequencer clock runs inside the audio callback, so timing does not depend on the UI:

```rust
let step_len = sr * 60.0 / sh.bpm.get().max(1.0) / 4.0; // 16th notes

if self.clock <= 0.0 {
    for t in 0..4 {
        if (sh.steps[t].load(Relaxed) >> self.step) & 1 == 1 && self.samples[t].is_some() {
            self.pos[t] = 0.0;
        }
    }
    sh.step_now.store(self.step as u8, Relaxed);
    self.step = (self.step + 1) % 16;
    self.clock += step_len;
}
```

## Transport and Tempo

```tsx
<button className="primary" onClick={toggleTransport}>
  {playing ? 'Stop sequencer' : 'Start sequencer'}
</button>
<input
  type="range" min={40} max={240} step={1}
  value={vals.bpm}
  onChange={e => setParam('bpm', Number(e.target.value))}
/>
```

## Looper

The looper has four modes:

| Mode | Value | Behavior |
|---|---|---|
| **Stop** | 0 | Looper is idle |
| **Record** | 1 | Records the output into the loop buffer, replacing the previous loop |
| **Play** | 2 | Plays the recorded loop |
| **Overdub** | 3 | Plays the loop and adds new sound on top |

```tsx
const LOOPER: [string, LooperMode][] = [
  ['Stop', 0], ['Record', 1], ['Play', 2], ['Overdub', 3],
];

<div className="segmented" role="group" aria-label="Looper">
  {LOOPER.map(([label, mode]) => (
    <button key={label} aria-pressed={loop === mode} onClick={() => pickLoop(mode)}>
      {label}
    </button>
  ))}
</div>
```

The loop is processed in the audio callback:

```rust
let mut wet = 0.0;
match mode {
    1 => if self.len < self.buf.len() { self.buf[self.len] = dry; self.len += 1; },
    2 | 3 if self.len > 0 => {
        if self.lpos >= self.len { self.lpos = 0; }
        wet = self.buf[self.lpos];
        if mode == 3 { self.buf[self.lpos] += dry; }
        self.lpos += 1;
    }
    _ => {}
}
```

## Related Pages

- [Import Audio Samplers (.wav)](/ts4x/samplers)
- [Latency Optimization](/ts4x/latenta)