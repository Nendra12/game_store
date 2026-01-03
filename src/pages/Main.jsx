import React, {useState, useEffect, useRef, useContext} from 'react'
import './main.css'
import SideMenu from '../components/SideMenu'
import Header from './Header'
import Home from './Home'
import Categories from './Categories'
import MyLibrary from './MyLibrary'
import Bag from './Bag'
import { AppContext } from '../App'
import navListData from '../data/navListData'

function Main() {
  const {library, bag} = useContext(AppContext)
  const [active, setActive] = useState(false)
  const [games, setGames] = useState([])
  const [navData, setNavData] = useState(navListData)

  const homeRef = useRef()
  const categorieRef = useRef()
  const libraryRef = useRef()
  const bagRef = useRef()

  const sections = [
    { 
      name: `Home`,
      ref: homeRef,
      active: true,
    },
    {
      name: `Categories`,
      ref: categorieRef,
      active: false,
    },
    {
      name: `My Library`,
      ref: libraryRef,
      active: false,
    },
    {
      name: `My Bag`,
      ref: bagRef,
      active: false,
    },
  ]

  const handleToggleActive = ()=> {
    setActive(!active)
  }

  const handleNavClick = (id, target) => {
    const newNavbarData = navData.map(nav=>{
      nav.active = false
      if(nav._id === id) nav.active = true
      return nav
    })
    setNavData(newNavbarData)
    handleSectionActive(target)
    // Close sidebar on mobile after navigation
    if(window.innerWidth <= 768) {
      setActive(false)
    }
  }

  const handleSectionActive = target => {
    sections.map(section=>{
      section.ref.current.classList.remove('active')
      if(section.ref.current.id===target){
        section.ref.current.classList.add('active')
      }

      return section
    })
  }

  const fetchData = ()=>{
    fetch('/api/gamesData.json')
    .then(res=>res.json())
    .then(data=>{
      setGames(data)
    })
    .catch(e=>console.log(e.message))
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return ( 
    <main>
        <div className={`overlay ${active ? 'active' : ''}`} onClick={handleToggleActive}></div>
        <SideMenu active={active} navData={navData} navOnClick={handleNavClick}/>
        <div className={`banner ${active ? 'active': undefined}`}>
            <Header toggleActive={handleToggleActive} navData={navData} navOnClick={handleNavClick}/>
            <div className="container-fliud">
              {
                games && games.length > 0 && (
                  <Home games={games} reference={homeRef}/>
                )
              }
              <Categories games={games} reference={categorieRef} />
              <MyLibrary games={library} reference={libraryRef}/>
              <Bag games={bag} reference={bagRef}/>
            </div>
        </div>
    </main>
  )
}

export default Main
