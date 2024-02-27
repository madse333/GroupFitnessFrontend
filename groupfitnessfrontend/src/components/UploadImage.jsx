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

        const squareSize = 300; // Desired square size
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            canvas.width = squareSize;
            canvas.height = squareSize;

            // Draw the cropped area of the image onto the canvas
            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                squareSize,
                squareSize
            );

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('file', blob);

                try {
                    await onUpload(formData);
                    setImage(null); // Clear the image after successful upload
                    setCroppedAreaPixels(null); // Clear the cropped area
                    window.location.reload();
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
                        aspect={1} // Aspect ratio 1:1 for a square crop
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        showGrid={false}
                    />
                )}
            </label>
            <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;
