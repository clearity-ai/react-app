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
const primarygradient = '#5D5491'
const primary300 = '#7E65E4';
const primary400 = '#5F46D7';
const primary500 = '#3927CA';
const primary600 = '#2823C5';

const secondary50 = '#F3F8E9';
const secondary100 = '#E1ECC8';
const secondary200 = '#CEDFA5';
const secondary300 = '#BAD381'; // main color
const secondary400 = '#ABCA65';
const secondary500 = '#9CC149';
const secondary600 = '#8DB141';
const secondary700 = '#789D37';
const secondary800 = '#64892F';
const secondary900 = '#42681E';


export const Colors = {
  light: {
    background: neutral25,
    text: neutral800,
    textFaded: neutral600,
    textPlaceholder: neutral400,
    textPlaceholderBackground: neutral100,
    tint: primary200,
    tintGradient: primarygradient,
    tintSecondary: secondary300,
    tintPrimaryDarker: primary400,
    tintSecondaryDarker: secondary700,
    tintNeutral: neutral800,
    tintNeutralLighter: neutral400,
    tabIconDefault: neutral400,
    tabIconSelected: primary200,
    primaryButtonBackground: primary200,
    primaryButtonText: neutral25,
    secondaryButtonBackground: secondary300,
    secondaryButtonText: neutral25,
  },
  dark: {
  },
};
