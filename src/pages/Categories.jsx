import React, {useState, useEffect} from 'react'
import './categories.css'
import filterListData from '../data/filterListData'
import GameCard from '../components/GameCard'

function Categories({ games, reference }) {
  const [data, setData] = useState([])

  useEffect(() => {
    if (games && games.length > 0) {
      setData(games)
    }
  }, [games])

  const [filters, setFilters] = useState(filterListData)
  const handleFilterGames = category =>{
    setFilters(filters.map(filter=>{
      filter.active = false

      if(filter.name === category) {
        filter.active = true
      }
      return filter
    }))

    if(category ==='All') {
      setData(games)
      return;
    }

    setData(games.filter(game=>game.category===category))
    
  }

  const [text, setText] = useState('')

  const handleSearchGame = e=>{
    setData(games.filter(game=>game.title.toLowerCase().includes(e.target.value.toLowerCase())))
    setText(e.target.value)
  }

  return (
    <section id='categories' className='categories' ref={reference}>
      <div className="container-fuid mt-2">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters">
              {
                filters.map(filter=>(
                  <li key={filter._id} className={`${filter.active ? 'active' : undefined}`} onClick={()=>handleFilterGames(filter.name)}>{filter.name}</li>
                ))
              }
            </ul>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-end">
            <div className="search">
              <i class="bi bi-search"></i>
              <input type="text" value={text} name='search' placeholder='Search..' onChange={handleSearchGame}/>
            </div>
          </div>
        </div>
        <div className="row">
            {
              
              data.map(game=>(
                <GameCard key={game._id} game={game}/>
              ))
            }
        </div>
      </div>
    </section>
  )
}

export default Categories