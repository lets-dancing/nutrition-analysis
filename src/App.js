import { useEffect, useState } from 'react';
import './App.css';
import { Nutrition } from './Nutrition';
import LoaderPage from './Loader/LoaderPage';
import './Loader/style.css'



function App() {
  const MY_ID = '4a36cc8b';
  const MY_KEY = '5d9c851eede707b6b682fde3e7fc3644';

  const [myNutrition, setMyNutrition] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [mySearch, setMySearch] = useState();
  const [stateLoader, setStateLoader] = useState(true);

  const fetchData = async (ingr) => {
    setStateLoader(true);
    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ingr: ingr}),
    });
    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('некорректный ингридиент');
    }
    
  }
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);

  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }


  useEffect(()=> {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  },[wordSubmitted])

  useEffect(() => {
    const timer = setTimeout(() => setStateLoader(false), 1000);
    return () => clearTimeout(timer)
  }, [])


  return (
    <>
      {
        stateLoader && <LoaderPage />
      }
      <h1>Nutrition Analysis</h1>
      <div className='container'>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='Search...' onChange={myRecipeSearch}/>
        </form>
      </div>

      <div>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
          .map(({label, quantity, unit}) =>
            <Nutrition key={`${label}-${quantity}-${unit}`} label={label} quantity={quantity} unit={unit}/>
          )
        }
      </div>
    </>
  );
}

export default App;
