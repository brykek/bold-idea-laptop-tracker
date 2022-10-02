const FilterFields = () => {
    return (
        <div className="flex">
            <div class="flex-inner-5">
                <label>Search All Fields:</label>
                <input type="text" id="searchAll" name="searchAll"/>
            </div>
            <div class="flex-inner-5">
                <label>Filter By Status:</label>
                <select name="filterbystatus" id="filterbystatus">
                    <option value="">--Please choose an option--</option>
                    <option value="Unprocessed">Unprocessed</option>
                    <option value="Ready">Ready</option>
                    <option value="Sold">Sold</option>
                    <option value="Donated">Donated</option>
                    <option value="Unusable">Unusable</option>
                </select>
            </div>     
            <div class="flex-inner-5">
                <label>Filter By Model:</label>
                <input type="text" id="filterbymodel" name="filterbymodel"/>
            </div>  
            <div class="flex-inner-5">
                <label>Filter By Size:</label>
                <input type="text" id="filterbysize" name="filterbysize"/>
            </div>  
            <div class="flex-inner-5">
                <label>Filter By Condition:</label>
                <select name="filterbystatus" id="filterbystatus">
                    <option value="">--Please choose an option--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>     
     </div>

    )
}
export default FilterFields;