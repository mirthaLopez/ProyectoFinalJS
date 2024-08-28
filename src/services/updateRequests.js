async function updateRequests( solicitud, id) {
    try {
        const response = await fetch('http://localhost:3007/pendingRequest/'+id, {
            method: 'PUT',
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
export {updateRequests};