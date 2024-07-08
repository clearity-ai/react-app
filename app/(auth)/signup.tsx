import React, { useState } from 'react';
import { StyleSheet, Image, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Themed components
import { ThemedView } from '@/components/Themed/ThemedView';
import { ThemedText } from '@/components/Themed/ThemedText';
import { ThemedTextInput } from '@/components/Themed/ThemedTextInput';
import { ThemedButton } from '@/components/Themed/ThemedButton';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState('');

    const handleSignUp = async () => {
        try {
            // Add your sign up logic here
            console.log("Sign up successful");
            navigation.reset({
                index: 0,
                routes: [{ name: '(tabs)' }],
            });
        } catch (error) {
            console.log("Error in handleSignUp", error);
            Alert.alert('Error', 'Failed to sign up. Please check your credentials.');
        }
    };

    return (
        <ThemedView style={styles.mainContainer}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <MaterialCommunityIcons name="pencil" size={24} color="black" style={styles.editIcon} />
            </View>

            <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.label}>Username</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    placeholder="Enter username..."
                    value={username}
                    onChangeText={setUsername}
                />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    placeholder="Enter email..."
                    value={email}
                    onChangeText={setEmail}
                />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    placeholder="Enter password..."
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.label}>Birthday</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    placeholder="Set birthday"
                    value={birthday}
                    onChangeText={setBirthday}
                />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText style={styles.label}>Sex</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    placeholder="Set sex"
                    value={sex}
                    onChangeText={setSex}
                />
            </ThemedView>

            <ThemedView style={styles.signUpButton}>
                <ThemedButton
                    title="Sign Up"
                    onPress={handleSignUp}
                    type="primary"
                />
            </ThemedView>

            <ThemedView style={styles.signIn}>
                <ThemedText type="default">Have an account already?</ThemedText>
                <ThemedText type="link" onPress={() => navigation.navigate('index')}> Sign In</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
    },
    profileImageContainer: {
        alignSelf: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        paddingLeft: 10,
    },
    signUpButton: {
        paddingVertical: 15,
        marginTop: 20,
    },
    signIn: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});