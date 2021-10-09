import React from 'react'

function AddChild() {
    return (
        <div className="form-content">
            <div className="form">
                <h2 className="form-title">Add Child</h2>
                <form className="form" id="form">
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <label for="sex">Sex</label>
                          <select name="sex" id="sex">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                           </select>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                     <div className="form-group">
                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Name"></input>
                     </div>
                </form>
            </div>
        </div>
    )
}

export default AddChild
