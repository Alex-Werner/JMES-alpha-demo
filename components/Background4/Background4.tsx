import React, { memo } from "react";
import {
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
} from "react-native";

import { Navigation } from "../../types";

type Props = {
    children: React.ReactNode;
};

const Background4 = ({ children }: Props) => {
    return (
        <ImageBackground
            source={require("../../assets/images/background4.png")}
            resizeMode="cover"

            style={styles.background}
        >
            <KeyboardAvoidingView
                style={[styles.container]}
                keyboardVerticalOffset={200}
                behavior="padding"
            >
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
    },
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        // maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "flex-start",
    },
});

export default memo(Background4);
