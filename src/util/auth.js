export const authMiddleWare = (history) => {
  const authToken = localStorage.getItem("AuthToken");
  if (authToken === null || authToken === "AuthToken undefined") {
    history.push("/login");
  }
};
