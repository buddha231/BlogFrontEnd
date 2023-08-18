
function Message(props) {
    alert= "arert alert-"+props.type+"mt-5";
    return( 
        <div className="container mt-3">
            <div className=alert >
                {props.message}
            </div>
        </div>
    );
}

export default Message;
