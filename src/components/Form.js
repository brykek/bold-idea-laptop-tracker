const Form = () => {
    return (
    <div>
     <form class="container">
        <h1>Add New Laptop</h1>
            <h2 class="sectionHeading">Identification</h2>
                <div class="flex">
                    <div class="flex-inner-4">
                        <div class="input-group">
                            <label>Manufacturer:</label>
                            <div class="radio-flex">
                                <input type="radio" id="apple" name="manufacturer" value="Apple"/>
                                <label for="apple">Apple</label>
                                <input type="radio" id="pc" name="manufacturer" value="PC"/>
                                <label for="pc">PC</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex-inner-4">
                        <label>Serial Number:</label>
                        <input type="number" id="serialnum" name="serialnum" required/>
                    </div>
                    <div class="flex-inner-4">
                        <label>ID(middle 4 characters of serial number):</label>
                        <input type="text" id="id" name="id" maxlength="4" required/>
                    </div>
                    <div class="flex-inner-4">
                        <button><a href="https://everymac.com/">Find on everymac.com</a></button>
                    </div>
                </div>
            <h2 class="sectionHeading">Donation Info</h2>
                <div class="flex">
                    <div class="flex-inner-3">
                        <label>Status:</label>
                        <input type="text" id="status" value="Unprocessed" name="status" disabled />
                    </div>
                    <div class="flex-inner-3">
                        <label>Original Donor:</label>
                        <select id="donor" name="donor" required>
                            <option value="">Please choose an option</option>
                            <option value="betterup">BetterUp</option>
                            <option value="ordermygear">Order My Gear</option>
                        </select>
                    </div>
                    <div class="flex-inner-3">
                        <label>Date donated:</label>
                        <input type="date" id="datedonated" name="datedonated"/>
                    </div>
                </div>
           <h2 class="sectionHeading">Laptop Specs</h2>
           <div class="flex">
                <div class="flex-inner-4">
                   <label>Family:</label>
                   <input type="text" id="family" name="family"/>
               </div>
               <div class="flex-inner-4">
                   <label>Screen Size(in inches):</label>
                   <input type="number" id="screensize" name="screensize"/>
               </div>
               <div class="flex-inner-4">
                   <label>CPU Type:</label>
                   <input type="text" id="cputype" name="cputype"/>
               </div>
               <div class="flex-inner-4">
                   <label>Memory(in GB):</label>
                   <input type="number" id="memory" name="memory"/>
               </div>
            </div>
            <div class="flex">   
               <div class="flex-inner-4">
                   <label>Disk Size:</label>
                   <input type="text" id="disksize" name="disksize"/>
               </div>
               <div class="flex-inner-4">
                        <div class="input-group">
                            <label>Condition:</label>
                            <div class="radio-flex">
                                <input type="radio" id="a" name="condition" value="A"/>
                                <label for="a">A</label>
                                <input type="radio" id="b" name="condition" value="B"/>
                                <label for="b">B</label>
                                <input type="radio" id="c" name="condition" value="C"/>
                                <label for="c">C</label>
                                <input type="radio" id="d" name="condition" value="D"/>
                                <label for="d">D</label>
                            </div>
                            <a href="https://www.pcexchange.com/blog/all-about-the-grading-system-of-refurbished-laptops/" class="miniLink">*Read about the grading system.</a>
                        </div>
                    </div>
                <div class="flex-inner-4">
                   <label>Charger Type:</label>
                   <input type="text" id="chargertype" name="chargertype"/>
               </div>
               <div class="flex-inner-4">
                        <div class="input-group">
                            <label>Charger Included:</label>
                            <div class="radio-flex">
                                <input type="radio" id="yes" name="chargerIncluded" value="Yes"/>
                                <label for="yes">Yes</label>
                                <input type="radio" id="no" name="chargerIncluded" value="No"/>
                                <label for="no">No</label>
                            </div>
                        </div>
                    </div>
           </div>
           <h2 class="sectionHeading">Value &#38; Sale</h2>
           <div class="flex">
               <div class="flex-inner-3">
                   <label>Trade-in Value:</label>
                   <input type="number" id="tradein" name="tradein"/>
               </div>
               <div class="flex-inner-3">
                   <label>List Price:</label>
                   <input type="number" id="listprice" name="listprice"/>
               </div>
               <div class="flex-inner-3">
                   <label>Sold Price:</label>
                   <input type="number" id="soldprice" name="soldprice"/>
               </div>
           </div>
           <div class="notes">
           <h2 class="sectionHeading note">Notes</h2>
               <textarea id="notes" name="notes" rows="3" cols="30"></textarea>
           </div>
           <div class="flex-button">
               <button>Cancel</button>
               <button>Save</button>
           </div>

       </form>
       </div>
       
    )
   }
   export default Form;