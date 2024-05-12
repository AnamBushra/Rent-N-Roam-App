import img1 from "./pics/Agra/1.png";
import img2 from "./pics/Agra/2.png";
import img3 from "./pics/Agra/3.png";
import img4 from "./pics/ajmer/1.png";
import img5 from "./pics/ajmer/2.png";
import img6 from "./pics/ajmer/3.png";
import img7 from "./pics/darjeeling/1.png";
import img8 from "./pics/darjeeling/2.png";
import img9 from "./pics/darjeeling/3.png";
import img10 from "./pics/delhi/1.png";
import img11 from "./pics/delhi/2.png";
import img12 from "./pics/delhi/3.png";
import img13 from "./pics/gangtok/1.png";
import img14 from "./pics/gangtok/2.png";
import img15 from "./pics/gangtok/3.png";
import img16 from "./pics/goa/1.png";
import img17 from "./pics/goa/2.png";
import img18 from "./pics/goa/3.png";
import img19 from "./pics/indore/1.png";
import img20 from "./pics/indore/2.png";
import img21 from "./pics/indore/3.png";
import img22 from "./pics/jaipur/1.png";
import img23 from "./pics/jaipur/2.png";
import img24 from "./pics/jaipur/3.png";
import img25 from "./pics/manali/1.png";
import img26 from "./pics/manali/2.png";
import img27 from "./pics/manali/3.png";
import img28 from "./pics/mumbai/1.png";
import img29 from "./pics/mumbai/2.png";
import img30 from "./pics/mumbai/3.png";
import img31 from "./pics/ranthambore/1.png";
import img32 from "./pics/ranthambore/2.png";
import img33 from "./pics/ranthambore/3.png";
import img34 from "./pics/udaipur/1.png";
import img35 from "./pics/udaipur/2.png";
import img36 from "./pics/udaipur/3.png";

