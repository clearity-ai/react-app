import React, { useState } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Themed components
import { ThemedView } from '@/components/Themed/ThemedView';
import { ThemedText } from '@/components/Themed/ThemedText';
import { ThemedTextInput } from '@/components/Themed/ThemedTextInput';
import { ThemedButton } from '@/components/Themed/ThemedButton';

// Custom components
import { HelloWave } from '@/components/HelloWave';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function SignInScreen() {
    const textFadedColor = useThemeColor({}, 'textFaded');
    const tintGradient = useThemeColor({}, 'tintGradient');

    const navigation = useNavigation();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                        <ThemedText type="title">Welcome Back!</ThemedText>
                        <HelloWave />
                    </ThemedView>

                    <ThemedView style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/images/icon.png')}
                            style={styles.logo}
                        />
                    </ThemedView>

                    <ThemedView style={styles.textContainer}>
                        <ThemedText type="title" style={{ paddingBottom: wp('1.5%'), color: tintGradient }} >Clearity.</ThemedText>
                        <ThemedText type="large" style={{ textAlign: 'center', color: textFadedColor }} >Find the skincare routine that works best for you!</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText type="label" style={styles.label}>Email</ThemedText>
                        <ThemedTextInput
                            placeholder="Enter email..."
                            value={email}
                            onChangeText={setEmail}
                        />
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText type="label" style={styles.label}>Password</ThemedText>
                        <ThemedTextInput
                            placeholder="Enter password..."
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </ThemedView>

                    <ThemedView style={styles.forgotPassword}>
                        <ThemedText type="link_small">Forgot password?</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.signInButton}>
                        <ThemedButton
                            title="Sign In"
                            onPress={handleSignIn}
                            type="primary"
                        />
                    </ThemedView>

                    <ThemedView style={styles.signUp}>
                        <ThemedText type="default">Don't have an account yet?</ThemedText>
                        <ThemedText type="link" onPress={() => navigation.navigate('signup')}> Sign Up</ThemedText>
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
        margin: wp('5%'),
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