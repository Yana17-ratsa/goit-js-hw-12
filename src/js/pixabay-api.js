import axios from "axios";


export async function getImages(query) {
        const BASE_URL = 'https://pixabay.com/api/';
        const params = new URLSearchParams ({
            key: '43111916-8a66f764b7b1580d41f140627',
            q: query,
            image_type: 'photo',
            orientation : 'horizontal',
            safesearch : 'true',
        });
    
        const url = `${BASE_URL}?${params}`;
        const res = await axios.get(url);
        return res.data;
}