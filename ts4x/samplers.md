# Import Audio Samplers (.wav)

::: warning Under development
TS4X is under active development. Import options may change before release.
:::

TS4X is built around `.wav` sample playback, tuned for real-time stage use. Each of the 4 sampler tracks holds one sample.

## Supported Content

| Format | Use |
|---|---|
| **.wav** | Audio samples for sampler playback (16, 24 and 32-bit integer, 32-bit float) |
| **SF2** | Sound font timbres |

Stereo files are mixed down to mono. A sample is played at the correct speed even if its sample rate differs from the audio device.

## Loading a Sample (UI)

Each track in the step grid has a file picker. The file is read in the browser layer and sent to the Rust core:

```tsx
const load = async (t: number, file?: File) => {
  if (!file) return;
  try {
    const bytes = Array.from(new Uint8Array(await file.arrayBuffer()));
    await api.loadSample(t, bytes);
    setNames(n => n.map((x, i) => (i === t ? file.name : x)));
    setError('');
  } catch (e) {
    setError(`Could not load ${file.name}: ${String(e)}`);
  }
};
```

```tsx
<label className="sample" title="Choose a .wav file for this track">
  <input type="file" accept=".wav,audio/wav" onChange={e => load(t, e.target.files?.[0])} />
  {names[t]}
</label>
```

## Decoding a Sample (Rust)

The core decodes the WAV file to mono `f32` and passes it to the audio thread:

```rust
#[tauri::command]
fn load_sample(s: State<App>, track: usize, bytes: Vec<u8>) -> Result<(), String> {
    if track >= 4 { return Err("track out of range".into()); }
    let mut r = hound::WavReader::new(std::io::Cursor::new(bytes)).map_err(|e| e.to_string())?;
    let spec = r.spec();
    let raw: Vec<f32> = match spec.sample_format {
        hound::SampleFormat::Float => r.samples::<f32>().filter_map(Result::ok).collect(),
        hound::SampleFormat::Int => {
            let max = (1i64 << (spec.bits_per_sample - 1)) as f32;
            r.samples::<i32>().filter_map(Result::ok).map(|v| v as f32 / max).collect()
        }
    };
    let ch = spec.channels.max(1) as usize;
    let mono: Vec<f32> = raw.chunks(ch).map(|f| f.iter().sum::<f32>() / ch as f32).collect();
    s.send(Cmd::Sample(track, mono, spec.sample_rate as f32));
    Ok(())
}
```

## Where to Get Sounds

- Buy sound banks and presets on [E-Market](/e-market/).
- Keep your own banks and presets in [MyCloud](/cloud/) and sync them across your devices.

## Related Pages

- [Loopers & Step Samplers](/ts4x/loopers)
- [Audio Profile Sync (KORG/Genos)](/cloud/sincronizare)