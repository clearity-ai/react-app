/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const neutral900 = '#000000'; // black
const neutral800 = '#262626';
const neutral700 = '#434343';
const neutral600 = '#555555'; // darkgray
const neutral500 = '#7B7B7B';
const neutral400 = '#9D9D9D';
const neutral300 = '#C4C4C4'; // lightgray
const neutral200 = '#D9D9D9';
const neutral100 = '#E9E9E9';
const neutral50 = '#F5F5F5';
const neutral25 = '#FAFAFA'; // offwhite
const neutral0 = '#FFFFFF'; // white

const primary50 = '#EBE4FB';
const primary100 = '#CABDF5';
const primary200 = '#A591EF'; // main color
const primary300 = '#7E65E4';
const primary400 = '#5F46D7';
const primary500 = '#3927CA';
const primary600 = '#2823C5';

const primaryGradient = '#5D5491'
const primaryDarkComplement = '#8357C6';

const secondary50 = '#e4fbf5';
const secondary100 = '#bdf4e5';
const secondary200 = '#91EFD4'; // main color
const secondary300 = '#68e6c3';
const secondary400 = '#51dcb4';
const secondary500 = '#4ad2a8';
const secondary600 = '#44c399';
const secondary700 = '#44c399';
const secondary800 = '#379f7a';
const secondary900 = '#2f805d';

const error = '#E9648A';
const success = '#81E052';
const warning = '#EDC25E';

export const Colors = {
  light: {
    background: neutral25,
    text: neutral800,
    textFaded: neutral600,
    textPlaceholder: neutral400,
    textPlaceholderBackground: neutral100,
    tint: primary200,
    tintPrimaryLighter: primary50,
    tintPrimaryDarker: primary300,
    tintGradient: primaryGradient,
    tintSecondary: secondary200,
    tintSecondaryDarker: secondary700,
    tintNeutral: neutral800,
    tintNeutralLighter: neutral400,
    error: error,
    tabIconDefault: neutral400,
    tabIconSelected: primary200,
    tableColor2: neutral50,
  },
  dark: {
  },
};
