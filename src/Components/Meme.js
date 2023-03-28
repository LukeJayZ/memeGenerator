import {useState,useEffect} from 'react';

export default function Meme(){

    const[meme,setMeme] = useState({
        topText:"",
        bottomText:"",
        data: {memes: []}
    });

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch ("https://api.imgflip.com/get_memes");
            const jsonData = await response.json();
            setMeme(jsonData);
            console.log(jsonData);
        }
        fetchData();
    },[]);


    const[indexMeme,setIndexMeme] = useState(0);

    function getRandomMeme(){
        if (!meme.data || !meme.data.memes) return;
        const randomIndex = Math.floor(Math.random()*meme.data.memes.length);
        const memeImg = meme.data.memes[randomIndex]
        let url = memeImg.url;

        setIndexMeme(randomIndex);

        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url,
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));    
    }
    
    console.log("meme:", meme); // Überwache die Datenstruktur
    console.log("indexMeme:", indexMeme); // Überwache die Änderungen des Index
    
    return(
    <>
    <div>
        {meme.data && meme.data.memes && meme.data.memes[indexMeme] && (
            <img src={meme.data.memes[indexMeme].url}/>
        )}
        <input
            type="text"
            placeholder="Top text"
            className="form-input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}/>
        <input
            type="text"
            placeholder="Bottom text"
            className="form-input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}/>

        <button onClick={getRandomMeme}>New Meme</button>
        
    </div>
    
    </>
    );
} 
