<TouchableOpacity
  style={styles.searchButton}
  onPress={() => {
    Alert.alert(
      "Login required",
      "Please login or create an account to search for rides.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Login",
          onPress: () => router.push("/login"),
        },
        {
          text: "Sign Up",
          onPress: () => router.push("/signup"),
        },
      ]
    );
  }}
>
  <Text style={styles.searchText}>Search rides</Text>
</TouchableOpacity>