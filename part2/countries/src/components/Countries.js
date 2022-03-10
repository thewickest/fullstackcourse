const Country = ({c}) =>{
    return (
        <div>
            <h1>{c.name.common}</h1>
            <p>capital {c.capital}</p>
            <p>area {c.area}</p>
            <p><b>languages:</b></p>
            <ul>
                {Object
                    .values(c.languages)
                    .map((lang)=><li key={lang}>{lang}</li>)}
            </ul>
            <img src={c.flags.png}/>
        </div>
    )
}

const Countries = ({list,handleClick}) =>{

    if(list.length>10){
        return(<p>Too many matches, specify another filter</p>)
    }else if(list.length == 1){
        const c = list[0]
        return(<Country c={c}/>)
    }else{
        return(
            list.map((country) =>
                    <p>{country.name.common}
                    <button onClick={()=>handleClick(country)}>boton</button>
                    </p>
            )
        )
    }
}

export default Countries