import React from 'react'
import {Button, Container} from "./components";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <nav className='w-full bg-white shadow-md'>
        <Container>
            <div className='py-3 flex justify-between items-center px-3 lg:px-0'>
                <span className='font-bold'>Collab</span>
                <div className="btns">
                    <Link to={"/signin"}>
                    <Button label={"Sign in"}/>

                    </Link>
            </div>
            </div>
            
        </Container>
      </nav>
    </>
  )
}

export default Navbar;
