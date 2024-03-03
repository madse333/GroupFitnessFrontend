import "../css/Image.scss"

// eslint-disable-next-line react/prop-types
const ImageWithCross = ({ key, src, alt, onDelete }) => {
    return (
        <div className="col-12 col-sm-12">
            <div className="image-with-cross">
                <img className="image" key={key} src={src} alt={alt} />
                <button className="delete-button" onClick={onDelete}>
                    {/* SVG Cross Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.354 3.354a.5.5 0 0 1 .708 0L8 7.293l4.354-4.353a.5.5 0 1 1 .708.708L8.707 8l4.353 4.354a.5.5 0 1 1-.708.708L8 8.707l-4.354 4.353a.5.5 0 0 1-.708-.708L7.293 8 2.94 3.646a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ImageWithCross;