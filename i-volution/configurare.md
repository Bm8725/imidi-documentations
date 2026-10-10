# Configuration & Menu Navigation

**i-VOLUTION** uses a 1.8" OLED display and a single multifunction digital encoder, so you can adjust settings directly on the instrument. There are no hidden menus and no manual is needed to get started.

## OLED Display

The display shows the following in real time:

- **Bank** (e.g. `A · 03`)
- **Bellows expression**
- **Volume**
- **Transpose**

## Controls

All navigation is done with one encoder:

1. **Turn the encoder** to move through the options shown on the OLED.
2. **Press the encoder** to select or confirm the highlighted parameter.

### Menu Simulator

The [i-VOLUTION user manual](https://www.imidi.co.uk/products/user_manual) includes an interactive simulator. Turn the encoder in the simulator to see how the menu looks on the OLED screen and what each setting does.

## Configurable Parameters

| Parameter | Behavior |
|---|---|
| **Bank Select** | A, B, C, D (default) + L (BASS), up to 127 (saves 11×127) |
| **Performance Change** | Up to 11, via registers |
| **Transpose** | General MIDI via SysEx |
| **Volume** | Sent as CC07 |
| **Bellows Expression** | Sent as CC11 |

## Saving Settings (EEPROM)

All service settings are stored in the **internal EEPROM** of the microcontroller . No external memory is used. Values are kept when the power is off and are loaded again at start-up, so the instrument comes back exactly as you left it.

### What is saved

| Saved | Not saved |
|---|---|
| Volume | Active bank (A, B, C, D, L) |
| Bellows settings (push, pull, gain) | Transpose |
| MIDI channels and program channels | Currently selected register |
| Velocity (treble and bass) | |
| BASS enable, register enable, LH offset | |
| Register assignments (1–15) | |
| Key note maps (treble and bass) | |

### EEPROM Map

| Address | Parameter | PC id | Range | Written when |
|---|---|---|---|---|
| `0x000`–`0x00E` | Register assignments 1–15 | reg 0–14 | 0–16 | Encoder press in menu item 13, or PC utility |
| `0x020` | Volume (CC07) | – | 0–127 | Every volume change |
| `0x120` | Bellows low push | 3 | 0–64 | Every change in service menu, or PC utility |
| `0x121` | Transpose type | – | – | Read at start-up only |
| `0x130` | Bellows low pull | 1 | 0–64 | Every change in service menu, or PC utility |
| `0x140` | Bellows gain | 2 | 1–4 | Every change in service menu, or PC utility |
| `0x150` | Treble MIDI channel | 4 | 1–16 | Every change in service menu, or PC utility |
| `0x151` | Bass MIDI channel | 5 | 1–16 | Every change in service menu, or PC utility |
| `0x152` | Treble program channel | 6 | 1–16 | Every change in service menu, or PC utility |
| `0x153` | Bass program channel | 7 | 1–16 | Every change in service menu, or PC utility |
| `0x154` | Accord (chord) MIDI channel | 12 | 1–16 | Every change in service menu, or PC utility |
| `0x160` | BASS enable | 0 | 0–1 | Every change in service menu, or PC utility |
| `0x161` | Register enable (PG_REG) | 10 | 0–1 | Every change in service menu, or PC utility |
| `0x170` | Velocity treble | 8 | 0–127 | Every change in service menu, or PC utility |
| `0x171` | Velocity bass | 9 | 0–127 | Every change in service menu, or PC utility |
| `0x172` | Left-hand offset (BL) | 11 | 0–127 | Every change in service menu, or PC utility |
| `0x180` | Treble key count | – | 1–45 | PC utility |
| `0x200`–`0x22C` | Treble key notes (45 keys) | – | 0–127 | Key configuration, or PC utility |
| `0x250`–`0x267` | Bass key notes (24 keys) | – | 0–127 | Key configuration, or PC utility |

### When Values Are Written

- **Service menu:** each setting is written to EEPROM as soon as you change it with the encoder. There is no separate save step.
- **Register assignments (menu item 13):** the value is written when you press the encoder. The display shows `saved`.
- **Volume:** the new value is written every time the volume changes.
- **PC utility:** each accepted command is written immediately and acknowledged back to the PC.

### Loading at Start-Up

At power-up the firmware reads the stored values into RAM before playing:

1. Register assignments (`0x000`–`0x00F`)
2. Volume (`0x020`)
3. Bellows, channel, velocity and offset settings (`0x120`–`0x172`)
4. Key note maps for the treble and bass sections

If the treble key count is blank or zero, the default of **45** keys is used.

To enter the service menu, hold the encoder button while powering on.

### SysEx Protocol Reference

The i-VOLUTION Utility talks to the controller with SysEx messages in the form `F0 7D 01 <cmd> <data…> F7`. The commands that write to EEPROM are:

| Command | Action | Data |
|---|---|---|
| `0x05` | Set parameter | id, value |
| `0x06` | Set register | register 0–14, value 0–16 |
| `0x03` | Set treble key note | key 0–44, note 0–127 |
| `0x04` | Set bass key note | key 0–23, note 0–127 |
| `0x07` | Set treble key count | count 1–45 |

Read-only commands: `0x02` handshake, `0x10` read configuration, `0x12` read key maps.

Every write command is answered with `F0 7D 01 7F <cmd> <status> F7`:

| Status | Meaning |
|---|---|
| `0` | OK, value written |
| `1` | Value out of range |
| `2` | Invalid id or command |
| `3` | Wrong data length |

### Code Example

Simplified excerpt from firmware V 5.13.1 ( C, T-K22). Values are range-checked, cached in RAM, then written to EEPROM:

```c
#define EE_BASS_EN        0x160
#define EE_BELL_LOW_PULL  0x130
#define EE_BELL_GAIN      0x140
#define EE_BELL_LOW_PUSH  0x120
/* ... remaining addresses as in the EEPROM map ... */

uint8_t iv_settings[13];   /* RAM cache of all settings */

uint8_t setParam(uint8_t id, uint8_t value)
{
    uint16_t addr = 0;

    if (id >= 13) return 2;                     /* invalid id */

    /* range check per parameter */
    if (id == 0 || id == 10)      { if (value > 1) return 1; }
    else if (id == 1 || id == 3)  { if (value > 64) return 1; }
    else if (id == 2)             { if (value < 1 || value > 4) return 1; }
    else if (id == 4 || id == 5 || id == 6 || id == 7 || id == 12)
                                  { if (value < 1 || value > 16) return 1; }
    else if (id == 8 || id == 9 || id == 11)
                                  { if (value > 127) return 1; }

    iv_settings[id] = value;                    /* update RAM */

    switch (id) {
        case 0:  addr = EE_BASS_EN;       break;
        case 1:  addr = EE_BELL_LOW_PULL; break;
        case 2:  addr = EE_BELL_GAIN;     break;
        case 3:  addr = EE_BELL_LOW_PUSH; break;
        /* ... cases 4-12 ... */
    }

    write_eeprom(addr, value);                  /* persist */
    return 0;
}

void load_iv_config_from_eeprom(void)
{
    uint8_t i;

    iv_settings[0] = read_eeprom(EE_BASS_EN);
    iv_settings[1] = read_eeprom(EE_BELL_LOW_PULL);
    /* ... remaining settings ... */

    for (i = 0; i < 15; i++)
        iv_registers[i] = read_eeprom(EE_REGISTERS_START + i);

    treble_count = read_eeprom(EE_TREBLE_COUNT);
    if (treble_count == 0xFF || treble_count == 0)
        treble_count = 45;                      /* default on blank EEPROM */
}
```

## i-VOLUTION Utility (Online Configuration)

The **i-VOLUTION Utility** lets you configure the controller from a computer instead of the OLED menu. It edits the same settings as the service menu, plus the register assignments and key note maps, and each change is written to the controller's EEPROM immediately.

Open it from the [i-VOLUTION user manual](https://www.imidi.co.uk/products/user_manual).

### Requirements

- An i-VOLUTION controller with firmware **V 5.13.1**, the version that adds PC utility support.
- A MIDI connection between the controller and the computer.

### Connecting

1. Connect the controller to the computer over MIDI and power it on.
2. Open the utility and select the MIDI port of the controller.
3. The utility sends a handshake. The controller answers and shows **`PC>`** on the OLED, which confirms the link.
4. The utility reads the current configuration (13 settings and 15 registers) and the key note maps from the controller.

### What You Can Configure

The utility groups the settings in the same order as the 16 items of the on-device service menu:

| Menu item | OLED label | Setting | Range |
|---|---|---|---|
| 1 | `BASS_EN` | BASS section enable | 0–1 |
| 2 | `Bell_low_pull` | Bellows dead zone, pull | 0–64 |
| 3 | `Bell_GAIN` | Bellows expression gain | 1–4 |
| 4 | `Bell_low_push` | Bellows dead zone, push | 0–64 |
| 5 | `TREB_CH` | Treble MIDI channel | 1–16 |
| 6 | `BASS_CH` | Bass MIDI channel | 1–16 |
| 7 | `TREB_PG` | Treble program channel | 1–16 |
| 8 | `BASS_PG` | Bass program channel | 1–16 |
| 9 | `Vel_treb` | Treble velocity | 0–127 |
| 10 | `Vel_bass` | Bass velocity | 0–127 |
| 11 | `Config_key` | Treble key note map (up to 45 keys) | notes 0–127 |
| 12 | `bass_key` | Bass key note map (24 keys) | notes 0–127 |
| 13 | `REG_ASSG_C` | Register assignments 1–15 | 0–16 |
| 14 | `PG_REG` | Register enable | 0–1 |
| 15 | `offset_LH_BL` | Left-hand offset | 0–127 |
| 16 | `ACHORD_CH` | Chord (accord) MIDI channel | 1–16 |

Volume, bank and transpose are performance controls and stay on the instrument.

### How Changes Are Applied

- Each edit is sent as a single command and written to EEPROM straight away. There is no separate save step.
- The controller answers every write with a status code (see the SysEx Protocol Reference above). Status `0` means the value was written.
- A value outside its range is rejected with status `1` and the stored value is not changed.
- Settings already stored on the controller can be read back at any time, so you can check them after editing.

### Utility and On-Device Menu

The utility and the service menu edit the same EEPROM values, so you can use either one. Changes made in the utility show up in the service menu, and the other way around, the next time the configuration is read.

## Notes

- The controller works on **any MIDI channel**, with velocity-sensitive mapping on both SOLO and BASS sections.
- **No firmware update is required.** The system works out of the box.
- On the **R + L** version, the BASS section has its own independent bank select (+L, up to 127).
- Compatible with the **KORG PA series** and **TS4X**.