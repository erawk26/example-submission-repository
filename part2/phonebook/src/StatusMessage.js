const StatusMessage = ({ msg, type = "error" }) => {
  if (!msg) {
    return null;
  }
  const styles = {
    status: {
      padding: "10px 20px",
      borderRadius: "4px",
      fontWeight: "bold",
      margin: "20px 5px",
    },
    error: { border: "1px solid red", color: "red" },
    success: { border: "1px solid green", color: "green" },
  };
  const statusStyle = { ...styles[type], ...styles.status };
  return (
    <div className={`status-msg ${type}`} style={statusStyle}>
      {msg}
    </div>
  );
};
export default StatusMessage;
