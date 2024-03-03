import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import '../css/UploadImage.scss';

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onUpload }) => {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        // setCroppedAreaPixels is used to store the cropped area for upload
        setCroppedAreaPixels(croppedAreaPixels);
        // croppedArea is used to update the crop state for display
        setCrop(croppedArea);
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!croppedAreaPixels) {
            alert('Please select a crop area.');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            // Use the desired dimensions for the cropped image
            const cropWidth = 921;
            const cropHeight = 2048;

            canvas.width = cropWidth;
            canvas.height = cropHeight;

            // Draw the cropped area of the image onto the canvas
            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                cropWidth,
                cropHeight
            );

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('file', blob);

                try {
                    await onUpload(formData);
                    setImage(null); // Clear the image after successful upload
                    setCroppedAreaPixels(null); // Clear the cropped area
                } catch (error) {
                    console.error(error);
                    alert('Error uploading file.');
                }
            }, 'image/jpeg');
        };

        img.src = image;
    };

    return (
        <div className="upload-image">
            <label htmlFor="fileInput" id="uploadButton">
                <div id="uploadIcon">
                    <span>+</span>
                </div>
                {image && (
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={921 / 2048} // Aspect ratio 921:2048 for the desired dimensions
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        showGrid={false}
                    />
                )}
            </label>
            <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
            <button onClick={handleUpload}>
                <svg className="upload-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Artboard-153</title>
                    <g id="Upload">
                        <path d="M9.707,7.707,11,6.414V16a1,1,0,0,0,2,0V6.414l1.293,1.293a1,1,0,0,0,1.414-1.414l-3-3a1,1,0,0,0-1.416,0l-3,3A1,1,0,0,0,9.707,7.707Z" style={{ fill: "#ff8e31" }} />
                        <path d="M17,19H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z" style={{ fill: "#ece4b7" }} />
                    </g>
                </svg>
            </button>
        </div>
    );
};

export default ImageUpload;
