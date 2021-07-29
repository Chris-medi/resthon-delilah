

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- Database: `nV5Q3zY2ll`
-- --------------------------------------------------------
--
-- Table structure for table `Details`
--

CREATE TABLE `Details` (
  `detail_id` double NOT NULL,
  `product_id` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Details`
--

INSERT INTO `Details` (`detail_id`, `product_id`) VALUES
(14, 4),
(14, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `orden_id` double NOT NULL,
  `detail_id` double NOT NULL,
  `status_orden` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'preparacion',
  `total_price` double DEFAULT NULL,
  `user_id` int(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orden_id`, `detail_id`, `status_orden`, `total_price`, `user_id`) VALUES
(15, 14, 'preparacion', 8000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `product_id` double NOT NULL,
  `link_image` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name_product` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`product_id`, `link_image`, `name_product`, `price`) VALUES
(5, 'https://www.zenu.com.co/wp-content/uploads/2019/07/pizza-carnes-zenu-recetas.jpg', 'pizza', 5000),
(6, 'https://i0.wp.com/lanoticia.com/wp-content/uploads/2021/02/hamburguesa.jpeg?fit=640%2C427&ssl=1', 'hamburguesa', 8000),
(4, 'https://static4.abc.es/media/bienestar/2020/09/06/recetas-pollo-kp2G--620x349@abc.jpg', 'pollo', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` double NOT NULL,
  `fullName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rol` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `fullName`, `userName`, `email`, `password`, `rol`) VALUES
(1, 'cami franco', 'milo', 'camilo@gmail.com', '$2b$08$qoiWBwbZmKJ7FBFDawMcgeNpdHjdzKhGan3HVuLYiF8OX1qAZUvMa', 0),
(2, 'daniel gonzales', 'daniel', 'dani@gmail.com', '$2b$08$BfhPooUaq/BTy36N7njWg.07XPBMd90XgMIqV8bDAMLdNd1zB8gfK', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Details`
--
ALTER TABLE `Details`
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`orden_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `details_id` (`detail_id`) USING BTREE;

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `orden_id` double NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `product_id` double NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` double NOT NULL AUTO_INCREMENT;
COMMIT;

