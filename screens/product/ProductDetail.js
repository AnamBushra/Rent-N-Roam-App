import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons

const ProductDetail = ({ product }) => {
  const [user, setUser] = useState(null);

  const handleContact = (addedBy) => {
    const url = "http://192.168.224.202:8000/get-user/" + addedBy;
    axios
      .get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contacts}>
        {product.addedBy && (
          <View style={styles.contactButton}>
            <Button
              title="SHOW CONTACT DETAILS"
              onPress={() => handleContact(product.addedBy)}
              color="blue"
            />
          </View>
        )}
        {user && (
          <View style={styles.userDetails}>
            {user.username && <Text>{user.username}</Text>}
            {user.mobile && <Text>{user.mobile}</Text>}
            {user.email && <Text>{user.email}</Text>}
          </View>
        )}
      </View>

      <View style={styles.tags}>
        <View style={styles.tagItem}>
          <MaterialIcons
            name="local-offer"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.tagText}>Rent products at your own liberty</Text>
        </View>
        <View style={styles.tagItem}>
          <MaterialIcons
            name="local-offer"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.tagText}>Efficient. Effective. Effortless.</Text>
        </View>
        <View style={styles.tagItem}>
          <MaterialIcons
            name="local-offer"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.tagText}>
            Experience More, Own Less – Renting, the New Norm.
          </Text>
        </View>
        <View style={styles.tagItem}>
          <MaterialIcons
            name="local-offer"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.tagText}>
            Unlock Possibilities – Rent Your Way to Adventure!
          </Text>
        </View>
        <View style={styles.tagItem}>
          <MaterialIcons
            name="local-offer"
            size={20}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.tagText}>
            Checked for stability; free replacement for any defects.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  contacts: {
    marginLeft: 0,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    marginTop: 15,
    marginLeft: 0,
  },
  tags: {
    marginTop: 20,
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
    color: "green",
  },
});

export default ProductDetail;
