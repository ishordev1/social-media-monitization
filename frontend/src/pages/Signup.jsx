import React from 'react'

const Signup = () => {
  return (
    <div className="container d-flex justify-content-center">
    <div className="card mt-5" style={{width:'300px'}}>
 
     <div className="card-body">
       <h3 className="card-title text-center">
         Signup Here
       </h3>
     <form>
       <div className="mb-3">
         <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
         <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
       </div>
       <div className="mb-3">
         <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
         <input type="email" className="form-control" id="exampleInputPassword1" />
       </div>
       <div className="mb-3">
         <label htmlFor="exampleInputPassword1" className="form-label">password</label>
         <input type="text" className="form-control" id="exampleInputPassword1" />
       </div>
       <div className="mb-3">
        <b> <label htmlFor="exampleInputPassword1" className="form-label">Instagram UserName</label>
        </b> <input type="text" className="form-control" id="exampleInputPassword1" />
       </div>
       <button type="submit" className="btn btn-primary">Submit</button>
     </form>
     </div>
    </div>

   </div>
  )
}

export default Signup