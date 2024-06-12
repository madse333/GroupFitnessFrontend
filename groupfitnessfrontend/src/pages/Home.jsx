import { useEffect, useState } from 'react';
import Navbar from '../components/NavigationBar';
import LoggedInNavBar from '../components/LoggedInNavigationBar';
import FileUpload from '../components/UploadImage';
import Image from '../components/Image';
import CalendarComponent from '../components/CalendarComponent';
import '../css/Home.scss';

const Home = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [imagesForSelectedDate, setImagesForSelectedDate] = useState([]); // State for images on selected date

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await fetch('https://groupfitnessprod.azurewebsites.net/user/getuser/getuser', {
                    headers: {
                        // Authorization: `Bearer ${localStorage.getItem('token')}`
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('userData', JSON.stringify(userData));

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) { 
            fetchImagesForSelectedDate();
        }
    }, [selectedDate, user]);

    const fetchImagesForSelectedDate = async () => {
        if (!selectedDate) {
            setImagesForSelectedDate([]);
            return;
        }

        const formattedDate = formatDate(selectedDate);

        try {
            const response = await fetch(`https://groupfitnessprod.azurewebsites.net/user/getuserimages/getuserimages?date=${formattedDate}`, {
                headers: {
                    //   Authorization: `Bearer ${localStorage.getItem('token')}`
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (response.status === 404) {
                setImagesForSelectedDate([]);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch images for selected date');
            }

            const imageData = await response.json();

            if (Array.isArray(imageData)) {
                setImagesForSelectedDate(imageData);
            } else {
                setImagesForSelectedDate([]);
            }

        } catch (error) {
            setError(error.message);
            setImagesForSelectedDate([]);
        }
    };

    const handleUpload = async (formData) => {
        try {
            const data = new FormData();
            data.append('file', formData.get('file'), 'image.png');

            const response = await fetch('https://groupfitnessprod.azurewebsites.net/user/uploadimage/uploadimage', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
                body: data
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            alert('Image uploaded successfully!');
            fetchImagesForSelectedDate();

        } catch (error) {
            console.error(error);
            alert('Error uploading image.');
        }
    };

    const handleDelete = async (imageName) => {
        try {
            const response = await fetch(`https://groupfitnessprod.azurewebsites.net/user/removeimage/removeimage?imageName=${imageName}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            alert('Image deleted successfully!');
            fetchImagesForSelectedDate();

        } catch (error) {
            console.error(error);
            alert('Error deleting image.');
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}-${year}`;
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="Home-container">
                    <h1>Homepage</h1>
                    <p>Error: {error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <LoggedInNavBar />
            <div className="Home-container">
                <div className="row">
                    <div className="col-12 col-sm-3">
                        <h1>Welcome, {user?.name}</h1>
                        <CalendarComponent handleDateSelect={setSelectedDate} />
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="image-container">
                            {imagesForSelectedDate.length > 0 ? (
                                imagesForSelectedDate.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={`data:image/jpeg;base64,${image.base64}`}
                                        alt="User Image"
                                        onDelete={() => handleDelete(image.name)}
                                    />
                                ))
                            ) : (
                                <p>No images found for the selected date.</p>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="fileupload">
                            <FileUpload onUpload={handleUpload} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
