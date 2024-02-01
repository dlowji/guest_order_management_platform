import React from "react";
import MainContentHeader from "../common/MainContentHeader";
import MenuLeftHeader from "./MenuLeftHeader";
import LoadingCenter from "../common/LoadingCenter";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    title: "MARGARITA",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/margarita-1592951298.jpg?crop=1xw:1xh;center,top&resize=980:*",
    price: 300000,
    summary:
      "Cloyingly sweet margarita mixes have given this drink a bad name. A well-made version is a fresh mix of lime juice and tequila, with a hint of sweetener",
    categoryId: "C01",
  },
  {
    title: "COSMOPOLITAN",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/cosmopolitan-1592951320.jpg?crop=1xw:1xh;center,top&resize=980:*",
    price: 300000,
    summary:
      "The cosmo became almost ubiquitous in the '90s thanks to the TV show Sex and the City, but this spin on the martini remains just as tasty today as when Carrie Bradshaw made it famous",
    categoryId: "C01",
  },
  {
    title: "NEGRONI",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/negroni-1592951342.jpg?crop=1xw:1xh;center,top&resize=980:*",
    price: 300000,
    summary:
      "A favorite of bartenders all over the world, the Negroni is a simple three-ingredient cocktail: gin, Campari ,sweet vermouth",
    categoryId: "C01",
  },
  {
    title: "MOSCOW MULE",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/moscow-mule-1592951361.jpg?crop=1xw:1xh;center,top&resize=980:*",
    price: 300000,
    summary:
      "Popular for good reason, the Moscow Mule is one of the most refreshing things to sip on a hot summer day. Its suggested vessel, a copper mug, also just looks sharp.",
    categoryId: "C01",
  },
  {
    title: "MARTINI",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/martini-1592951711.jpg?crop=1xw:1xh;center,top&resize=980:*",
    price: 300000,
    summary:
      "James Bond was wrong—whether you drink it with gin or vodka, stirred is the way to go when ordering a martini.",
    categoryId: "C01",
  },
  {
    title: "TIRAMISU LAYER CAKE",
    image:
      "https://img.sndimg.com/food/image/upload/w_621,h_349,fl_progressive,c_fill,q_80/v1/img/recipes/20/27/85/Ij1SHD8TQ1g4MUz24nQ3_food.com-60.jpg",
    price: 300000,
    summary:
      "basically coffee-infused sponge cake layers frosted with creamy lightly sweetened mascarpone cream, then dusted with cocoa powder",
    categoryId: "C02",
  },
  {
    title: "LEMON SOUFFLES",
    image:
      "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/52/80/94/9XsiVISSHqYb64kilY3y_lemon%2520souffle-1488.jpg",
    price: 210000,
    summary:
      "This classic soufflé variety is characterized by its airy texture and a subtle lemon flavor. It consists of a blend of creamy egg yolk base, flour, lemon zest, sugar, and fluffy egg whites.",
    categoryId: "C02",
  },
  {
    title: "BROWNIE SUNDAE",
    image:
      "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/52/80/94/9XsiVISSHqYb64kilY3y_lemon%2520souffle-1488.jpg",
    price: 370000,
    summary:
      "Topped with ice cream and chocolate sauce, these fudgy, gooey brownies make the perfect base for a classic, restaurant-style brownie sundae. Don't forget the whipped cream!",
    categoryId: "C02",
  },
  {
    title: "CHOCOLATE CHIP PANOOKIES",
    image:
      "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/52/80/94/9XsiVISSHqYb64kilY3y_lemon%2520souffle-1488.jpg",
    price: 250000,
    summary:
      "These giant chocolate chip cookies are baked in mini pie tins. The ooey-gooey 'pan cookies' are best served hot out of the oven topped with a scoop of ice cream!",
    categoryId: "C02",
  },
  {
    title: "STRAWBERRY SHORTCAKE",
    image:
      "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/52/80/94/9XsiVISSHqYb64kilY3y_lemon%2520souffle-1488.jpg",
    price: 210000,
    summary:
      "A true Strawberry Shortcake is not a layer cake, it's a biscuit topped with fresh berries and mounds of whipped cream. It's the perfect early summer dessert",
    categoryId: "C02",
  },
  {
    title: "THE BEST SAUSAGE PIZZAS",
    image:
      "https://www.tasteofhome.com/wp-content/uploads/2019/12/The-Best-Sausage-Pizzas_EXPS_TOHFM20_245369-_E09_26_4b-34.jpg?resize=700,700",
    price: 110000,
    summary:
      "What makes this recipe unique is the slow overnight fermentation of the pizza dough. The flour has time to hydrate and relax, which makes the dough so much easier to roll out!",
    categoryId: "C03",
  },
];

const MenuLeftContent = () => {
  const isFetching = false;
  const isError = false;
  return (
    <div className="menu-left">
      <MenuLeftHeader></MenuLeftHeader>
      {isFetching && <LoadingCenter></LoadingCenter>}

      {!isFetching && !isError && menuItems && (
        <>
          <MainContentHeader
            title="Choose topping"
            quantity={`${menuItems.length} items`}
          ></MainContentHeader>
          {menuItems.length <= 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-2xl text-center font-bold">No items found</p>
            </div>
          ) : (
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.dishId}
                  id={item.dishId}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  status="AVAILABLE"
                />
              ))}
            </MenuList>
          )}
        </>
      )}
    </div>
  );
};

export default MenuLeftContent;
