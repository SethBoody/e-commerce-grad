-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2024 at 10:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street` varchar(50) NOT NULL,
  `postalCode` varchar(20) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `street`, `postalCode`, `state`, `city`, `userId`) VALUES
(21, 'qwer', 'erwq', 'United Arab Emirates', 'qwer', 15),
(22, 'qwer', 'qewr', 'Antigua and Barbuda', 'wqerqewr', 15);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `imageUrl`) VALUES
(1, 'Zara', 'https://i.ibb.co/R6kk5Sx/Zara-Logo-1.png'),
(2, 'Dolce Gabbana', 'https://i.ibb.co/xS4Bxwk/Dolce-Gabbana-1.png'),
(3, 'H&M', 'https://i.ibb.co/HxJgYJN/layer1.png'),
(4, 'Chanel', 'https://i.ibb.co/rfmBFR5/Chanel-logo-interlocking-cs-1.png'),
(5, 'Prada', 'https://i.ibb.co/105JXWk/Prada-Logo-1.png'),
(6, 'Biba', 'https://i.ibb.co/3rzrX4B/logo-1.png'),
(7, 'Coach', 'https://i.ibb.co/0X4qPBV/coach-logo-removebg-preview.png'),
(8, 'Remus', 'https://i.ibb.co/nn9YdfG/remus-vector-logo-200x200.png'),
(11, 'Kidol & Shellder', 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f89ef351-7566-47ff-9692-8b7446d61c8c.__CR0,0,600,450_PT0_SX600_V1___.jpg'),
(12, 'Cyan Design', 'https://cyan.design/wp-content/uploads/2024/02/Cyan_logo.png'),
(13, 'Feonase Store', 'https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/f8104e2b-ad2a-42db-b724-6097afac44a1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `totalPrice` decimal(20,2) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `totalPrice`, `userId`) VALUES
(11, 0.00, 11),
(12, 279.97, 12),
(13, 533.96, 13),
(14, 0.00, 14),
(15, 0.00, 15);

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `id` int(11) NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cartitem`
--

