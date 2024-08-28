////////////////////////////Post request to the server/////////////////////////

async function PostRequest(solicitud, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(solicitud)
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(error);
    }
}
export {PostRequest};

