const Menu = () => {
    return (
        <div>
        <nav class="nav page__menu page__custom-settings menu">
        <div class="logowrapper">
            <li class="menu__group logo"><img src="boldidea.png" alt="bold-idea-logo"/></li>
        </div>
		<ul class="nav__list menu__list r-list">
            <li class="menu__group nav__item"><a href="#0" class="menu__link r-link text-underlined">Add Laptop</a></li>
            <li class="menu__group nav__item"><a href="#0" class="menu__link r-link text-underlined">View Inventory</a></li>
            <li class="menu__group nav__item"><a href="#0" class="menu__link r-link text-underlined">Analytics</a></li>
		</ul>
	</nav>
    </div>
    )
}
export default Menu;