INSERT INTO `cartitem` (`id`, `price`, `quantity`, `productId`, `cartId`) VALUES
(11, 49.99, 2, 7, 12),
(12, 179.99, 1, 13, 12),
(15, 266.98, 2, 62, 13);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `imageUrl`, `isFeatured`) VALUES
(1, 'Skincare', 'https://specials-images.forbesimg.com/imageserve/605d4864bc70d50fa42b5194/Best-Skincare-Routine/960x0.jpg?fit=scale', 1),
(2, 'Personal Care', 'https://www.dow.com/content/dam/dcc/images/heroes/l1-hero/l1hero-market/beauty/as_299060393-mkthero2-face-products-380x135.jpg', 0),
(3, 'Handbags', 'https://i.ibb.co/N9xjTXk/image-2.png', 1),
(4, 'Apparels', 'https://www.incrediwire.com/wp-content/uploads/2022/10/3-1024x536.png', 1),
(5, 'Watches', 'https://apviz.io/uploads/digital-tools-watch.jpg', 1),
(6, 'Eye Wear', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREiZSvGSkjvUGfgWV0v18yqGIy0CTG-Cu8aA&usqp=CAU', 0),
(7, 'Jewellery', 'https://www.eventige.com/hubfs/Jewelry-Marketing-Agency.png', 1),
(8, 'Furniture', 'https://static.vecteezy.com/system/resources/previews/024/607/158/original/furniture-icon-armchair-illustration-sign-sofa-symbol-or-logo-vector.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `discountPercentage` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `description`, `discountPercentage`) VALUES
(1, '10% Off on Summer Collection', 10),
(2, 'Flash Sale - 20% Off Sitewide', 20),
(3, 'Holiday Special: Buy One Get One Free', 100),
(4, 'Save Big: Get 60% Off Today!', 60),
(5, 'Save 15% on Your Next Purchase with Our Exclusive Discount!', 15),
(6, 'No Discount', 0);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `totalPrice` decimal(20,2) NOT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `deliveryFee` decimal(20,2) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `taxId` int(11) NOT NULL,
  `discountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `totalPrice`, `date`, `status`, `deliveryFee`, `paymentId`, `cartId`, `userId`, `addressId`, `taxId`, `discountId`) VALUES
(11, 251.98, '2024-06-24', 'Delivered', 12.00, 4, 15, 15, 21, 1, 6),
(12, 251.98, '2024-06-24', 'Delivered', 12.00, 4, 15, 15, 21, 1, 6),
(13, 251.98, '2024-06-24', 'Delivered', 12.00, 4, 15, 15, 22, 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`id`, `price`, `quantity`, `productId`, `orderId`) VALUES
(11, 119.99, 2, 10, 11),
(12, 119.99, 2, 10, 12),
(13, 119.99, 2, 10, 13);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `provider` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `provider`, `status`, `type`) VALUES
(1, 'Stripe', 'Active', 'Credit Card'),
(2, 'PayPal', 'Active', 'PayPal Balance'),
(3, 'Cash', 'Active', 'On Delivery Cash'),
(4, 'Bank', 'Active', 'Bank Card'),
(5, 'PayPal', 'Success', 'Bank Transfer');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `availableInStock` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `brandId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `price`, `availableInStock`, `imageUrl`, `categoryId`, `brandId`, `createdAt`, `updatedAt`) VALUES
(1, 'Classic Watch', 'A timeless piece for every occasion.', 100.00, 50, 'https://www.linjer.co/cdn/shop/products/linjer-classic-watch-38-gunmetal-black-1-front_1000x.jpg?v=1602577160', 5, 1, '2023-05-23 08:08:55', '2023-11-02 13:28:23'),
(2, 'Leather Handbag', 'Elegance in every detail, crafted with genuine leather.', 150.00, 30, 'https://atpatelier.com/cdn/shop/products/Arezzo_Brandy_Vacchetta_Handbag_Front.jpg?v=1678205144', 4, 2, '2023-10-23 08:08:55', '2023-11-02 13:29:49'),
(3, 'Aviator Sunglasses', 'Protect your eyes with style.', 60.00, 40, 'https://www.slazenger.com/images/imgzoom/75/75617266_xxl.jpg', 6, 3, '2023-10-23 08:08:55', '2023-11-02 13:32:01'),
(4, 'Fedora Hat', 'A classic accessory for a touch of sophistication.', 35.00, 25, 'https://media.lanecrawford.com/E/E/X/EEX173_in_l.jpg', 4, 1, '2023-05-23 08:08:55', '2023-11-02 13:34:07'),
(5, 'Diamond Necklace', 'Shine bright with this exquisite diamond necklace.', 300.00, 15, 'https://www.damiani.com/media/catalog/product/2/0/20055859_c_1.jpg', 7, 2, '2024-04-04 19:53:12', '2024-04-04 19:53:12'),
(6, 'Stylish Backpack', 'Versatile and trendy, perfect for daily adventures.', 80.00, 35, 'https://cdn.thewirecutter.com/wp-content/media/2022/12/laptopbackpacks-2048px-6905.jpg?auto=webp&quality=75&width=1024', 4, 8, '2023-05-23 08:08:55', '2023-11-02 13:35:57'),
(7, 'Silver Bracelet', 'Add a touch of elegance to your wrist.', 49.99, 28, 'https://m.media-amazon.com/images/I/61qEaJh9NVL._AC_SY675_.jpg', 7, 1, '2024-04-04 19:53:12', '2024-04-04 19:53:12'),
(8, 'Wide-Brim Hat', 'Stay stylish and sun-protected.', 39.99, 22, 'https://www.levinehat.com/cdn/shop/products/IMG_5170.png?v=1569966302', 4, 5, '2023-10-23 08:08:55', '2023-11-02 13:40:27'),
(9, 'Gold Earrings', 'Accentuate your look with these dazzling gold earrings.', 89.99, 18, 'https://i.pinimg.com/550x/ed/88/55/ed885578c95d42d18fac841378f80e7f.jpg', 7, 6, '2023-10-23 08:08:55', '2023-11-02 13:41:39'),
(10, 'Modern Wristwatch', 'Sleek design for the contemporary lifestyle.', 119.99, 16, 'https://www.watchtime.com/wp-content/uploads/2018/08/Jaeger-LeCoultre-Polaris-Memovox_Front-1000.jpg', 5, 4, '2023-10-23 08:08:55', '2024-06-24 20:37:31'),
(11, 'Canvas Tote Bag', 'A stylish and spacious tote for everyday use.', 49.99, 40, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/445076/item/goods_30_445076.jpg?width=494', 3, 7, '2023-10-23 08:08:55', '2023-11-02 13:44:12'),
(12, 'Sporty Backpack', 'Perfect for the active lifestyle, designed for comfort.', 64.99, 35, 'https://ca.targus.com/cdn/shop/products/0028543_156-sport-backpack-224802_1024x1024.png?v=1656002516', 4, 6, '2023-10-23 08:08:55', '2023-11-02 13:44:50'),
(13, 'Pearl Necklace', 'Timeless elegance with a string of pearls.', 179.99, 20, 'https://stilllife.store/cdn/shop/products/classicwithgildtoggle.jpg', 7, 1, '2024-04-04 19:53:12', '2024-04-04 19:53:12'),
(14, 'Leather Wallet', 'Classic design with multiple compartments for your essentials.', 29.99, 50, 'https://www.tradeinn.com/f/13787/137871445/dolce---gabbana-710262-men-leather-wallet.jpg', 4, 2, '2023-10-23 08:08:55', '2023-11-02 13:46:43'),
(15, 'Retro Sunglasses', 'Channel your inner vintage with these stylish shades.', 54.99, 30, 'https://www.icing.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dw9f321d1e/images/icing/hi-res/59699_1.jpg?sw=734&sh=734&sm=fit', 6, 2, '2023-05-23 08:08:55', '2023-11-02 13:48:00'),
(16, 'Silver Cuff Bracelet', 'A statement piece to elevate your wristwear.', 69.99, 25, 'https://cdn-images.farfetch-contents.com/18/19/37/69/18193769_40365499_600.jpg', 7, 5, '2023-10-23 08:08:55', '2023-11-02 13:49:01'),
(17, 'Panama Hat', 'Stay cool and stylish under the sun.', 44.99, 28, 'https://d2mpxrrcad19ou.cloudfront.net/item_images/385535/8586910_fullsize.jpg', 4, 4, '2023-10-23 08:08:55', '2023-11-02 13:56:43'),
(18, 'Rose Gold Earrings', 'Add a touch of warmth with these elegant rose gold earrings.', 99.99, 18, 'https://cfs3.monicavinader.com/images/pdp-small-large/14347838-rp-ea-swer-ros-f1.jpg', 7, 3, '2023-10-23 08:08:55', '2023-11-02 13:57:56'),
(19, 'Minimalist Wristwatch', 'Simplicity meets sophistication in this modern timepiece.', 89.99, 32, 'https://www.linjer.co/cdn/shop/products/linjer-minimalist-watch-38-rose-gold-mocha-1-front_1000x.jpg?v=1571295293', 5, 5, '2023-05-23 08:08:55', '2023-11-02 13:58:51'),
(20, 'Crystal Pendant Necklace', 'Capture the light with this dazzling crystal pendant.', 129.99, 15, 'https://m.media-amazon.com/images/I/81k1fn921lL._AC_SL1500_.jpg', 7, 2, '2023-10-23 08:08:55', '2023-11-02 14:00:08'),
(21, 'Leather Crossbody Bag', 'Compact and versatile, perfect for on-the-go.', 74.99, 22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5anxgeKxSACMDXs7Ly6GI5BRM2WO6HX_79A&usqp=CAU', 3, 3, '2023-10-23 08:08:55', '2023-11-02 14:02:09'),
(22, 'Diamond Stud Earrings', 'Timeless elegance with a touch of sparkle.', 149.99, 17, 'https://image.brilliantearth.com/media/product_images/25/BE304RD400_white_top.jpg', 7, 1, '2023-10-23 08:08:55', '2023-11-02 14:03:14'),
(23, 'Laptop Backpack', 'Stay organized and stylish with this tech-friendly backpack.', 89.99, 20, 'https://mt.studio.ps/web/image/product.template/2253/image_1024?unique=d6f4e12', 4, 2, '2023-05-23 08:08:55', '2023-11-02 14:28:30'),
(24, 'Gold Link Bracelet', 'Make a statement with this bold and trendy gold link bracelet.', 79.99, 19, 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearsmall-link-bracelet-38086839_993599_ED.jpg', 7, 3, '2023-10-23 08:08:55', '2023-11-02 14:53:55'),
(25, 'Classic Aviator Sunglasses', 'Achieve a timeless look with these iconic aviator shades.', 59.99, 25, 'https://images.ray-ban.com/is/image/RayBan/805289602057__STD__shad__qt.png?impolicy=RB_Product&width=800&bgc=%23f2f2f2', 4, 1, '2023-10-23 08:08:55', '2023-11-02 14:54:38'),
(26, 'Hydrated Ever After Skincare Mini Kit', 'This skincare kit has all of your favorite Holy Hydration necessities- a Holy Hydration! Daily Cleanser, Holy Hydration! Makeup Melting Cleansing Balm, Hydrating Booster Drops, Holy Hydration! Face Cream & Eye Cream.', 19.90, 15, 'https://m.media-amazon.com/images/I/71sluGVCHgL._SL1500_.jpg', 1, 6, '2023-11-07 14:04:14', '2023-11-07 14:04:14'),
(27, 'Ice Roller for Face and Eye', 'Suitable for all types of skin. treat acne and sensitive skin, reduce redness & swelling, remove edema, puffiness and fine lines, smooth skin, improve skin problems, body massage care. It has multiple functions such as cleansing ,beauty, stimulates blood circulation and physical cooling when you have a fever.', 8.99, 10, 'https://m.media-amazon.com/images/I/512xda4M6YL._SL1500_.jpg', 1, 3, '2023-11-07 14:04:14', '2023-11-07 14:04:14'),
(30, 'Manicure Set Personal Care Nail Clipper Kit', 'Manicure Set: Professional Manicure Kit Contains nail and toenail tools, Multifunctiona includes hand care, facial care, and foot care tools.', 7.98, 15, 'https://m.media-amazon.com/images/I/71rH7dutmSL._SL1500_.jpg', 2, 5, '2023-11-07 14:12:12', '2023-11-07 14:12:12'),
(31, 'Gift Baskets for Women', 'Beauty Kits for Women - Elevate your self-care routine with our all-inclusive 13-piece beauty kit for women, offering premium skin care for teen girls and all women alike. Experience a luxurious, retro-themed spa day at home.', 64.97, 15, 'https://m.media-amazon.com/images/I/91FTEvRP-hL._SL1500_.jpg', 2, 6, '2023-11-07 14:12:12', '2023-11-07 14:12:12'),
(32, 'Gift Baskets for Women, Beauty Kit for Women', 'Beauty Kits for Women - Elevate your self-care routine with our all-inclusive 13-piece beauty kit for women, offering premium skin care for teen girls and all women alike. Experience a luxurious, retro-themed spa day at home.', 64.97, 15, 'https://m.media-amazon.com/images/I/91FTEvRP-hL._SL1500_.jpg', 2, 7, '2023-11-07 14:21:20', '2023-11-07 14:21:20'),
(33, 'Diamond Pendant Necklace', 'Make a statement with this dazzling diamond pendant.', 199.99, 15, 'https://www.example.com/diamond-pendant-necklace.jpg', 7, 1, '2023-11-07 14:35:00', '2023-11-07 14:35:00'),
(34, 'Casual T-Shirt', 'Comfortable and stylish for everyday wear.', 25.00, 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTil4UHHaX1e7GqmQC_R34cabrroIZvrWCvUYEJ3MLhoA&s', 4, 2, '2023-11-07 14:38:00', '2023-11-07 14:38:00'),
(35, 'Smart Watch', 'Stay connected with this modern smartwatch.', 149.99, 18, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYR9R5n5rl4V-EqDv7_NvQqG3bz4FwgaAN1Qt-74wFgg&s', 5, 5, '2023-11-07 14:40:00', '2023-11-07 14:40:00'),
(36, 'Avant-Garde Sunglasses', 'Step out in style with these unique sunglasses.', 75.00, 22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZheEQool_wjHKtn0ldMHNSwkROW9zKtCmKS6JZaYG3A&s', 6, 6, '2023-11-07 14:42:00', '2023-11-07 14:42:00'),
(37, 'Fashionable Backpack', 'A trendy and spacious backpack for your essentials.', 65.00, 28, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmwNJWqIjm0LO1iorayZzyAuaBt7WYOd3JQGpcGzV&s', 4, 7, '2023-11-07 14:45:00', '2023-11-07 14:45:00'),
(38, 'Gold Bangle Bracelet', 'Add a touch of glamour to your wrist with this gold bangle.', 89.99, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4AJS18dKM7a16lMtwj8Mcm_xjG6Y9wJS8FrURbkDAJw&s', 7, 3, '2023-11-07 14:48:00', '2023-11-07 14:48:00'),
(39, 'Chic Crossbody Bag', 'Compact and stylish, perfect for on-the-go fashion.', 55.00, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlwbQBRKgKLws0gw4SsuPjbpr-f0ojQMJuIxT1MScTA&s', 3, 2, '2023-11-07 14:50:00', '2023-11-07 14:50:00'),
(40, 'Luxury Wristwatch', 'Elevate your wristwear with this luxurious timepiece.', 189.99, 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOMnZuhLIgpp5-68TmzURn6nRcxViSRLhwm-K0jfG&s', 5, 4, '2023-11-07 14:52:00', '2023-11-07 14:52:00'),
(41, 'Statement Earrings', 'Make a bold statement with these eye-catching earrings.', 79.99, 18, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH1NTnxhc6y10npC17QVoow1a1QGUrlEMGgf6H3tgyoQ&s', 7, 5, '2023-11-07 14:55:00', '2023-11-07 14:55:00'),
(42, 'Casual Sneakers', 'Comfort meets style with these casual sneakers.', 49.99, 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMe8YdgEz3RzZHp5PyJaCZsjRmT86d9IG4WxAMUz_OA&s', 4, 1, '2023-11-07 14:58:00', '2023-11-07 14:58:00'),
(43, 'Silver Link Bracelet', 'A sleek and modern silver link bracelet for any occasion.', 69.99, 22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM0lnVbOUNdqjwF9BcE9Izc2Y1_lIwzQuqzCorGnWwgw&s', 7, 6, '2023-11-07 15:00:00', '2023-11-07 15:00:00'),
(44, 'Stylish Sun Hat', 'Stay shaded in style with this fashionable sun hat.', 34.99, 28, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpPXFyvqKD2RS1dAW6oT3p7nTIxWG9PbQ-3eXb6fOeQ&s', 4, 8, '2023-11-07 15:02:00', '2023-11-07 15:02:00'),
(45, 'Classic Wallet', 'Keep your essentials organized with this classic wallet.', 39.99, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQibZFcSZQYf30B8Ayrxdt1bIm01BH3gcO2Ul8C7hURpw&s', 4, 2, '2023-11-07 15:05:00', '2023-11-07 15:05:00'),
(46, 'Pearl Necklace', 'Elegance meets sophistication with this timeless pearl necklace.', 129.99, 17, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREiNi8AD-cCnkDB1-T1esUsstEBddrhT_xH0FrEL5t&s', 7, 1, '2023-11-07 15:08:00', '2023-11-07 15:08:00'),
(47, 'Denim Jacket', 'A classic denim jacket for a trendy and casual look.', 79.99, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC4m2AvFTEGF_sSO1gf6g_1sNgBVdGkDF-TYhkWgaM&s', 4, 3, '2023-11-07 15:10:00', '2023-11-07 15:10:00'),
(48, 'Leopard Print Clutch', 'Add a touch of wild to your outfit with this leopard print clutch.', 49.99, 22, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs5ykcpkvHJTamjAxWDwxEFI3lf23z1xO4Q9Cp8dkqWg&s', 3, 7, '2023-11-07 15:12:00', '2023-11-07 15:12:00'),
(49, 'Diamond Bracelet', 'Sparkle and shine with this exquisite diamond bracelet.', 159.99, 15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IIdA7AZr5PHTlmJxZkFRPyzLdE5WknKGNEMYmKUx1g&s', 7, 2, '2023-11-07 15:15:00', '2023-11-07 15:15:00'),
(50, 'Rose Gold Watch', 'A stylish timepiece with a touch of elegance.', 110.00, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4dcfXuiL8fruKMc_w_njkHwfCFsCXk91FCHRadY91&s', 5, 3, '2023-11-07 14:30:00', '2023-11-07 14:30:00'),
(51, 'Leather Shoulder Bag', 'Versatile and chic, perfect for any occasion.', 120.00, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScZ2wLvNwvOXDItbwzzC7FOLjNvUeAkXFbW610MTII8w&s', 3, 4, '2023-11-07 14:32:00', '2023-11-07 14:32:00'),
(52, 'Canvas Slip-On Shoes', 'Easy and comfortable slip-on shoes for a casual day out.', 29.99, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqBBXfQIVaW9eFu7jtE23FKzTRYrkdEywPSGvB_3aug&s', 4, 1, '2023-11-07 15:18:00', '2023-11-07 15:18:00'),
(53, 'Silver Hoop Earrings', 'Timeless silver hoop earrings for a classic look.', 49.99, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb1492YwvJ8YpvrB5BsJ_RQagav4zOrKtjjcLz3AzchQ&s', 7, 5, '2023-11-07 15:20:00', '2023-11-07 15:20:00'),
(55, 'Statement Sunglasses', 'Make a bold statement with these oversized sunglasses.', 69.99, 18, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqu1-G9OjZdqaGPIE5Dlcyek7a9dSg0Y2ItXsrEBgyDg&s', 6, 6, '2023-11-07 15:25:00', '2023-11-07 15:25:00'),
(56, 'Iron Walker Automatic Men Watch', 'Iron Watch full metal for classic and old fashioned men', 60.00, 50, 'https://wempe-media.com/media/image/WI100004_wempe_01.jpg', 5, 8, '2024-06-01 11:36:17', '2024-06-24 19:13:52'),
(59, 'Bar Stools Set of 2 Counter Height Adjustable Swiv', '?【Vintage Design】: The perfect combination of high quality faux leather and marker stitching craftsmanship makes the counter height bar stools different from other barstools. These counter stools have a novel design and are ideal for modern home counters, bars, kitchen islands, etc.\r\n\r\n?【Sturdy and Comfortable】: The metal frame of the counter height chairs ensure durability and stability. The cushion is made of high-density foam and PU leather, which is very comfortable and relaxing to sit on, as well as waterproof and easy to clean.\r\n?【Adjustable Height and 360° Swivel】: The stools for kitchen counter are equipped with a gas lift handle certified by SGS. Anyone can easily adjust the height of the modern bar stools from 21.46-31.30 inches. Our swivel bar stools also supports 360 degree rotation for better experience.\r\n\r\n?【Wear and scratch resistant】: The barstools set of 2 are made of a sturdy metal base with footrest, which has a rubber ring to prevent floor from scratching. And it also prevent harsh sounds when moving the bar chairs. The Three-layer painting process of the stools assures longevity.', 239.99, 50, 'https://m.media-amazon.com/images/I/71gTRfzYHCL._AC_SY450_.jpg', 8, 11, '2024-06-22 14:44:51', '2024-06-22 14:44:51'),
(60, 'Cyan Design 06909 Abracadabra Vase, Large', 'The Item Package Dimensions length is: 11.75\"L\r\nThe Item Package Dimensions Width is: 11.75\"W\r\nThe Item Package Dimensions Height is: 22.75\"H\r\nThe Package weight of the Product: 10.0 lb', 125.91, 50, 'https://m.media-amazon.com/images/I/51fNDbH5g1L._AC_SY450_.jpg', 8, 12, '2024-06-22 15:02:29', '2024-06-22 15:02:29'),
(61, 'Modern Glass Table Lamps Set of 2, 3-Way Dimmable ', '【GORGEOUS TABLE LAMP】This set of 2 bedside lamps is wrapped in transparent glass with a gold-plated decorative tube, full of artistic atmosphere, adding richness and texture to your space. Paired with a detachable drum shaped white fabric lampshade, it can basically adapt to any decorative style. This unique piece is sure to inspire a million compliments no matter where it sits.\r\n【3 WAY DIMMABLE】The glass table lamps use 150 watt standard E26 light bulb, Bulb not included. It can be compatible with a variety of incandescent, LED or CFL light bulbs. It can provide different brightness levels, allowing you to change the visual appearance and atmosphere of the space at any time. A 3-way rotary socket switch will only work with a 3-way light bulb, otherwise, this lamp will function with a simple on/off switch at its highest setting.\r\n【DIMENSION】Nightstand lamps set of 2 TH: 23.25\", TOB: 12.25\". Lampshade is: 13‘’*13’’*9.5’’, round flat cover, white fabric. Thanks to the 60-inch power cord, you can put the light anywhere in your room no matter how far away the socket is. Thanks to its rotary switch, you can control it easily from the comfort of your bed or couch.\r\n【Eye Protection and Widely Used】With the soft light emitted, our nightstand lamp can effectively relieve eye fatigue and protect the eyesight of your family. The design of this bedroom lamp has a lot of modern styles. It is an exquisite gift for family and friends and perfect for the living room, bedroom, and study room, providing you with peace of mind lighting.\r\n【Easy Assemble】The buffet lamp is easy to assemble without any tools, just need to install all the parts together via following the instruction. Please buy it with confidence!', 83.99, 50, 'https://m.media-amazon.com/images/I/61p0m8qk0kL._AC_SX342_PIbundle-2,TopRight,0,0_SH20_.jpg', 8, 13, '2024-06-22 15:02:29', '2024-06-22 15:02:29'),
(62, 'Feonase Full Bed Frame with Luxury Wingback Uphols', 'Luxury & Comfortable: 16\" wide huge wingback headboard designed with the innovative fashionable nailhead trim and button tufted design, will add sophisticated and fashionable style to any bedroom. Wrapped with high rebound memory sponge, is soft and breathable, providing a cozy backrest experience\r\nStorage Headboard with Charging Station: Built-in 2 AC outlets and 2 USB ports, let you charge within your reach. Besides, the top of the headboard leaves 4\" storage space, making it convenient for you to place commonly used items, such as books, phones, cameras, etc\r\nStable and Durable: Composed of the solid metal frame and central cross design of 12 thickened wooden slats, reinforce the sturdiness and durability of this full size platform bed\r\nSaving Space: The full bed 8\" extra underbed storage space provides enough space for storing items, and is great for storing boxes, shoes, etc, keeping your room tidy and clutter-free\r\nNoise-Free & Easy Assembly: EVA strips between the slats and metal frame provide cushioning resulting in noise-free use. All slats are attached by Velcro. All pieces come with sequence numbers that can easily be done by one person within 30mins', 266.98, 50, 'https://m.media-amazon.com/images/I/81+-H4m1wHL._AC_SY450_.jpg', 8, 13, '2024-06-22 15:04:50', '2024-06-24 19:12:19'),
(63, 'Cuisinart 17-Piece Cookware Set, Chef\'s Classic St', 'SET INCLUDES: 1.5 Quart saucepan with glass cover, 1 Quart saucepan with glass cover, 2 Quart saucepan with glass cover, 3 Quart saucepan with glass cover, 3.5 Quart sauté pan with helper handle and glass cover, 4 Quart dutch oven with glass cover, 8 Quart stockpot with glass cover, 8\" Skillet, 10\" Skillet, 12\" Skillet with glass cover, 20cm steamer insert with cover\r\nCOOKING AND CLEANING: Experience professional performance with an aluminum encapsulated base that heats quickly and spreads heat evenly, eliminating any hot spots and providing versatile performance. The stainless steel cooking surface does not discolor, react with food or alter flavors. Cookware set is oven safe up to 500 F and is dishwasher safe, making cleanup effortless\r\nDURABLE & SLEEK DESIGN: Each piece designed with durability and a sleek mirror finish that will have you cooking your absolute best. Measurement markings provide you with ease of use every time\r\nEXCEPTIONAL HANDLING: Riveted stainless steel handles, including side grips and helper handles, which are professionally riveted to ensure a lifetime of perfect balance. You’ll receive a drip-free pour everytime and the flavor lock lid results in your best cooking results\r\nWARRANTY: Lifetime warranty', 175.24, 50, 'https://m.media-amazon.com/images/I/71dVSE4KoSL._AC_SX450_.jpg', 8, 12, '2024-06-22 15:04:50', '2024-06-22 15:04:50'),
(64, 'Wooden Pepper Mill Set Salt Black Pepper Grinder K', 'Oak wood pepper mill with ceramic grinder.\r\nThe wooden knob is super efficient. It easily locks the freshness and odor of the pepper and keep at afresh for anytime use.\r\nPepper mill grinder is Easy cranking to turn coarse sea salt, pepper and other fillers into fine consistent powder with a good quantity.\r\nProfessional Oak wood pepper grinder is fully adjustable. Turn top nut to adjust from fine to coarse.\r\nIts traditionally styled with genuine wood.', 25.99, 50, 'https://m.media-amazon.com/images/I/61w9QzloaEL._AC_SY450_.jpg', 8, 11, '2024-06-22 15:14:01', '2024-06-22 15:14:01'),
(65, 'Zubebe 24pcs Cutting Board Bulk 11 x 5 Inch Wood C', 'Suitable Size: you will receive 24 pieces kitchen bamboo chopping boards, length 11 inches, width 5 inches and 0.31 inches thick, proper size for most needs and families; Our bamboo charcuterie board has enough space to place vegetables, charcuterie, cheese, bread, etc., and is thick enough, making it the ideal board for all your cutting and chopping needs\r\nPractical Board: each bamboo kitchen butcher block is made of quality bamboo, adopt a side pressing process, and is pre treated with mineral oil, which is strong, thick, and sturdy, not easy to chip; The bamboo handle cutting board is designed with a handle, easy to take; There is a round hole on the top, you can hang it with rope at will for home decoration\r\nExquisite Gift: the blank and smooth surface of the wooden cutting board is ideal for laser engraving and more; You can imagination run wild, create nice decorations and gifts to give it to your friends on Thanksgiving, Christmas, Mother\'s Day, housewarming, weddings\r\nEasy to Clean: our material offers reliability and easy care, only need to be rinsed with soapy water or water to keep them clean, recommend that you do not soak it and do not place in a dishwasher; Regularly oil the bulk cooking paddle board with a cloth or towel, keep the cutting board dry, can extend their service life\r\nMultipurpose: these natural bamboo cheese charcuterie boards are suitable for kinds of cutting, chopping, you can use them for breads, cheeses, meats, vegetables, fruits, and pizzas, etc.; They can be applied as cheese boards, charcuterie boards, or dinner plates; These wood chopping boards will keep your countertop tidy and neat, and they are a good choice that make a nice holiday and housewarming gift for friends and family', 63.99, 50, 'https://m.media-amazon.com/images/I/81DneN1kR7L._AC_SX425_.jpg', 8, 6, '2024-06-22 15:14:01', '2024-06-22 15:14:01'),
(66, 'Contemporary Style Accent Mirror with Sun Burst', 'It Contains One Contemporary Style Accent Mirror\r\nIt has natural finished wooden frame\r\nIt has sun burst design to enhance the beauty\r\nInner mirror included with the frame\r\nOverall Dimensions: -1. 5 inches in Length x 31. 75 inches in Width x 31. 75 inches in Height', 157.10, 50, 'https://m.media-amazon.com/images/I/81Qt9G494WL._AC_SX522_.jpg', 8, 6, '2024-06-22 15:24:00', '2024-06-22 15:24:00'),
(67, 'Unknown1 Side Table 18\" X 24\" 20\" Gold Green Glam ', 'Side Table 18\" X 24\" 20\" Gold Green Glam Transitional Specialty Iron Metal Goldtone Finish\r\nBase type : Tripod. Type : Accent Tables, Side Tables. Finish : Goldtone Finish. Frame material : Metal. Assembly : Assembled. Material : Iron, Metal. Color : Gold, Green. Design : Table. Shape : Specialty. Top material : Metal\r\nProduct Size: 24.0 In. X 18.0 In. X 20.0 In.', 59.99, 50, 'https://m.media-amazon.com/images/I/91zaP7e23dL._AC_SY450_.jpg', 8, 13, '2024-06-22 15:24:00', '2024-06-22 15:24:00'),
(68, 'Quiet Living Room with Drawer Solid Wood Sofa Side', 'Storage Space: This hallway side table is also great in hallways, bedrooms, living rooms, providing plenty of space for items to keep the room clean and tidy.\r\nDesigned with practicality in mind, this elegant solid wood phone table with drawers is a stylish solution for the living room or hallway.\r\nWith built-in small drawer, you can store some small things, such as books, keys, etc.\r\nBuilt with solid wood, it has high quality and practicality, suitable for home use.\r\nThe product is fully assembled, ready to use and ready to use.', 134.70, 50, 'https://m.media-amazon.com/images/I/51qDphFfEOL._AC_SY450_.jpg', 8, 11, '2024-06-22 15:25:58', '2024-06-22 15:25:58'),
(69, 'Shintenchi 47\" Small Modern Loveseat Couch Sofa, F', 'Great seating: The 47“ loveseat is crafted from strong wood and features a high-density spongy cushion finish. Also the high-density sponge cushion is soft and comfortable, providing ultimate seating comfort and cushion durability to last!\r\nCharming Sofa: We love the tiny sofa\'s mid-century modern design. Also we provide 5 popular chic colors for you to choose. This mini couch is colorful and versatile enough to be placed in anywhere you need:bedroom,living room,studio, apartment,cafe etc\r\nSmall Space Solution:Don’t doubt that our small sofa is definitely a small space solution. Light weight design but durable enough for daily using.This small couch with upholstered sponge,human design, 2 pillows, offer you comfy touch. This sofa is a pretty addition to small space.\r\nQuick installation:Tool-free assembly,this tiny couch is pretty easy to put together. Just have to connect the parts and screw the legs on, can be installed in less than 20 minutes.Came in one box, included: 2-seat small sofa with 2 same color pillows.\r\nTips: Since this is a small loveseat, please confirm the size meets your needs before ordering. Dimensions: 47.2\" W x 25.6\" D x 30.3\" H, Seat Height 17.7\", Seat Depth: 21.3\", Weight capacity: 350 lbs,Simple assembly required.', 229.90, 50, 'https://m.media-amazon.com/images/I/81bBHB1daoL._AC_SX425_.jpg', 8, 11, '2024-06-22 15:25:58', '2024-06-22 15:25:58'),
(70, '1471AB 29\" Metal Table Lamp, Antique Brass', 'Shade Color: Cream\r\nShade: 3-Way\r\n1 Year Warranty\r\nShade Size: 13X15X10.5', 27.55, 50, 'https://m.media-amazon.com/images/I/71yo41eWerL._AC_SX425_.jpg', 8, 12, '2024-06-22 15:28:50', '2024-06-22 15:28:50'),
(71, 'Undermount Kitchen Sink', 'Gaomasck Kitchen Sink Made Of T-304 Stainless Steel，Corrosion And Rust-Resistant,Will Not Fade Over Time，Satin Finish Ensures That It Is Highly Resistant To Dirt And Grime,Easily Wipes Clean,And Matches Most Kitchen Appliances.\r\nKitchen Sink Outer Dimensions 30\" L X 16.5\" W (Front-To-Back) X 9\"D, Inner Bowl Dimension: 28*15*9\", Bowl Depth: 9 Inch; Min Cabinet Size: 33\". Deep Single Bowl Undermount Sink With Low Center Divider To Contain Splashing And Fit Your Tallest Pots And Stacks Of Dishes, Accommodate Your Largest Kitchenware.\r\nGaomasck Stainless Steel Kitchen Sink Is Undermount Installation For A Sleek And Seamless Look. It Comes With All The Necessary Accessories: Basket Strainer, Drying Rack ，Mounting Hardware That Help You To Finish A Easy Installation.\r\n30Inch undermount sink is designed with a sloped bottom and X-shaped guide lines for better drainage.Sound-deadening material minimizes sound and vibration for a quieter use. This 30 undermount sink is a 9\'\' extra deep bowl sink that accommodates large items. Rear set drain also provides more usable surface area and storage space under the sink.\r\nGaomasck Kitchen Sink Provides Lifetime Warranty With Customer Service That Puts You First. Please Contact Us By Amazon Email Gaomasck Team Is On Standby For You.', 200.00, 50, 'https://m.media-amazon.com/images/I/81hiFIuorLL._AC_SX425_.jpg', 8, 12, '2024-06-23 15:14:50', '2024-06-23 15:14:50');

-- --------------------------------------------------------

--
-- Table structure for table `ratingreview`
--

CREATE TABLE `ratingreview` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `rating` float NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ratingreview`
--

INSERT INTO `ratingreview` (`id`, `title`, `description`, `rating`, `userId`, `productId`) VALUES
(32, 'This Product is Amazing', 'This Product is Amazing', 4, 15, 66),
(33, 'Very Comfy Bed', 'Highly Recommend, Fast Delivery', 5, 15, 62),
(34, 'Very Classic watch', 'Good Watch, Bad Delivery', 3, 15, 56);

-- --------------------------------------------------------

--
-- Table structure for table `tax`
--

CREATE TABLE `tax` (
  `id` int(11) NOT NULL,
  `countryCode` varchar(2) NOT NULL,
  `countryName` varchar(50) NOT NULL,
  `taxRate` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tax`
--

INSERT INTO `tax` (`id`, `countryCode`, `countryName`, `taxRate`) VALUES
(1, 'US', 'United States', 0.00),
(2, 'CA', 'Canada', 5.00),
(3, 'UK', 'United Kingdom', 6.00),
(4, 'FR', 'France', 5.50),
(5, 'DE', 'Germany', 7.00),
(6, 'AU', 'Australia', 10.00),
(7, 'JP', 'Japan', 8.00),
(8, 'IT', 'Italy', 6.00),
(9, 'BR', 'Brazil', 12.50),
(10, 'IN', 'India', 18.00),
(11, 'CN', 'China', 13.50),
(12, 'MX', 'Mexico', 16.00),
(13, 'RU', 'Russia', 15.00),
(14, 'ES', 'Spain', 7.50),
(15, 'KR', 'South Korea', 9.00),
(16, 'SA', 'Saudi Arabia', 5.50),
(17, 'ZA', 'South Africa', 10.50),
(18, 'NL', 'Netherlands', 6.00),
(19, 'SE', 'Sweden', 7.00),
(20, 'SG', 'Singapore', 7.50),
(21, 'TH', 'Thailand', 7.00),
(22, 'AR', 'Argentina', 8.50),
(23, 'EG', 'Egypt', 9.00),
(24, 'TR', 'Turkey', 8.00),
(25, 'CH', 'Switzerland', 7.00),
(26, 'BE', 'Belgium', 6.00),
(27, 'AT', 'Austria', 5.00);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `mobile`, `dateOfBirth`, `password`, `imageUrl`, `role`) VALUES
(11, 'admin', 'admin', 'admin@admin.com', '21341234214', '2000-06-07', 'Test123=', 'https://c1.alamy.com/thumbs/tcxt95/admin-icon-vector-male-user-person-profile-avatar-with-gear-cogwheel-for-settings-and-configuration-in-flat-color-glyph-pictogram-illustration-tcxt95.jpg', 'admin'),
(12, 'customer', 'test', 'customer@test.com', '23412341234', '1999-06-16', '$2b$10$wD4pPBQw4Uy/rg1EKSJeruLw89225SMafVTiMDWdK4.c2s0r9vCge', 'https://cdn-icons-png.flaticon.com/512/4715/4715330.png', 'customer'),
(13, 'test', 'test', 'Test2@test.com', '2341234143214', '2015-02-11', '$2b$10$CJy8Ynd9zY.Vx5Fp0MQtI.D1nHcSDY8nM0.QgsmPiRHPYPHF4TZuu', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 'customer'),
(14, 'admin', 'admin', 'admin@email.com', '2314321412341', NULL, '$2b$10$on.Ig8Iixa2mVk0BgskIh./2huw2Pcd/JGXYnULpOD8.qzyFWBjBO', 'https://static.vecteezy.com/system/resources/previews/029/156/453/original/admin-business-icon-businessman-business-people-male-avatar-profile-pictures-man-in-suit-for-your-web-site-design-logo-app-ui-solid-style-illustration-design-on-white-background-ep', 'admin'),
(15, 'customer', 'test', 'Customer2@test.com', '4123412341143', NULL, '$2b$10$qhtu.AvxQEF7RBAMIbguve1aXLyIRMWeACld/fsWEEBMT8VaZp4o.', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `userId`) VALUES
(9, 11),
(10, 12),
(11, 13),
(12, 14),
(13, 15);

-- --------------------------------------------------------

--
-- Table structure for table `wishlistitem`
--

CREATE TABLE `wishlistitem` (
  `id` int(11) NOT NULL,
  `wishListId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `wishlistitem`
--

INSERT INTO `wishlistitem` (`id`, `wishListId`, `productId`) VALUES
(27, 10, 5),
(30, 10, 7),
(32, 11, 5),
(33, 11, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentId` (`paymentId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `addressId` (`addressId`),
  ADD KEY `taxId` (`taxId`),
  ADD KEY `discountId` (`discountId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `brandId` (`brandId`);

--
-- Indexes for table `ratingreview`
--
ALTER TABLE `ratingreview`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishListId` (`wishListId`),
  ADD KEY `productId` (`productId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `ratingreview`
--
ALTER TABLE `ratingreview`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `cartItem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cartItem_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`paymentId`) REFERENCES `payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_4` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_5` FOREIGN KEY (`taxId`) REFERENCES `tax` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_6` FOREIGN KEY (`discountId`) REFERENCES `discount` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderItem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderItem_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratingreview`
--
ALTER TABLE `ratingreview`
  ADD CONSTRAINT `ratingReview_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratingReview_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishList_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  ADD CONSTRAINT `wishListItem_ibfk_1` FOREIGN KEY (`wishListId`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishListItem_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
