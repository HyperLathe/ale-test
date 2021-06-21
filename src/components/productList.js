import React from 'react';
import styled from 'styled-components/macro';


const Content = styled.ul `
  display: flex;
  overflow-x: scroll;
  margin-bottom: 20px;
  min-height: 350px;
  @media screen and (min-width: 768px) {
    flex-wrap: wrap;
    overflow: auto;
  }
`;

const ProductBlock = styled.li `
  display: flex;
  min-width: 250px;
  margin-right: 10px;
  border-right: 1px solid #b2b2b2;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
    img {
      transition: all 0.2s ease;
    }
    @media screen and (min-width: 768px) {
      border-right: 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #b2b2b2;
      margin-bottom: 20px;
    }
    &:hover {
      background: #dfdfdf;
        img {
          transform: scale(1.1);
        }
    }
`;

const ProductImage = styled.div `
  width: 33%;
  padding-right: 20px;
  @media screen and (min-width: 768px) {
    width: 20%;
    padding-right: 40px;
  }
`;

const ProductDetails = styled.div `
  width: 66%;
  @media screen and (min-width: 768px) {
    width: 80%;
  }
    h3 {
      color: maroon;
      margin-bottom: 30px;
    }
    p {
      margin-bottom: 20px;
        &:last-child {
          margin-top: 40px;
        }
    }
    .tagline {
      font-weight: 600;
    }
    .mobile-hidden {
      display: none;
      @media screen and (min-width: 768px) {
        display: block;
      }
    }

`;


const ProductList = (props) => {

	return (
		<Content>
			{props.products.map((product, i) => (
				<ProductBlock onClick={() => props.handleFavourites(product)} key={i}>
          <ProductImage>
					  <img src={product.image_url} alt={product.name} />
          </ProductImage>
          <ProductDetails>
            <h3>{product.id}: {product.name}</h3>
            <p>{product.tagline}</p>
            <p className="mobile-hidden">{product.description}</p>
            <p>ABV: <strong>{product.abv}</strong></p>
            <p className="mobile-visible"><strong>Click to add to favourites</strong></p>
          </ProductDetails>
        </ProductBlock>
			))}
		</Content>
	);
};

export default ProductList;