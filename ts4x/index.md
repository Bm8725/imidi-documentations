# About TS4X Core DSP

::: warning Under development
TS4X is under active development. Features, architecture and details on these pages may change before release. The code on these pages comes from the current prototype.
:::

**TS4X** is a live-performance synth engine, built for the stage and not just the studio. It is designed around sub-1.8 ms latency and `.wav` sample playback.

## Key Features

- **Sub-1.8 ms latency** for real-time stage use
- **Standalone** on desktop and mobile
- **Polyphonic synth** with 4 waveforms, ADSR envelope and low-pass filter
- **Step sampler** with 4 tracks and 16 steps
- **Looper** with record, play and overdub
- **Lossless cloud synchronization** with MyCloud
- **Works with any MIDI controller.** The [i-volution controller](/i-volution/) is optional and adds velocity-sensitive SOLO/BASS integration for accordion players.

## Architecture (In Development)

TS4X is being built as a cloud-first application:

| Layer | Technology | Role |
|---|---|---|
| **User interface** | React + Vite (TSX) | Controls, step grid, looper, MIDI selection |
| **Application shell** | Tauri 2 | Window, IPC between UI and engine |
| **Audio and DSP core** | Native Rust | Synth, sampler, looper, MIDI input |
| **Cloud** | Full cloud integration | Presets, profiles and sync |

The UI never touches audio samples. It sends commands to the Rust core, which runs the audio callback.

## Project Structure

```text
ts4x-app/
├─ package.json
├─ vite.config.ts
├─ index.html
├─ src/
│  ├─ main.tsx          entry point
│  ├─ App.tsx           voice, sequencer, looper, MIDI
│  ├─ StepGrid.tsx      4 x 16 step grid and sample loading
│  ├─ api.ts            typed wrappers for the Rust commands
│  └─ styles.css
└─ src-tauri/
   ├─ tauri.conf.json
   ├─ Cargo.toml
   └─ src/
      ├─ main.rs        Tauri commands, audio and MIDI setup
      └─ engine.rs      DSP core (voices, filter, sampler, looper)
```

## How the UI Talks to the Engine

Every Rust command has a typed wrapper in `src/api.ts`:

```ts
import { invoke } from '@tauri-apps/api/core';

export type ParamName =
  | 'wave' | 'attack' | 'decay' | 'sustain' | 'release'
  | 'cutoff' | 'volume' | 'bpm';

/** 0 = stop, 1 = record, 2 = play, 3 = overdub */
export type LooperMode = 0 | 1 | 2 | 3;

export const api = {
  start: (buffer: number) => invoke<EngineInfo>('start_audio', { buffer }),
  setParam: (name: ParamName, value: number) => invoke<void>('set_param', { name, value }),
  setStep: (track: number, step: number, on: boolean) => invoke<void>('set_step', { track, step, on }),
  transport: (playing: boolean) => invoke<void>('transport', { playing }),
  looper: (mode: LooperMode) => invoke<void>('looper', { mode }),
  loadSample: (track: number, bytes: number[]) => invoke<void>('load_sample', { track, bytes }),
  getStep: () => invoke<number>('get_step'),
  midiPorts: () => invoke<string[]>('list_midi'),
  connectMidi: (index: number) => invoke<void>('connect_midi', { index }),
};
```

| Command | Purpose |
|---|---|
| `start_audio` | Opens the output device with a fixed buffer size |
| `set_param` | Sets a synth or tempo parameter |
| `set_step` | Turns a sequencer step on or off |
| `transport` | Starts or stops the sequencer |
| `looper` | Sets the looper mode |
| `load_sample` | Loads a `.wav` file into a track |
| `get_step` | Returns the current playhead step |
| `list_midi`, `connect_midi` | Lists and connects MIDI inputs |

## Entry Point

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## Target Platforms

- Windows
- macOS (Apple Silicon)
- Linux
- Android

## MIDI 3.0 Concept

TS4X is the middle layer of the iMIDI ecosystem:

**MIDI Controller → TS4X Core DSP → Cloud Platform**

See the [MIDI 3.0 Connection Guide](/i-volution/midi-interconnection) for details.

## Next Steps

- [Desktop & Mobile Installation](/ts4x/instalare)
- [Latency Optimization](/ts4x/latenta)
- [Pro License Management](/ts4x/licentiere)