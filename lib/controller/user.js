export const checkUser = async (publicKey) => {
  const response = await fetch("../api/user");

  if (response.status === 200) {
    const users = await response.json();

    if (users.length > 0) {
      const user = users.find(
        (user) => user.publicKey === publicKey.toString()
      );
      if (user != null) {
        return true;
      }
    }
  }
  return false;
};

export const addUser = async (publicKey) => {
  const checker = await checkUser(publicKey.toString());

  if (checker === false) {
    const user = {
      publicKey: publicKey.toString(),
    };

    await fetch("../api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log("user added");
  } else {
    console.log("user exist already");
  }
};

export const getUserCount = async () => {
  const users = await fetch("../api/user");

  return users.length;
};
