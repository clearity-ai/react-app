import React, { useState } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

// Themed components
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/input/ThemedText';
import { ThemedTextInput } from '@/components/input/ThemedTextInput';
import { ThemedButton } from '@/components/input/ThemedButton';

// Custom components
import { HelloWave } from '@/components/HelloWave';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function SignInScreen() {
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const iconColor = useThemeColor({}, 'textPlaceholder');

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
            console.log("Sign in successful");
            navigation.reset({
                index: 0,
                routes: [{ name: '(tabs)' }],
            });
        } catch (error) {
            console.log("Error in handleSignIn", error);
            Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText fontSize={wp('8%')} fontWeight="semibold">Welcome Back!</ThemedText>
                        <HelloWave />
                    </ThemedView>

                    <ThemedView style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/images/icon.png')}
                            style={styles.logo}
                        />
                    </ThemedView>

                    <ThemedView style={styles.textContainer}>
                        <ThemedText fontSize={wp('8%')} fontWeight="semibold" colorName='tintGradient' style={{ paddingBottom: wp('2%') }} >Clearity.</ThemedText>
                        <ThemedText fontSize={wp('4.5%')} fontWeight='semibold' colorName='textFaded' style={{ textAlign: 'center' }} >Find the skincare routine that works best for you!</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText fontSize={wp('4.5%')} fontWeight='semibold' style={styles.label}>Email</ThemedText>
                        <ThemedTextInput
                            placeholder="Enter email..."
                            value={email}
                            onChangeText={setEmail}
                        />
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText fontSize={wp('4.5%')} fontWeight='semibold' style={styles.label}>Password</ThemedText>
                        <ThemedTextInput
                            placeholder="Enter password..."
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={wp('6%')}
                            style={{ position: 'absolute', right: wp('5%'), top: wp('9.5%'), color: iconColor }}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    </ThemedView>

                    <ThemedView style={styles.forgotPassword}>
                        <ThemedText fontSize={wp('3.5%')} colorName='tint'>Forgot password?</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.signInButton}>
                        <ThemedButton
                            title="Sign In"
                            onPress={handleSignIn}
                        />
                    </ThemedView>

                    <ThemedView style={styles.signUp}>
                        <ThemedText>Don't have an account yet?</ThemedText>
                        <ThemedText fontSize={wp('4%')} colorName='tint' onPress={() => navigation.navigate('signup')}> Sign Up</ThemedText>
                    </ThemedView>
                </ThemedView>
            </>
        </KeyboardAwareScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    mainContainer: {
        flex: 1,
        padding: wp('7%'),
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: wp('10%'),
        paddingBottom: wp('7%'),
        gap: 8,
    },
    logoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: wp('5%'),
        marginBottom: wp('1%'),
        position: 'relative',
    },
    logo: {
        width: wp('30%'),
        height: wp('30%'),
        borderRadius: wp('15%'),
    },
    textContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        paddingBottom: wp('12%'),
        paddingTop: wp('1%'),
        position: 'relative',
    },
    inputContainer: {
        marginBottom: wp('9%'),
    },
    label: {
        marginBottom: wp('2.5%'),
    },
    forgotPassword: {
        marginTop: -wp('5%'),
        alignItems: 'flex-end',
    },
    signInButton: {
        marginTop: wp('20%'),
    },
    signUp: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: wp('4%'),
        flexDirection: 'row',
    },
});