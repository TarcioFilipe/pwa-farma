import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Pressable } from 'react-native';
import Feather from "@expo/vector-icons/Feather";

interface InputTextProps extends TextInputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    isShow: () => void;
    icon?: any;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputPassword: React.FC<InputTextProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    isShow,
    icon,
    inputMode,
    autoCapitalize = 'none',
    style,
    ...props
}) => {

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    inputMode={inputMode}
                    autoCapitalize={autoCapitalize}
                    style={[styles.input, { paddingLeft: icon ? 36 : 12 }]}
                    {...props}
                />

                {icon && (
                    <View style={{ position: 'absolute', left: 8, top: 12 }}>
                        <Feather name={icon} size={20} color={'#121212'} />
                    </View>
                )}

                <Pressable style={{ position: 'absolute', right: 8, top: 12 }} onPress={() => isShow()}>
                    <Feather name={!secureTextEntry ? 'eye' : 'eye-off'} size={20} color={'#121212'} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
        justifyContent: 'center'
    },
    label: {
        marginBottom: 4,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
});

export default InputPassword;