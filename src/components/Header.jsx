import React from "react";

export default function Header(){
  function scrollToId(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="header" role="banner">
      <div className="header-inner container">
        <a className="logo" href="#" onClick={(e)=>{ e.preventDefault(); scrollToId("home"); }}>
          <div style={{ width:42, height:42, borderRadius:10, background: "linear-gradient(90deg,#ec4899,#8b5cf6)", display:"grid", placeItems:"center", color:"#fff", fontWeight:800 }}>
            LS
          </div>
          <div style={{ marginLeft: 12, fontWeight: 800 }}>LeadScore</div>
        </a>

        <nav aria-label="Main navigation" className="nav-links">
          <button className="nav-button" onClick={()=>scrollToId("home")}>Home</button>
          <button className="nav-button" onClick={()=>scrollToId("about")}>About</button>
          <button className="nav-button" onClick={()=>scrollToId("get-started")}>Get Started</button>
          <button className="nav-button" onClick={()=>scrollToId("dashboard")}>Sign Up</button>
        </nav>
      </div>
    </header>
  );
}
