import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
    text1?: string;
    text2?: string;
}

const toastConfig = {
    error: ({ text1, text2 }: CustomToastProps) => (
        <View style={[styles.toastContainer, styles.errorContainer]}>
            {text1 && <Text style={[styles.text, styles.errorText]}>{text1}</Text>}
            {text2 && <Text style={styles.textSecondary}>{text2}</Text>}
        </View>
    ),
    success: ({ text1, text2 }: CustomToastProps) => (
        <View style={[styles.toastContainer, styles.successContainer]}>
            {text1 && <Text style={[styles.text, styles.successText]}>{text1}</Text>}
            {text2 && <Text style={styles.textSecondary}>{text2}</Text>}
        </View>
    ),
    delete: ({ text1, text2 }: CustomToastProps) => (
        <View style={[styles.toastContainer, styles.errorContainer]}>
            {text1 && <Text style={[styles.text, styles.errorText]}>{text1}</Text>}
            {text2 && <Text style={styles.textSecondary}>{text2}</Text>}
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        height: 52,
        padding: 12,
        borderRadius: 8,
    },
    errorContainer: {
        borderColor: '#D92D20',
        backgroundColor: '#FEF3F2',
        borderWidth: 1,
    },
    successContainer: {
        borderColor: '#ABEFC6',
        backgroundColor: '#ECFDF3',
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: '900',
    },
    errorText: {
        fontSize: 16,
        color: '#D92D20',
    },
    successText: {
        color: '#067647',
    },
    textSecondary: {
        color: '#D92D20',
    },
});

export default toastConfig;
