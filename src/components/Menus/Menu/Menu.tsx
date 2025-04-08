import React from "react";
import { parseFoodItemsFromUl, parseHeadingsAndLists, ParsedContent, FoodItem } from "./htmlFunctions";
const { getCSS, generateCSSMaps } = require("../../../utils/tailwind-to-css/index.js");

interface MenuProps {}

const testProps = {
  id: "",
  containerClass: "max-w-[1200px] mx-auto",
  wrapperClass: "",
  content: `<h1>Menu</h1><h2>Entrees</h2><h3>Chicken</h3><ul>  <li>Orange Chicken</li>  <li class='ql-indent-1'>Crispy chicken bites tossed in a tangy, sweet orange glaze. Perfectly paired with steamed jasmine rice.</li>  <li class='ql-indent-1'>$50</li>  <li class='ql-indent-1'>serves 10</li>  <li>Baked Ziti</li>  <li class='ql-indent-1'>A hearty pasta bake with ziti, ricotta, marinara, and melted mozzarella cheese. A crowd-pleaser for any occasion.</li>  <li class='ql-indent-1'>$50</li>  <li class='ql-indent-1'>serves 10</li>  <li>Beef Stroganoff</li>  <li class='ql-indent-1'>Tender strips of beef in a creamy mushroom sauce, served over buttered egg noodles. Rich and satisfying.</li>  <li class='ql-indent-1'>$70</li>  <li class='ql-indent-1'>serves 10</li>  <li>Vegetable Stir-Fry</li>  <li class='ql-indent-1'>A colorful mix of fresh vegetables sautéed in a savory soy-garlic sauce. Served with your choice of white or brown rice.</li>  <li class='ql-indent-1'>$60</li>  <li class='ql-indent-1'>serves 8</li>  <li>BBQ Pulled Pork Sliders</li>  <li class='ql-indent-1'>Slow-cooked pulled pork smothered in smoky BBQ sauce, served on soft slider buns. Perfect for parties and gatherings.</li>  <li class='ql-indent-1'>$70</li>  <li class='ql-indent-1'>serves 12</li>  <li>Chicken Piccata</li>  <li class='ql-indent-1'>Tender breaded chicken breasts topped with rich marinara sauce, melted mozzarella, and parmesan cheese. Served with a side of garlic bread.</li>  <li class='ql-indent-1'>$56</li>  <li class='ql-indent-1'>serves 11</li></ul><h3>Pasta</h3><ul>  <li>Orange Chicken</li>  <li class='ql-indent-1'>Crispy chicken bites tossed in a tangy, sweet orange glaze. Perfectly paired with steamed jasmine rice.</li>  <li class='ql-indent-1'>$50</li>  <li class='ql-indent-1'>serves 10</li>  <li>Baked Ziti</li>  <li class='ql-indent-1'>A hearty pasta bake with ziti, ricotta, marinara, and melted mozzarella cheese. A crowd-pleaser for any occasion.</li>  <li class='ql-indent-1'>$50</li>  <li class='ql-indent-1'>serves 10</li>  <li>Beef Stroganoff</li>  <li class='ql-indent-1'>Tender strips of beef in a creamy mushroom sauce, served over buttered egg noodles. Rich and satisfying.</li>  <li class='ql-indent-1'>$70</li>  <li class='ql-indent-1'>serves 10</li>  <li>Vegetable Stir-Fry</li>  <li class='ql-indent-1'>A colorful mix of fresh vegetables sautéed in a savory soy-garlic sauce. Served with your choice of white or brown rice.</li>  <li class='ql-indent-1'>$60</li>  <li class='ql-indent-1'>serves 8</li>  <li>BBQ Pulled Pork Sliders</li>  <li class='ql-indent-1'>Slow-cooked pulled pork smothered in smoky BBQ sauce, served on soft slider buns. Perfect for parties and gatherings.</li>  <li class='ql-indent-1'>$70</li>  <li class='ql-indent-1'>serves 12</li>  <li>Chicken Piccata</li>  <li class='ql-indent-1'>Tender breaded chicken breasts topped with rich marinara sauce, melted mozzarella, and parmesan cheese. Served with a side of garlic bread.</li>  <li class='ql-indent-1'>$56</li>  <li class='ql-indent-1'>serves 11</li></ul><h3>Meat</h3><ul>  <li>Orange Chicken</li>  <li class='ql-indent-1'>Crispy chicken bites tossed in a tangy, sweet orange glaze. Perfectly paired with steamed jasmine rice.</li>  <li class='ql-indent-1'>$50</li>  <li class='ql-indent-1'>serves 10</li>  <li>Baked Ziti</li>  <li class='ql-indent-1'>A hearty pasta bake with ziti, ricotta, marinara, and melted mozzarella cheese. A crowd-pleaser for any occasion.</li>  <li class='ql-indent-1'>$50</li>  <li class='ql-indent-1'>serves 10</li>  <li>Beef Stroganoff</li>  <li class='ql-indent-1'>Tender strips of beef in a creamy mushroom sauce, served over buttered egg noodles. Rich and satisfying.</li>  <li class='ql-indent-1'>$70</li>  <li class='ql-indent-1'>serves 10</li>  <li>Vegetable Stir-Fry</li>  <li class='ql-indent-1'>A colorful mix of fresh vegetables sautéed in a savory soy-garlic sauce. Served with your choice of white or brown rice.</li>  <li class='ql-indent-1'>$60</li>  <li class='ql-indent-1'>serves 8</li>  <li>BBQ Pulled Pork Sliders</li>  <li class='ql-indent-1'>Slow-cooked pulled pork smothered in smoky BBQ sauce, served on soft slider buns. Perfect for parties and gatherings.</li>  <li class='ql-indent-1'>$70</li>  <li class='ql-indent-1'>serves 12</li>  <li>Chicken Piccata</li>  <li class='ql-indent-1'>Tender breaded chicken breasts topped with rich marinara sauce, melted mozzarella, and parmesan cheese. Served with a side of garlic bread.</li>  <li class='ql-indent-1'>$56</li>  <li class='ql-indent-1'>serves 11</li></ul>`,
  h1Class: "text-[61px] font-bold border-b-4 border-black",
  h2Class: "text-[49px] italic leading-0 mt-12",
  h3Class: "text-[31px] font-semibold border-b border-black mt-8",
  ulClass: "grid grid-cols-2 gap-x-8 gap-y-4 ",
  liClass: "",
  nameClass: "text-[25px] text-[#464554]",
  priceClass: "",
  servingsClass: "hidden",
  descriptionClass: "",
};

