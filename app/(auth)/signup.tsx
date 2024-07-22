import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Alert, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import dayjs from 'dayjs';

// Themed components
import { ThemedView } from '@/components/Themed/ThemedView';
import { ThemedText } from '@/components/Themed/ThemedText';
import { ThemedTextInput } from '@/components/Themed/ThemedTextInput';
import { ThemedButton } from '@/components/Themed/ThemedButton';
import { ThemedDropdownInput } from '@/components/Themed/ThemedDropdownInput';
import { ThemedDatePicker } from '@/components/Themed/ThemedDatePicker';

// Hooks
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SignUpScreen() {
    const tint = useThemeColor({}, 'tint');
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState(dayjs());
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
                        <Pressable
                            onPress={() => console.log('Change profile image')}
                        >
                            <Image
                                source={require('@/assets/images/unicorn.png')}
                                style={styles.profileImage}
                            />
                            <MaterialCommunityIcons name="pencil" size={wp('6%')} color={tint} style={styles.editIcon} />
                        </Pressable>
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
                        <ThemedText type="label" style={styles.labelBirthdate} >Birthday</ThemedText>
                        <ThemedDatePicker
                            date={birthdate}
                            setDate={setBirthdate}
                        />
                    </ThemedView>

                    <ThemedView style={styles.inputContainer}>
                        <ThemedText type="label" style={styles.label}>Sex</ThemedText>
                        <ThemedDropdownInput
                            label='Select Sex...'
                            items={[{ label: 'female', value: 'female' }, { label: 'male', value: 'male' }, { label: 'other', value: 'other' }]}
                            value={sex}
                            setValue={setSex}
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
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    mainContainer: {
        flex: 1,
        padding: wp('7%'),
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
        top: -wp('2%'),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: wp('8%'),
        padding: wp('2%'),
        right: wp('0.5%'),
    },
    inputContainer: {
        marginBottom: wp('6%'),
    },
    label: {
        marginBottom: wp('2.5%'),
    },
    labelBirthdate: {
        marginBottom: wp('3.5%'),
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