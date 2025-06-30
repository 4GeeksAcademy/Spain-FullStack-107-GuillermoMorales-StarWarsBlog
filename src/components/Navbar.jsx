import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">STAR WARS<i class="fa-solid fa-jedi"></i></span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Favoritos<i class="fa-solid fa-heart"></i></button>
					</Link>
				</div>
			</div>
		</nav>
	);
};