const Menu: React.FC<MenuProps> = (props) => {
  const {} = props;
  const { content, id, ...otherCSS } = testProps;

  const { cssString, css } = getCSS(otherCSS);
  const parsedContent = parseHeadingsAndLists(content);

  return (
    <div className={css["containerClass"]} id={id}>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: cssString || "" }} />
      <div className={css["wrapperClass"]}>
        {parsedContent.map(({ element, content }: ParsedContent, i: number) => {
          if (element === "ul") {
            //Render the items we are looking for
            const foodItems = parseFoodItemsFromUl(content);
            return (
              <ul className={css["ulClass"]}>
                {foodItems.map(({ name, description, price, serves }: FoodItem) => {
                  return (
                    <li className={css["liClass"]}>
                      <div className="flex justify-between items-end">
                        <span className={css["nameClass"]} dangerouslySetInnerHTML={{ __html: name }} />
                        <span className={css["priceClass"]} dangerouslySetInnerHTML={{ __html: price }} />
                      </div>
                      <p className={css["servingsClass"]} dangerouslySetInnerHTML={{ __html: serves }} />
                      <p className={css["descriptionClass"]} dangerouslySetInnerHTML={{ __html: description }} />
                    </li>
                  );
                })}
              </ul>
            );
          } else if (["h1", "h2", "h3"].includes(element)) {
            // Dynamically render <h1>, <h2>, or <h3> based on `element`
            const Tag = element; // React allows dynamic tags as components
            return <Tag key={i} className={css[`${element}Class`]} dangerouslySetInnerHTML={{ __html: content }} />;
          }
        })}
      </div>
    </div>
  );
};

export default Menu;
