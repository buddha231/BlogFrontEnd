
function Message(props) {
    const alertClass = "alert alert-" + props.type;
    return (
        <div className="container mt-3">
            <div className={alertClass} role="alert">
                {props.message}
            </div>
        </div>
    );
}

export default Message;
