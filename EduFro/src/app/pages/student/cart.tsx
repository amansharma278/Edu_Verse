import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Trash2, Tag } from "lucide-react";

const cartItems = [
  {
    id: "5",
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    price: 89.99,
    originalPrice: 139.99,
    thumbnail: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=400",
  },
  {
    id: "6",
    title: "Advanced React & Redux",
    instructor: "Stephen Grider",
    price: 84.99,
    originalPrice: 129.99,
    thumbnail: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400",
  },
];

export function Cart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
  const total = subtotal;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{cartItems.length} courses in cart</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex gap-4">
                <ImageWithFallback
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-24 w-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {item.instructor}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">${item.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${item.originalPrice}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Input placeholder="Enter coupon code" />
                <Button variant="outline">
                  <Tag className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#10b981]">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/student/checkout">
              <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
