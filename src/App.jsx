import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [showList, setShowList]=useState(false);
  const [searchInput, setSearchInput]=useState('');
  const [searchResult, setSearchResult]=useState([]);
  const [catchResults, setcatchResults]=useState({});

  //fetch data
  const fetchdata=async()=>{
    //if data available in catch dont make api call
    if(catchResults[searchInput]){
      console.log('catch Data:',catchResults[searchInput]);
      setSearchResult(catchResults[searchInput]);
      return;
    }

    const apiData=await fetch('https://dummyjson.com/recipes/search?q='+searchInput);
    const data=await apiData.json();
    setSearchResult(data?.recipes);
    console.log('API Data:',data?.recipes);
    //important part for catching object it should not updatae we use append
    setcatchResults(prev=>({...prev,[searchInput]:data?.recipes}))
    //appending previsous state that is initially blank and then appending key
    //value pair key is input value and data is value of key
  }
// on input change call Api
  useEffect(()=>{
    const timer=setTimeout(fetchdata,500); //de Bouncing
    return()=>{clearTimeout(timer);}
  },[searchInput]);
 
  const handleItemClick = (value) => {
    // Update search input value when clicking on a list item
    console.log(value);
};
  return (
    <>
     <h1>Search Box Component</h1>
     <div className='autoCompleteSearchBoxWrapper'>
      <div className='autoCompleteSearchInput'>
        <span className='searchBoxInputIcon'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7702 18.2983C9.28094 18.2983 7.8251 17.8567 6.58679 17.0293C5.34849 16.2018 4.38335 15.0258 3.81342 13.6499C3.2435 12.274 3.09438 10.7599 3.38492 9.29925C3.67547 7.83858 4.39263 6.49686 5.44572 5.44377C6.49881 4.39068 7.84053 3.67352 9.30121 3.38297C10.7619 3.09242 12.2759 3.24154 13.6518 3.81147C15.0278 4.3814 16.2038 5.34654 17.0312 6.58484C17.8586 7.82314 18.3002 9.27899 18.3002 10.7683C18.3002 11.7571 18.1055 12.7363 17.727 13.6499C17.3486 14.5635 16.794 15.3936 16.0948 16.0928C15.3955 16.792 14.5654 17.3467 13.6518 17.7251C12.7383 18.1035 11.7591 18.2983 10.7702 18.2983ZM10.7702 4.74828C9.58355 4.74828 8.42351 5.10018 7.43682 5.75947C6.45012 6.41876 5.68109 7.35583 5.22696 8.45218C4.77283 9.54854 4.65401 10.7549 4.88553 11.9188C5.11704 13.0827 5.68848 14.1518 6.5276 14.9909C7.36671 15.83 8.43581 16.4015 9.5997 16.633C10.7636 16.8645 11.97 16.7457 13.0663 16.2916C14.1627 15.8374 15.0998 15.0684 15.7591 14.0817C16.4183 13.095 16.7702 11.935 16.7702 10.7483C16.7702 9.15699 16.1381 7.63086 15.0129 6.50564C13.8877 5.38043 12.3615 4.74828 10.7702 4.74828Z" fill="#333333"/>
          <path d="M20 20.7519C19.9014 20.7524 19.8038 20.7332 19.7128 20.6954C19.6218 20.6576 19.5392 20.602 19.47 20.5319L15.34 16.4019C15.2075 16.2597 15.1354 16.0717 15.1388 15.8774C15.1422 15.6831 15.2209 15.4977 15.3583 15.3603C15.4958 15.2229 15.6811 15.1442 15.8754 15.1407C16.0697 15.1373 16.2578 15.2094 16.4 15.3419L20.53 19.4719C20.6704 19.6125 20.7493 19.8032 20.7493 20.0019C20.7493 20.2007 20.6704 20.3913 20.53 20.5319C20.4607 20.602 20.3782 20.6576 20.2872 20.6954C20.1961 20.7332 20.0985 20.7524 20 20.7519Z" fill="#333333"/>
        </svg>
        </span>
        <input type='input' placeholder='Search here..'
        onBlur={()=>{setShowList(false)}}
        onFocus={()=>setShowList(true)}
        onChange={(e)=>setSearchInput(e.target.value)}/>
      </div>
      { showList && (
                  <div className='searchSuggestionWrapper'>
                    <ul>
                    {
                        searchResult.map((item)=>(
                            <li key={item.id}>
                                <button onClick={() => handleItemClick(item.name)} type='button'>{item.name}</button>
                            </li>
                        ))
                    }
                    </ul>
                  </div>
      )
      }
     </div>
    </>
  )
}

export default App
