

export const fileUpload = async ( file ) =>{

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dix9wcfct/upload';
    const formDate = new FormData();
    formDate.append('upload_preset', 'react-journal')
    formDate.append('file', file)
    

    try{
        const resp = await fetch (cloudUrl,{
            method: 'POST',
            body: formDate
        });

        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url

        }else {
            throw await resp.json();
        }
    }catch ( error ){
        throw (error)
    }

}