export const cityData = [
  {
    id: "city1",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Taj_Mahal%2C_Agra%2C_India.jpg",
    title: {
      shortTitle: "Agra",
    },
    tagline: "Loves Echo in Stone",
    images: [img1, img2, img3],
  },
  {
    id: "city2",
    url: "https://www.justahotels.com/wp-content/uploads/2023/10/Places-To-Visit-in-Manali.jpg",
    detailUrl:
      "https://www.justahotels.com/wp-content/uploads/2023/10/Places-To-Visit-in-Manali.jpg",
    title: {
      shortTitle: "Manali",
      longTitle: "Flipkart SmartBuy Sandwich 01 Grill  (Black)",
    },
    price: {
      mrp: 1499,
      cost: 899,
      discount: "40%",
    },
    quantity: 1,
    description:
      "This non-stick sandwich toaster .easy to use and very handy. Directly hold over flame to make tasty toasts and toasted sandwiches. Specially designed by keeping your needs in mind, the sandwich maker makes whatever youre doing simpler, smarter and better",
    discount: "From 99+5% Off",
    tagline: "Adventure in Every Breath",
    images: [img25, img26, img27],
  },
  {
    id: "city3",
    url: "https://www.tajhotels.com/content/dam/thrp/destinations/Ajmer/city-highlights/1x1sightseeing/DPA-SAB-173698.jpg",
    detailUrl:
      "https://www.tajhotels.com/content/dam/thrp/destinations/Ajmer/city-highlights/1x1sightseeing/DPA-SAB-173698.jpg",
    title: {
      shortTitle: "Ajmer",
      longTitle:
        "AJRO DEAL New Adjustable Single Resistance Tube (Multicolor) Resistance Tube  (Multicolor)",
    },
    price: {
      mrp: 499,
      cost: 166,
      discount: "66%",
    },
    quantity: 1,
    description:
      "This unique product can tone your back muscles, reduce belly fat, improve blood circulation and also improves your body posture. It increases the stamina, energy and vitality of the body. The elastic resistance of the rubber training rope can be used to train and exercise in whichever way you want, according to your physical needs.",
    discount: "Upto 70% Off",
    tagline: "Tranquil Tales Unfold",
    images: [img4, img5, img6],
  },
  {
    id: "city4",
    url: "https://hikerwolf.com/wp-content/uploads/2020/04/Darjeeling-toy-train-route.jpg",
    detailUrl:
      "https://hikerwolf.com/wp-content/uploads/2020/04/Darjeeling-toy-train-route.jpg",
    title: {
      shortTitle: "Darjeeling",
      longTitle: "Molife Sense 500 Smartwatch  (Black Strap, Freesize)",
    },
    price: {
      mrp: 6999,
      cost: 4049,
      discount: "42%",
    },
    quantity: 1,
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Grab Now",
    tagline: "Misty Hills, Warm Hearts",
    images: [img7, img8, img9],
  },
  {
    id: "city5",
    url: "https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Lake_Palace_Udaipur/images/new-gallery/facade-1.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
    detailUrl:
      "https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Lake_Palace_Udaipur/images/new-gallery/facade-1.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
    title: {
      shortTitle: "Udaipur",
      longTitle: "Nova Professional NHP 8220 Hair Dryer  (1800 W, Multicolor)",
    },
    price: {
      mrp: 1899,
      cost: 1124,
      discount: "40%",
    },
    quantity: 1,
    description: "",
    discount: "From ₹499",
    tagline: "Royal Charm with Lakeside magic",
    images: [img34, img35, img36],
  },
  {
    id: "city6",
    url: "https://assets.vogue.in/photos/5ce41ea8b803113d138f5cd2/1:1/w_1080,h_1080,c_limit/Jaipur-Travel-Shopping-Restaurants.jpg",
    detailUrl:
      "https://assets.vogue.in/photos/5ce41ea8b803113d138f5cd2/1:1/w_1080,h_1080,c_limit/Jaipur-Travel-Shopping-Restaurants.jpg",
    title: {
      shortTitle: "Jaipur",
      longTitle:
        "Portable 300 mm Ultra High Speed 3 Blade Table Fan  (Black, Pack of 1)",
    },
    price: {
      mrp: 2250,
      cost: 1199,
      discount: "46%",
    },
    quantity: 1,
    description:
      'Table Fan. Perfect size fan for use on a table, desk or in an RV. Whisper quiet, powerful airflow and reliable operation in a compact 6" size. Two adjustable speeds to customize airflow: high or low settings. Tough break-resistant ABS plastic blades. ',
    discount: "Minimum 40% Off",
    tagline: "Pink City, Timeless Elegance",
    images: [img22, img23, img24],
  },
  {
    id: "city7",
    url: "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    detailUrl:
      "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    title: {
      shortTitle: "Ranthambore",
      longTitle:
        "boAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset ",
    },
    price: {
      mrp: 2990,
      cost: 1199,
      discount: "59%",
    },
    quantity: 1,
    description:
      "Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.",
    discount: "Minimum 50% Off",
    tagline: "Experience wild majesty up close",
    images: [img31, img32, img33],
  },
  {
    id: "city8",
    url: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
    detailUrl:
      "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    title: {
      shortTitle: "Delhi",
      longTitle: "Where History Meets Modern Marvels",
    },
    price: {
      mrp: 2990,
      cost: 1199,
      discount: "59%",
    },
    quantity: 1,
    description:
      "Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.",
    discount: "Minimum 50% Off",
    tagline: "Where History Meets Modern Marvels",
    images: [img10, img11, img12],
  },
  {
    id: "city9",
    url: "https://t3.ftcdn.net/jpg/01/13/01/70/240_F_113017086_PtETiC3OfSiiAfK9q8egOlvdjmwORkBh.jpg",
    detailUrl:
      "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    title: {
      shortTitle: "Indore",
      longTitle:
        "boAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset ",
    },
    price: {
      mrp: 2990,
      cost: 1199,
      discount: "59%",
    },
    quantity: 1,
    description:
      "Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.",
    discount: "Minimum 50% Off",
    tagline: "The Heart of Heritage and Harmony",
    images: [img19, img20, img21],
  },
  {
    id: "city10",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mumbai_Aug_2018_%2843397784544%29.jpg/640px-Mumbai_Aug_2018_%2843397784544%29.jpg",
    detailUrl:
      "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    title: {
      shortTitle: "Mumbai",
      longTitle:
        "boAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset ",
    },
    price: {
      mrp: 2990,
      cost: 1199,
      discount: "59%",
    },
    quantity: 1,
    description:
      "Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.",
    discount: "Minimum 50% Off",
    tagline: "The City of Dreams and Diversity",
    images: [img28, img29, img30],
  },
  {
    id: "city11",
    url: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/10/18/16/goa-overview.jpg",
    detailUrl:
      "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    title: {
      shortTitle: "Goa",
      longTitle:
        "boAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset ",
    },
    price: {
      mrp: 2990,
      cost: 1199,
      discount: "59%",
    },
    quantity: 1,
    description:
      "Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.",
    discount: "Minimum 50% Off",
    tagline: "The Land of Sun, Sand, and Spirit",
    images: [img16, img17, img18],
  },
  {
    id: "city12",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUWcDQt5JKo4RJqvGeyx8FuEVwzefyO1la4P5scqcxVp8jshkyYtwVgxuQQkCeMEfERqo&usqp=CAU",
    detailUrl:
      "https://www.tripsavvy.com/thmb/dV7zQhV4qJ_mPL8AmzjenGByzk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tres-bengala-tigres-en-frente-de-turista-de-520373860-735d4cd8c3b147d98cce1f158d0eefab.jpg",
    title: {
      shortTitle: "Gangtok",
      longTitle:
        "boAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset ",
    },
    price: {
      mrp: 2990,
      cost: 1199,
      discount: "59%",
    },
    quantity: 1,
    description:
      "Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.",
    discount: "Minimum 50% Off",
    tagline: "Where Serenity Meets the Himalayas",
    images: [img13, img14, img15],
  },
];
