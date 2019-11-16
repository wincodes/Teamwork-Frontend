import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="footer text-center p-4 mt-5 text-white" >
        Copyright &copy; {new Date().getFullYear()} Team Work
      </footer>
    </div>
  )
}
