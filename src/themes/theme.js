import { scale } from '../../utils/scale';
import {
  POPPINS_EXTRA_BOLD,
  POPPINS_SEMI_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_LIGHT,
} from '../constants/constants';

const theme = {
  palette: {
    //* Primary (Red):
    PrimaryLight: '#C5002E33',
    PrimaryMedium: '#C5002E80',
    PrimaryDark: '#C5002ECC',
    PrimaryDeep: '#C5002E',

    //* Secondary (Yellow):
    SecondaryLight: '#FFEFC3',
    SecondaryMedium: '#FFDF8B',
    SecondaryDark: '#FFD050',
    SecondaryDeep: '#FFC529',

    //* Typography (Black):
    TypographyLight: '#6E7489',
    TypographyMedium: '#4D5364',
    TypographyDark: '#2A2F3D',
    TypographyDeep: '#1A1D26',

    //* Gray:

    GrayLight: '#EBEBEB',
    GrayMedium: '#C4C7D0',
    GrayDark: '#A8ACB9',
    GrayDeep: '#9A9FAE',
    GrayBorder: '#EAEAEA',
    GrayPlaceHolder: '#9796A1',
    Graydesctxt: '#818181',
    GrayInputField: '#AEAEAE',
    cardinfoColor: '#F6F6F6',
    SlightGray: '#EEEEEE',
    //* Commons
    white: 'white',
    black: 'black',
    transparent: 'transparent',

    //* Others
    green: '#32BA7C',
    silver: '#C4C4C4',
    deepblack: '#323643',
    simpleblack: '#111719',
    simpleWhite: '#F5F5F5',
    lightGray: '#3B3B3B',
    DarkBlack: '#09051C',
    Gray: '#D8D8D8',
  },
  typography: {
    size: {
      heading: {
        h1: scale(20),
        h2: scale(18),
        h3: scale(16),
        h4: scale(14),
        h5: scale(12),
        h6: scale(10),
        h7: scale(8),
      },
      body: {
        b1: scale(14),
      },
      btn: {
        b1: scale(16),
      },
      note: {
        n1: scale(10),
      },
    },
    type: {
      light: POPPINS_LIGHT,
      reg: POPPINS_REGULAR,
      med: POPPINS_MEDIUM,
      semi: POPPINS_SEMI_BOLD,
      bold: POPPINS_EXTRA_BOLD,
    },
    common: {
      h1: {
        fontFamily: POPPINS_SEMI_BOLD,
        fontSize: scale(20),
        lineHeight: scale(45),
      },
      h1a: {
        fontFamily: POPPINS_SEMI_BOLD,
        fontSize: scale(20),
      },
      h2sb: {
        fontFamily: POPPINS_SEMI_BOLD,
        fontSize: scale(18),
        lineHeight: scale(24),
      },
      h2m: {
        fontFamily: POPPINS_MEDIUM,
        fontSize: scale(16),
        lineHeight: scale(24),
      },
      h1r: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(40),
        lineHeight: scale(60),
      },
      h2r: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(16),
        lineHeight: scale(24),
      },
      h4r: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(17),
        lineHeight: scale(25),
      },
      h3sb: {
        fontFamily: POPPINS_SEMI_BOLD,
        fontSize: scale(14),
        lineHeight: scale(21),
      },
      h3r: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(14),
        lineHeight: scale(21),
      },
      h3m: {
        fontFamily: POPPINS_MEDIUM,
        fontSize: scale(14),
        lineHeight: scale(21),
      },
      bodysm: {
        fontFamily: POPPINS_SEMI_BOLD,
        fontSize: scale(12),
        lineHeight: scale(18),
      },
      bodyr: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(12),
        lineHeight: scale(18),
      },
      note: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(10),
        lineHeight: scale(15),
      },
      Card: {
        fontFamily: POPPINS_REGULAR,
        fontSize: scale(24),
        lineHeight: scale(32),
      },
    },
  },
  spacing: {
    margin: {
      max: scale(32),
      m1: scale(16),
      m2: scale(14),
      m3: scale(12),
      m4: scale(10),
      m5: scale(8),
      m6: scale(6),
      m7: scale(4),
    },
    padding: {
      max: scale(32),
      p1: scale(16),
      p2: scale(14),
      p3: scale(12),
      p4: scale(10),
      p5: scale(8),
      p6: scale(6),
      p7: scale(4),
    },
  },
  radius: {
    r1: scale(16),
    r2: scale(12),
    r3: scale(10),
    r4: scale(8),
    r5: scale(4),
    r6: scale(22),
    rounded: 100 / 2,
  },
  commonStyling: {
    defShadow: {
      shadowColor: '#1A1D26',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.22,
      shadowRadius: 9.22,
      elevation: 12,
    },
    defFlexWithSpc: {
      flex: 1,
      padding: scale(16),
    },
    flex: {
      flex: 1,
    },
    defRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    defRowSpcBtw: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
};

export default theme;
