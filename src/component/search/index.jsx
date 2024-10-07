export default function Search({search, setSearch,SubmitSearch}){

    return <div className="search-engine">
        <input type="text" 
        placeholder="Enter City Name" name="search" value={search} 
        onChange={(event)=> setSearch(event.target.value)} />
        <button onClick={SubmitSearch}>Search Weather</button>
    </div>
}