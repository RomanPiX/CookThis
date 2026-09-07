/* Colour palettes. Each one defines the full token set for light and dark, so switching is a
   complete swap rather than a tint. The accent hue is always distinct from good / warn / bad,
   so a status colour never reads as branding (or the other way round). */
CT.PALETTES = {
  mediterraneo: {
    name: 'Mediterraneo', hint: 'Deep sea blue, saffron, cool paper',
    light: {
      bg: '#F1F5F7', card: '#FFFFFF', soft: '#E4EDF2', ink: '#12232F', muted: '#55697A', line: '#D2DFE7',
      accent: '#16557E', 'accent-ink': '#FFFFFF', 'accent-soft': '#DAE9F3', 'accent-strong': '#0E4266',
      accent2: '#DE9433', 'accent2-soft': '#FAEBD5', 'accent2-ink': '#6A4207',
      bad: '#C0453A', 'bad-soft': '#F8DEDB', warn: '#B0761A', 'warn-soft': '#F8EAD2', good: '#2C7A55', 'good-soft': '#D9EFE4', info: '#0F7B84', 'info-soft': '#D6EEF0',
      shadow: '0 1px 2px rgba(16, 35, 47, .06), 0 10px 28px rgba(16, 35, 47, .09)',
    },
    dark: {
      bg: '#0D161E', card: '#15212B', soft: '#1D2B36', ink: '#E6EFF4', muted: '#92A6B4', line: '#293A47',
      accent: '#6EB2DB', 'accent-ink': '#07141E', 'accent-soft': '#1A3345', 'accent-strong': '#92C8EA',
      accent2: '#EDB264', 'accent2-soft': '#382C19', 'accent2-ink': '#F6DBAC',
      bad: '#E88A7A', 'bad-soft': '#3B2521', warn: '#E0B357', 'warn-soft': '#3A3120', good: '#63C094', 'good-soft': '#163629', info: '#52BEC7', 'info-soft': '#103138',
      shadow: '0 1px 2px rgba(0, 0, 0, .35), 0 10px 28px rgba(0, 0, 0, .35)',
    },
  },
  pomodoro: {
    name: 'Pomodoro', hint: 'Tomato red, basil green, warm paper',
    light: {
      bg: '#F9F5F2', card: '#FFFFFF', soft: '#F1E7E1', ink: '#241A16', muted: '#6D5B53', line: '#E4D8D0',
      accent: '#BF4429', 'accent-ink': '#FFFFFF', 'accent-soft': '#FAE1D8', 'accent-strong': '#9E361F',
      accent2: '#4B7A52', 'accent2-soft': '#E1EDE1', 'accent2-ink': '#2B4A30',
      bad: '#9A2342', 'bad-soft': '#F8DDE4', warn: '#A9761A', 'warn-soft': '#F7EBD3', good: '#3C6B45', 'good-soft': '#DFEBDD', info: '#2C6B8E', 'info-soft': '#DEEAF2',
      shadow: '0 1px 2px rgba(36, 26, 22, .06), 0 10px 28px rgba(36, 26, 22, .09)',
    },
    dark: {
      bg: '#17110F', card: '#211915', soft: '#2C221D', ink: '#F0E6E1', muted: '#B09F97', line: '#3B2E28',
      accent: '#E8734F', 'accent-ink': '#1E0E08', 'accent-soft': '#3D2018', 'accent-strong': '#F1917A',
      accent2: '#82BA8B', 'accent2-soft': '#21331F', 'accent2-ink': '#C8E5CC',
      bad: '#EE7E9C', 'bad-soft': '#3A2028', warn: '#E0B357', 'warn-soft': '#3A3120', good: '#82BA8B', 'good-soft': '#21331F', info: '#7DB2E0', 'info-soft': '#1F2E3B',
      shadow: '0 1px 2px rgba(0, 0, 0, .35), 0 10px 28px rgba(0, 0, 0, .35)',
    },
  },
  espresso: {
    name: 'Espresso', hint: 'Coffee brown, apricot, oat paper',
    light: {
      bg: '#F7F3EE', card: '#FFFFFF', soft: '#EEE5DB', ink: '#2A2018', muted: '#726155', line: '#DFD3C6',
      accent: '#6B4326', 'accent-ink': '#FFF8F1', 'accent-soft': '#EBDFD2', 'accent-strong': '#52321B',
      accent2: '#D4802F', 'accent2-soft': '#FAEBD8', 'accent2-ink': '#6B3C08',
      bad: '#B03A2E', 'bad-soft': '#F7DFDA', warn: '#AC7415', 'warn-soft': '#F7EAD2', good: '#4A7A3F', 'good-soft': '#E2EFDC', info: '#3A6B86', 'info-soft': '#DEEAF1',
      shadow: '0 1px 2px rgba(42, 32, 24, .06), 0 10px 28px rgba(42, 32, 24, .09)',
    },
    dark: {
      bg: '#14100C', card: '#1E1812', soft: '#292119', ink: '#EFE6DD', muted: '#AB9B8C', line: '#372C22',
      accent: '#C89A6F', 'accent-ink': '#1A120B', 'accent-soft': '#33261A', 'accent-strong': '#DDB893',
      accent2: '#E8A55F', 'accent2-soft': '#392916', 'accent2-ink': '#F6D8A9',
      bad: '#E5897C', 'bad-soft': '#3A2320', warn: '#E0B357', 'warn-soft': '#3A3120', good: '#88BE7B', 'good-soft': '#24351E', info: '#85B4CE', 'info-soft': '#1E2E38',
      shadow: '0 1px 2px rgba(0, 0, 0, .35), 0 10px 28px rgba(0, 0, 0, .35)',
    },
  },
  melanzana: {
    name: 'Melanzana', hint: 'Aubergine, pistachio, pale lilac',
    light: {
      bg: '#F5F2F8', card: '#FFFFFF', soft: '#EBE5F2', ink: '#211A2B', muted: '#625A70', line: '#DBD3E4',
      accent: '#5B3E7E', 'accent-ink': '#FFFFFF', 'accent-soft': '#E7DDF4', 'accent-strong': '#472F63',
      accent2: '#7C9F55', 'accent2-soft': '#E8F0DC', 'accent2-ink': '#3E5227',
      bad: '#B93E58', 'bad-soft': '#F8DEE4', warn: '#A5761B', 'warn-soft': '#F6EAD4', good: '#3B7D5A', 'good-soft': '#DDF0E6', info: '#3C6B9E', 'info-soft': '#DEE9F5',
      shadow: '0 1px 2px rgba(33, 26, 43, .06), 0 10px 28px rgba(33, 26, 43, .09)',
    },
    dark: {
      bg: '#14101A', card: '#1D1826', soft: '#262031', ink: '#EBE5F2', muted: '#A69CB4', line: '#362C45',
      accent: '#B091DC', 'accent-ink': '#140E1E', 'accent-soft': '#2D2340', 'accent-strong': '#C6ADEB',
      accent2: '#A6C77C', 'accent2-soft': '#27331B', 'accent2-ink': '#D2E7B3',
      bad: '#E88AA0', 'bad-soft': '#38202A', warn: '#DFB25A', 'warn-soft': '#382F1E', good: '#6BC496', 'good-soft': '#1D392C', info: '#86B2E4', 'info-soft': '#1E2C3D',
      shadow: '0 1px 2px rgba(0, 0, 0, .35), 0 10px 28px rgba(0, 0, 0, .35)',
    },
  },
  basilico: {
    name: 'Basilico', hint: 'The original herb green and lemon',
    light: {
      bg: '#F4F6F0', card: '#FFFFFF', soft: '#ECF0E5', ink: '#182019', muted: '#5F6E62', line: '#D9E0D1',
      accent: '#2F6B3B', 'accent-ink': '#FFFFFF', 'accent-soft': '#DDEBDD', 'accent-strong': '#245430',
      accent2: '#E9C46A', 'accent2-soft': '#FBF1D2', 'accent2-ink': '#5C4400',
      bad: '#B9402F', 'bad-soft': '#F6DED9', warn: '#B87A12', 'warn-soft': '#F8EBCF', good: '#2F6B3B', 'good-soft': '#DDEBDD', info: '#2E6B9E', 'info-soft': '#DCE9F4',
      shadow: '0 1px 2px rgba(24, 32, 25, .05), 0 10px 28px rgba(24, 32, 25, .07)',
    },
    dark: {
      bg: '#121614', card: '#1B221D', soft: '#222B25', ink: '#ECEFE7', muted: '#A2AEA3', line: '#2E3831',
      accent: '#6CBF7E', 'accent-ink': '#0F1A12', 'accent-soft': '#22382A', 'accent-strong': '#86D095',
      accent2: '#F0D07A', 'accent2-soft': '#3A3320', 'accent2-ink': '#F7E6B2',
      bad: '#E88A7A', 'bad-soft': '#3B2521', warn: '#E0B357', 'warn-soft': '#3A3120', good: '#6CBF7E', 'good-soft': '#22382A', info: '#7DB2E0', 'info-soft': '#1F2E3B',
      shadow: '0 1px 2px rgba(0, 0, 0, .35), 0 10px 28px rgba(0, 0, 0, .35)',
    },
  },
};
CT.DEFAULT_PALETTE = 'mediterraneo';

// The bowl-of-steam mark, drawn from the live palette rather than baked colours.
CT.brandmark = (size) => `<svg class="brandmark" viewBox="0 0 128 128" width="${size}" height="${size}" aria-hidden="true">
  <rect class="bm-bg" width="128" height="128" rx="28"/>
  <path class="bm-bowl" d="M28 68A36 36 0 0 0 100 68Z"/>
  <rect class="bm-bowl" x="22" y="63" width="84" height="9" rx="4.5"/>
  <path class="bm-steam" d="M46 52c0-7 7-7 7-14s-7-7-7-14M64 54c0-7 7-7 7-14s-7-7-7-14M82 52c0-7 7-7 7-14s-7-7-7-14"/></svg>`;
