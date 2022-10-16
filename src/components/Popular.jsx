import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const Popular = () => {
	const [popular, setPopular] = useState([])

	useEffect(() => {
		getPopular()
	}, [])

	// getting data from the API
	const getPopular = async () => {
		const api = await fetch(
			`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RECIPES_API_KEY}&number=20`
		)
		const data = await api.json()
		setPopular(data.recipes)
	}

	return (
		<Container>
			<h3>Popular Picks</h3>
			<Splide
				tag='section'
				options={{
					perPage: 4,
					arrows: false,
					pagination: false,
					drag: 'free',
					rewind: true,
					width: '100%',
					gap: '5rem',
				}}
			>
				{popular.map((recipe) => {
					return (
						<SplideSlide key={recipe.id}>
							<Card key={recipe.id}>
								<p>{recipe.title}</p>
								<img src={recipe.image} alt={recipe.title} />
								<Gradient />
							</Card>
						</SplideSlide>
					)
				})}
			</Splide>
		</Container>
	)
}

export default Popular

const Container = styled.div`
	margin: 4rem 0;
`
const Card = styled.div`
	min-height: 25rem;
	border-radius: 1rem;
	overflow: hidden;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		object-fit: cover;
		border-radius: 1rem;
	}

	p {
		position: absolute;
		z-index: 10;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0);
		color: #fff;
		text-align: center;
		font-weight: 600;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

const Gradient = styled.div`
	z-index: 4;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`
