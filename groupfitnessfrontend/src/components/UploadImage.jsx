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
        setCroppedAreaPixels(croppedAreaPixels);
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
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;

            // Calculate aspect ratio of original image
            const aspectRatio = naturalWidth / naturalHeight;

            // Calculate crop area based on the original image size and desired square size
            let cropAreaWidth = naturalWidth;
            let cropAreaHeight = naturalHeight;

            if (naturalWidth > naturalHeight) {
                cropAreaWidth = naturalHeight * aspectRatio;
            } else {
                cropAreaHeight = naturalWidth / aspectRatio;
            }

            // Calculate the crop area's top-left coordinates to center the image
            const cropX = (naturalWidth - cropAreaWidth) / 2;
            const cropY = (naturalHeight - cropAreaHeight) / 2;

            canvas.width = squareSize;
            canvas.height = squareSize;

            // Draw the cropped image onto the canvas
            ctx.drawImage(
                img,
                cropX, cropY, cropAreaWidth, cropAreaHeight, // Source crop area
                0, 0, squareSize, squareSize // Destination square area
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
