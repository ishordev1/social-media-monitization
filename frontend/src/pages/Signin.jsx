import React from 'react'

const Signin = () => {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="card mt-5">

          <div className="card-body">
            <h3 className="card-title text-center">
              Signin Here
            </h3>
            <hr />
            <form className='mt-4'>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <lab el className="form-check-label" htmlFor="exampleCheck1">Check me out
                </lab></div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default Signin