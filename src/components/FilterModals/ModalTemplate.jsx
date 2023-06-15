import "./ModalTemplate.css";

function ModalTemplate({ contentComponent, title }) {
    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-content">
                    {contentComponent}
                </div>
                <div className="modal-footer">
                    <button>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ModalTemplate