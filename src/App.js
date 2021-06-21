import React, { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import './App.css';

import ProductList from './components/productList';
import FavouriteList from './components/favouriteList';

// I'm using styled components for styles in order to keep things visible for each component:
const Header = styled.header `
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 30px 20px;
    h1 {
      color: #6b0000;
      font-size: 1.7rem;
      text-align: center;
    }
`;


const Content = styled.div `
  max-width: 1440px;
  margin: 0px auto;
  @media screen and (min-width: 768px) {
			display: flex;
		}
`;

const ProductContent = styled.div `
  width: 100%;
  padding: 20px;
    @media screen and (min-width: 768px) {
      width: 50%;
    }
    h2 {
      text-align: center;
      background: #9a8b8b;
      color: white;
      padding: 10px;
      font-size: 1.3rem;
      margin-bottom: 20px;
    }
`;

const FavouriteContent = styled.div `
  width: 100%;
  padding: 40px 20px 20px 20px;
		@media screen and (min-width: 768px) {
			position: fixed;
			right: 0;
			width: 50%;
			padding-right: calc((100vw - 1440px) / 2);
      overflow-y: scroll;
		}
    h4 {
      text-align: center;
      margin-bottom: 20px;
      text-transform: uppercase;
      font-weight: 600;
    }
`;

const Pagination = styled.div `
  display: flex;
  width: 100%;
  justify-content: space-between;
    button {
      border: 2px solid transparent;
      border-radius: 5px;
      background: #6b0000;
      color: #fff;
      padding: 10px 20px;
      cursor: pointer;
      transition: all 0.1s linear;
        &:hover {
          border-color: #6b0000;
          background: transparent;
          color: #6b0000;
        }
        &.hidden {
          opacity: 0;
          visibility: hidden;
        }
    }
`;





function App() {

  // setting up state using Hooks, for product list, product page, and favourites list:
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(1);
	const [favourites, setFavourites] = useState([]);

  //fetching data from the public api:
  const getProductList = async () => {
    const url  = `https://api.punkapi.com/v2/beers?page=${productPage}&per_page=10`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setProducts(responseJson);
    console.log(responseJson);
  }

  // setting the product page list:
  useEffect(() => {
    getProductList(productPage);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [productPage]);


  // use local storage to check if favourites exist, and pre-populate the array if so
  useEffect(() => {
		const productFavourites = JSON.parse(
			localStorage.getItem('daydot-app-favourites')
		);
		if (productFavourites) {
			setFavourites(productFavourites);
		}
	}, []);

  // saving product list to local storage:
	const saveToLocal = (items) => {
		localStorage.setItem('daydot-app-favourites', JSON.stringify(items));
	};

  // adding a favourite, appending it to new array:
	const addFavourite = (product) => {
		const newFavouriteList = [...favourites, product];
		setFavourites(newFavouriteList);
		saveToLocal(newFavouriteList);
	};

  // removing a favourite using the filter method:
	const removeFavourite = (product) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== product.id
		);

		setFavourites(newFavouriteList);
		saveToLocal(newFavouriteList);
	};

  return (
    <div className="App">
      <Header>
        <h1>Punk IPA - Find and Favourite</h1>
      </Header>
      <Content>
        <ProductContent>
          <h2>Product List:</h2>
            <ProductList
              products={products}
              handleFavourites={addFavourite}
            />
          <Pagination>
            <button className={(productPage <= 1) ? 'hidden' : ''} onClick={() => setProductPage(productPage - 1)}>&lt; Previous 10</button>
            <button onClick={() => setProductPage(productPage + 1)}>Next 10 &gt;</button>
          </Pagination>
        </ProductContent>
        <FavouriteContent>
			    <h4>Favourites:</h4>
            <FavouriteList
              products={favourites}
              handleFavourites={removeFavourite}
            />
        </FavouriteContent>
      </Content>

    </div>
  );
}

export default App;
