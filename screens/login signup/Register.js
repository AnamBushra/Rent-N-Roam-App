const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} = require("react-native");
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Error from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import logo from "../components/header/pics/logo3.png";

function RegisterPage({ props }) {
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [userType, setUserType] = useState("");
  const [secretText, setSecretText] = useState("");

  const navigation = useNavigation();
  function handelSubmit() {
    const userData = {
      email: email,
      password: password,
      phone: mobile, // Assuming phone is equivalent to mobile in your backend
      name: name,
    };

    axios
      .post("http://192.168.224.202:8000/signup", userData)
      .then(() => {
        Alert.alert("Registered Successfully!!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        Alert.alert("Registration Failed. Please try again later.");
      });
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"always"}
      style={{ backgroundColor: "#e6e6e6" }}
    >
      <View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Register Now...</Text>

          {userType == "Admin" ? (
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#420475"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Secret Text"
                style={styles.textInput}
                onChange={(e) => setSecretText(e.nativeEvent.text)}
              />
            </View>
          ) : (
            ""
          )}

          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              onChange={(e) => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Name sholud be more then 1 characters.
            </Text>
          )}
          <View style={styles.action}>
            <Fontisto
              name="email"
              color="#420475"
              size={24}
              style={{ marginLeft: 0, paddingRight: 5 }}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChange={(e) => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Enter Proper Email Address
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome
              name="mobile"
              color="#420475"
              size={35}
              style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }}
            />
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
              onChange={(e) => handleMobile(e)}
              maxLength={10}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Phone number with 6-9 and remaing 9 digit with 0-9
            </Text>
          )}
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={(e) => handlePassword(e)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: "red",
              }}
            >
              Uppercase, Lowercase, Number and 6 or more characters.
            </Text>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handelSubmit()}>
            <View>
              <Text style={styles.textSign}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.textCustom}>
          <Text>Already Registered? Login Here</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonInput}
            onPress={() => navigation.navigate("Login")}
          >
            <View>
              <Text style={styles.textSign2}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default RegisterPage;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#e6e6e6",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textSign2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#420475",
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
  },
  logo: {
    height: 260,
    width: 260,
    marginTop: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  textCustom: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 7,
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,

    paddingHorizontal: 15,

    borderWidth: 1,
    borderColor: "#420475",
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,

    color: "#05375a",
  },
  loginContainer: {
    backgroundColor: "#e6e6e6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#420475",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    marginTop: -5,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  buttonInput: {
    width: "70%",
    borderColor: "#420475",
    borderWidth: 3,
    color: "#420475",
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut: {
    width: "70%",
    backgroundColor: "#420475",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    backgroundColor: "#420475",
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bottomButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallIcon2: {
    fontSize: 40,
    // marginRight: 10,
  },
  bottomText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  radioButton_div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioButton_inner_div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton_title: {
    fontSize: 20,
    color: "#420475",
  },
  radioButton_text: {
    fontSize: 16,
    color: "black",
  },
});
