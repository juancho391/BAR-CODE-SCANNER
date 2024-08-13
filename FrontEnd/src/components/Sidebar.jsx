import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet.jsx";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";

const cartItems = [
  {
    id: crypto.randomUUID(),
    name: "Galletas Oreo",
    description:
      "Galletas de chocolate rellenas de una deliciosa crema blanca por dentro que te dejara con ganas de comer mas.",
  },
  {
    id: crypto.randomUUID(),
    name: "Café con Leche",
    description:
      "Un delicioso café mezclado con leche fresca, perfecto para empezar el día.",
  },
  {
    id: crypto.randomUUID(),
    name: "Tortilla de Patatas",
    description:
      "Una tortilla de patatas casera, hecha con amor y dedicación, para disfrutar en cualquier momento.",
  },
  {
    id: crypto.randomUUID(),
    name: "Pizza Margherita",
    description:
      "Una pizza clásica italiana, con salsa de tomate, mozzarella fresca y albahaca, perfecta para una noche de cine.",
  },
  {
    id: crypto.randomUUID(),
    name: "Hamburguesa Clásica",
    description:
      "Una hamburguesa clásica, con carne de ternera, lechuga, tomate, cebolla y queso, para disfrutar en un día de verano.",
  },
  {
    id: crypto.randomUUID(),
    name: "Ensalada de Frutas",
    description:
      "Una fresca ensalada de frutas, con una variedad de colores y sabores, perfecta para una comida ligera.",
  },
];

const Sidebar = () => {
  return (
    <section className="absolute top-10 right-12">
      <Sheet>
        <SheetTrigger>
          <img
            src={shoppingCartIcon}
            alt="shopping-cart"
            width={37}
            className="invert"
          />
        </SheetTrigger>
        <SheetContent className="min-w-[500px] bg-gradient-to-br from-[#30cfd0] to-[#330867] border-none">
          <SheetHeader>
            <SheetTitle className="text-[28px] text-[#ddd] mb-7 mt-1">
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-col space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center h-16 rounded-lg border-2 border-[#2AC8CA]"
                  >
                    <span className="ml-4 text-[#ddd] text-xl gradient-text">
                      {index + 1}
                    </span>
                    <span className="ml-4 text-[16px] font-bold text-[#ddd]">
                      {item.name}
                    </span>
                    <span
                      className="ml-4 text-[#ddd] overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: "60%" }}
                    >
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Sidebar;
