import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <>
                <ThemedView style={styles.mainContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/100' }}
                            style={styles.profileImage}
                        />
                        <MaterialCommunityIcons name="pencil" size={24} color="black" style={styles.editIcon} />
                    </View>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText type="label" style={styles.label}>Username</ThemedText>
                        <ThemedTextInput
                            placeholder="Enter username..."
                            value={username}
                            onChangeText={setUsername}
                        />
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
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText type="label" style={styles.label}>Birthday</ThemedText>
                        <ThemedTextInput
                            placeholder="Set birthday"
                            value={birthday}
                            onChangeText={setBirthday}
                        />
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText type="label" style={styles.label}>Sex</ThemedText>
                        <ThemedTextInput
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
            </>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    mainContainer: {
        flex: 1,
        padding: wp('6%'),
        paddingTop: wp('8%'),
    },
    profileImageContainer: {
        alignSelf: 'center',
        margin: wp('7%'),
        position: 'relative',
    },
    profileImage: {
        width: wp('30%'),
        height: wp('30%'),
        borderRadius: wp('15%'),
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    inputContainer: {
        marginBottom: wp('7%'),
    },
    label: {
        marginBottom: wp('2.5%'),
    },
    signUpButton: {
        marginTop: wp('10%'),
    },
    signIn: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: wp('6%'),
    },
});