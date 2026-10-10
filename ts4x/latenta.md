# Latency Optimization (<1.8ms)

::: warning Under development
TS4X is under active development. Latency figures are design targets and may be refined before release.
:::

TS4X is built around a latency of **under 1.8 ms**, tuned for real-time stage use.

## Latency Target

| Item | Value |
|---|---|
| **TS4X execution latency** | < 1.8 ms |
| **Pro License** | Hardware-accelerated DSP core with sub-1.8 ms latency |

## Buffer Size and Output Latency

The audio output buffer sets the minimum output latency:

```text
latency (ms) = buffer frames / sample rate x 1000
```

| Buffer (frames) | 44.1 kHz | 48 kHz |
|---|---|---|
| 64 | 1.45 ms | 1.33 ms |
| 128 | 2.90 ms | 2.67 ms |
| 256 | 5.81 ms | 5.33 ms |
| 512 | 11.61 ms | 10.67 ms |

These figures cover the output buffer only. The audio driver, the audio interface and MIDI input add to the total. Only the 64-frame buffer fits under the 1.8 ms target.

## Automatic Buffer Selection

The app starts the engine with the smallest buffer the device accepts, trying 64, 128, 256 and then 512 frames:

```tsx
useEffect(() => {
  if (started.current) return;
  started.current = true;
  (async () => {
    for (const frames of [64, 128, 256, 512]) {
      try {
        const i = await api.start(frames);
        setInfo(i);       // { sampleRate, bufferFrames, latencyMs }
        setError('');
        return;
      } catch (e) {
        setError(String(e));
      }
    }
  })();
}, []);
```

The measured values are shown in the app header:

```tsx
<p className="status">
  {info
    ? `${info.sampleRate} Hz, ${info.bufferFrames} frame buffer, ${info.latencyMs.toFixed(2)} ms output latency`
    : 'Starting audio engine…'}
</p>
```

## Fixed Buffer in the Rust Core

The Rust side requests a fixed buffer from the audio device and reports the resulting latency:

```rust
let mut conf = dev.default_output_config().map_err(|e| e.to_string())?.config();
conf.buffer_size = cpal::BufferSize::Fixed(buffer);
let (sr, ch) = (conf.sample_rate.0, conf.channels as usize);

let info = EngineInfo {
    sample_rate: sr,
    buffer_frames: buffer,
    latency_ms: buffer as f32 / sr as f32 * 1000.0,
};
```

If the device does not support the requested size, the command returns an error and the UI tries the next buffer.

## Lock-Free Audio Thread

The audio callback never waits for the UI. Parameters are shared as atomics and commands arrive through a channel:

```rust
/// Lock-free f32 parameter.
pub struct F(AtomicU32);
impl F {
    pub fn get(&self) -> f32 { f32::from_bits(self.0.load(Relaxed)) }
    pub fn set(&self, v: f32) { self.0.store(v.to_bits(), Relaxed) }
}
```

## Recommended Hardware

| Component | Recommendation |
|---|---|
| **Processor** | Apple Silicon (M1/M2/M3), Intel x86_64 up to 4.0 GHz, or ARM Cortex-A72 |
| **Memory** | 8 GB RAM minimum |
| **Storage** | NVMe SSD, optimized for high-speed patch loading |
| **Audio output** | 24-bit / 192 kHz stereo DAC |
| **Audio interface** | Native multi-channel USB audio compatibility |
| **Wireless** | Ultra-low latency Bluetooth 5.0 |

## Controller Side

Latency also depends on the controller. The [i-volution controller](/i-volution/) uses ultra-low latency MIDI communication, so there is no lag between the bellows and the sound.

## Related Pages

- [Pro License Management](/ts4x/licentiere)
- [Technical Specifications](/i-volution/specificatii)