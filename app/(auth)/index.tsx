import React, { useState } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import ParallaxScrollView from '@/components/ParallaxScrollView';

// Themed components
import { ThemedView } from '@/components/Themed/ThemedView';
import { ThemedText } from '@/components/Themed/ThemedText';
import { ThemedTextInput } from '@/components/Themed/ThemedTextInput';
import { ThemedButton } from '@/components/Themed/ThemedButton';

// Custom components
import { HelloWave } from '@/components/HelloWave';

// Hooks
import { useAuth } from '@/hooks/useAuth';


export default function SignInScreen() {
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
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.mainContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Welcome Back!</ThemedText>
                    <HelloWave />
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
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    mainContainer: {
        flex: 1,
        padding: wp('5%'),
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: wp('10%'),
        paddingBottom: wp('10%'),
        gap: 8,
    },
    inputContainer: {
        marginBottom: wp('7%'),
    },
    label: {
        marginBottom: wp('2.5%'),
    },
    forgotPassword: {
        marginTop: -wp('5%'),
        alignItems: 'flex-end',
    },
    signInButton: {
        marginTop: wp('12%'),
    },
    signUp: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: wp('6%'),
        flexDirection: 'row',
    },
});