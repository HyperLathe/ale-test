import React from 'react';
import styled from 'styled-components/macro';

const Content = styled.ul `
  display: flex;
	flex-wrap: wrap;
`;

const ProductBlock = styled.li `
  display: flex;
	flex-direction: column;
	align-items: center;
	border: 2px solid #b60000;
	width: calc(50% - 20px);
	font-size: 0.7rem;
	padding: 10px;
	border-radius: 10px;
	margin: 10px;
	position: relative;
	text-align: center;
	cursor: pointer;
	transition: all 0.2s ease;
		@media screen and (min-width: 768px) {
			width: 140px;
		}
		img {
			max-height: 100px;
			margin-bottom: 5px;
		}
		&:after {
			content: '+';
			position: absolute;
			top: 0;
			right: 0;
			margin: -10px -10px 0 0;
			border: 2px solid #b60000;
			color: #ff0000;
			width: 30px;
			height: 30px;
			border-radius: 50%;
			font-size: 40px;
			background: #fff;
			justify-content: center;
			align-items: center;
			display: flex;
			transform: rotate(45deg);
			transition: all 0.2s ease;
		}
		&:hover {
			background: #ffe7e7;
			&:after {
				width: 40px;
				height: 40px;
				font-size: 50px;
			}
		}
`;

const ProductTitle = styled.h3 `

`;


const FavouriteList = (props) => {

	return (
		<Content>
			{props.products.map((product, i) => (
				<ProductBlock onClick={() => props.handleFavourites(product)} key={i}>
					<img src={product.image_url} alt={product.name} />
          <ProductTitle>{product.name}</ProductTitle>
        </ProductBlock>
			))}
		</Content>
	);
};

export default FavouriteList;