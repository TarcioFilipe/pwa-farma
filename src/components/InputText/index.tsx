import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Pressable } from 'react-native';
import Feather from "@expo/vector-icons/Feather";

interface InputTextProps extends TextInputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    icon?: any;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputText: React.FC<InputTextProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
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
                    inputMode={inputMode}
                    autoCapitalize={autoCapitalize}
                    style={[styles.input, {paddingLeft: icon ? 36 : 12}]}
                    {...props}
                />

                {icon && (
                    <View style={{position: 'absolute', left: 8, top: 12}}>
                        <Feather name={icon} size={20} color={'#121212'}/>
                    </View>
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
        justifyContent: 'center',
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

export default InputText;