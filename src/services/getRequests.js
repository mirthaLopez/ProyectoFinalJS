////////////////////Fetch get request//////////////////////////////////
async function GetRequests(url) {
    try {
        const response = await fetch(url); // fetch consulta=go and get
        const data = await response.json();// also async so we need await 
        if (response.status === 200) { /// to validate a sucessful response, we got the date we needed
            return data;
        }else {
            console.log(data.error.message);/// means there was a server problem (invalid access token for example)   
        }
    } catch (error) { /// catches a fetch error which  means the request was unsuccesful
        console.error(`Fetch error`, error);
        //throw error;
    }
}

export {GetRequests}